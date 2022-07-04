import { Manifest } from "mpd-parser";
import https from "https"
import { Readable, Stream } from "stream";
import { resolve } from "path";
import axios from "axios";
import { VideoResolution } from "./youtube";
import logger from "./Logger";

const hslRegex = /#EXT-X-STREAM-INF:BANDWIDTH=(?<bandwidth>\d*),CODECS="(?<codecs>[^"]*)",RESOLUTION=(?<resolution>[^,]*),FRAME-RATE=(?<fps>\d*),VIDEO-RANGE=(?<videoRange>[A-Z]*),CLOSED-CAPTIONS=\w*[\r\n]+(?<url>\S*)/g

function IsType<T>(object : any, ...keys : (keyof T)[]) {
    const val = keys.every((key) => object[key] != undefined)
    return val;
}

export function Sleep(duration : number) {
    return new Promise(res => setTimeout(res, duration))
}
export function IsManifest(object : any) {
    return IsType<Manifest>(object, 'playlists');
}

export function GetFullUrl(uri : string, manifestUrl : string) {
    if(uri.startsWith("/")) {
        return manifestUrl.replace(/\/[^\/]*\.mpd/, uri);
    }
    return uri;
}

export async function GetContentsAsObject<T>(stream : Readable) {
    return JSON.parse(await GetString(stream)) as T;
}

export function PostStream(url : string) {
    return new Promise<Readable>((resolve, reject) => {
        https.request({method: "POST", href: url}, (res) => {
            if(res.statusCode !== undefined && res.statusCode == 200) {
                resolve(res);
            }
            else {
                reject(`StatusCode: ${res.statusCode} | StatusMessage: ${res.statusMessage}`);
            }
        });
    })
}

export function ValueOrDefault(value : string | undefined, _default : string = "") {
    return value === undefined ? _default : value;
}

export function GetStream(url : string) {
    return new Promise<Readable>((resolve, reject) => {
        https.get(url, (res) => {
            if(res.statusCode != undefined && res.statusCode == 200) {
                resolve(res);
            }
            else {
                reject(`StatusCode: ${res.statusCode} | StatusMessage: ${res.statusMessage}`)
            }
        })    
    })
}
export function GetString(stream : Readable) {
    return new Promise<string>((resolve, reject) => {
        let str = ""
        let resolved = false;
        stream.on("data", (data) => {
            str += data;
        })

        stream.once("close", () => {
            if(!resolved) {
                resolve(str);
                resolved = true;
            }
        })

        stream.once("error", (err) => {
            reject(err);
        })

        stream.once("end", () => {
            if(!resolved) {
                resolve(str);
                resolved = true;
            }
        })
    })
}
export function GetBytes(stream : Readable) {
    return new Promise<Buffer>((resolve, reject) => {
        let buffer = Buffer.alloc(0);
        let resolved = false;
        stream.on("data", (data) => {
            buffer = Buffer.concat([buffer, data]);
        })
        stream.on("close", () => {
            if(!resolved) {
                resolve(buffer);
                resolved = true;
            }
        })
        stream.on("error", (err) => {
            reject(err);
        })

        stream.on("end", () => {
            if(!resolved) {
                resolve(buffer);
                resolved = true;
            }
        })
    })
}

export function AwaitEnd(stream : Readable) {
    return new Promise<boolean>((res) => {
        stream.once("end", () => {
            res(true);
        })
    })
}

export function GetAny<T>(object : any) {
    for(const key in object) {
        return object[key] as T
    }
}


export interface HlsManifest {
    Bandwidth: string,
    Codec: string,
    Resolution: string
    FPS: string,
    URL: string,
}

export async function ParseHlsManifest(url : string) : Promise<HlsManifest[]> {
    const res = await axios.get(url);
    if(res.status == 200) {
        const matches = (res.data as string).matchAll(hslRegex);
        return Array.from(matches).map((match) => {
            if(match.groups) {
                return {
                    Bandwidth: match.groups["bandwidth"],
                    Codec: match.groups["codec"],
                    Resolution: match.groups["resolution"],
                    FPS: match.groups["fps"],
                    URL: match.groups["url"]
                } as HlsManifest
            }
        }).filter(manifest => manifest != undefined) as HlsManifest[]
    }
    return [];
}


export function GetBestHlsManifest(manifests : HlsManifest[], targetResolution : VideoResolution) {
    let _break = false;
    const manifest = manifests.reduce((manifestA, manifestB, index) => {
        if(_break)
        {
            return manifestA;
        }
        const aRes = parseInt(manifestA.Resolution.split("x")[1]);
        const bRes = parseInt(manifestB.Resolution.split("x")[1]);
        if(targetResolution == aRes) {
            _break = true;
            return manifestA;
        }
        else if(targetResolution == bRes)
        {
            _break = true;
            return manifestB;
        }
        return aRes > bRes ? manifestA : manifestB;
    })
    logger.info(`Best manifest: [${PrintHlsManifest(manifest)}]\nTarget: ${targetResolution}`);
    return manifest;
}

function PrintHlsManifest(manifest : HlsManifest) {
    return `Bandwidth: ${manifest.Bandwidth} | Codec: ${manifest.Codec} | FPS: ${manifest.FPS} | Resolution: ${manifest.Resolution}`
}