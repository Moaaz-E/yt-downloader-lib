import ffmpeg from 'fluent-ffmpeg'
import { Duplex, Readable, Writable } from 'stream'
import fs from 'fs'
import logger from './Logger';
import exp from 'constants';

export class ByteStream extends Duplex {
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        this.push(chunk)
        callback();
    }

    _read(size: number): void { }
}

export function CreateCodecStream(inStream : Readable, outStream : Writable) {
    const command = ffmpeg(inStream).format("mp4").output(outStream).outputOptions('-movflags', 'empty_moov');
    AddLogging(command);
    command.run();
}

export function CreateMuxStream(firstStream : Readable, secondStream : Readable) {
    const stream = new ByteStream();
    ffmpeg(firstStream).input(secondStream).toFormat("mp4").output(stream)
    return stream;
}

export function Mux(stream : Readable, file : string, outputStream : Writable) {
    const command = ffmpeg(stream).input(file).format("mp4").output(outputStream);
    AddLogging(command)
    command.run();
}

function AddLogging(command : ffmpeg.FfmpegCommand) {
    command.on("end", (err, _stdout, _stderr) => {
        logger.error(`${err}\n${_stdout}\n${_stderr}`);
    })
}