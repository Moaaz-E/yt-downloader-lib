import DashStream from "./dash";

// var dashStream = new DashStream("https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd");
var dashStream = new DashStream("https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd");
// var dashStream = new DashStream("https://manifest.googlevideo.com/api/manifest/dash/expire/1655008327/ei/5xelYr23DoGL6dsPvJKHuAU/ip/176.88.44.163/id/5qap5aO4i9A.2/source/yt_live_broadcast/requiressl/yes/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/spc/4ocVCxAVXOldBuErJnss-ZKtejeHYa8/vprv/1/pacing/0/keepalive/yes/fexp/24001373%2C24007246/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Cas%2Cspc%2Cvprv%2Citag%2Cplaylist_type/sig/AOq0QJ8wRAIgI4GP0_q5qk7a1X7jyrhsDAoKWYijEFfOo4nNrwFiXIkCICm_JxZ5vsGvJfG6aS-_5i3vrJQsKmyUKaxJ2aGtEv2e");
async function Test() {
    const res = await dashStream.Done()
}
Test();