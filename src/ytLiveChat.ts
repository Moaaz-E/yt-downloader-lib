export interface YTLiveChatResponse {
  responseContext: ResponseContext
  continuationContents: ContinuationContents
  trackingParams: string
}

export interface ResponseContext {
  visitorData: string
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

export interface ContinuationContents {
  liveChatContinuation: LiveChatContinuation
}

export interface LiveChatContinuation {
  continuations: Continuation[]
  actions: Action[]
  actionPanel: ActionPanel
  itemList: ItemList
  header: Header2
  ticker: Ticker
  trackingParams: string
  participantsList: ParticipantsList
  popoutMessage: PopoutMessage
  clientMessages: ClientMessages
}

export interface Continuation {
  timedContinuationData: TimedContinuationData
}

export interface TimedContinuationData {
  timeoutMs: number
  continuation: string
  clickTrackingParams: string
}

export interface Action {
  clickTrackingParams: string
  addBannerToLiveChatCommand?: AddBannerToLiveChatCommand
  addChatItemAction?: AddChatItemAction
  markChatItemAsDeletedAction?: MarkChatItemAsDeletedAction
}

export interface AddBannerToLiveChatCommand {
  bannerRenderer: BannerRenderer
}

export interface BannerRenderer {
  liveChatBannerRenderer: LiveChatBannerRenderer
}

export interface LiveChatBannerRenderer {
  header: Header
  contents: Contents
  actionId: string
  viewerIsCreator: boolean
  targetId: string
  isStackable: boolean
  backgroundType: string
}

export interface Header {
  liveChatBannerHeaderRenderer: LiveChatBannerHeaderRenderer
}

export interface LiveChatBannerHeaderRenderer {
  icon: Icon
  text: Text
  contextMenuButton: ContextMenuButton
}

export interface Icon {
  iconType: string
}

export interface Text {
  runs: Run[]
}

export interface Run {
  text: string
}

export interface ContextMenuButton {
  buttonRenderer: ButtonRenderer
}

export interface ButtonRenderer {
  icon: Icon2
  accessibility: Accessibility
  trackingParams: string
  accessibilityData: AccessibilityData
  command: Command
}

export interface Icon2 {
  iconType: string
}

export interface Accessibility {
  label: string
}

export interface AccessibilityData {
  accessibilityData: AccessibilityData2
}

export interface AccessibilityData2 {
  label: string
}

export interface Command {
  clickTrackingParams: string
  commandMetadata: CommandMetadata
  liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata
}

export interface WebCommandMetadata {
  ignoreNavigation: boolean
}

export interface LiveChatItemContextMenuEndpoint {
  params: string
}

export interface Contents {
  liveChatTextMessageRenderer: LiveChatTextMessageRenderer
}

export interface LiveChatTextMessageRenderer {
  message: Message
  authorName: AuthorName
  authorPhoto: AuthorPhoto
  id: string
  timestampUsec: string
  authorBadges: AuthorBadge[]
  authorExternalChannelId: string
  trackingParams: string
}

export interface Message {
  runs: Run2[]
}

export interface Run2 {
  text?: string
  emoji?: Emoji
  navigationEndpoint?: NavigationEndpoint
}

export interface Emoji {
  emojiId: string
  shortcuts: string[]
  searchTerms: string[]
  image: Image
}

export interface Image {
  thumbnails: Thumbnail[]
  accessibility: Accessibility2
}

export interface Thumbnail {
  url: string
}

export interface Accessibility2 {
  accessibilityData: AccessibilityData3
}

export interface AccessibilityData3 {
  label: string
}

export interface NavigationEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata2
  urlEndpoint: UrlEndpoint
}

export interface CommandMetadata2 {
  webCommandMetadata: WebCommandMetadata2
}

export interface WebCommandMetadata2 {
  url: string
  webPageType: string
  rootVe: number
}

export interface UrlEndpoint {
  url: string
  target: string
  nofollow: boolean
}

export interface AuthorName {
  simpleText: string
}

export interface AuthorPhoto {
  thumbnails: Thumbnail2[]
}

export interface Thumbnail2 {
  url: string
  width: number
  height: number
}

export interface AuthorBadge {
  liveChatAuthorBadgeRenderer: LiveChatAuthorBadgeRenderer
}

export interface LiveChatAuthorBadgeRenderer {
  icon: Icon3
  tooltip: string
  accessibility: Accessibility3
}

export interface Icon3 {
  iconType: string
}

export interface Accessibility3 {
  accessibilityData: AccessibilityData4
}

export interface AccessibilityData4 {
  label: string
}

export interface AddChatItemAction {
  item: Item
  clientId?: string
}

export interface Item {
  liveChatViewerEngagementMessageRenderer?: LiveChatViewerEngagementMessageRenderer
  liveChatTextMessageRenderer?: LiveChatTextMessageRenderer2
}

export interface LiveChatViewerEngagementMessageRenderer {
  id: string
  timestampUsec: string
  icon: Icon4
  message: Message2
  actionButton: ActionButton
  trackingParams: string
}

export interface Icon4 {
  iconType: string
}

export interface Message2 {
  runs: Run3[]
}

export interface Run3 {
  text: string
}

export interface ActionButton {
  buttonRenderer: ButtonRenderer2
}

export interface ButtonRenderer2 {
  style: string
  size: string
  isDisabled: boolean
  text: Text2
  navigationEndpoint: NavigationEndpoint2
  trackingParams: string
  accessibilityData: AccessibilityData5
}

export interface Text2 {
  simpleText: string
}

export interface NavigationEndpoint2 {
  clickTrackingParams: string
  commandMetadata: CommandMetadata3
  urlEndpoint: UrlEndpoint2
}

export interface CommandMetadata3 {
  webCommandMetadata: WebCommandMetadata3
}

export interface WebCommandMetadata3 {
  url: string
  webPageType: string
  rootVe: number
}

export interface UrlEndpoint2 {
  url: string
  target: string
}

export interface AccessibilityData5 {
  accessibilityData: AccessibilityData6
}

export interface AccessibilityData6 {
  label: string
}

export interface LiveChatTextMessageRenderer2 {
  message: Message3
  authorName: AuthorName2
  authorPhoto: AuthorPhoto2
  contextMenuEndpoint: ContextMenuEndpoint
  id: string
  timestampUsec: string
  authorExternalChannelId: string
  contextMenuAccessibility: ContextMenuAccessibility
  trackingParams: string
}

export interface Message3 {
  runs: Run4[]
}

export interface Run4 {
  text?: string
  emoji?: Emoji2
}

export interface Emoji2 {
  emojiId: string
  shortcuts: string[]
  searchTerms: string[]
  image: Image2
  supportsSkinTone?: boolean
  variantIds?: string[]
  isCustomEmoji?: boolean
}

export interface Image2 {
  thumbnails: Thumbnail3[]
  accessibility: Accessibility4
}

export interface Thumbnail3 {
  url: string
  width?: number
  height?: number
}

export interface Accessibility4 {
  accessibilityData: AccessibilityData7
}

export interface AccessibilityData7 {
  label: string
}

export interface AuthorName2 {
  simpleText: string
}

export interface AuthorPhoto2 {
  thumbnails: Thumbnail4[]
}

export interface Thumbnail4 {
  url: string
  width: number
  height: number
}

export interface ContextMenuEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata4
  liveChatItemContextMenuEndpoint: LiveChatItemContextMenuEndpoint2
}

export interface CommandMetadata4 {
  webCommandMetadata: WebCommandMetadata4
}

export interface WebCommandMetadata4 {
  ignoreNavigation: boolean
}

export interface LiveChatItemContextMenuEndpoint2 {
  params: string
}

export interface ContextMenuAccessibility {
  accessibilityData: AccessibilityData8
}

export interface AccessibilityData8 {
  label: string
}

export interface MarkChatItemAsDeletedAction {
  deletedStateMessage: DeletedStateMessage
  targetItemId: string
}

export interface DeletedStateMessage {
  runs: Run5[]
}

export interface Run5 {
  text: string
}

export interface ActionPanel {
  liveChatMessageInputRenderer: LiveChatMessageInputRenderer
}

export interface LiveChatMessageInputRenderer {
  inputField: InputField
  sendButton: SendButton
  pickers: Picker[]
  pickerButtons: PickerButton[]
  interactionMessage: InteractionMessage
  targetId: string
}

export interface InputField {
  liveChatTextInputFieldRenderer: LiveChatTextInputFieldRenderer
}

export interface LiveChatTextInputFieldRenderer {
  placeholder: Placeholder
  maxCharacterLimit: number
  emojiCharacterCount: number
}

export interface Placeholder {
  runs: Run6[]
}

export interface Run6 {
  text: string
}

export interface SendButton {
  buttonRenderer: ButtonRenderer3
}

export interface ButtonRenderer3 {
  style: string
  size: string
  isDisabled: boolean
  icon: Icon5
  accessibility: Accessibility5
  trackingParams: string
  accessibilityData: AccessibilityData9
}

export interface Icon5 {
  iconType: string
}

export interface Accessibility5 {
  label: string
}

export interface AccessibilityData9 {
  accessibilityData: AccessibilityData10
}

export interface AccessibilityData10 {
  label: string
}

export interface Picker {
  emojiPickerRenderer: EmojiPickerRenderer
}

export interface EmojiPickerRenderer {
  id: string
  categories: Category[]
  categoryButtons: CategoryButton[]
  searchPlaceholderText: SearchPlaceholderText
  searchNoResultsText: SearchNoResultsText
  pickSkinToneText: PickSkinToneText
  trackingParams: string
  clearSearchLabel: string
  skinToneGenericLabel: string
  skinToneLightLabel: string
  skinToneMediumLightLabel: string
  skinToneMediumLabel: string
  skinToneMediumDarkLabel: string
  skinToneDarkLabel: string
}

export interface Category {
  emojiPickerCategoryRenderer: EmojiPickerCategoryRenderer
}

export interface EmojiPickerCategoryRenderer {
  categoryId: string
  title: Title
  trackingParams: string
  emojiData: EmojiDaum[]
  imageLoadingLazy: boolean
  usePngImages: boolean
}

export interface Title {
  simpleText: string
}

export interface EmojiDaum {
  emojiId: string
  variantIds?: string[]
  multiSelectorThumbnailRow?: MultiSelectorThumbnailRow[]
}

export interface MultiSelectorThumbnailRow {
  thumbnails: Thumbnail5[]
}

export interface Thumbnail5 {
  thumbnails: Thumbnail6[]
}

export interface Thumbnail6 {
  url: string
}

export interface CategoryButton {
  emojiPickerCategoryButtonRenderer: EmojiPickerCategoryButtonRenderer
}

export interface EmojiPickerCategoryButtonRenderer {
  categoryId: string
  icon: Icon6
  tooltip: string
  accessibility: Accessibility6
  targetId?: string
}

export interface Icon6 {
  iconType: string
}

export interface Accessibility6 {
  accessibilityData: AccessibilityData11
}

export interface AccessibilityData11 {
  label: string
}

export interface SearchPlaceholderText {
  runs: Run7[]
}

export interface Run7 {
  text: string
}

export interface SearchNoResultsText {
  runs: Run8[]
}

export interface Run8 {
  text: string
}

export interface PickSkinToneText {
  runs: Run9[]
}

export interface Run9 {
  text: string
}

export interface PickerButton {
  liveChatIconToggleButtonRenderer: LiveChatIconToggleButtonRenderer
}

export interface LiveChatIconToggleButtonRenderer {
  targetId: string
  icon: Icon7
  tooltip: string
  accessibility: Accessibility7
  toggledIcon: ToggledIcon
  trackingParams: string
}

export interface Icon7 {
  iconType: string
}

export interface Accessibility7 {
  accessibilityData: AccessibilityData12
}

export interface AccessibilityData12 {
  label: string
}

export interface ToggledIcon {
  iconType: string
}

export interface InteractionMessage {
  messageRenderer: MessageRenderer
}

export interface MessageRenderer {
  trackingParams: string
  button: Button
  subtext: Subtext
}

export interface Button {
  buttonRenderer: ButtonRenderer4
}

export interface ButtonRenderer4 {
  style: string
  size: string
  isDisabled: boolean
  text: Text3
  navigationEndpoint: NavigationEndpoint3
  accessibility: Accessibility8
  trackingParams: string
  accessibilityData: AccessibilityData13
}

export interface Text3 {
  simpleText: string
}

export interface NavigationEndpoint3 {
  clickTrackingParams: string
  commandMetadata: CommandMetadata5
  signInEndpoint: SignInEndpoint
}

export interface CommandMetadata5 {
  webCommandMetadata: WebCommandMetadata5
}

export interface WebCommandMetadata5 {
  url: string
  webPageType: string
  rootVe: number
}

export interface SignInEndpoint {
  nextEndpoint: NextEndpoint
}

export interface NextEndpoint {
  clickTrackingParams: string
  commandMetadata: CommandMetadata6
  watchEndpoint: WatchEndpoint
}

export interface CommandMetadata6 {
  webCommandMetadata: WebCommandMetadata6
}

export interface WebCommandMetadata6 {
  url: string
  webPageType: string
  rootVe: number
}

export interface WatchEndpoint {
  videoId: string
}

export interface Accessibility8 {
  label: string
}

export interface AccessibilityData13 {
  accessibilityData: AccessibilityData14
}

export interface AccessibilityData14 {
  label: string
}

export interface Subtext {
  messageSubtextRenderer: MessageSubtextRenderer
}

export interface MessageSubtextRenderer {
  text: Text4
}

export interface Text4 {
  simpleText: string
}

export interface ItemList {
  liveChatItemListRenderer: LiveChatItemListRenderer
}

export interface LiveChatItemListRenderer {
  maxItemsToDisplay: number
  moreCommentsBelowButton: MoreCommentsBelowButton
  enablePauseChatKeyboardShortcuts: boolean
}

export interface MoreCommentsBelowButton {
  buttonRenderer: ButtonRenderer5
}

export interface ButtonRenderer5 {
  style: string
  icon: Icon8
  trackingParams: string
  accessibilityData: AccessibilityData15
}

export interface Icon8 {
  iconType: string
}

export interface AccessibilityData15 {
  accessibilityData: AccessibilityData16
}

export interface AccessibilityData16 {
  label: string
}

export interface Header2 {
  liveChatHeaderRenderer: LiveChatHeaderRenderer
}

export interface LiveChatHeaderRenderer {
  overflowMenu: OverflowMenu
  collapseButton: CollapseButton
  viewSelector: ViewSelector
}

export interface OverflowMenu {
  menuRenderer: MenuRenderer
}

export interface MenuRenderer {
  items: Item2[]
  trackingParams: string
  accessibility: Accessibility9
}

export interface Item2 {
  menuServiceItemRenderer?: MenuServiceItemRenderer
  menuNavigationItemRenderer?: MenuNavigationItemRenderer
}

export interface MenuServiceItemRenderer {
  text: Text5
  icon: Icon9
  serviceEndpoint: ServiceEndpoint
  trackingParams: string
}

export interface Text5 {
  runs: Run10[]
}

export interface Run10 {
  text: string
}

export interface Icon9 {
  iconType: string
}

export interface ServiceEndpoint {
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
  text: Text6
  icon: Icon10
  navigationEndpoint: NavigationEndpoint4
  trackingParams: string
}

export interface Text6 {
  runs: Run11[]
}

export interface Run11 {
  text: string
}

export interface Icon10 {
  iconType: string
}

export interface NavigationEndpoint4 {
  clickTrackingParams: string
  commandMetadata: CommandMetadata7
  userFeedbackEndpoint: UserFeedbackEndpoint
}

export interface CommandMetadata7 {
  webCommandMetadata: WebCommandMetadata7
}

export interface WebCommandMetadata7 {
  ignoreNavigation: boolean
}

export interface UserFeedbackEndpoint {
  hack: boolean
  bucketIdentifier: string
}

export interface Accessibility9 {
  accessibilityData: AccessibilityData17
}

export interface AccessibilityData17 {
  label: string
}

export interface CollapseButton {
  buttonRenderer: ButtonRenderer6
}

export interface ButtonRenderer6 {
  style: string
  size: string
  isDisabled: boolean
  accessibility: Accessibility10
  trackingParams: string
}

export interface Accessibility10 {
  label: string
}

export interface ViewSelector {
  sortFilterSubMenuRenderer: SortFilterSubMenuRenderer
}

export interface SortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[]
  accessibility: Accessibility12
  trackingParams: string
}

export interface SubMenuItem {
  title: string
  selected: boolean
  continuation: Continuation2
  accessibility: Accessibility11
  subtitle: string
  trackingParams: string
}

export interface Continuation2 {
  reloadContinuationData: ReloadContinuationData
}

export interface ReloadContinuationData {
  continuation: string
  clickTrackingParams: string
}

export interface Accessibility11 {
  accessibilityData: AccessibilityData18
}

export interface AccessibilityData18 {
  label: string
}

export interface Accessibility12 {
  accessibilityData: AccessibilityData19
}

export interface AccessibilityData19 {
  label: string
}

export interface Ticker {
  liveChatTickerRenderer: LiveChatTickerRenderer
}

export interface LiveChatTickerRenderer {
  sentinel: boolean
}

export interface ParticipantsList {
  liveChatParticipantsListRenderer: LiveChatParticipantsListRenderer
}

export interface LiveChatParticipantsListRenderer {
  title: Title2
  backButton: BackButton
  participants: Participant[]
}

export interface Title2 {
  runs: Run12[]
}

export interface Run12 {
  text: string
}

export interface BackButton {
  buttonRenderer: ButtonRenderer7
}

export interface ButtonRenderer7 {
  icon: Icon11
  trackingParams: string
  accessibilityData: AccessibilityData20
}

export interface Icon11 {
  iconType: string
}

export interface AccessibilityData20 {
  accessibilityData: AccessibilityData21
}

export interface AccessibilityData21 {
  label: string
}

export interface Participant {
  liveChatParticipantRenderer: LiveChatParticipantRenderer
}

export interface LiveChatParticipantRenderer {
  authorName: AuthorName3
  authorPhoto: AuthorPhoto3
  authorBadges: AuthorBadge2[]
}

export interface AuthorName3 {
  simpleText: string
}

export interface AuthorPhoto3 {
  thumbnails: Thumbnail7[]
}

export interface Thumbnail7 {
  url: string
  width: number
  height: number
}

export interface AuthorBadge2 {
  liveChatAuthorBadgeRenderer: LiveChatAuthorBadgeRenderer2
}

export interface LiveChatAuthorBadgeRenderer2 {
  icon: Icon12
  tooltip: string
  accessibility: Accessibility13
}

export interface Icon12 {
  iconType: string
}

export interface Accessibility13 {
  accessibilityData: AccessibilityData22
}

export interface AccessibilityData22 {
  label: string
}

export interface PopoutMessage {
  messageRenderer: MessageRenderer2
}

export interface MessageRenderer2 {
  text: Text7
  trackingParams: string
  button: Button2
}

export interface Text7 {
  runs: Run13[]
}

export interface Run13 {
  text: string
}

export interface Button2 {
  buttonRenderer: ButtonRenderer8
}

export interface ButtonRenderer8 {
  style: string
  text: Text8
  serviceEndpoint: ServiceEndpoint2
  trackingParams: string
}

export interface Text8 {
  runs: Run14[]
}

export interface Run14 {
  text: string
}

export interface ServiceEndpoint2 {
  clickTrackingParams: string
  popoutLiveChatEndpoint: PopoutLiveChatEndpoint2
}

export interface PopoutLiveChatEndpoint2 {
  url: string
}

export interface ClientMessages {
  reconnectMessage: ReconnectMessage
  unableToReconnectMessage: UnableToReconnectMessage
  fatalError: FatalError
  reconnectedMessage: ReconnectedMessage
  genericError: GenericError
}

export interface ReconnectMessage {
  runs: Run15[]
}

export interface Run15 {
  text: string
}

export interface UnableToReconnectMessage {
  runs: Run16[]
}

export interface Run16 {
  text: string
}

export interface FatalError {
  runs: Run17[]
}

export interface Run17 {
  text: string
}

export interface ReconnectedMessage {
  runs: Run18[]
}

export interface Run18 {
  text: string
}

export interface GenericError {
  runs: Run19[]
}

export interface Run19 {
  text: string
}
