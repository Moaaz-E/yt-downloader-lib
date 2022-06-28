import { Manifest } from "mpd-parser";
import https from "https"
import { Readable, Stream } from "stream";
import { resolve } from "path";
import axios from "axios";
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