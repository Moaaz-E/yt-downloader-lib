import { INetworkStream, StreamVideo } from "./Streams";
import fs from "fs";
import { Sleep } from "./utils";
import { YoutubeOptions } from "./youtube";
import path from "path";
import logger from "./Logger";

function IsReady(stream : INetworkStream, timeout : number = 60000) : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        let timedOut = false;
        const rejectTimeout = setTimeout(() => {timedOut = true; reject("Timeout")}, timeout);
        while(!timedOut) {
            if(stream.Started) {
                clearTimeout(rejectTimeout);
                resolve(true);
                return;
            }
            else if(stream.Error) {
                clearTimeout(rejectTimeout);
                reject("Stream couldn't start");
                return;
            }
            await Sleep(200);
        }
    })
}

export async function DownloadStream(streamUrl : string, savePath: string = "./streams",  options? : YoutubeOptions) : Promise<YTStream | undefined> {
    const stream = StreamVideo(streamUrl, options);
    if(!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
    try
    {
        await IsReady(stream);
        const videoDir = path.join(savePath, stream.VideoId)
        const liveChatDir = path.join(videoDir, "livechat");
        if(!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir);
        }

        if(!fs.existsSync(liveChatDir)) {
            fs.mkdirSync(liveChatDir);
        }
        const videoPath = path.join(videoDir, "vid.mp4");
        const outputStream = fs.createWriteStream(videoPath, {flags: 'a'})
        stream.on("data", data => {
            outputStream.write(data);
        })
        stream.on("error", (err) => {
            logger.error(`Steam error: ${err}`);
            outputStream.end();
        })
        stream.AddChatListener((messages) => {
            const firstMessage = messages[0]
            fs.writeFile(path.join(liveChatDir, firstMessage.TimestampUsec+".json"), JSON.stringify(messages), (err) => {
                if(err != null) {
                    logger.error(err)
                }    
            });
            
        })
        return stream;
    }
    catch(err : any) {
        logger.error(`Couldn't download video ${streamUrl}.\nError: [${err}]`);
    }
}