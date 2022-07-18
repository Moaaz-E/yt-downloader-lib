import ffmpeg from 'fluent-ffmpeg'
import { Writable } from 'stream'
import logger from './Logger';

type KillCommand = () => void;

/**
 * 
 */
export function CreateHlsDownloadStream(hlsManifestUrl : string, outStream : Writable) {
    const command = ffmpeg(hlsManifestUrl).outputFormat("mp4").output(outStream).outputOptions('-movflags', 'empty_moov');
    AddLogging(command);
    outStream.on("error", (err) => {
        command.kill("");
    })
    command.run();
    return (() => {command.kill("")}) as KillCommand;
}

/**
 * Add logging to an ffmpeg command
 */
function AddLogging(command : ffmpeg.FfmpegCommand) {
    command.on("end", (err, _stdout, _stderr) => {
        logger.error(`${err}\n${_stdout}\n${_stderr}`);
    })
}