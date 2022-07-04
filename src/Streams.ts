import { Readable, Stream, StreamOptions } from "stream";
import fsPromise from "fs/promises"
import fs from "fs"
import EventEmitter from "events"
import { GetBestHlsManifest, GetBytes, GetStream, GetString, HlsManifest, ParseHlsManifest as ParseHlsManifest, Sleep, ValueOrDefault } from "./utils";
import logger, { LogPlaylist } from "./Logger";
import { GetTrunHeader } from "./mp4";
import { ByteStream, CreateCodecStream, CreateHlsDownloadStream, CreateMuxStream, Mux } from "./ffmpeg-helper";
import { fstat, writeFileSync } from "fs";
import { GetDefaultOptions, GetInitialData, GetInnerTubeApiKey, GetLiveChat, GetPlayerResponse, LiveChatMessage, MapYTLiveChatResponse, YoutubeOptions } from "./youtube";
import { YTInitial } from "./YTInitial";
import { YTInitialData } from "./YTInitialData";
import path from "path";


interface IVideoStream extends Readable {    
    get HasAudio() : boolean;
    get StreamUrl() : string;
}

export interface INetworkStream {
    get Started() : boolean;
    get Error() : boolean;
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

export function StreamVideo(streamUrl : string, options? : YoutubeOptions) : YTStream {
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

    get Error() : boolean {
        return this.error;
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
    private error = false;
    private avStream : ByteStream = new ByteStream();
    private decodedStream : ByteStream = new ByteStream();

}


type liveChatUpdate = (message : LiveChatMessage[]) => void;
export class YTStream extends VideoStream implements INetworkStream {
    private started : boolean = false;
    private error : boolean = false;
    private initResponse : YTInitial | null = null;
    private initData : YTInitialData | null = null;
    private avStream : VideoStream | null = null;
    private options : YoutubeOptions;
    private apiKey : string | null = null;
    private liveChatUpdateCallback : liveChatUpdate[] = []
    private liveChatQueue : LiveChatMessage[][] = [];
    private manifests : HlsManifest[] | null = null

    
    
    public get Title() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.title);
    }
    public get Channel() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.author);
        
    }
    public get VideoId() : string {
        return ValueOrDefault(this.initResponse?.videoDetails.channelId);
    }
    
    
    get Started(): boolean {
        return this.started;
    }
    get Error() : boolean {
        return this.error;
    }

    constructor(streamUrl : string, options : YoutubeOptions) {
        super(streamUrl);
        this.options = options;
    }
    async Start(): Promise<void> {
        if(this.started) {
            return;
        }
        this.error = false;
        const content = await GetString(await GetStream(this.streamUrl));
        this.initResponse = GetPlayerResponse(content);
        this.apiKey = GetInnerTubeApiKey(content);
        this.initData = GetInitialData(content);
        this.UpdateChat();


        if(this.initResponse === null || this.initData === null) {
            this.started = false;
            this.error = true;
            this.emit("error", `Could not open stream: ${this.StreamUrl}`);
            return;
        }

        logger.info(`Streaming [${this.Channel}]: "${this.Title}"`);
        this.manifests = await ParseHlsManifest(this.initResponse.streamingData.hlsManifestUrl);
        const bestManifest = GetBestHlsManifest(this.manifests, this.options.Resolution);
        const byteStream = new ByteStream();
        byteStream.on("data", (chunk) => {
            this.push(chunk);
        });
        CreateHlsDownloadStream(bestManifest.URL, byteStream);
        this.started = true;
        this.error = false;
    }
    private async UpdateChat() {
        if(this.apiKey !== null && this.initData !== null) {
            let continuation = this.initData?.contents.twoColumnWatchNextResults.conversationBar.liveChatRenderer.continuations[0].reloadContinuationData.continuation
            let timeoutDuration = 0
            while(true) {
                try {
                    await Sleep(timeoutDuration);
                    const livechat = await GetLiveChat(this.apiKey, continuation)
                    if(livechat) {
                        const _cont = livechat.continuationContents.liveChatContinuation.continuations[0];
                        if(livechat.continuationContents.liveChatContinuation.actions !== undefined) {
                            this.pushLiveChatUpdate(MapYTLiveChatResponse(livechat));
                        }
                        continuation = _cont.timedContinuationData.continuation;
                        timeoutDuration = _cont.timedContinuationData.timeoutMs;
                        livechat.continuationContents
                    }
                } catch (error) {
                    logger.error(error);
                }
            }
        }
    }
    private pushLiveChatUpdate(livechat : LiveChatMessage[]) {
        this.liveChatQueue.push(livechat);
        if(this.liveChatUpdateCallback.length !== 0) {
            while(this.liveChatQueue.length !== 0) {
                this.liveChatUpdateCallback.forEach(cb => cb(this.liveChatQueue.shift() as LiveChatMessage[]))
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