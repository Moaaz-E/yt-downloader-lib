import { Readable, Stream } from "stream";
import https from "https"
import EventEmitter from "events"
import {parse, Manifest, AudioDict, Audio, Playlist, AudioDef, Segment, Resolution} from "mpd-parser"
import { GetAny as GetFirst, GetBytes, GetFullUrl, GetStream, GetString, IsManifest, Sleep } from "./utils";
import logger, { LogPlaylist } from "./Logger";
import { GetTrunHeader } from "./mp4";
import { ByteStream, CreateCodecStream, CreateMuxStream, Mux } from "./ffmpeg-helper";
import { writeFileSync } from "fs";
import { GetPlayerResponse } from "./youtube";
import { YTInitial } from "./vendors/YTInitial";


interface IVideoStream extends Readable {    
    get HasAudio() : boolean;
    get StreamUrl() : string;
}

interface INetworkStream {
    get Started() : boolean;
    Start() : Promise<void>;
}

class VideoStream extends Readable implements IVideoStream  {
    protected hasAudio : boolean = true
    protected streamUrl : string;
    
    constructor(streamUrl : string) {
        super(undefined)
        this.streamUrl = streamUrl;
    }

    get HasAudio(): boolean { return this.hasAudio }
    get StreamUrl(): string { return this.streamUrl }

    _read(size: number): void {
        
    }
}
export function GetDashStream(streamUrl : string) {
    const stream = new DashStream(streamUrl, "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd");
    stream.Begin()
    return stream;

}

export function GetM3U8Stream(streamUrl : string) {
    const stream = new M3U8Stream(streamUrl);
    stream.Start();
    return stream;
}


export function StreamVideo(streamUrl : string) {
    const stream = new YTStream(streamUrl);
    stream.Start();
    return stream;
}

type InitSegments = {
    audio? : string,
    video : string
}
export class DashStream extends VideoStream {
    private done : boolean = false;
    private onDone : EventEmitter = new EventEmitter();
    private manifestUrl : string;
    private manifest? : Manifest
    private began = false
    private audioBuffer : Buffer = Buffer.alloc(0);
    private videoStream : ByteStream = new ByteStream();
    private ffmpegStream : ByteStream = new ByteStream();

    async Begin() {
        if(!this.began) {
            this.manifest = parse(await GetString(await GetStream(this.manifestUrl))) as Manifest
            if(IsManifest(this.manifest)) {
                this.began = true;
            
                this.ffmpegStream.on("data", (data) => {
                    this.push(data);
                })

                const vidPlaylist = this.GetBestPlaylist() as Playlist;
                const audioPlaylist = this.GetAudioPlaylist(vidPlaylist);
                this.hasAudio = audioPlaylist !== undefined;

                // Get init segments
                const initSegments = this.GetInitializationSegments(vidPlaylist)

                // Get the buffers to the init segment
                const initBuffers = await this.GetInitBuffers(initSegments);

                // push the video init buffer
                this.videoStream.write(initBuffers.video);
                // this.push(initBuffers.video);

                // push the audio init buffer if found
                if(initBuffers.audio){
                    this.audioBuffer = Buffer.concat([this.audioBuffer, initBuffers.audio]);
                }
                // this.push(initBuffers.audio);

                for(let i = 0; i < 1; i++) {
                    const res = await this.GetSegmentBytes(vidPlaylist.segments[i]);
                    this.videoStream.push(res);
                    if(this.hasAudio) {
                        const audioRes = await this.GetSegmentBytes((<Playlist>audioPlaylist).segments[i]);
                        this.audioBuffer = Buffer.concat([this.audioBuffer, audioRes]);
                    }
                    // const trun = GetTrunHeader(res);
                }
                writeFileSync("temp.m4a", this.audioBuffer);
                Mux(this.videoStream, "temp.m4a", this.ffmpegStream);
                await Sleep(5000);
            }
            else {
                this.manifest = undefined;
                this.emit("error", "Provided manifest is not valid")
            }
        }
    }
    constructor(streamUrl : string, manifestUrl : string) {
        super(streamUrl);
        this.manifestUrl = manifestUrl;
        // https.get(manifestUrl, (res) => {
        //     res.on("data", (chunk) => {
        //         str += chunk;
        //     })
        //     res.on("end", async () => {
        //         this.manifest = parse(str) as Manifest
        //         if(IsManifest(this.manifest)) {
        //             const vidPlaylist = this.GetBestPlaylist() as Playlist;
        //             const audioPlaylist = this.GetAudioPlaylist(vidPlaylist);
        //             const initSegments = this.GetInitializationSegments(vidPlaylist)
        //             const initBuffers = await this.GetInitBuffers(initSegments);

        //             // Push init buffers
        //             this.push(initBuffers.video);
        //             if(audioPlaylist !== undefined) {
        //                 this.push(initBuffers.audio)
        //                 this.hasAudio = true;
        //             }
        //             let audioInit = false;
        //             for(let i = 0; i < 1; i++) {
        //                 const videoSegment = await this.GetSegmentBytes(vidPlaylist.segments[i]);
        //                 if(this.hasAudio) {
        //                     const audioSegment = await this.GetSegmentBytes((<Playlist>audioPlaylist).segments[i])
        //                 }
        //             }
        //         }
        //     })
        // })
    }
    private async GetInitBuffers(segments : InitSegments) {
        let audio : Buffer | undefined;
        if(segments.audio !== undefined) {
            audio = await GetBytes(await GetStream(segments.audio));
        }
        return {audio: audio, video: await GetBytes(await GetStream(segments.video))}
    }
    private GetAudioPlaylist(videoPlaylist : Playlist) {
        if(this.manifest) {
            const audioDef = GetFirst<AudioDef>(this.manifest.mediaGroups.AUDIO[<string>videoPlaylist.attributes.AUDIO])
            if(audioDef) {
                return audioDef.playlists[0]
            }
        }
    }
    private GetInitializationSegments(videoPlaylist : Playlist) {
        const audioPlaylist = this.GetAudioPlaylist(videoPlaylist)
        let segments : InitSegments = {video: ""}
        if(audioPlaylist) {
            segments.audio = this.GetInitializationSegment(audioPlaylist)
        }
        segments.video = this.GetInitializationSegment(videoPlaylist);
        return segments;
    }

    
    private GetInitializationSegment(playlist : Playlist) {
        return GetFullUrl(playlist.segments[0].map.resolvedUri, this.manifestUrl)
    }

    private GetSegmentStream(segment : Segment) {
        return GetStream(GetFullUrl(segment.resolvedUri, this.manifestUrl))
    }

    private async GetSegmentBytes(segment : Segment) {
        logger.info(`Reading: ${GetFullUrl(segment.resolvedUri, this.manifestUrl)}`);
        return GetBytes(await this.GetSegmentStream(segment))
    }

    private GetBestPlaylist(options?: {target? : number}) {
        if(options === undefined) {
            options = {}
        }
        const target = options.target ? options.target : 1080;
        let _break = false
        const playlist = this.manifest?.playlists.reduce((_plist, playlist, index) => {
            if(_break)
            {
                return _plist;
            }
            if(index == 1) {
                LogPlaylist(_plist)
            }
            LogPlaylist(playlist);
            const aRes = _plist.attributes.RESOLUTION as Resolution;
            const bRes = playlist.attributes.RESOLUTION as Resolution;
            if(target == aRes.height) {
                logger.info("Found playback matching the target " + target);
                _break = true;
                return _plist;
            }
            else if(target == bRes.height) {
                logger.info("Found playback matching the target " + target);
                _break = true;
                return playlist; 
            }
            return (aRes.height > bRes.height && aRes.width > bRes.width) ? _plist : playlist;
        })
        if(playlist) {
            logger.info("Best playlist found:")
            LogPlaylist(playlist);
        }
        return playlist;
    }
}

export class M3U8Stream extends VideoStream implements INetworkStream {
    get Started(): boolean {
        return this.started;
    }
    async Start(): Promise<void> {
        this.decodedStream.on("data", (data) => {
            this.push(data);
        })
        // Get the data from url
        CreateCodecStream(this.avStream, this.decodedStream);
        const bytes = await GetBytes(await GetStream("https://filesamples.com/samples/video/ts/sample_640x360.ts"))
        this.avStream.write(bytes);
    }
    private started = false;
    private avStream : ByteStream = new ByteStream();
    private decodedStream : ByteStream = new ByteStream();

}

class YTStream extends VideoStream implements INetworkStream {
    Title = "";
    Channel = "";
    private started : boolean = false;
    private initResponse : YTInitial | null = null;
    constructor(streamUrl : string) {
        super(streamUrl);
    }
    get Started(): boolean {
        return this.started;
    }
    async Start(): Promise<void> {
        const content = await GetString(await GetStream(this.streamUrl));
        this.initResponse = GetPlayerResponse(content);
        if(this.initResponse === null) {
            this.started = false;
            this.emit("error", `Could not open stream: ${this.StreamUrl}`);
            return;
        }
        this.Title = this.initResponse.videoDetails.title;
        this.Channel = this.initResponse.videoDetails.author;
        GetM3U8Stream(this.streamUrl)
    }
}