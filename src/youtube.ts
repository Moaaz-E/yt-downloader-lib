import { YTInitial } from "./vendors/YTInitial";

const channelNameExp = /"channelName":"([^"]*)"/;
const streamTitleExp = /<title>([^<]*)<\/title>/;
// "[^"]*":"https://manifest.googlevideo.com/[0-9a-zA-Z\-.\/_&%?=\\]*"
const getManifestUrlExp = /"([^"]*)":"(https:\/\/manifest.googlevideo.com\/[0-9a-zA-Z\-.\/_&%?=\\]*)/
const ytInitialPlayerResponse = /\>var ytInitialPlayerResponse = ([^<]*)/;

export function GetPlayerResponse(content : string) {
    const match = content.match(ytInitialPlayerResponse);
    if(match && match.length >= 2) {
        const obj = match[1].slice(0, match[1].length-1);
        const ytInit = <YTInitial>JSON.parse(obj);
        return ytInit;
    }
    return null;
}

export function GetChannelName(content : string) {
    const match = content.match(channelNameExp);
    if(match && match.groups) {
        return match.groups[0];
    }
    return "";
}

export function GetStreamTitle(content : string) {
    const match = content.match(streamTitleExp);
    if(match && match.groups) {
        return match.groups[0];
    }
    return "";
}

export function GetManifests(content : string) {
    const matches = content.matchAll(getManifestUrlExp);
    const manifests : {Type: string, Url : string}[] = []
    for(const match of matches) {
        if(match && match.groups) {
            manifests.push({Type: match.groups[0], Url: match.groups[1]});
        }
    }
    return manifests;
}