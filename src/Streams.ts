import { Readable, Stream, StreamOptions } from "stream";
import fsPromise from "fs/promises"
import fs from "fs"
import EventEmitter from "events"
import {parse, Manifest, AudioDict, Audio, Playlist, AudioDef, Segment, Resolution} from "mpd-parser"
import { GetAny as GetFirst, GetBytes, GetFullUrl, GetStream, GetString, IsManifest, Sleep, ValueOrDefault } from "./utils";
import logger, { LogPlaylist } from "./Logger";
import { GetTrunHeader } from "./mp4";
import { ByteStream, CreateCodecStream, CreateMuxStream, Mux } from "./ffmpeg-helper";
import { fstat, writeFileSync } from "fs";
import { GetDefaultOptions, GetInitialData, GetInnerTubeApiKey, GetLiveChat, GetPlayerResponse, LiveChatMessage, MapYTLiveChatResponse, YoutubeOptions } from "./youtube";
import { YTInitial } from "./YTInitial";
import { YTInitialData } from "./YTInitialData";
import { LiveChatTextMessageRenderer2, Message3 } from "./ytLiveChat";
import path from "path";


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
    const stream = new DashStream(streamUrl);
    stream.Start()
    return stream;

}

export function GetM3U8Stream(streamUrl : string) {
    const stream = new M3U8Stream(streamUrl);
    stream.Start();
    return stream;
}


export function StreamVideo(streamUrl : string, options? : YoutubeOptions) {
    if(!options) {
        options = GetDefaultOptions();
    }
    const stream = new YTStream(streamUrl, options);
    stream.Start();
    return stream;
}

type InitSegments = {
    audio? : string,
    video : string
}
export class DashStream extends VideoStream implements INetworkStream {
    private done : boolean = false;
    private onDone : EventEmitter = new EventEmitter();
    private manifest? : Manifest
    private started = false
    private audioBuffer : Buffer = Buffer.alloc(0);
    private videoStream : ByteStream = new ByteStream();
    private ffmpegStream : ByteStream = new ByteStream();
    
    get Started(): boolean {
        return this.started;
    }
    async Start() : Promise<void> {
        if(!this.started) {
            this.manifest = parse(await GetString(await GetStream(this.streamUrl))) as Manifest
            if(IsManifest(this.manifest)) {
                this.started = true;
            
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
        return GetFullUrl(playlist.segments[0].map.resolvedUri, this.streamUrl)
    }

    private GetSegmentStream(segment : Segment) {
        return GetStream(GetFullUrl(segment.resolvedUri, this.streamUrl))
    }

    private async GetSegmentBytes(segment : Segment) {
        logger.info(`Reading: ${GetFullUrl(segment.resolvedUri, this.streamUrl)}`);
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


type liveChatUpdate = (message : LiveChatMessage[]) => void;
class YTStream extends VideoStream implements INetworkStream {
    private started : boolean = false;
    private initResponse : YTInitial | null = null;
    private initData : YTInitialData | null = null;
    private avStream : VideoStream | null = null;
    private options : YoutubeOptions;
    private apiKey : string | null = null;
    private liveChatUpdateCallback : liveChatUpdate[] = []

    
    
    public get Title() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.title);
    }
    public get Channel() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.author);
        
    }
    public get VideoId() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.channelId);
    }
    
    

    constructor(streamUrl : string, options : YoutubeOptions) {
        super(streamUrl);
        this.options = options;
    }
    get Started(): boolean {
        return this.started;
    }
    async Start(): Promise<void> {
        const content = await GetString(await GetStream(this.streamUrl));
        this.initResponse = GetPlayerResponse(content);
        this.apiKey = GetInnerTubeApiKey(content);
        this.initData = GetInitialData(content);
        this.UpdateChat();


        if(this.initResponse === null || this.initData === null) {
            this.started = false;
            this.emit("error", `Could not open stream: ${this.StreamUrl}`);
            return;
        }

        logger.info(`Streaming [${this.Channel}]: "${this.Title}"`);
        this.avStream = GetM3U8Stream(this.streamUrl)
        this.avStream.on("data", (chunk) => {
            this.push(chunk);
        });
    }
    private async UpdateChat() {
        if(this.apiKey !== null && this.initData !== null) {
            let continuation = this.initData?.contents.twoColumnWatchNextResults.conversationBar.liveChatRenderer.continuations[0].reloadContinuationData.continuation
            let timeoutDuration = 0
            while(true) {
                await Sleep(timeoutDuration);
                const livechat = await GetLiveChat(this.apiKey, continuation)
                if(livechat) {
                    const _cont = livechat.continuationContents.liveChatContinuation.continuations[0];
                    const mapped = MapYTLiveChatResponse(livechat);
                    continuation = _cont.timedContinuationData.continuation;
                    timeoutDuration = _cont.timedContinuationData.timeoutMs;
                    this.liveChatUpdateCallback.forEach(cb => cb(mapped));
                    livechat.continuationContents
                }
            }
        }
    }

    AddChatListener(listener: liveChatUpdate) {
        this.liveChatUpdateCallback.push(listener);
    }
    RemoveChatListener(listener: () => void) {
        // this.liveChatUpdateCallback.
    }
}

export function DownloadStream(streamUrl : string, savePath: string = "./streams",  options? : YoutubeOptions) {
    const stream = StreamVideo(streamUrl, options);
    if(!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
    path.join(savePath, stream.)
}