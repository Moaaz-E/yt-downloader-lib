import https from "https"
import EventEmitter from "events"
import {parse, Manifest, AudioDict, Audio, Playlist, AudioDef, Segment, Resolution} from "mpd-parser"
import { AwaitEnd, GetAny as GetFirst, GetBytes, GetFullUrl, GetStream, IsManifest } from "./utils";
import fs from "fs"
import logger, { LogPlaylist } from "./Logger";
import {createFile} from "./vendors/mp4box/mp4box"
import {VideoStream } from "./VideoStream";

type InitSegments = {
    audio? : string,
    video : string
}
export default class DashStream extends VideoStream {
    private done : boolean = false;
    private onDone : EventEmitter = new EventEmitter();
    private manifestUrl : string;
    private manifest? : Manifest
    private hasAudio = false
    Done() {
        return new Promise<boolean>((res) => {
            this.onDone.on("done", () => {
                res(this.done);
            })
        });
    }
    constructor(manifestUrl : string) {
        super(undefined);
        let str = "";
        let fileStream = fs.createWriteStream("whole2.mp4", {encoding: "binary"});
        let vidFs = fs.createWriteStream("vid2.m4v", {encoding: "binary"});
        let audioFs = fs.createWriteStream("audio2.m4a", {encoding: "binary"});
        this.manifestUrl = manifestUrl;
        https.get(manifestUrl, (res) => {
            res.on("data", (chunk) => {
                str += chunk;
            })
            res.on("end", async () => {
                this.manifest = parse(str) as Manifest
                if(IsManifest(this.manifest)) {
                    const vidPlaylist = this.GetBestPlaylist() as Playlist;
                    const audioPlaylist = this.GetAudioPlaylist(vidPlaylist);
                    const initSegments = this.GetInitializationSegments(vidPlaylist)
                    const initBuffers = await this.GetInitBuffers(initSegments);
                    
                    fileStream.write(initBuffers.video);
                    vidFs.write(initBuffers.video);

                    if(audioPlaylist !== undefined) {
                        fileStream.write(initBuffers.audio);
                        audioFs.write(initBuffers.audio);
                    }
                    let audioInit = false;
                    for(let i = 0; i < 1; i++) {
                        const vB = await this.GetSegmentBytes(vidPlaylist.segments[i]);
                        fileStream.write(vB);
                        vidFs.write(vB);

                        if(audioPlaylist !== undefined) {
                            const b = await this.GetSegmentBytes(audioPlaylist.segments[i])
                            fileStream.write(b);
                            audioFs.write(b)
                            if(!audioInit) {
                                audioInit = true
                            }
                        }
                    }
                }
                fileStream.close();
                fileStream.once("close", () => {
                    this.onDone.emit("done");
                })
            })
        })
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