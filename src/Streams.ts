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