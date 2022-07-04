import { DownloadStream } from "./StreamUtilites";

const url = "https://www.youtube.com/watch?v=_LmLS5l_jL4";
const url2 = "https://www.youtube.com/watch?v=5qap5aO4i9A";
const stream = DownloadStream(url2, undefined, {Resolution: 144});

(async function() {await new Promise(r => setTimeout(r, 2000));})()