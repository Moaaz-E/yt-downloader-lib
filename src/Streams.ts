import axios from "axios"
import logger from "./Logger";
import { YTInitialRes } from "./YTInitialRes";
import { PassThrough, Readable } from "stream";
import { YTInitialData } from "./YTInitialData";
import { CreateHlsDownloadStream } from "./ffmpeg-helper";
import { GetBestHlsManifest, HlsManifest, ParseHlsManifest, Sleep, ValueOrDefault } from "./utils";
import { GetDefaultOptions, GetInitialData, GetInnerTubeApiKey, GetLiveChat, GetPlayerResponse, LiveChatMessage, MapYTLiveChatResponse, YoutubeOptions } from "./youtube";


interface IVideoStream extends Readable {    
    get HasAudio() : boolean;
    get StreamUrl() : string;
}

export interface INetworkStream {
    get Started() : boolean;
    get Error() : boolean;
    Start() : Promise<void>;
    Stop() : void;
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

export function StreamVideo(streamUrl : string, options? : YoutubeOptions) : YTStream {
    if(!options) {
        options = GetDefaultOptions();
    }
    const stream = new YTStream(streamUrl, options);
    stream.Start();
    return stream;
}


type liveChatUpdate = (message : LiveChatMessage[]) => void;
export class YTStream extends VideoStream implements INetworkStream {
    private started : boolean = false;
    private error : boolean = false;
    private initResponse : YTInitialRes | null = null;
    private initData : YTInitialData | null = null;
    private avStream : VideoStream | null = null;
    private options : YoutubeOptions;
    private apiKey : string | null = null;
    private liveChatUpdateCallback : liveChatUpdate[] = []
    private liveChatQueue : LiveChatMessage[][] = [];
    private manifests : HlsManifest[] | null = null
    private onStop : (() => boolean) | null = null;

    
    
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

    Stop(): void {
        if(this.onStop !== null && this.onStop()) {
            this.started = false;
            this.error = false;
        }
    }

    async Start(): Promise<void> {
        if(this.started) {
            return;
        }
        this.error = false;
        const content = await (await axios.get(this.streamUrl)).data as string;
        this.initResponse = GetPlayerResponse(content);
        this.apiKey = GetInnerTubeApiKey(content);
        this.initData = GetInitialData(content);
        
        
        if(this.initResponse === null || this.initData === null) {
            this.started = false;
            this.error = true;
            this.emit("error", `Could not open stream: ${this.StreamUrl}`);
            return;
        }
        
        logger.info(`Streaming [${this.Channel}]: "${this.Title}"`);
        this.manifests = await ParseHlsManifest(this.initResponse.streamingData.hlsManifestUrl);
        const bestManifest = GetBestHlsManifest(this.manifests, this.options.Resolution);
        const videoStream = new PassThrough();
        videoStream.on("data", (chunk) => {
            this.push(chunk);
        });
        const killCommand = CreateHlsDownloadStream(bestManifest.URL, videoStream);
        this.started = true;
        this.error = false;
        this.UpdateChat();
        this.onStop = () => {
            killCommand();
            return true;
        }
    }

    private async UpdateChat() {
        if(this.apiKey !== null && this.initData !== null) {
            let continuation = this.initData?.contents.twoColumnWatchNextResults.conversationBar.liveChatRenderer.continuations[0].reloadContinuationData.continuation
            let timeoutDuration = 0
            while(this.started && !this.error) {
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
                } 
                catch (error) {
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

    RemoveChatListener(listener: liveChatUpdate) {
        const index = this.liveChatUpdateCallback.indexOf(listener);
        if(index != -1) {
            this.liveChatUpdateCallback.splice(index, 1);
        }
    }
}