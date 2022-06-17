export function GetTrunHeader(buffer : Buffer) {
    const trunBuffer = GetAtom(GetAtom(GetAtom(buffer, "moof"), "traf"), "trun")
    let offset = 0;
    const trunBox : TrunBox = {
        Version: 0,
        Flags: 0,
        Samples: []
    }    
    trunBox.Version = trunBuffer.readInt8(offset++);
    trunBox.Flags = trunBuffer.readUint16BE(offset) << 8;
    offset += 2;
    trunBox.Flags += trunBuffer.readInt8(offset++);
    const sampleCount = trunBuffer.readInt32BE(offset);
    offset += 4;
    if(trunBox.Flags & 1) {
        offset += 4;
    }
    if(trunBox.Flags & 4) {
        offset += 4;
    }
    for(let i = 0; i < sampleCount; i++) {
        const sample : Sample = {Duration: 0, Flags: 0, Size: 0, TimeOffset: 0};
        if(trunBox.Flags & 0x0000100) {
            sample.Duration = trunBuffer.readInt32BE(offset);
            offset += 4;
        }
        if(trunBox.Flags & 0x0000200) {
            sample.Size = trunBuffer.readInt32BE(offset);
            offset += 4;
        }
        if(trunBox.Flags & 0x0000400) {
            sample.Flags = trunBuffer.readInt32BE(offset);
            offset += 4;
        }
        if(trunBox.Flags & 0x0000800) {
            sample.TimeOffset = trunBuffer.readInt32BE(offset);
            offset+= 4;
        }
        trunBox.Samples.push(sample);
    }
    return trunBox;

}

export interface TrunBox {
    Version : number,
    Flags : number,
    Samples : Sample[]
}

interface Sample {
    Duration : number,
    Size : number,
    Flags : number,
    TimeOffset : number
}

function GetAtom(buffer : Buffer, targetAtom : string) {
    let offset = 0;
    while(true) {
        const value = buffer.readInt16BE(offset)
        offset += 2;
        if(value != 0) {
            const string = ReadString(buffer.slice(offset))
            if(string == targetAtom) {
                return buffer.slice(offset + string.length, offset+value+1)
            }
            offset += (value - 2);
        }
        if(offset >= buffer.length) {
            return Buffer.alloc(0);
        }
    }    
}

function ReadString(buffer : Buffer) {
    let str = "";
    let offset = 0;
    while(true) {
        let char = buffer.readUInt8(offset)
        if(char == 0) {
            return str;
        }
        offset++;
        str += String.fromCharCode(char)
    }
}