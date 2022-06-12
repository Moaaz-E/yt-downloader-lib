import VidStream from "./vidstream";
import http from "http"
import https from "https"
import EventEmitter from "events"
import {parse, Manifest, AudioDict, Audio, Playlist, AudioDef, Segment} from "mpd-parser"
import { AwaitEnd, GetAny as GetFirst, GetBytes, GetFullUrl, GetStream, IsManifest } from "./utils";
import fs from "fs"
export default class DashStream implements VidStream {
    private done : boolean = false;
    private onDone : EventEmitter = new EventEmitter();
    private manifestUrl : string;
    private manifest? : Manifest
    Done() {
        return new Promise<boolean>((res) => {
            this.onDone.on("done", () => {
                res(this.done);
            })
        });
    }
    constructor(manifestUrl : string) {
        let str = "";
        // let fileDescriptor = fs.openSync("out2.mp4", "w");
        let fileStream = fs.createWriteStream("out3.mp4", {encoding: "binary"});
        this.manifestUrl = manifestUrl;
        https.get(manifestUrl, (res) => {
            res.on("data", (chunk) => {
                str += chunk;
            })
            res.on("end", async () => {
                var parsed = parse(str) as Manifest
                if(IsManifest(parsed)) {
                    const playlist = parsed.playlists[0];
                    const bufferBytes = await GetBytes(await GetStream(GetFullUrl(playlist.segments[0].map.resolvedUri, this.manifestUrl)))
                    fileStream.write(bufferBytes);
                    for(let i = 0; i < 10; i++) {
                        const segment = playlist.segments[i];
                        const url = GetFullUrl(segment.resolvedUri, this.manifestUrl);
                        const stream = await GetStream(url)
                        // stream.pipe(fileStream)
                        // const res = await AwaitEnd(stream)
                        const bytes = await GetBytes(stream)

                        fileStream.write(bytes, (err) => {
                            if(err) {
                                console.log("error while writing");
                            }
                        });
                        // fs.writeSync(fileDescriptor, bytes);
                        console.log(segment);
                    }
                }
                fileStream.close();
                fileStream.once("close", () => {
                    this.onDone.emit("done");
                })
            })
        })
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
        let segments : {
            audio? : string
            video: string
        } = {video: ""}

        if(audioPlaylist) {
            segments.audio = this.GetInitializationSegment(audioPlaylist)
            segments.video = this.GetInitializationSegment(videoPlaylist);
        }
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
}