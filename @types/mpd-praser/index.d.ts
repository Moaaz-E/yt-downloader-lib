declare module 'mpd-parser' {
    export function parse(xmlString : string, options : {} = {}) : Manifest | {};
    // type manifest = {
    //     allowCache: boolean,
    //     discontinuityStarts : [],
    //     segments: [],
    //     endList: boolean,
    //     mediaGroups : MediaGroup
    //     uri : string,
    //     duration : number,
    //     playlists : Playlist
    // }
    // type MediaGroup = {
    //     AUDIO : Audio,
    //     VIDEO : Video,
    //     'CLOSE-CAPTIONS' : CloseCaptions,
    //     SUBTITLES : Subtitles
    // }

    // type Audio = {

    // }

    // type Video = {

    // }

    // type Subtitles = {

    // }

    // type CloseCaptions = {

    // }

    // type Playlist = {

    // }


    // export interface Root {
    //     attributes: Attributes
    //     uri: string
    //     endList: boolean
    //     timeline: number
    //     resolvedUri: string
    //     targetDuration: number
    //     discontinuityStarts: any[]
    //     timelineStarts: TimelineStart[]
    //     segments: Segment[]
    //   }
      
    //   export interface Attributes {
    //     NAME: string
    //     AUDIO: string
    //     SUBTITLES: string
    //     RESOLUTION: Resolution
    //     CODECS: string
    //     BANDWIDTH: number
    //     "PROGRAM-ID": number
    //   }
      
    //   export interface Resolution {
    //     width: number
    //     height: number
    //   }
      
    //   export interface TimelineStart {
    //     start: number
    //     timeline: number
    //   }
      
    //   export interface Segment {
    //     uri: string
    //     timeline: number
    //     duration: number
    //     resolvedUri: string
    //     map: Map
    //     number: number
    //     presentationTime: number
    //   }
      
    //   export interface Map {
    //     uri: string
    //     resolvedUri: string
    //   }

    /* Auto generated with no video nor audio */
    // export interface Root {
    //     allowCache: boolean
    //     discontinuityStarts: any[]
    //     segments: any[]
    //     endList: boolean
    //     mediaGroups: MediaGroups
    //     uri: string
    //     duration: number
    //     playlists: Playlist[]
    // }

    // export interface MediaGroups {
    //     AUDIO: Audio
    //     VIDEO: Video
    //     "CLOSED-CAPTIONS": ClosedCaptions
    //     SUBTITLES: Subtitles
    // }

    // export interface Audio { }

    // export interface Video { }

    // export interface ClosedCaptions { }

    // export interface Subtitles { }

    // export interface Playlist {
    //     attributes: Attributes
    //     uri: string
    //     endList: boolean
    //     timeline: number
    //     resolvedUri: string
    //     targetDuration: number
    //     discontinuityStarts: any[]
    //     timelineStarts: TimelineStart[]
    //     segments: Segment[]
    // }

    // export interface Attributes {
    //     NAME: string
    //     AUDIO: string
    //     SUBTITLES: string
    //     RESOLUTION: Resolution
    //     CODECS: string
    //     BANDWIDTH: number
    //     "PROGRAM-ID": number
    // }

    // export interface Resolution {
    //     width: number
    //     height: number
    // }

    // export interface TimelineStart {
    //     start: number
    //     timeline: number
    // }

    // export interface Segment {
    //     uri: string
    //     timeline: number
    //     duration: number
    //     resolvedUri: string
    //     map: Map
    //     number: number
    //     presentationTime: number
    // }

    // export interface Map {
    //     uri: string
    //     resolvedUri: string
    // }
      
    export interface Manifest {
        allowCache: boolean
        discontinuityStarts: any[]
        segments: any[]
        endList: boolean
        mediaGroups: MediaGroups
        uri: string
        duration: number
        playlists: Playlist[]
        timelineStarts: TimelineStart[]
    }

    export interface MediaGroups {
        AUDIO: Audio
        VIDEO: Video
        "CLOSED-CAPTIONS": ClosedCaptions
        SUBTITLES: Subtitles
    }

    export interface Audio {
        [key : string] : AudioDict
    }

    export interface AudioDict {
        [key : string] : AudioDef
    }

    export interface AudioDef {
        language: string
        autoselect: boolean
        default: boolean
        playlists: Playlist[]
        uri: string
    }

    export interface Playlist {
        attributes: Attributes
        uri: string
        endList: boolean
        timeline: number
        resolvedUri: string
        targetDuration: number
        discontinuitySequence: number
        discontinuityStarts: any[]
        timelineStarts: TimelineStart[]
        mediaSequence: number
        segments: Segment[]
    }

    export interface Attributes {
        AUDIO : string | undefined
        BANDWIDTH : number | undefined,
        NAME: string
        BANDWIDTH: number
        CODECS: string
        "PROGRAM-ID": number
        RESOLUTION: Resolution | undefined
    }
    export interface Resolution {
        height : number,
        width : number
    }
    export interface TimelineStart {
        start: number
        timeline: number
    }

    export interface Segment {
        uri: string
        timeline: number
        duration: number
        resolvedUri: string
        map: Map
        number: number
        presentationTime: number
    }

    export interface Map {
        uri: string
        resolvedUri: string
    }

    export interface Video { }

    export interface ClosedCaptions { }

    export interface Subtitles { }

    export interface Resolution {
        width: number
        height: number
    }
      
}