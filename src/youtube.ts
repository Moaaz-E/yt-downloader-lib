import axios from "axios";
import { YTInitial } from "./YTInitial";
import { Continuation, YTInitialData } from "./YTInitialData";
import { LiveChatTextMessageRenderer2, Message3, YTLiveChatResponse } from "./ytLiveChat";

const liveChatUrl = "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat";
const liveChatReplayUrl = "https://www.youtube.com/youtubei/v1/live_chat/get_live_chat_replay"
const channelNameExp = /"channelName":"([^"]*)"/;
const streamTitleExp = /<title>([^<]*)<\/title>/;
// "[^"]*":"https://manifest.googlevideo.com/[0-9a-zA-Z\-.\/_&%?=\\]*"
const getManifestUrlExp = /"([^"]*)":"(https:\/\/manifest.googlevideo.com\/[0-9a-zA-Z\-.\/_&%?=\\]*)/
const ytInitialPlayerResponse = /\>var ytInitialPlayerResponse = ([^<]*)/;
const ytInitialData = />var ytInitialData = ([^;]*)/;

export interface LiveChatMessage {
    Author: string,
    Timestamp: Date,
    TimestampUsec : string,
    ProfileAvatar: string,
    Content?: string,
    Emoji?: string
}

export function GetInnerTubeApiKey(content : string) {
    const apiKey = GetValue(content, "INNERTUBE_API_KEY");
    return apiKey;
}

export function MapYTLiveChatResponse(livechat : YTLiveChatResponse) {
    return livechat.continuationContents.liveChatContinuation.actions.map((action) => {
        if(action.addChatItemAction) {
            const message = action.addChatItemAction.item.liveChatTextMessageRenderer
            if(message) {
                let msg : LiveChatMessage = {
                    Author: message.authorName.simpleText,
                    ProfileAvatar: message.authorPhoto.thumbnails[0].url,
                    Timestamp: new Date(parseInt(message.timestampUsec, 10) / 1000),
                    TimestampUsec: message.timestampUsec,
                    Content: message.message.runs[0].text
                }
                return msg;
            }
        }
        return null
    }).filter(val => val !== undefined && val !== null) as LiveChatMessage[];
}

export async function GetLiveChat(apiKey : string, continuation : string) {
    const res = await axios.post(liveChatUrl+`?key=${apiKey}&prettyPrint=false`, {"context" : {"client": {"clientName": "WEB", "clientVersion": "2.20220623.00.00"}}, "continuation": continuation})
    if(res.status != 200) {
        return null;
    }
    return res.data as YTLiveChatResponse
}

export function GetPlayerResponse(content : string) {
    const match = content.match(ytInitialPlayerResponse);
    if(match && match.length >= 2) {
        const obj = match[1].slice(0, match[1].length-1);
        const ytInit = <YTInitial>JSON.parse(obj);
        return ytInit;
    }
    return null;
}

export function GetInitialData(content : string) {
    const match = content.match(ytInitialData);
    if(match && match.length >= 2) {
        const obj = <YTInitialData>JSON.parse(match[1]);
        return obj;
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

export function GetValue(content : string, key : string) {
    let values = GetValues(content, key);
    if(values.length) {
        return values[0];
    }
    return null;
}

export function GetValues(content : string, key : string) {
    let values = [];
    for (const match of content.matchAll(new RegExp(`"${key}":"([^"]*)"`, "g"))) {
        values.push(match[1]);
    }
    return values;
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

export function GetDefaultOptions() : YoutubeOptions {
    return {Resolution: GetDefaultResolution()};
}

export type YoutubeOptions = {
    Resolution : VideoResolution
}

// export enum VideoResolution {
//     "144P",
//     "360P",
//     "480P",
//     "720P",
//     "1080P",
//     "4K"
// }
export type VideoResolution = 144 | 360 | 720 | 1080;

export function GetDefaultResolution() : VideoResolution {
    return 1080
}

// export enum VideoFramerate {
//     "30FPS" = 0x010,
//     "60FPS" = 0x020,
// }