import pako from 'pako';
import {Buffer} from 'buffer';

export default class Uncompressor{
    static uncompress(base64data: string ) {
        const zlibBinData =  Buffer.from(base64data, 'base64');
        const binData = new Uint8Array(zlibBinData);
        var data = pako.inflate(binData);
        return JSON.parse(String.fromCharCode.apply(null, Array.from(new Uint16Array(data))));
    }
}