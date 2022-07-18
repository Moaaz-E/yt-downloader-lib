import { Readable } from "stream";
import axios from "axios";
import { VideoResolution } from "./youtube";
import logger from "./Logger";

const hslRegex = /#EXT-X-STREAM-INF:BANDWIDTH=(?<bandwidth>\d*),CODECS="(?<codecs>[^"]*)",RESOLUTION=(?<resolution>[^,]*),FRAME-RATE=(?<fps>\d*),VIDEO-RANGE=(?<videoRange>[A-Z]*),CLOSED-CAPTIONS=\w*[\r\n]+(?<url>\S*)/g


export function Sleep(duration : number) {
    return new Promise(res => setTimeout(res, duration))
}

export function ValueOrDefault(value : string | undefined, _default : string = "") {
    return value === undefined ? _default : value;
}

export interface HlsManifest {
    Bandwidth: string,
    Codecs: string,
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
                    Codecs: match.groups["codecs"],
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
    return `Bandwidth: ${manifest.Bandwidth} | Codec: ${manifest.Codecs} | FPS: ${manifest.FPS} | Resolution: ${manifest.Resolution}`
}