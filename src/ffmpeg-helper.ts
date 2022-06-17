import ffmpeg from 'fluent-ffmpeg'
import { Duplex, Readable, Writable } from 'stream'
import fs from 'fs'
import logger from './Logger';

export class ByteStream extends Duplex {
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => void): void {
        this.push(chunk)
    }

    _read(size: number): void {

    }
}
export function CreateMuxStream(firstStream : Readable, secondStream : Readable) {
    const stream = new ByteStream();
    ffmpeg(firstStream).input(secondStream).format("mp4").output(stream)
    return stream;
}

export function Mux(stream : Readable, file : string, outputStream : Writable) {
    const command = ffmpeg(stream).input(file).format("mp4").output(outputStream);
    command.on("progress", (progress) => {
        logger.log(progress);
    })
    command.on("end", (err, _stdout, _stderr) => {
        logger.error(`${err}\n${_stdout}\n${_stderr}`);
    })
    command.run();
}