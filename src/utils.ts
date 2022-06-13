import { Manifest } from "mpd-parser";
import https from "https"
import { Readable, Stream } from "stream";
function IsType<T>(object : any, key : keyof T) {
    return object[key] != undefined;
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