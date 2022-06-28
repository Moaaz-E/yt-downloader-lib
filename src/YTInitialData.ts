export interface YTInitialData {
    responseContext: ResponseContext
    contents: Contents
    currentVideoEndpoint: CurrentVideoEndpoint
    trackingParams: string
    playerOverlays: PlayerOverlays
    overlay: Overlay
    onResponseReceivedEndpoints: OnResponseReceivedEndpoint[]
    engagementPanels: EngagementPanel[]
    topbar: Topbar
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
    ytConfigData: YtConfigData
    webPrefetchData: WebPrefetchData
    hasDecorated: boolean
  }
  
  export interface YtConfigData {
    visitorData: string
    rootVisualElementType: number
  }
  
  export interface WebPrefetchData {
    navigationEndpoints: NavigationEndpoint[]
  }
  
  export interface NavigationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata
    watchEndpoint: WatchEndpoint
  }
  
  export interface CommandMetadata {
    webCommandMetadata: WebCommandMetadata
  }
  
  export interface WebCommandMetadata {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint {
    videoId: string
    params: string
    playerParams: string
    watchEndpointSupportedPrefetchConfig: WatchEndpointSupportedPrefetchConfig
  }
  
  export interface WatchEndpointSupportedPrefetchConfig {
    prefetchHintConfig: PrefetchHintConfig
  }
  
  export interface PrefetchHintConfig {
    prefetchPriority: number
    countdownUiRelativeSecondsPrefetchCondition: number
  }
  
  export interface Contents {
    twoColumnWatchNextResults: TwoColumnWatchNextResults
  }
  
  export interface TwoColumnWatchNextResults {
    results: Results
    secondaryResults: SecondaryResults
    autoplay: Autoplay
    conversationBar: ConversationBar
  }
  
  export interface Results {
    results: Results2
  }
  
  export interface Results2 {
    contents: Content[]
    trackingParams: string
  }
  
  export interface Content {
    videoPrimaryInfoRenderer?: VideoPrimaryInfoRenderer
    videoSecondaryInfoRenderer?: VideoSecondaryInfoRenderer
  }
  
  export interface VideoPrimaryInfoRenderer {
    title: Title
    viewCount: ViewCount
    videoActions: VideoActions
    trackingParams: string
    updatedMetadataEndpoint: UpdatedMetadataEndpoint
    dateText: DateText
  }
  
  export interface Title {
    runs: Run[]
  }
  
  export interface Run {
    text: string
  }
  
  export interface ViewCount {
    videoViewCountRenderer: VideoViewCountRenderer
  }
  
  export interface VideoViewCountRenderer {
    viewCount: ViewCount2
    isLive: boolean
  }
  
  export interface ViewCount2 {
    runs: Run2[]
  }
  
  export interface Run2 {
    text: string
  }
  
  export interface VideoActions {
    menuRenderer: MenuRenderer
  }
  
  export interface MenuRenderer {
    trackingParams: string
    topLevelButtons: TopLevelButton[]
  }
  
  export interface TopLevelButton {
    toggleButtonRenderer?: ToggleButtonRenderer
    buttonRenderer?: ButtonRenderer2
  }
  
  export interface ToggleButtonRenderer {
    style: Style
    isToggled: boolean
    isDisabled: boolean
    defaultIcon: DefaultIcon
    defaultText: DefaultText
    toggledText: ToggledText
    accessibility: Accessibility3
    trackingParams: string
    defaultTooltip: string
    toggledTooltip: string
    toggledStyle: ToggledStyle
    defaultNavigationEndpoint: DefaultNavigationEndpoint
    accessibilityData: AccessibilityData3
    toggleButtonSupportedData: ToggleButtonSupportedData
    targetId: string
  }
  
  export interface Style {
    styleType: string
  }
  
  export interface DefaultIcon {
    iconType: string
  }
  
  export interface DefaultText {
    accessibility?: Accessibility
    simpleText: string
  }
  
  export interface Accessibility {
    accessibilityData: AccessibilityData
  }
  
  export interface AccessibilityData {
    label: string
  }
  
  export interface ToggledText {
    accessibility?: Accessibility2
    simpleText: string
  }
  
  export interface Accessibility2 {
    accessibilityData: AccessibilityData2
  }
  
  export interface AccessibilityData2 {
    label: string
  }
  
  export interface Accessibility3 {
    label: string
  }
  
  export interface ToggledStyle {
    styleType: string
  }
  
  export interface DefaultNavigationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata2
    modalEndpoint: ModalEndpoint
  }
  
  export interface CommandMetadata2 {
    webCommandMetadata: WebCommandMetadata2
  }
  
  export interface WebCommandMetadata2 {
    ignoreNavigation: boolean
  }
  
  export interface ModalEndpoint {
    modal: Modal
  }
  
  export interface Modal {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer
  }
  
  export interface ModalWithTitleAndButtonRenderer {
    title: Title2
    content: Content2
    button: Button
  }
  
  export interface Title2 {
    simpleText: string
  }
  
  export interface Content2 {
    simpleText: string
  }
  
  export interface Button {
    buttonRenderer: ButtonRenderer
  }
  
  export interface ButtonRenderer {
    style: string
    size: string
    isDisabled: boolean
    text: Text
    navigationEndpoint: NavigationEndpoint2
    trackingParams: string
  }
  
  export interface Text {
    simpleText: string
  }
  
  export interface NavigationEndpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata3
    signInEndpoint: SignInEndpoint
  }
  
  export interface CommandMetadata3 {
    webCommandMetadata: WebCommandMetadata3
  }
  
  export interface WebCommandMetadata3 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint {
    nextEndpoint: NextEndpoint
    idamTag: string
  }
  
  export interface NextEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata4
    watchEndpoint: WatchEndpoint2
  }
  
  export interface CommandMetadata4 {
    webCommandMetadata: WebCommandMetadata4
  }
  
  export interface WebCommandMetadata4 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint2 {
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
  
  export interface AccessibilityData3 {
    accessibilityData: AccessibilityData4
  }
  
  export interface AccessibilityData4 {
    label: string
  }
  
  export interface ToggleButtonSupportedData {
    toggleButtonIdData: ToggleButtonIdData
  }
  
  export interface ToggleButtonIdData {
    id: string
  }
  
  export interface ButtonRenderer2 {
    style: string
    size: string
    isDisabled: boolean
    icon: Icon
    navigationEndpoint?: NavigationEndpoint3
    tooltip: string
    trackingParams: string
    accessibilityData: AccessibilityData5
    text?: Text3
    accessibility?: Accessibility4
    command?: Command
    serviceEndpoint?: ServiceEndpoint
  }
  
  export interface Icon {
    iconType: string
  }
  
  export interface NavigationEndpoint3 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata5
    modalEndpoint: ModalEndpoint2
  }
  
  export interface CommandMetadata5 {
    webCommandMetadata: WebCommandMetadata5
  }
  
  export interface WebCommandMetadata5 {
    ignoreNavigation: boolean
  }
  
  export interface ModalEndpoint2 {
    modal: Modal2
  }
  
  export interface Modal2 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer2
  }
  
  export interface ModalWithTitleAndButtonRenderer2 {
    title: Title3
    content: Content3
    button: Button2
  }
  
  export interface Title3 {
    runs: Run3[]
  }
  
  export interface Run3 {
    text: string
  }
  
  export interface Content3 {
    runs: Run4[]
  }
  
  export interface Run4 {
    text: string
  }
  
  export interface Button2 {
    buttonRenderer: ButtonRenderer3
  }
  
  export interface ButtonRenderer3 {
    style: string
    size: string
    isDisabled: boolean
    text: Text2
    navigationEndpoint: NavigationEndpoint4
    trackingParams: string
  }
  
  export interface Text2 {
    simpleText: string
  }
  
  export interface NavigationEndpoint4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata6
    signInEndpoint: SignInEndpoint2
  }
  
  export interface CommandMetadata6 {
    webCommandMetadata: WebCommandMetadata6
  }
  
  export interface WebCommandMetadata6 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint2 {
    hack: boolean
  }
  
  export interface AccessibilityData5 {
    accessibilityData: AccessibilityData6
  }
  
  export interface AccessibilityData6 {
    label: string
  }
  
  export interface Text3 {
    runs: Run5[]
  }
  
  export interface Run5 {
    text: string
  }
  
  export interface Accessibility4 {
    label: string
  }
  
  export interface Command {
    clickTrackingParams: string
    commandMetadata: CommandMetadata7
    modalEndpoint: ModalEndpoint3
  }
  
  export interface CommandMetadata7 {
    webCommandMetadata: WebCommandMetadata7
  }
  
  export interface WebCommandMetadata7 {
    ignoreNavigation: boolean
  }
  
  export interface ModalEndpoint3 {
    modal: Modal3
  }
  
  export interface Modal3 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer3
  }
  
  export interface ModalWithTitleAndButtonRenderer3 {
    title: Title4
    content: Content4
    button: Button3
  }
  
  export interface Title4 {
    runs: Run6[]
  }
  
  export interface Run6 {
    text: string
  }
  
  export interface Content4 {
    runs: Run7[]
  }
  
  export interface Run7 {
    text: string
  }
  
  export interface Button3 {
    buttonRenderer: ButtonRenderer4
  }
  
  export interface ButtonRenderer4 {
    style: string
    size: string
    isDisabled: boolean
    text: Text4
    navigationEndpoint: NavigationEndpoint5
    trackingParams: string
  }
  
  export interface Text4 {
    simpleText: string
  }
  
  export interface NavigationEndpoint5 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata8
    signInEndpoint: SignInEndpoint3
  }
  
  export interface CommandMetadata8 {
    webCommandMetadata: WebCommandMetadata8
  }
  
  export interface WebCommandMetadata8 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint3 {
    nextEndpoint: NextEndpoint2
    idamTag: string
  }
  
  export interface NextEndpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata9
    watchEndpoint: WatchEndpoint3
  }
  
  export interface CommandMetadata9 {
    webCommandMetadata: WebCommandMetadata9
  }
  
  export interface WebCommandMetadata9 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint3 {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig2
  }
  
  export interface WatchEndpointSupportedOnesieConfig2 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig2
  }
  
  export interface Html5PlaybackOnesieConfig2 {
    commonConfig: CommonConfig2
  }
  
  export interface CommonConfig2 {
    url: string
  }
  
  export interface ServiceEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata10
    shareEntityServiceEndpoint: ShareEntityServiceEndpoint
  }
  
  export interface CommandMetadata10 {
    webCommandMetadata: WebCommandMetadata10
  }
  
  export interface WebCommandMetadata10 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface ShareEntityServiceEndpoint {
    serializedShareEntity: string
    commands: Command2[]
  }
  
  export interface Command2 {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction
  }
  
  export interface OpenPopupAction {
    popup: Popup
    popupType: string
    beReused: boolean
  }
  
  export interface Popup {
    unifiedSharePanelRenderer: UnifiedSharePanelRenderer
  }
  
  export interface UnifiedSharePanelRenderer {
    trackingParams: string
    showLoadingSpinner: boolean
  }
  
  export interface UpdatedMetadataEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata11
    updatedMetadataEndpoint: UpdatedMetadataEndpoint2
  }
  
  export interface CommandMetadata11 {
    webCommandMetadata: WebCommandMetadata11
  }
  
  export interface WebCommandMetadata11 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface UpdatedMetadataEndpoint2 {
    videoId: string
  }
  
  export interface DateText {
    simpleText: string
  }
  
  export interface VideoSecondaryInfoRenderer {
    owner: Owner
    description: Description
    subscribeButton: SubscribeButton
    metadataRowContainer: MetadataRowContainer
    showMoreText: ShowMoreText
    showLessText: ShowLessText
    trackingParams: string
    defaultExpanded: boolean
    descriptionCollapsedLines: number
    showMoreCommand: ShowMoreCommand
    showLessCommand: ShowLessCommand
  }
  
  export interface Owner {
    videoOwnerRenderer: VideoOwnerRenderer
  }
  
  export interface VideoOwnerRenderer {
    thumbnail: Thumbnail
    title: Title5
    subscriptionButton: SubscriptionButton
    navigationEndpoint: NavigationEndpoint7
    subscriberCountText: SubscriberCountText
    trackingParams: string
    badges: Badge[]
    membershipButton: MembershipButton
  }
  
  export interface Thumbnail {
    thumbnails: Thumbnail2[]
  }
  
  export interface Thumbnail2 {
    url: string
    width: number
    height: number
  }
  
  export interface Title5 {
    runs: Run8[]
  }
  
  export interface Run8 {
    text: string
    navigationEndpoint: NavigationEndpoint6
  }
  
  export interface NavigationEndpoint6 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata12
    browseEndpoint: BrowseEndpoint
  }
  
  export interface CommandMetadata12 {
    webCommandMetadata: WebCommandMetadata12
  }
  
  export interface WebCommandMetadata12 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface SubscriptionButton {
    type: string
  }
  
  export interface NavigationEndpoint7 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata13
    browseEndpoint: BrowseEndpoint2
  }
  
  export interface CommandMetadata13 {
    webCommandMetadata: WebCommandMetadata13
  }
  
  export interface WebCommandMetadata13 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint2 {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface SubscriberCountText {
    accessibility: Accessibility5
    simpleText: string
  }
  
  export interface Accessibility5 {
    accessibilityData: AccessibilityData7
  }
  
  export interface AccessibilityData7 {
    label: string
  }
  
  export interface Badge {
    metadataBadgeRenderer: MetadataBadgeRenderer
  }
  
  export interface MetadataBadgeRenderer {
    icon: Icon2
    style: string
    tooltip: string
    trackingParams: string
    accessibilityData: AccessibilityData8
  }
  
  export interface Icon2 {
    iconType: string
  }
  
  export interface AccessibilityData8 {
    label: string
  }
  
  export interface MembershipButton {
    buttonRenderer: ButtonRenderer5
  }
  
  export interface ButtonRenderer5 {
    style: string
    size: string
    isDisabled: boolean
    text: Text5
    navigationEndpoint: NavigationEndpoint8
    trackingParams: string
    accessibilityData: AccessibilityData9
    targetId: string
  }
  
  export interface Text5 {
    runs: Run9[]
  }
  
  export interface Run9 {
    text: string
  }
  
  export interface NavigationEndpoint8 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata14
    modalEndpoint: ModalEndpoint4
  }
  
  export interface CommandMetadata14 {
    webCommandMetadata: WebCommandMetadata14
  }
  
  export interface WebCommandMetadata14 {
    ignoreNavigation: boolean
  }
  
  export interface ModalEndpoint4 {
    modal: Modal4
  }
  
  export interface Modal4 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer4
  }
  
  export interface ModalWithTitleAndButtonRenderer4 {
    title: Title6
    content: Content5
    button: Button4
  }
  
  export interface Title6 {
    runs: Run10[]
  }
  
  export interface Run10 {
    text: string
  }
  
  export interface Content5 {
    runs: Run11[]
  }
  
  export interface Run11 {
    text: string
  }
  
  export interface Button4 {
    buttonRenderer: ButtonRenderer6
  }
  
  export interface ButtonRenderer6 {
    style: string
    size: string
    isDisabled: boolean
    text: Text6
    navigationEndpoint: NavigationEndpoint9
    trackingParams: string
  }
  
  export interface Text6 {
    simpleText: string
  }
  
  export interface NavigationEndpoint9 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata15
    signInEndpoint: SignInEndpoint4
  }
  
  export interface CommandMetadata15 {
    webCommandMetadata: WebCommandMetadata15
  }
  
  export interface WebCommandMetadata15 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint4 {
    hack: boolean
  }
  
  export interface AccessibilityData9 {
    accessibilityData: AccessibilityData10
  }
  
  export interface AccessibilityData10 {
    label: string
  }
  
  export interface Description {
    runs: Run12[]
  }
  
  export interface Run12 {
    text: string
    navigationEndpoint?: NavigationEndpoint10
  }
  
  export interface NavigationEndpoint10 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata16
    urlEndpoint: UrlEndpoint
  }
  
  export interface CommandMetadata16 {
    webCommandMetadata: WebCommandMetadata16
  }
  
  export interface WebCommandMetadata16 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface UrlEndpoint {
    url: string
    target: string
    nofollow: boolean
  }
  
  export interface SubscribeButton {
    buttonRenderer: ButtonRenderer7
  }
  
  export interface ButtonRenderer7 {
    style: string
    size: string
    isDisabled: boolean
    text: Text7
    navigationEndpoint: NavigationEndpoint11
    trackingParams: string
    targetId: string
  }
  
  export interface Text7 {
    runs: Run13[]
  }
  
  export interface Run13 {
    text: string
  }
  
  export interface NavigationEndpoint11 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata17
    modalEndpoint: ModalEndpoint5
  }
  
  export interface CommandMetadata17 {
    webCommandMetadata: WebCommandMetadata17
  }
  
  export interface WebCommandMetadata17 {
    ignoreNavigation: boolean
  }
  
  export interface ModalEndpoint5 {
    modal: Modal5
  }
  
  export interface Modal5 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer5
  }
  
  export interface ModalWithTitleAndButtonRenderer5 {
    title: Title7
    content: Content6
    button: Button5
  }
  
  export interface Title7 {
    simpleText: string
  }
  
  export interface Content6 {
    simpleText: string
  }
  
  export interface Button5 {
    buttonRenderer: ButtonRenderer8
  }
  
  export interface ButtonRenderer8 {
    style: string
    size: string
    isDisabled: boolean
    text: Text8
    navigationEndpoint: NavigationEndpoint12
    trackingParams: string
  }
  
  export interface Text8 {
    simpleText: string
  }
  
  export interface NavigationEndpoint12 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata18
    signInEndpoint: SignInEndpoint5
  }
  
  export interface CommandMetadata18 {
    webCommandMetadata: WebCommandMetadata18
  }
  
  export interface WebCommandMetadata18 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint5 {
    nextEndpoint: NextEndpoint3
    continueAction: string
    idamTag: string
  }
  
  export interface NextEndpoint3 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata19
    watchEndpoint: WatchEndpoint4
  }
  
  export interface CommandMetadata19 {
    webCommandMetadata: WebCommandMetadata19
  }
  
  export interface WebCommandMetadata19 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint4 {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig3
  }
  
  export interface WatchEndpointSupportedOnesieConfig3 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig3
  }
  
  export interface Html5PlaybackOnesieConfig3 {
    commonConfig: CommonConfig3
  }
  
  export interface CommonConfig3 {
    url: string
  }
  
  export interface MetadataRowContainer {
    metadataRowContainerRenderer: MetadataRowContainerRenderer
  }
  
  export interface MetadataRowContainerRenderer {
    collapsedItemCount: number
    trackingParams: string
  }
  
  export interface ShowMoreText {
    simpleText: string
  }
  
  export interface ShowLessText {
    simpleText: string
  }
  
  export interface ShowMoreCommand {
    clickTrackingParams: string
    commandExecutorCommand: CommandExecutorCommand
  }
  
  export interface CommandExecutorCommand {
    commands: Command3[]
  }
  
  export interface Command3 {
    clickTrackingParams: string
    changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction
    scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommand
  }
  
  export interface ChangeEngagementPanelVisibilityAction {
    targetId: string
    visibility: string
  }
  
  export interface ScrollToEngagementPanelCommand {
    targetId: string
  }
  
  export interface ShowLessCommand {
    clickTrackingParams: string
    changeEngagementPanelVisibilityAction: ChangeEngagementPanelVisibilityAction2
  }
  
  export interface ChangeEngagementPanelVisibilityAction2 {
    targetId: string
    visibility: string
  }
  
  export interface SecondaryResults {
    secondaryResults: SecondaryResults2
  }
  
  export interface SecondaryResults2 {
    results: Result[]
    trackingParams: string
    targetId: string
  }
  
  export interface Result {
    compactVideoRenderer?: CompactVideoRenderer
    continuationItemRenderer?: ContinuationItemRenderer
  }
  
  export interface CompactVideoRenderer {
    videoId: string
    thumbnail: Thumbnail3
    title: Title8
    longBylineText: LongBylineText
    publishedTimeText?: PublishedTimeText
    viewCountText: ViewCountText
    lengthText?: LengthText
    navigationEndpoint: NavigationEndpoint14
    shortBylineText: ShortBylineText
    channelThumbnail: ChannelThumbnail
    ownerBadges?: OwnerBadge[]
    trackingParams: string
    shortViewCountText: ShortViewCountText
    menu: Menu
    thumbnailOverlays: ThumbnailOverlay[]
    accessibility: Accessibility11
    badges?: Badge2[]
  }
  
  export interface Thumbnail3 {
    thumbnails: Thumbnail4[]
  }
  
  export interface Thumbnail4 {
    url: string
    width: number
    height: number
  }
  
  export interface Title8 {
    accessibility: Accessibility6
    simpleText: string
  }
  
  export interface Accessibility6 {
    accessibilityData: AccessibilityData11
  }
  
  export interface AccessibilityData11 {
    label: string
  }
  
  export interface LongBylineText {
    runs: Run14[]
  }
  
  export interface Run14 {
    text: string
    navigationEndpoint: NavigationEndpoint13
  }
  
  export interface NavigationEndpoint13 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata20
    browseEndpoint: BrowseEndpoint3
  }
  
  export interface CommandMetadata20 {
    webCommandMetadata: WebCommandMetadata20
  }
  
  export interface WebCommandMetadata20 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint3 {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface PublishedTimeText {
    simpleText: string
  }
  
  export interface ViewCountText {
    simpleText?: string
    runs?: Run15[]
  }
  
  export interface Run15 {
    text: string
  }
  
  export interface LengthText {
    accessibility: Accessibility7
    simpleText: string
  }
  
  export interface Accessibility7 {
    accessibilityData: AccessibilityData12
  }
  
  export interface AccessibilityData12 {
    label: string
  }
  
  export interface NavigationEndpoint14 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata21
    watchEndpoint: WatchEndpoint5
  }
  
  export interface CommandMetadata21 {
    webCommandMetadata: WebCommandMetadata21
  }
  
  export interface WebCommandMetadata21 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint5 {
    videoId: string
    nofollow: boolean
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig4
  }
  
  export interface WatchEndpointSupportedOnesieConfig4 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig4
  }
  
  export interface Html5PlaybackOnesieConfig4 {
    commonConfig: CommonConfig4
  }
  
  export interface CommonConfig4 {
    url: string
  }
  
  export interface ShortBylineText {
    runs: Run16[]
  }
  
  export interface Run16 {
    text: string
    navigationEndpoint: NavigationEndpoint15
  }
  
  export interface NavigationEndpoint15 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata22
    browseEndpoint: BrowseEndpoint4
  }
  
  export interface CommandMetadata22 {
    webCommandMetadata: WebCommandMetadata22
  }
  
  export interface WebCommandMetadata22 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint4 {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface ChannelThumbnail {
    thumbnails: Thumbnail5[]
  }
  
  export interface Thumbnail5 {
    url: string
    width: number
    height: number
  }
  
  export interface OwnerBadge {
    metadataBadgeRenderer: MetadataBadgeRenderer2
  }
  
  export interface MetadataBadgeRenderer2 {
    icon: Icon3
    style: string
    tooltip: string
    trackingParams: string
    accessibilityData: AccessibilityData13
  }
  
  export interface Icon3 {
    iconType: string
  }
  
  export interface AccessibilityData13 {
    label: string
  }
  
  export interface ShortViewCountText {
    accessibility?: Accessibility8
    simpleText?: string
    runs?: Run17[]
  }
  
  export interface Accessibility8 {
    accessibilityData: AccessibilityData14
  }
  
  export interface AccessibilityData14 {
    label: string
  }
  
  export interface Run17 {
    text: string
  }
  
  export interface Menu {
    menuRenderer: MenuRenderer2
  }
  
  export interface MenuRenderer2 {
    items: Item[]
    trackingParams: string
    accessibility: Accessibility9
    targetId?: string
  }
  
  export interface Item {
    menuServiceItemRenderer: MenuServiceItemRenderer
  }
  
  export interface MenuServiceItemRenderer {
    text: Text9
    icon: Icon4
    serviceEndpoint: ServiceEndpoint2
    trackingParams: string
  }
  
  export interface Text9 {
    runs: Run18[]
  }
  
  export interface Run18 {
    text: string
  }
  
  export interface Icon4 {
    iconType: string
  }
  
  export interface ServiceEndpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata23
    signalServiceEndpoint: SignalServiceEndpoint
  }
  
  export interface CommandMetadata23 {
    webCommandMetadata: WebCommandMetadata23
  }
  
  export interface WebCommandMetadata23 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint {
    signal: string
    actions: Action[]
  }
  
  export interface Action {
    clickTrackingParams: string
    addToPlaylistCommand?: AddToPlaylistCommand
    openPopupAction?: OpenPopupAction2
  }
  
  export interface AddToPlaylistCommand {
    openMiniplayer: boolean
    openListPanel: boolean
    videoId: string
    listType: string
    onCreateListCommand: OnCreateListCommand
    videoIds: string[]
  }
  
  export interface OnCreateListCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata24
    createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint
  }
  
  export interface CommandMetadata24 {
    webCommandMetadata: WebCommandMetadata24
  }
  
  export interface WebCommandMetadata24 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface CreatePlaylistServiceEndpoint {
    videoIds: string[]
    params: string
  }
  
  export interface OpenPopupAction2 {
    popup: Popup2
    popupType: string
  }
  
  export interface Popup2 {
    notificationActionRenderer: NotificationActionRenderer
  }
  
  export interface NotificationActionRenderer {
    responseText: ResponseText
    trackingParams: string
  }
  
  export interface ResponseText {
    simpleText: string
  }
  
  export interface Accessibility9 {
    accessibilityData: AccessibilityData15
  }
  
  export interface AccessibilityData15 {
    label: string
  }
  
  export interface ThumbnailOverlay {
    thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer
    thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer
    thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer
  }
  
  export interface ThumbnailOverlayTimeStatusRenderer {
    text: Text10
    style: string
  }
  
  export interface Text10 {
    accessibility: Accessibility10
    simpleText: string
  }
  
  export interface Accessibility10 {
    accessibilityData: AccessibilityData16
  }
  
  export interface AccessibilityData16 {
    label: string
  }
  
  export interface ThumbnailOverlayToggleButtonRenderer {
    untoggledIcon: UntoggledIcon
    toggledIcon: ToggledIcon
    untoggledTooltip: string
    toggledTooltip: string
    untoggledServiceEndpoint: UntoggledServiceEndpoint
    untoggledAccessibility: UntoggledAccessibility
    toggledAccessibility: ToggledAccessibility
    trackingParams: string
    isToggled?: boolean
    toggledServiceEndpoint?: ToggledServiceEndpoint
  }
  
  export interface UntoggledIcon {
    iconType: string
  }
  
  export interface ToggledIcon {
    iconType: string
  }
  
  export interface UntoggledServiceEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata25
    signalServiceEndpoint?: SignalServiceEndpoint2
    playlistEditEndpoint?: PlaylistEditEndpoint
  }
  
  export interface CommandMetadata25 {
    webCommandMetadata: WebCommandMetadata25
  }
  
  export interface WebCommandMetadata25 {
    sendPost: boolean
    apiUrl?: string
  }
  
  export interface SignalServiceEndpoint2 {
    signal: string
    actions: Action2[]
  }
  
  export interface Action2 {
    clickTrackingParams: string
    addToPlaylistCommand: AddToPlaylistCommand2
  }
  
  export interface AddToPlaylistCommand2 {
    openMiniplayer: boolean
    openListPanel: boolean
    videoId: string
    listType: string
    onCreateListCommand: OnCreateListCommand2
    videoIds: string[]
  }
  
  export interface OnCreateListCommand2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata26
    createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint2
  }
  
  export interface CommandMetadata26 {
    webCommandMetadata: WebCommandMetadata26
  }
  
  export interface WebCommandMetadata26 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface CreatePlaylistServiceEndpoint2 {
    videoIds: string[]
    params: string
  }
  
  export interface PlaylistEditEndpoint {
    playlistId: string
    actions: Action3[]
  }
  
  export interface Action3 {
    addedVideoId: string
    action: string
  }
  
  export interface UntoggledAccessibility {
    accessibilityData: AccessibilityData17
  }
  
  export interface AccessibilityData17 {
    label: string
  }
  
  export interface ToggledAccessibility {
    accessibilityData: AccessibilityData18
  }
  
  export interface AccessibilityData18 {
    label: string
  }
  
  export interface ToggledServiceEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata27
    playlistEditEndpoint: PlaylistEditEndpoint2
  }
  
  export interface CommandMetadata27 {
    webCommandMetadata: WebCommandMetadata27
  }
  
  export interface WebCommandMetadata27 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface PlaylistEditEndpoint2 {
    playlistId: string
    actions: Action4[]
  }
  
  export interface Action4 {
    action: string
    removedVideoId: string
  }
  
  export interface ThumbnailOverlayNowPlayingRenderer {
    text: Text11
  }
  
  export interface Text11 {
    runs: Run19[]
  }
  
  export interface Run19 {
    text: string
  }
  
  export interface Accessibility11 {
    accessibilityData: AccessibilityData19
  }
  
  export interface AccessibilityData19 {
    label: string
  }
  
  export interface Badge2 {
    metadataBadgeRenderer: MetadataBadgeRenderer3
  }
  
  export interface MetadataBadgeRenderer3 {
    icon: Icon5
    style: string
    label: string
    trackingParams: string
  }
  
  export interface Icon5 {
    iconType: string
  }
  
  export interface ContinuationItemRenderer {
    trigger: string
    continuationEndpoint: ContinuationEndpoint
    button: Button6
  }
  
  export interface ContinuationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata28
    continuationCommand: ContinuationCommand
  }
  
  export interface CommandMetadata28 {
    webCommandMetadata: WebCommandMetadata28
  }
  
  export interface WebCommandMetadata28 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface ContinuationCommand {
    token: string
    request: string
  }
  
  export interface Button6 {
    buttonRenderer: ButtonRenderer9
  }
  
  export interface ButtonRenderer9 {
    style: string
    size: string
    isDisabled: boolean
    text: Text12
    trackingParams: string
    command: Command4
  }
  
  export interface Text12 {
    runs: Run20[]
  }
  
  export interface Run20 {
    text: string
  }
  
  export interface Command4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata29
    continuationCommand: ContinuationCommand2
  }
  
  export interface CommandMetadata29 {
    webCommandMetadata: WebCommandMetadata29
  }
  
  export interface WebCommandMetadata29 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface ContinuationCommand2 {
    token: string
    request: string
  }
  
  export interface Autoplay {
    autoplay: Autoplay2
  }
  
  export interface Autoplay2 {
    sets: Set[]
    countDownSecs: number
    trackingParams: string
  }
  
  export interface Set {
    mode: string
    autoplayVideo: AutoplayVideo
  }
  
  export interface AutoplayVideo {
    clickTrackingParams: string
    commandMetadata: CommandMetadata30
    watchEndpoint: WatchEndpoint6
  }
  
  export interface CommandMetadata30 {
    webCommandMetadata: WebCommandMetadata30
  }
  
  export interface WebCommandMetadata30 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint6 {
    videoId: string
    params: string
    playerParams: string
    watchEndpointSupportedPrefetchConfig: WatchEndpointSupportedPrefetchConfig2
  }
  
  export interface WatchEndpointSupportedPrefetchConfig2 {
    prefetchHintConfig: PrefetchHintConfig2
  }
  
  export interface PrefetchHintConfig2 {
    prefetchPriority: number
    countdownUiRelativeSecondsPrefetchCondition: number
  }
  
  export interface ConversationBar {
    liveChatRenderer: LiveChatRenderer
  }
  
  export interface LiveChatRenderer {
    continuations: Continuation[]
    header: Header
    trackingParams: string
    clientMessages: ClientMessages
    initialDisplayState: string
    showHideButton: ShowHideButton
  }
  
  export interface Continuation {
    reloadContinuationData: ReloadContinuationData
  }
  
  export interface ReloadContinuationData {
    continuation: string
    clickTrackingParams: string
  }
  
  export interface Header {
    liveChatHeaderRenderer: LiveChatHeaderRenderer
  }
  
  export interface LiveChatHeaderRenderer {
    overflowMenu: OverflowMenu
    collapseButton: CollapseButton
    viewSelector: ViewSelector
  }
  
  export interface OverflowMenu {
    menuRenderer: MenuRenderer3
  }
  
  export interface MenuRenderer3 {
    items: Item2[]
    trackingParams: string
    accessibility: Accessibility12
  }
  
  export interface Item2 {
    menuServiceItemRenderer?: MenuServiceItemRenderer2
    menuNavigationItemRenderer?: MenuNavigationItemRenderer
  }
  
  export interface MenuServiceItemRenderer2 {
    text: Text13
    icon: Icon6
    serviceEndpoint: ServiceEndpoint3
    trackingParams: string
  }
  
  export interface Text13 {
    runs: Run21[]
  }
  
  export interface Run21 {
    text: string
  }
  
  export interface Icon6 {
    iconType: string
  }
  
  export interface ServiceEndpoint3 {
    clickTrackingParams: string
    showLiveChatParticipantsEndpoint?: ShowLiveChatParticipantsEndpoint
    popoutLiveChatEndpoint?: PopoutLiveChatEndpoint
    toggleLiveChatTimestampsEndpoint?: ToggleLiveChatTimestampsEndpoint
  }
  
  export interface ShowLiveChatParticipantsEndpoint {
    hack: boolean
  }
  
  export interface PopoutLiveChatEndpoint {
    url: string
  }
  
  export interface ToggleLiveChatTimestampsEndpoint {
    hack: boolean
  }
  
  export interface MenuNavigationItemRenderer {
    text: Text14
    icon: Icon7
    navigationEndpoint: NavigationEndpoint16
    trackingParams: string
  }
  
  export interface Text14 {
    runs: Run22[]
  }
  
  export interface Run22 {
    text: string
  }
  
  export interface Icon7 {
    iconType: string
  }
  
  export interface NavigationEndpoint16 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata31
    userFeedbackEndpoint: UserFeedbackEndpoint
  }
  
  export interface CommandMetadata31 {
    webCommandMetadata: WebCommandMetadata31
  }
  
  export interface WebCommandMetadata31 {
    ignoreNavigation: boolean
  }
  
  export interface UserFeedbackEndpoint {
    hack: boolean
    bucketIdentifier: string
  }
  
  export interface Accessibility12 {
    accessibilityData: AccessibilityData20
  }
  
  export interface AccessibilityData20 {
    label: string
  }
  
  export interface CollapseButton {
    buttonRenderer: ButtonRenderer10
  }
  
  export interface ButtonRenderer10 {
    style: string
    size: string
    isDisabled: boolean
    accessibility: Accessibility13
    trackingParams: string
  }
  
  export interface Accessibility13 {
    label: string
  }
  
  export interface ViewSelector {
    sortFilterSubMenuRenderer: SortFilterSubMenuRenderer
  }
  
  export interface SortFilterSubMenuRenderer {
    subMenuItems: SubMenuItem[]
    accessibility: Accessibility15
    trackingParams: string
  }
  
  export interface SubMenuItem {
    title: string
    selected: boolean
    continuation: Continuation2
    accessibility: Accessibility14
    subtitle: string
    trackingParams: string
  }
  
  export interface Continuation2 {
    reloadContinuationData: ReloadContinuationData2
  }
  
  export interface ReloadContinuationData2 {
    continuation: string
    clickTrackingParams: string
  }
  
  export interface Accessibility14 {
    accessibilityData: AccessibilityData21
  }
  
  export interface AccessibilityData21 {
    label: string
  }
  
  export interface Accessibility15 {
    accessibilityData: AccessibilityData22
  }
  
  export interface AccessibilityData22 {
    label: string
  }
  
  export interface ClientMessages {
    reconnectMessage: ReconnectMessage
    unableToReconnectMessage: UnableToReconnectMessage
    fatalError: FatalError
    reconnectedMessage: ReconnectedMessage
    genericError: GenericError
  }
  
  export interface ReconnectMessage {
    runs: Run23[]
  }
  
  export interface Run23 {
    text: string
  }
  
  export interface UnableToReconnectMessage {
    runs: Run24[]
  }
  
  export interface Run24 {
    text: string
  }
  
  export interface FatalError {
    runs: Run25[]
  }
  
  export interface Run25 {
    text: string
  }
  
  export interface ReconnectedMessage {
    runs: Run26[]
  }
  
  export interface Run26 {
    text: string
  }
  
  export interface GenericError {
    runs: Run27[]
  }
  
  export interface Run27 {
    text: string
  }
  
  export interface ShowHideButton {
    toggleButtonRenderer: ToggleButtonRenderer2
  }
  
  export interface ToggleButtonRenderer2 {
    defaultText: DefaultText2
    toggledText: ToggledText2
    trackingParams: string
  }
  
  export interface DefaultText2 {
    runs: Run28[]
  }
  
  export interface Run28 {
    text: string
  }
  
  export interface ToggledText2 {
    runs: Run29[]
  }
  
  export interface Run29 {
    text: string
  }
  
  export interface CurrentVideoEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata32
    watchEndpoint: WatchEndpoint7
  }
  
  export interface CommandMetadata32 {
    webCommandMetadata: WebCommandMetadata32
  }
  
  export interface WebCommandMetadata32 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint7 {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig5
  }
  
  export interface WatchEndpointSupportedOnesieConfig5 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig5
  }
  
  export interface Html5PlaybackOnesieConfig5 {
    commonConfig: CommonConfig5
  }
  
  export interface CommonConfig5 {
    url: string
  }
  
  export interface PlayerOverlays {
    playerOverlayRenderer: PlayerOverlayRenderer
  }
  
  export interface PlayerOverlayRenderer {
    endScreen: EndScreen
    autoplay: Autoplay3
    shareButton: ShareButton
    addToMenu: AddToMenu
    videoDetails: VideoDetails
    autonavToggle: AutonavToggle
  }
  
  export interface EndScreen {
    watchNextEndScreenRenderer: WatchNextEndScreenRenderer
  }
  
  export interface WatchNextEndScreenRenderer {
    results: Result2[]
    title: Title10
    trackingParams: string
  }
  
  export interface Result2 {
    endScreenVideoRenderer: EndScreenVideoRenderer
  }
  
  export interface EndScreenVideoRenderer {
    videoId: string
    thumbnail: Thumbnail6
    title: Title9
    shortBylineText: ShortBylineText2
    lengthText?: LengthText2
    lengthInSeconds?: number
    navigationEndpoint: NavigationEndpoint18
    trackingParams: string
    shortViewCountText: ShortViewCountText2
    publishedTimeText: PublishedTimeText2
    thumbnailOverlays: ThumbnailOverlay2[]
  }
  
  export interface Thumbnail6 {
    thumbnails: Thumbnail7[]
  }
  
  export interface Thumbnail7 {
    url: string
    width: number
    height: number
  }
  
  export interface Title9 {
    accessibility: Accessibility16
    simpleText: string
  }
  
  export interface Accessibility16 {
    accessibilityData: AccessibilityData23
  }
  
  export interface AccessibilityData23 {
    label: string
  }
  
  export interface ShortBylineText2 {
    runs: Run30[]
  }
  
  export interface Run30 {
    text: string
    navigationEndpoint: NavigationEndpoint17
  }
  
  export interface NavigationEndpoint17 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata33
    browseEndpoint: BrowseEndpoint5
  }
  
  export interface CommandMetadata33 {
    webCommandMetadata: WebCommandMetadata33
  }
  
  export interface WebCommandMetadata33 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint5 {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface LengthText2 {
    accessibility: Accessibility17
    simpleText: string
  }
  
  export interface Accessibility17 {
    accessibilityData: AccessibilityData24
  }
  
  export interface AccessibilityData24 {
    label: string
  }
  
  export interface NavigationEndpoint18 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata34
    watchEndpoint: WatchEndpoint8
  }
  
  export interface CommandMetadata34 {
    webCommandMetadata: WebCommandMetadata34
  }
  
  export interface WebCommandMetadata34 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint8 {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig6
  }
  
  export interface WatchEndpointSupportedOnesieConfig6 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig6
  }
  
  export interface Html5PlaybackOnesieConfig6 {
    commonConfig: CommonConfig6
  }
  
  export interface CommonConfig6 {
    url: string
  }
  
  export interface ShortViewCountText2 {
    accessibility?: Accessibility18
    simpleText?: string
    runs?: Run31[]
  }
  
  export interface Accessibility18 {
    accessibilityData: AccessibilityData25
  }
  
  export interface AccessibilityData25 {
    label: string
  }
  
  export interface Run31 {
    text: string
  }
  
  export interface PublishedTimeText2 {
    simpleText: string
  }
  
  export interface ThumbnailOverlay2 {
    thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer2
    thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer2
  }
  
  export interface ThumbnailOverlayTimeStatusRenderer2 {
    text: Text15
    style: string
    icon?: Icon8
  }
  
  export interface Text15 {
    accessibility: Accessibility19
    simpleText?: string
    runs?: Run32[]
  }
  
  export interface Accessibility19 {
    accessibilityData: AccessibilityData26
  }
  
  export interface AccessibilityData26 {
    label: string
  }
  
  export interface Run32 {
    text: string
  }
  
  export interface Icon8 {
    iconType: string
  }
  
  export interface ThumbnailOverlayNowPlayingRenderer2 {
    text: Text16
  }
  
  export interface Text16 {
    runs: Run33[]
  }
  
  export interface Run33 {
    text: string
  }
  
  export interface Title10 {
    simpleText: string
  }
  
  export interface Autoplay3 {
    playerOverlayAutoplayRenderer: PlayerOverlayAutoplayRenderer
  }
  
  export interface PlayerOverlayAutoplayRenderer {
    title: Title11
    videoTitle: VideoTitle
    byline: Byline
    pauseText: PauseText
    background: Background
    countDownSecs: number
    cancelButton: CancelButton
    nextButton: NextButton
    trackingParams: string
    closeButton: CloseButton
    thumbnailOverlays: ThumbnailOverlay3[]
    preferImmediateRedirect: boolean
    videoId: string
    publishedTimeText: PublishedTimeText3
    webShowNewAutonavCountdown: boolean
    webShowBigThumbnailEndscreen: boolean
    shortViewCountText: ShortViewCountText3
    countDownSecsForFullscreen: number
  }
  
  export interface Title11 {
    simpleText: string
  }
  
  export interface VideoTitle {
    accessibility: Accessibility20
    simpleText: string
  }
  
  export interface Accessibility20 {
    accessibilityData: AccessibilityData27
  }
  
  export interface AccessibilityData27 {
    label: string
  }
  
  export interface Byline {
    runs: Run34[]
  }
  
  export interface Run34 {
    text: string
    navigationEndpoint: NavigationEndpoint19
  }
  
  export interface NavigationEndpoint19 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata35
    browseEndpoint: BrowseEndpoint6
  }
  
  export interface CommandMetadata35 {
    webCommandMetadata: WebCommandMetadata35
  }
  
  export interface WebCommandMetadata35 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint6 {
    browseId: string
    canonicalBaseUrl: string
  }
  
  export interface PauseText {
    simpleText: string
  }
  
  export interface Background {
    thumbnails: Thumbnail8[]
  }
  
  export interface Thumbnail8 {
    url: string
    width: number
    height: number
  }
  
  export interface CancelButton {
    buttonRenderer: ButtonRenderer11
  }
  
  export interface ButtonRenderer11 {
    style: string
    size: string
    isDisabled: boolean
    text: Text17
    accessibility: Accessibility21
    trackingParams: string
    accessibilityData: AccessibilityData28
    command: Command5
  }
  
  export interface Text17 {
    simpleText: string
  }
  
  export interface Accessibility21 {
    label: string
  }
  
  export interface AccessibilityData28 {
    accessibilityData: AccessibilityData29
  }
  
  export interface AccessibilityData29 {
    label: string
  }
  
  export interface Command5 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata36
    getSurveyCommand: GetSurveyCommand
  }
  
  export interface CommandMetadata36 {
    webCommandMetadata: WebCommandMetadata36
  }
  
  export interface WebCommandMetadata36 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface GetSurveyCommand {
    endpoint: Endpoint
    action: string
  }
  
  export interface Endpoint {
    watch: Watch
  }
  
  export interface Watch {
    hack: boolean
  }
  
  export interface NextButton {
    buttonRenderer: ButtonRenderer12
  }
  
  export interface ButtonRenderer12 {
    style: string
    size: string
    isDisabled: boolean
    navigationEndpoint: NavigationEndpoint20
    accessibility: Accessibility22
    trackingParams: string
    accessibilityData: AccessibilityData30
  }
  
  export interface NavigationEndpoint20 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata37
    watchEndpoint: WatchEndpoint9
  }
  
  export interface CommandMetadata37 {
    webCommandMetadata: WebCommandMetadata37
  }
  
  export interface WebCommandMetadata37 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface WatchEndpoint9 {
    videoId: string
    watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig7
  }
  
  export interface WatchEndpointSupportedOnesieConfig7 {
    html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig7
  }
  
  export interface Html5PlaybackOnesieConfig7 {
    commonConfig: CommonConfig7
  }
  
  export interface CommonConfig7 {
    url: string
  }
  
  export interface Accessibility22 {
    label: string
  }
  
  export interface AccessibilityData30 {
    accessibilityData: AccessibilityData31
  }
  
  export interface AccessibilityData31 {
    label: string
  }
  
  export interface CloseButton {
    buttonRenderer: ButtonRenderer13
  }
  
  export interface ButtonRenderer13 {
    style: string
    size: string
    isDisabled: boolean
    icon: Icon9
    accessibility: Accessibility23
    trackingParams: string
  }
  
  export interface Icon9 {
    iconType: string
  }
  
  export interface Accessibility23 {
    label: string
  }
  
  export interface ThumbnailOverlay3 {
    thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer3
  }
  
  export interface ThumbnailOverlayTimeStatusRenderer3 {
    text: Text18
    style: string
  }
  
  export interface Text18 {
    accessibility: Accessibility24
    simpleText: string
  }
  
  export interface Accessibility24 {
    accessibilityData: AccessibilityData32
  }
  
  export interface AccessibilityData32 {
    label: string
  }
  
  export interface PublishedTimeText3 {
    simpleText: string
  }
  
  export interface ShortViewCountText3 {
    accessibility: Accessibility25
    simpleText: string
  }
  
  export interface Accessibility25 {
    accessibilityData: AccessibilityData33
  }
  
  export interface AccessibilityData33 {
    label: string
  }
  
  export interface ShareButton {
    buttonRenderer: ButtonRenderer14
  }
  
  export interface ButtonRenderer14 {
    style: string
    size: string
    isDisabled: boolean
    icon: Icon10
    navigationEndpoint: NavigationEndpoint21
    tooltip: string
    trackingParams: string
  }
  
  export interface Icon10 {
    iconType: string
  }
  
  export interface NavigationEndpoint21 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata38
    shareEntityServiceEndpoint: ShareEntityServiceEndpoint2
  }
  
  export interface CommandMetadata38 {
    webCommandMetadata: WebCommandMetadata38
  }
  
  export interface WebCommandMetadata38 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface ShareEntityServiceEndpoint2 {
    serializedShareEntity: string
    commands: Command6[]
  }
  
  export interface Command6 {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction3
  }
  
  export interface OpenPopupAction3 {
    popup: Popup3
    popupType: string
    beReused: boolean
  }
  
  export interface Popup3 {
    unifiedSharePanelRenderer: UnifiedSharePanelRenderer2
  }
  
  export interface UnifiedSharePanelRenderer2 {
    trackingParams: string
    showLoadingSpinner: boolean
  }
  
  export interface AddToMenu {
    menuRenderer: MenuRenderer4
  }
  
  export interface MenuRenderer4 {
    trackingParams: string
  }
  
  export interface VideoDetails {
    playerOverlayVideoDetailsRenderer: PlayerOverlayVideoDetailsRenderer
  }
  
  export interface PlayerOverlayVideoDetailsRenderer {
    title: Title12
    subtitle: Subtitle
  }
  
  export interface Title12 {
    simpleText: string
  }
  
  export interface Subtitle {
    runs: Run35[]
  }
  
  export interface Run35 {
    text: string
  }
  
  export interface AutonavToggle {
    autoplaySwitchButtonRenderer: AutoplaySwitchButtonRenderer
  }
  
  export interface AutoplaySwitchButtonRenderer {
    enabledAccessibilityData: EnabledAccessibilityData
    disabledAccessibilityData: DisabledAccessibilityData
    trackingParams: string
  }
  
  export interface EnabledAccessibilityData {
    accessibilityData: AccessibilityData34
  }
  
  export interface AccessibilityData34 {
    label: string
  }
  
  export interface DisabledAccessibilityData {
    accessibilityData: AccessibilityData35
  }
  
  export interface AccessibilityData35 {
    label: string
  }
  
  export interface Overlay {
    tooltipRenderer: TooltipRenderer
  }
  
  export interface TooltipRenderer {
    promoConfig: PromoConfig
    targetId: string
    detailsText: DetailsText
    suggestedPosition: SuggestedPosition
    dismissStrategy: DismissStrategy
    dwellTimeMs: string
    trackingParams: string
  }
  
  export interface PromoConfig {
    promoId: string
    impressionEndpoints: ImpressionEndpoint[]
    acceptCommand: AcceptCommand
    dismissCommand: DismissCommand
  }
  
  export interface ImpressionEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata39
    feedbackEndpoint: FeedbackEndpoint
  }
  
  export interface CommandMetadata39 {
    webCommandMetadata: WebCommandMetadata39
  }
  
  export interface WebCommandMetadata39 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface FeedbackEndpoint {
    feedbackToken: string
    uiActions: UiActions
  }
  
  export interface UiActions {
    hideEnclosingContainer: boolean
  }
  
  export interface AcceptCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata40
    feedbackEndpoint: FeedbackEndpoint2
  }
  
  export interface CommandMetadata40 {
    webCommandMetadata: WebCommandMetadata40
  }
  
  export interface WebCommandMetadata40 {
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
  
  export interface DismissCommand {
    clickTrackingParams: string
    commandMetadata: CommandMetadata41
    feedbackEndpoint: FeedbackEndpoint3
  }
  
  export interface CommandMetadata41 {
    webCommandMetadata: WebCommandMetadata41
  }
  
  export interface WebCommandMetadata41 {
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
  
  export interface DetailsText {
    runs: Run36[]
  }
  
  export interface Run36 {
    text: string
  }
  
  export interface SuggestedPosition {
    type: string
  }
  
  export interface DismissStrategy {
    type: string
  }
  
  export interface OnResponseReceivedEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata42
    signalServiceEndpoint: SignalServiceEndpoint3
  }
  
  export interface CommandMetadata42 {
    webCommandMetadata: WebCommandMetadata42
  }
  
  export interface WebCommandMetadata42 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint3 {
    signal: string
    actions: Action5[]
  }
  
  export interface Action5 {
    clickTrackingParams: string
    signalAction: SignalAction
  }
  
  export interface SignalAction {
    signal: string
  }
  
  export interface EngagementPanel {
    engagementPanelSectionListRenderer: EngagementPanelSectionListRenderer
  }
  
  export interface EngagementPanelSectionListRenderer {
    content: Content7
    targetId: string
    visibility: string
    loggingDirectives: LoggingDirectives
    panelIdentifier?: string
    header?: Header2
    veType?: number
  }
  
  export interface Content7 {
    adsEngagementPanelContentRenderer?: AdsEngagementPanelContentRenderer
    structuredDescriptionContentRenderer?: StructuredDescriptionContentRenderer
  }
  
  export interface AdsEngagementPanelContentRenderer {
    hack: boolean
  }
  
  export interface StructuredDescriptionContentRenderer {
    items: Item3[]
  }
  
  export interface Item3 {
    expandableVideoDescriptionBodyRenderer: ExpandableVideoDescriptionBodyRenderer
  }
  
  export interface ExpandableVideoDescriptionBodyRenderer {
    descriptionBodyText: DescriptionBodyText
    showMoreText: ShowMoreText2
    showLessText: ShowLessText2
  }
  
  export interface DescriptionBodyText {
    runs: Run37[]
  }
  
  export interface Run37 {
    text: string
    navigationEndpoint?: NavigationEndpoint22
  }
  
  export interface NavigationEndpoint22 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata43
    urlEndpoint: UrlEndpoint2
  }
  
  export interface CommandMetadata43 {
    webCommandMetadata: WebCommandMetadata43
  }
  
  export interface WebCommandMetadata43 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface UrlEndpoint2 {
    url: string
    target: string
    nofollow: boolean
  }
  
  export interface ShowMoreText2 {
    simpleText: string
  }
  
  export interface ShowLessText2 {
    simpleText: string
  }
  
  export interface LoggingDirectives {
    trackingParams: string
    visibility: Visibility
  }
  
  export interface Visibility {
    types: string
  }
  
  export interface Header2 {
    engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeaderRenderer
  }
  
  export interface EngagementPanelTitleHeaderRenderer {
    title: Title13
    visibilityButton: VisibilityButton
    trackingParams: string
  }
  
  export interface Title13 {
    simpleText: string
  }
  
  export interface VisibilityButton {
    buttonRenderer: ButtonRenderer15
  }
  
  export interface ButtonRenderer15 {
    icon: Icon11
    trackingParams: string
    accessibilityData: AccessibilityData36
    command: Command7
  }
  
  export interface Icon11 {
    iconType: string
  }
  
  export interface AccessibilityData36 {
    accessibilityData: AccessibilityData37
  }
  
  export interface AccessibilityData37 {
    label: string
  }
  
  export interface Command7 {
    clickTrackingParams: string
    commandExecutorCommand: CommandExecutorCommand2
  }
  
  export interface CommandExecutorCommand2 {
    commands: Command8[]
  }
  
  export interface Command8 {
    clickTrackingParams: string
    changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction3
    updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand
  }
  
  export interface ChangeEngagementPanelVisibilityAction3 {
    targetId: string
    visibility: string
  }
  
  export interface UpdateToggleButtonStateCommand {
    toggled: boolean
    buttonId: string
  }
  
  export interface Topbar {
    desktopTopbarRenderer: DesktopTopbarRenderer
  }
  
  export interface DesktopTopbarRenderer {
    logo: Logo
    searchbox: Searchbox
    trackingParams: string
    countryCode: string
    topbarButtons: TopbarButton[]
    hotkeyDialog: HotkeyDialog
    backButton: BackButton
    forwardButton: ForwardButton
    a11ySkipNavigationButton: A11ySkipNavigationButton
    voiceSearchButton: VoiceSearchButton
  }
  
  export interface Logo {
    topbarLogoRenderer: TopbarLogoRenderer
  }
  
  export interface TopbarLogoRenderer {
    iconImage: IconImage
    tooltipText: TooltipText
    endpoint: Endpoint2
    trackingParams: string
    overrideEntityKey: string
  }
  
  export interface IconImage {
    iconType: string
  }
  
  export interface TooltipText {
    runs: Run38[]
  }
  
  export interface Run38 {
    text: string
  }
  
  export interface Endpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata44
    browseEndpoint: BrowseEndpoint7
  }
  
  export interface CommandMetadata44 {
    webCommandMetadata: WebCommandMetadata44
  }
  
  export interface WebCommandMetadata44 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
  }
  
  export interface BrowseEndpoint7 {
    browseId: string
  }
  
  export interface Searchbox {
    fusionSearchboxRenderer: FusionSearchboxRenderer
  }
  
  export interface FusionSearchboxRenderer {
    icon: Icon12
    placeholderText: PlaceholderText
    config: Config
    trackingParams: string
    searchEndpoint: SearchEndpoint
    clearButton: ClearButton
  }
  
  export interface Icon12 {
    iconType: string
  }
  
  export interface PlaceholderText {
    runs: Run39[]
  }
  
  export interface Run39 {
    text: string
  }
  
  export interface Config {
    webSearchboxConfig: WebSearchboxConfig
  }
  
  export interface WebSearchboxConfig {
    requestLanguage: string
    requestDomain: string
    hasOnscreenKeyboard: boolean
    focusSearchbox: boolean
  }
  
  export interface SearchEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata45
    searchEndpoint: SearchEndpoint2
  }
  
  export interface CommandMetadata45 {
    webCommandMetadata: WebCommandMetadata45
  }
  
  export interface WebCommandMetadata45 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SearchEndpoint2 {
    query: string
  }
  
  export interface ClearButton {
    buttonRenderer: ButtonRenderer16
  }
  
  export interface ButtonRenderer16 {
    style: string
    size: string
    isDisabled: boolean
    icon: Icon13
    trackingParams: string
    accessibilityData: AccessibilityData38
  }
  
  export interface Icon13 {
    iconType: string
  }
  
  export interface AccessibilityData38 {
    accessibilityData: AccessibilityData39
  }
  
  export interface AccessibilityData39 {
    label: string
  }
  
  export interface TopbarButton {
    topbarMenuButtonRenderer?: TopbarMenuButtonRenderer
    buttonRenderer?: ButtonRenderer17
  }
  
  export interface TopbarMenuButtonRenderer {
    icon: Icon14
    menuRenderer?: MenuRenderer5
    trackingParams: string
    accessibility: Accessibility26
    tooltip: string
    style: string
    targetId?: string
    menuRequest?: MenuRequest
  }
  
  export interface Icon14 {
    iconType: string
  }
  
  export interface MenuRenderer5 {
    multiPageMenuRenderer: MultiPageMenuRenderer
  }
  
  export interface MultiPageMenuRenderer {
    sections: Section[]
    trackingParams: string
    style: string
  }
  
  export interface Section {
    multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer
  }
  
  export interface MultiPageMenuSectionRenderer {
    items: Item4[]
    trackingParams: string
  }
  
  export interface Item4 {
    compactLinkRenderer: CompactLinkRenderer
  }
  
  export interface CompactLinkRenderer {
    icon: Icon15
    title: Title14
    navigationEndpoint: NavigationEndpoint23
    trackingParams: string
  }
  
  export interface Icon15 {
    iconType: string
  }
  
  export interface Title14 {
    runs: Run40[]
  }
  
  export interface Run40 {
    text: string
  }
  
  export interface NavigationEndpoint23 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata46
    urlEndpoint: UrlEndpoint3
  }
  
  export interface CommandMetadata46 {
    webCommandMetadata: WebCommandMetadata46
  }
  
  export interface WebCommandMetadata46 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface UrlEndpoint3 {
    url: string
    target: string
  }
  
  export interface Accessibility26 {
    accessibilityData: AccessibilityData40
  }
  
  export interface AccessibilityData40 {
    label: string
  }
  
  export interface MenuRequest {
    clickTrackingParams: string
    commandMetadata: CommandMetadata47
    signalServiceEndpoint: SignalServiceEndpoint4
  }
  
  export interface CommandMetadata47 {
    webCommandMetadata: WebCommandMetadata47
  }
  
  export interface WebCommandMetadata47 {
    sendPost: boolean
    apiUrl: string
  }
  
  export interface SignalServiceEndpoint4 {
    signal: string
    actions: Action6[]
  }
  
  export interface Action6 {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction4
  }
  
  export interface OpenPopupAction4 {
    popup: Popup4
    popupType: string
    beReused: boolean
  }
  
  export interface Popup4 {
    multiPageMenuRenderer: MultiPageMenuRenderer2
  }
  
  export interface MultiPageMenuRenderer2 {
    trackingParams: string
    style: string
    showLoadingSpinner: boolean
  }
  
  export interface ButtonRenderer17 {
    style: string
    size: string
    text: Text19
    icon: Icon16
    navigationEndpoint: NavigationEndpoint24
    trackingParams: string
    targetId: string
  }
  
  export interface Text19 {
    runs: Run41[]
  }
  
  export interface Run41 {
    text: string
  }
  
  export interface Icon16 {
    iconType: string
  }
  
  export interface NavigationEndpoint24 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata48
    signInEndpoint: SignInEndpoint6
  }
  
  export interface CommandMetadata48 {
    webCommandMetadata: WebCommandMetadata48
  }
  
  export interface WebCommandMetadata48 {
    url: string
    webPageType: string
    rootVe: number
  }
  
  export interface SignInEndpoint6 {
    idamTag: string
  }
  
  export interface HotkeyDialog {
    hotkeyDialogRenderer: HotkeyDialogRenderer
  }
  
  export interface HotkeyDialogRenderer {
    title: Title15
    sections: Section2[]
    dismissButton: DismissButton
    trackingParams: string
  }
  
  export interface Title15 {
    runs: Run42[]
  }
  
  export interface Run42 {
    text: string
  }
  
  export interface Section2 {
    hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer
  }
  
  export interface HotkeyDialogSectionRenderer {
    title: Title16
    options: Option[]
  }
  
  export interface Title16 {
    runs: Run43[]
  }
  
  export interface Run43 {
    text: string
  }
  
  export interface Option {
    hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer
  }
  
  export interface HotkeyDialogSectionOptionRenderer {
    label: Label
    hotkey: string
    hotkeyAccessibilityLabel?: HotkeyAccessibilityLabel
  }
  
  export interface Label {
    runs: Run44[]
  }
  
  export interface Run44 {
    text: string
  }
  
  export interface HotkeyAccessibilityLabel {
    accessibilityData: AccessibilityData41
  }
  
  export interface AccessibilityData41 {
    label: string
  }
  
  export interface DismissButton {
    buttonRenderer: ButtonRenderer18
  }
  
  export interface ButtonRenderer18 {
    style: string
    size: string
    isDisabled: boolean
    text: Text20
    trackingParams: string
  }
  
  export interface Text20 {
    runs: Run45[]
  }
  
  export interface Run45 {
    text: string
  }
  
  export interface BackButton {
    buttonRenderer: ButtonRenderer19
  }
  
  export interface ButtonRenderer19 {
    trackingParams: string
    command: Command9
  }
  
  export interface Command9 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata49
    signalServiceEndpoint: SignalServiceEndpoint5
  }
  
  export interface CommandMetadata49 {
    webCommandMetadata: WebCommandMetadata49
  }
  
  export interface WebCommandMetadata49 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint5 {
    signal: string
    actions: Action7[]
  }
  
  export interface Action7 {
    clickTrackingParams: string
    signalAction: SignalAction2
  }
  
  export interface SignalAction2 {
    signal: string
  }
  
  export interface ForwardButton {
    buttonRenderer: ButtonRenderer20
  }
  
  export interface ButtonRenderer20 {
    trackingParams: string
    command: Command10
  }
  
  export interface Command10 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata50
    signalServiceEndpoint: SignalServiceEndpoint6
  }
  
  export interface CommandMetadata50 {
    webCommandMetadata: WebCommandMetadata50
  }
  
  export interface WebCommandMetadata50 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint6 {
    signal: string
    actions: Action8[]
  }
  
  export interface Action8 {
    clickTrackingParams: string
    signalAction: SignalAction3
  }
  
  export interface SignalAction3 {
    signal: string
  }
  
  export interface A11ySkipNavigationButton {
    buttonRenderer: ButtonRenderer21
  }
  
  export interface ButtonRenderer21 {
    style: string
    size: string
    isDisabled: boolean
    text: Text21
    trackingParams: string
    command: Command11
  }
  
  export interface Text21 {
    runs: Run46[]
  }
  
  export interface Run46 {
    text: string
  }
  
  export interface Command11 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata51
    signalServiceEndpoint: SignalServiceEndpoint7
  }
  
  export interface CommandMetadata51 {
    webCommandMetadata: WebCommandMetadata51
  }
  
  export interface WebCommandMetadata51 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint7 {
    signal: string
    actions: Action9[]
  }
  
  export interface Action9 {
    clickTrackingParams: string
    signalAction: SignalAction4
  }
  
  export interface SignalAction4 {
    signal: string
  }
  
  export interface VoiceSearchButton {
    buttonRenderer: ButtonRenderer22
  }
  
  export interface ButtonRenderer22 {
    style: string
    size: string
    isDisabled: boolean
    serviceEndpoint: ServiceEndpoint4
    icon: Icon18
    tooltip: string
    trackingParams: string
    accessibilityData: AccessibilityData44
  }
  
  export interface ServiceEndpoint4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata52
    signalServiceEndpoint: SignalServiceEndpoint8
  }
  
  export interface CommandMetadata52 {
    webCommandMetadata: WebCommandMetadata52
  }
  
  export interface WebCommandMetadata52 {
    sendPost: boolean
  }
  
  export interface SignalServiceEndpoint8 {
    signal: string
    actions: Action10[]
  }
  
  export interface Action10 {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction5
  }
  
  export interface OpenPopupAction5 {
    popup: Popup5
    popupType: string
  }
  
  export interface Popup5 {
    voiceSearchDialogRenderer: VoiceSearchDialogRenderer
  }
  
  export interface VoiceSearchDialogRenderer {
    placeholderHeader: PlaceholderHeader
    promptHeader: PromptHeader
    exampleQuery1: ExampleQuery1
    exampleQuery2: ExampleQuery2
    promptMicrophoneLabel: PromptMicrophoneLabel
    loadingHeader: LoadingHeader
    connectionErrorHeader: ConnectionErrorHeader
    connectionErrorMicrophoneLabel: ConnectionErrorMicrophoneLabel
    permissionsHeader: PermissionsHeader
    permissionsSubtext: PermissionsSubtext
    disabledHeader: DisabledHeader
    disabledSubtext: DisabledSubtext
    microphoneButtonAriaLabel: MicrophoneButtonAriaLabel
    exitButton: ExitButton
    trackingParams: string
    microphoneOffPromptHeader: MicrophoneOffPromptHeader
  }
  
  export interface PlaceholderHeader {
    runs: Run47[]
  }
  
  export interface Run47 {
    text: string
  }
  
  export interface PromptHeader {
    runs: Run48[]
  }
  
  export interface Run48 {
    text: string
  }
  
  export interface ExampleQuery1 {
    runs: Run49[]
  }
  
  export interface Run49 {
    text: string
  }
  
  export interface ExampleQuery2 {
    runs: Run50[]
  }
  
  export interface Run50 {
    text: string
  }
  
  export interface PromptMicrophoneLabel {
    runs: Run51[]
  }
  
  export interface Run51 {
    text: string
  }
  
  export interface LoadingHeader {
    runs: Run52[]
  }
  
  export interface Run52 {
    text: string
  }
  
  export interface ConnectionErrorHeader {
    runs: Run53[]
  }
  
  export interface Run53 {
    text: string
  }
  
  export interface ConnectionErrorMicrophoneLabel {
    runs: Run54[]
  }
  
  export interface Run54 {
    text: string
  }
  
  export interface PermissionsHeader {
    runs: Run55[]
  }
  
  export interface Run55 {
    text: string
  }
  
  export interface PermissionsSubtext {
    runs: Run56[]
  }
  
  export interface Run56 {
    text: string
  }
  
  export interface DisabledHeader {
    runs: Run57[]
  }
  
  export interface Run57 {
    text: string
  }
  
  export interface DisabledSubtext {
    runs: Run58[]
  }
  
  export interface Run58 {
    text: string
  }
  
  export interface MicrophoneButtonAriaLabel {
    runs: Run59[]
  }
  
  export interface Run59 {
    text: string
  }
  
  export interface ExitButton {
    buttonRenderer: ButtonRenderer23
  }
  
  export interface ButtonRenderer23 {
    style: string
    size: string
    isDisabled: boolean
    icon: Icon17
    trackingParams: string
    accessibilityData: AccessibilityData42
  }
  
  export interface Icon17 {
    iconType: string
  }
  
  export interface AccessibilityData42 {
    accessibilityData: AccessibilityData43
  }
  
  export interface AccessibilityData43 {
    label: string
  }
  
  export interface MicrophoneOffPromptHeader {
    runs: Run60[]
  }
  
  export interface Run60 {
    text: string
  }
  
  export interface Icon18 {
    iconType: string
  }
  
  export interface AccessibilityData44 {
    accessibilityData: AccessibilityData45
  }
  
  export interface AccessibilityData45 {
    label: string
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
    options: Options
  }
  
  export interface Options {
    persistenceOption: string
  }
  
  export interface Timestamp {
    seconds: string
    nanos: number
  }
  