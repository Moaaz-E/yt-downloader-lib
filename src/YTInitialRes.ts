export interface YTInitialRes {
    responseContext: ResponseContext
    playabilityStatus: PlayabilityStatus
    streamingData: StreamingData
    heartbeatParams: HeartbeatParams
    playerAds: PlayerAd[]
    playbackTracking: PlaybackTracking
    videoDetails: VideoDetails
    annotations: Annotation[]
    playerConfig: PlayerConfig
    storyboards: Storyboards
    microformat: Microformat
    cards: Cards
    trackingParams: string
    attestation: Attestation
    messages: Message2[]
    adPlacements: AdPlacement[]
    frameworkUpdates: FrameworkUpdates
}

export interface ResponseContext {
    serviceTrackingParams: ServiceTrackingParam[]
    mainAppWebResponseContext: MainAppWebResponseContext
    webResponseContextExtensionData: WebResponseContextExtensionData
}

export interface ServiceTrackingParam {
    service: string
    params: Param[]
}

export interface Param {
    key: string
    value: string
}

export interface MainAppWebResponseContext {
    loggedOut: boolean
}

export interface WebResponseContextExtensionData {
    hasDecorated: boolean
}

export interface PlayabilityStatus {
    status: string
    playableInEmbed: boolean
    liveStreamability: LiveStreamability
    miniplayer: Miniplayer
    contextParams: string
}

export interface LiveStreamability {
    liveStreamabilityRenderer: LiveStreamabilityRenderer
}

export interface LiveStreamabilityRenderer {
    videoId: string
    broadcastId: string
    pollDelayMs: string
}

export interface Miniplayer {
    miniplayerRenderer: MiniplayerRenderer
}

export interface MiniplayerRenderer {
    playbackMode: string
}

export interface StreamingData {
    expiresInSeconds: string
    adaptiveFormats: AdaptiveFormat[]
    dashManifestUrl: string
    hlsManifestUrl: string
}

export interface AdaptiveFormat {
    itag: number
    url: string
    mimeType: string
    bitrate: number
    width?: number
    height?: number
    lastModified: string
    quality: string
    fps?: number
    qualityLabel?: string
    projectionType: string
    targetDurationSec: number
    maxDvrDurationSec: number
    highReplication?: boolean
    audioQuality?: string
    audioSampleRate?: string
    audioChannels?: number
}

export interface HeartbeatParams {
    intervalMilliseconds: string
    softFailOnError: boolean
    heartbeatServerData: string
}

export interface PlayerAd {
    playerLegacyDesktopWatchAdsRenderer: PlayerLegacyDesktopWatchAdsRenderer
}

export interface PlayerLegacyDesktopWatchAdsRenderer {
    playerAdParams: PlayerAdParams
    gutParams: GutParams
    showCompanion: boolean
    showInstream: boolean
    useGut: boolean
}

export interface PlayerAdParams {
    showContentThumbnail: boolean
    enabledEngageTypes: string
}

export interface GutParams {
    tag: string
}

export interface PlaybackTracking {
    videostatsPlaybackUrl: VideostatsPlaybackUrl
    videostatsDelayplayUrl: VideostatsDelayplayUrl
    videostatsWatchtimeUrl: VideostatsWatchtimeUrl
    ptrackingUrl: PtrackingUrl
    qoeUrl: QoeUrl
    atrUrl: AtrUrl
    videostatsScheduledFlushWalltimeSeconds: number[]
    videostatsDefaultFlushIntervalSeconds: number
    youtubeRemarketingUrl: YoutubeRemarketingUrl
    googleRemarketingUrl: GoogleRemarketingUrl
}

export interface VideostatsPlaybackUrl {
    baseUrl: string
}

export interface VideostatsDelayplayUrl {
    baseUrl: string
    elapsedMediaTimeSeconds: number
}

export interface VideostatsWatchtimeUrl {
    baseUrl: string
}

export interface PtrackingUrl {
    baseUrl: string
}

export interface QoeUrl {
    baseUrl: string
}

export interface AtrUrl {
    baseUrl: string
    elapsedMediaTimeSeconds: number
}

export interface YoutubeRemarketingUrl {
    baseUrl: string
    elapsedMediaTimeSeconds: number
}

export interface GoogleRemarketingUrl {
    baseUrl: string
    elapsedMediaTimeSeconds: number
}

export interface VideoDetails {
    videoId: string
    title: string
    lengthSeconds: string
    isLive: boolean
    keywords: string[]
    channelId: string
    isOwnerViewing: boolean
    shortDescription: string
    isCrawlable: boolean
    isLiveDvrEnabled: boolean
    thumbnail: Thumbnail
    liveChunkReadahead: number
    allowRatings: boolean
    viewCount: string
    author: string
    isLowLatencyLiveStream: boolean
    isPrivate: boolean
    isUnpluggedCorpus: boolean
    latencyClass: string
    isLiveContent: boolean
}

export interface Thumbnail {
    thumbnails: Thumbnail2[]
}

export interface Thumbnail2 {
    url: string
    width: number
    height: number
}

export interface Annotation {
    playerAnnotationsExpandedRenderer: PlayerAnnotationsExpandedRenderer
}

export interface PlayerAnnotationsExpandedRenderer {
    featuredChannel: FeaturedChannel
    allowSwipeDismiss: boolean
    annotationId: string
}

export interface FeaturedChannel {
    startTimeMs: string
    endTimeMs: string
    watermark: Watermark
    trackingParams: string
    navigationEndpoint: NavigationEndpoint
    channelName: string
    subscribeButton: SubscribeButton
}

export interface Watermark {
    thumbnails: Thumbnail3[]
}

export interface Thumbnail3 {
    url: string
    width: number
    height: number
}

export interface NavigationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata
    browseEndpoint: BrowseEndpoint
}

export interface CommandMetadata {
    webCommandMetadata: WebCommandMetadata
}

export interface WebCommandMetadata {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
}

export interface BrowseEndpoint {
    browseId: string
}

export interface SubscribeButton {
    subscribeButtonRenderer: SubscribeButtonRenderer
}

export interface SubscribeButtonRenderer {
    buttonText: ButtonText
    subscribed: boolean
    enabled: boolean
    type: string
    channelId: string
    showPreferences: boolean
    subscribedButtonText: SubscribedButtonText
    unsubscribedButtonText: UnsubscribedButtonText
    trackingParams: string
    unsubscribeButtonText: UnsubscribeButtonText
    serviceEndpoints: ServiceEndpoint[]
    subscribeAccessibility: SubscribeAccessibility
    unsubscribeAccessibility: UnsubscribeAccessibility
    signInEndpoint: SignInEndpoint
}

export interface ButtonText {
    runs: Run[]
}

export interface Run {
    text: string
}

export interface SubscribedButtonText {
    runs: Run2[]
}

export interface Run2 {
    text: string
}

export interface UnsubscribedButtonText {
    runs: Run3[]
}

export interface Run3 {
    text: string
}

export interface UnsubscribeButtonText {
    runs: Run4[]
}

export interface Run4 {
    text: string
}

export interface ServiceEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata2
    subscribeEndpoint?: SubscribeEndpoint
    signalServiceEndpoint?: SignalServiceEndpoint
}

export interface CommandMetadata2 {
    webCommandMetadata: WebCommandMetadata2
}

export interface WebCommandMetadata2 {
    sendPost: boolean
    apiUrl?: string
}

export interface SubscribeEndpoint {
    channelIds: string[]
    params: string
}

export interface SignalServiceEndpoint {
    signal: string
    actions: Action[]
}

export interface Action {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction
}

export interface OpenPopupAction {
    popup: Popup
    popupType: string
}

export interface Popup {
    confirmDialogRenderer: ConfirmDialogRenderer
}

export interface ConfirmDialogRenderer {
    trackingParams: string
    dialogMessages: DialogMessage[]
    confirmButton: ConfirmButton
    cancelButton: CancelButton
    primaryIsCancel: boolean
}

export interface DialogMessage {
    runs: Run5[]
}

export interface Run5 {
    text: string
}

export interface ConfirmButton {
    buttonRenderer: ButtonRenderer
}

export interface ButtonRenderer {
    style: string
    size: string
    isDisabled: boolean
    text: Text
    serviceEndpoint: ServiceEndpoint2
    accessibility: Accessibility
    trackingParams: string
}

export interface Text {
    runs: Run6[]
}

export interface Run6 {
    text: string
}

export interface ServiceEndpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata3
    unsubscribeEndpoint: UnsubscribeEndpoint
}

export interface CommandMetadata3 {
    webCommandMetadata: WebCommandMetadata3
}

export interface WebCommandMetadata3 {
    sendPost: boolean
    apiUrl: string
}

export interface UnsubscribeEndpoint {
    channelIds: string[]
    params: string
}

export interface Accessibility {
    label: string
}

export interface CancelButton {
    buttonRenderer: ButtonRenderer2
}

export interface ButtonRenderer2 {
    style: string
    size: string
    isDisabled: boolean
    text: Text2
    accessibility: Accessibility2
    trackingParams: string
}

export interface Text2 {
    runs: Run7[]
}

export interface Run7 {
    text: string
}

export interface Accessibility2 {
    label: string
}

export interface SubscribeAccessibility {
    accessibilityData: AccessibilityData
}

export interface AccessibilityData {
    label: string
}

export interface UnsubscribeAccessibility {
    accessibilityData: AccessibilityData2
}

export interface AccessibilityData2 {
    label: string
}

export interface SignInEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata4
}

export interface CommandMetadata4 {
    webCommandMetadata: WebCommandMetadata4
}

export interface WebCommandMetadata4 {
    url: string
}

export interface PlayerConfig {
    audioConfig: AudioConfig
    streamSelectionConfig: StreamSelectionConfig
    livePlayerConfig: LivePlayerConfig
    mediaCommonConfig: MediaCommonConfig
    webPlayerConfig: WebPlayerConfig
}

export interface AudioConfig {
    enablePerFormatLoudness: boolean
}

export interface StreamSelectionConfig {
    maxBitrate: string
}

export interface LivePlayerConfig {
    liveReadaheadSeconds: number
    hasSubfragmentedWebm: boolean
}

export interface MediaCommonConfig {
    dynamicReadaheadConfig: DynamicReadaheadConfig
}

export interface DynamicReadaheadConfig {
    maxReadAheadMediaTimeMs: number
    minReadAheadMediaTimeMs: number
    readAheadGrowthRateMs: number
}

export interface WebPlayerConfig {
    webPlayerActionsPorting: WebPlayerActionsPorting
}

export interface WebPlayerActionsPorting {
    getSharePanelCommand: GetSharePanelCommand
    subscribeCommand: SubscribeCommand
    unsubscribeCommand: UnsubscribeCommand
    addToWatchLaterCommand: AddToWatchLaterCommand
    removeFromWatchLaterCommand: RemoveFromWatchLaterCommand
}

export interface GetSharePanelCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata5
    webPlayerShareEntityServiceEndpoint: WebPlayerShareEntityServiceEndpoint
}

export interface CommandMetadata5 {
    webCommandMetadata: WebCommandMetadata5
}

export interface WebCommandMetadata5 {
    sendPost: boolean
    apiUrl: string
}

export interface WebPlayerShareEntityServiceEndpoint {
    serializedShareEntity: string
}

export interface SubscribeCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata6
    subscribeEndpoint: SubscribeEndpoint2
}

export interface CommandMetadata6 {
    webCommandMetadata: WebCommandMetadata6
}

export interface WebCommandMetadata6 {
    sendPost: boolean
    apiUrl: string
}

export interface SubscribeEndpoint2 {
    channelIds: string[]
    params: string
}

export interface UnsubscribeCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata7
    unsubscribeEndpoint: UnsubscribeEndpoint2
}

export interface CommandMetadata7 {
    webCommandMetadata: WebCommandMetadata7
}

export interface WebCommandMetadata7 {
    sendPost: boolean
    apiUrl: string
}

export interface UnsubscribeEndpoint2 {
    channelIds: string[]
    params: string
}

export interface AddToWatchLaterCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata8
    playlistEditEndpoint: PlaylistEditEndpoint
}

export interface CommandMetadata8 {
    webCommandMetadata: WebCommandMetadata8
}

export interface WebCommandMetadata8 {
    sendPost: boolean
    apiUrl: string
}

export interface PlaylistEditEndpoint {
    playlistId: string
    actions: Action2[]
}

export interface Action2 {
    addedVideoId: string
    action: string
}

export interface RemoveFromWatchLaterCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata9
    playlistEditEndpoint: PlaylistEditEndpoint2
}

export interface CommandMetadata9 {
    webCommandMetadata: WebCommandMetadata9
}

export interface WebCommandMetadata9 {
    sendPost: boolean
    apiUrl: string
}

export interface PlaylistEditEndpoint2 {
    playlistId: string
    actions: Action3[]
}

export interface Action3 {
    action: string
    removedVideoId: string
}

export interface Storyboards {
    playerLiveStoryboardSpecRenderer: PlayerLiveStoryboardSpecRenderer
}

export interface PlayerLiveStoryboardSpecRenderer {
    spec: string
}

export interface Microformat {
    playerMicroformatRenderer: PlayerMicroformatRenderer
}

export interface PlayerMicroformatRenderer {
    thumbnail: Thumbnail4
    embed: Embed
    title: Title
    description: Description
    lengthSeconds: string
    ownerProfileUrl: string
    externalChannelId: string
    isFamilySafe: boolean
    availableCountries: string[]
    isUnlisted: boolean
    hasYpcMetadata: boolean
    viewCount: string
    category: string
    publishDate: string
    ownerChannelName: string
    liveBroadcastDetails: LiveBroadcastDetails
    uploadDate: string
}

export interface Thumbnail4 {
    thumbnails: Thumbnail5[]
}

export interface Thumbnail5 {
    url: string
    width: number
    height: number
}

export interface Embed {
    iframeUrl: string
    flashUrl: string
    width: number
    height: number
    flashSecureUrl: string
}

export interface Title {
    simpleText: string
}

export interface Description {
    simpleText: string
}

export interface LiveBroadcastDetails {
    isLiveNow: boolean
    startTimestamp: string
}

export interface Cards {
    cardCollectionRenderer: CardCollectionRenderer
}

export interface CardCollectionRenderer {
    cards: Card[]
    headerText: HeaderText
    icon: Icon2
    closeButton: CloseButton
    trackingParams: string
    allowTeaserDismiss: boolean
    logIconVisibilityUpdates: boolean
}

export interface Card {
    cardRenderer: CardRenderer
}

export interface CardRenderer {
    teaser: Teaser
    content: Content
    cueRanges: CueRange[]
    icon: Icon
    trackingParams: string
    cardId: string
    feature: string
}

export interface Teaser {
    simpleCardTeaserRenderer: SimpleCardTeaserRenderer
}

export interface SimpleCardTeaserRenderer {
    message: Message
    trackingParams: string
    prominent: boolean
    logVisibilityUpdates: boolean
}

export interface Message {
    simpleText: string
}

export interface Content {
    videoInfoCardContentRenderer: VideoInfoCardContentRenderer
}

export interface VideoInfoCardContentRenderer {
    videoThumbnail: VideoThumbnail
    badge: Badge
    videoTitle: VideoTitle
    channelName: ChannelName
    viewCountText: ViewCountText
    action: Action4
    trackingParams: string
    customMessage: CustomMessage
}

export interface VideoThumbnail {
    thumbnails: Thumbnail6[]
}

export interface Thumbnail6 {
    url: string
    width: number
    height: number
}

export interface Badge {
    liveBadgeRenderer: LiveBadgeRenderer
}

export interface LiveBadgeRenderer {
    label: Label
}

export interface Label {
    simpleText: string
}

export interface VideoTitle {
    simpleText: string
}

export interface ChannelName {
    simpleText: string
}

export interface ViewCountText {
    simpleText: string
}

export interface Action4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata10
    watchEndpoint: WatchEndpoint
}

export interface CommandMetadata10 {
    webCommandMetadata: WebCommandMetadata10
}

export interface WebCommandMetadata10 {
    url: string
    webPageType: string
    rootVe: number
}

export interface WatchEndpoint {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig
}

export interface WatchEndpointSupportedOnesieConfig {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig
}

export interface Html5PlaybackOnesieConfig {
    commonConfig: CommonConfig
}

export interface CommonConfig {
    url: string
}

export interface CustomMessage {
    simpleText: string
}

export interface CueRange {
    startCardActiveMs: string
    endCardActiveMs: string
    teaserDurationMs: string
    iconAfterTeaserMs: string
}

export interface Icon {
    infoCardIconRenderer: InfoCardIconRenderer
}

export interface InfoCardIconRenderer {
    trackingParams: string
}

export interface HeaderText {
    simpleText: string
}

export interface Icon2 {
    infoCardIconRenderer: InfoCardIconRenderer2
}

export interface InfoCardIconRenderer2 {
    trackingParams: string
}

export interface CloseButton {
    infoCardIconRenderer: InfoCardIconRenderer3
}

export interface InfoCardIconRenderer3 {
    trackingParams: string
}

export interface Attestation {
    playerAttestationRenderer: PlayerAttestationRenderer
}

export interface PlayerAttestationRenderer {
    challenge: string
    botguardData: BotguardData
}

export interface BotguardData {
    program: string
    interpreterSafeUrl: InterpreterSafeUrl
    serverEnvironment: number
}

export interface InterpreterSafeUrl {
    privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string
}

export interface Message2 {
    mealbarPromoRenderer: MealbarPromoRenderer
}

export interface MealbarPromoRenderer {
    icon: Icon3
    messageTexts: MessageText[]
    actionButton: ActionButton
    dismissButton: DismissButton
    triggerCondition: string
    style: string
    trackingParams: string
    impressionEndpoints: ImpressionEndpoint[]
    isVisible: boolean
    messageTitle: MessageTitle
}

export interface Icon3 {
    thumbnails: Thumbnail7[]
}

export interface Thumbnail7 {
    url: string
    width: number
    height: number
}

export interface MessageText {
    runs: Run8[]
}

export interface Run8 {
    text: string
}

export interface ActionButton {
    buttonRenderer: ButtonRenderer3
}

export interface ButtonRenderer3 {
    style: string
    size: string
    text: Text3
    trackingParams: string
    command: Command
}

export interface Text3 {
    runs: Run9[]
}

export interface Run9 {
    text: string
}

export interface Command {
    clickTrackingParams: string
    commandExecutorCommand: CommandExecutorCommand
}

export interface CommandExecutorCommand {
    commands: Command2[]
}

export interface Command2 {
    clickTrackingParams?: string
    commandMetadata: CommandMetadata11
    browseEndpoint?: BrowseEndpoint2
    feedbackEndpoint?: FeedbackEndpoint
}

export interface CommandMetadata11 {
    webCommandMetadata: WebCommandMetadata11
}

export interface WebCommandMetadata11 {
    url?: string
    webPageType?: string
    rootVe?: number
    apiUrl: string
    sendPost?: boolean
}

export interface BrowseEndpoint2 {
    browseId: string
    params: string
}

export interface FeedbackEndpoint {
    feedbackToken: string
    uiActions: UiActions
}

export interface UiActions {
    hideEnclosingContainer: boolean
}

export interface DismissButton {
    buttonRenderer: ButtonRenderer4
}

export interface ButtonRenderer4 {
    style: string
    size: string
    text: Text4
    trackingParams: string
    command: Command3
}

export interface Text4 {
    runs: Run10[]
}

export interface Run10 {
    text: string
}

export interface Command3 {
    clickTrackingParams: string
    commandExecutorCommand: CommandExecutorCommand2
}

export interface CommandExecutorCommand2 {
    commands: Command4[]
}

export interface Command4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata12
    feedbackEndpoint: FeedbackEndpoint2
}

export interface CommandMetadata12 {
    webCommandMetadata: WebCommandMetadata12
}

export interface WebCommandMetadata12 {
    sendPost: boolean
    apiUrl: string
}

export interface FeedbackEndpoint2 {
    feedbackToken: string
    uiActions: UiActions2
}

export interface UiActions2 {
    hideEnclosingContainer: boolean
}

export interface ImpressionEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata13
    feedbackEndpoint: FeedbackEndpoint3
}

export interface CommandMetadata13 {
    webCommandMetadata: WebCommandMetadata13
}

export interface WebCommandMetadata13 {
    sendPost: boolean
    apiUrl: string
}

export interface FeedbackEndpoint3 {
    feedbackToken: string
    uiActions: UiActions3
}

export interface UiActions3 {
    hideEnclosingContainer: boolean
}

export interface MessageTitle {
    runs: Run11[]
}

export interface Run11 {
    text: string
}

export interface AdPlacement {
    adPlacementRenderer: AdPlacementRenderer
}

export interface AdPlacementRenderer {
    config: Config
    renderer: Renderer
}

export interface Config {
    adPlacementConfig: AdPlacementConfig
}

export interface AdPlacementConfig {
    kind: string
    hideCueRangeMarker: boolean
}

export interface Renderer {
    adBreakServiceRenderer: AdBreakServiceRenderer
}

export interface AdBreakServiceRenderer {
    getAdBreakUrl: string
}

export interface FrameworkUpdates {
    entityBatchUpdate: EntityBatchUpdate
}

export interface EntityBatchUpdate {
    mutations: Mutation[]
    timestamp: Timestamp
}

export interface Mutation {
    entityKey: string
    type: string
    payload: Payload
}

export interface Payload {
    offlineabilityEntity: OfflineabilityEntity
}

export interface OfflineabilityEntity {
    key: string
    addToOfflineButtonState: string
}

export interface Timestamp {
    seconds: string
    nanos: number
}
