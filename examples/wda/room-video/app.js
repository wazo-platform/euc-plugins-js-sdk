// Global
const EVENT_ON_LOADED = 'wazo/ON_LOADED';
const EVENT_APP_UNLOADED = 'wazo/EVENT_APP_UNLOADED';
const EVENT_APP_INITIALIZE = 'wazo/EVENT_APP_INITIALIZE';
const EVENT_ON_LOGOUT = 'wazo/EVENT_ON_LOGOUT';
const EVENT_SEND_IFRAME_MESSAGE = 'wazo/EVENT_SEND_IFRAME_MESSAGE';
const EVENT_SEND_BACKGROUND_MESSAGE = 'wazo/EVENT_SEND_BACKGROUND_MESSAGE';
const EVENT_ON_IFRAME_MESSAGE = 'wazo/EVENT_ON_IFRAME_MESSAGE';
const EVENT_ON_BACKGROUND_MESSAGE = 'wazo/EVENT_ON_BACKGROUND_MESSAGE';
// WDA
const EVENT_CLOSE_LEFT_PANEL = 'wazo/EVENT_CLOSE_LEFT_PANEL';
const EVENT_OPEN_LEFT_PANEL = 'wazo/EVENT_OPEN_LEFT_PANEL';
const EVENT_START_CALL = 'wazo/START_CALL';
const EVENT_ON_CALL_INCOMING = 'wazo/EVENT_ON_CALL_INCOMING';
const EVENT_ON_CALL_MADE = 'wazo/EVENT_ON_CALL_MADE';
const EVENT_ON_CALL_ANSWERED = 'wazo/EVENT_ON_CALL_ANSWERED';
const EVENT_ON_CALL_HANGED_UP = 'wazo/EVENT_ON_CALL_HANGED_UP';
const EVENT_OPEN_LINK = 'wazo/EVENT_OPEN_LINK';
const EVENT_CREATE_MEETING = 'wazo/EVENT_CREATE_MEETING';
const EVENT_OPEN_MEETING_LOBBY = 'wazo/EVENT_OPEN_MEETING_LOBBY';
const EVENT_OPEN_SETTINGS = 'wazo/EVENT_OPEN_SETTINGS';
const EVENT_ON_MEETING_CREATED = 'wazo/EVENT_ON_MEETING_CREATED';
const EVENT_ROUTE_CHANGE = 'wazo/EVENT_ROUTE_CHANGE';
const EVENT_WS_MESSAGE = 'wazo/EVENT_WS_MESSAGE';
const EVENT_PLAY_PROGRESS_SOUND = 'wazo/EVENT_PLAY_PROGRESS_SOUND';
const EVENT_PLAY_NEW_MESSAGE_SOUND = 'wazo/EVENT_PLAY_NEW_MESSAGE_SOUND';
const EVENT_PLAY_INCOMING_CALL_SOUND = 'wazo/EVENT_PLAY_INCOMING_CALL_SOUND';
const EVENT_PLAY_DOUBLE_CALL_SOUND = 'wazo/EVENT_PLAY_DOUBLE_CALL_SOUND';
const EVENT_PLAY_HANGUP_SOUND = 'wazo/EVENT_PLAY_HANGUP_SOUND';
const EVENT_STOP_CURRENT_SOUND = 'wazo/EVENT_STOP_CURRENT_SOUND';
const EVENT_DISPLAY_NOTIFICATION = 'wazo/EVENT_DISPLAY_NOTIFICATION';
const EVENT_CHANGE_NAVBAR_COLOR = 'wazo/EVENT_CHANGE_NAVBAR_COLOR';
const EVENT_RESET_NAVBAR_COLOR = 'wazo/EVENT_RESET_NAVBAR_COLOR';
const EVENT_DISPLAY_MODAL = 'wazo/EVENT_DISPLAY_MODAL';
const EVENT_REMOVE_MODAL = 'wazo/EVENT_REMOVE_MODAL';
const EVENT_USER_JOIN_ROOM = 'wazo/EVENT_USER_JOIN_ROOM';
const EVENT_USER_LEAVE_ROOM = 'wazo/EVENT_USER_LEAVE_ROOM';
const EVENT_PARTICIPANT_JOIN_ROOM = 'wazo/EVENT_PARTICIPANT_JOIN_ROOM';
const EVENT_PARTICIPANT_LEAVE_ROOM = 'wazo/EVENT_PARTICIPANT_LEAVE_ROOM';
// Portal
const EVENT_ON_CONNECTED_TO_STACK = 'wazo/EVENT_ON_CONNECTED_TO_STACK';
const EVENT_ON_SWITCH_STACK_TENANT = 'wazo/EVENT_ON_SWITCH_STACK_TENANT';
const EVENT_CHANGE_TOOLBAR_DISPLAY = 'wazo/EVENT_CHANGE_TOOLBAR_DISPLAY';
const initializationTimeoutInMs = 5000;
class App {
    constructor() {
        // Global
        this.onUnLoaded = (e) => { };
        this.onAppUnLoaded = (tabId) => { };
        this.onIframeMessage = (message) => { };
        this.onBackgroundMessage = (message) => { };
        // WDA
        this.onLogout = () => { };
        this.onCallIncoming = (call) => { };
        this.onCallMade = (call) => { };
        this.onCallAnswered = (call) => { };
        this.onCallHangedUp = (call) => { };
        this.onUnHandledEvent = (event) => { };
        this.onWebsocketMessage = (message) => { };
        this.onMeetingCreated = (meeting) => { };
        this.onRouteChanged = (location, action) => { };
        this.onUserJoinRoom = (room) => { };
        this.onUserLeaveRoom = (room) => { };
        this.onParticipantJoinRoom = (room, participant) => { };
        this.onParticipantLeaveRoom = (room, participant) => { };
        // Portal
        this.onConnectedToStack = (stackSession) => { };
        this.onSwitchTenant = (uuid, name) => { };
        this.initialize = async () => {
            if (this.isInitialized()) {
                return Promise.resolve();
            }
            window.addEventListener('message', this._onMessage, false);
            return new Promise((resolve, reject) => {
                this._sendMessage(EVENT_APP_INITIALIZE, { bg: this._isBackground });
                this._initializeTimeout = setTimeout(() => {
                    this._initializeTimeout = null;
                    reject('SDK initialize timeout');
                }, initializationTimeoutInMs);
                this._initializeResolve = resolve;
            });
        };
        this.isInitialized = () => {
            return this._initializeCompleted;
        };
        // Global
        this.getContext = () => this.context;
        this.sendMessageToIframe = (payload) => this._sendMessage(EVENT_SEND_IFRAME_MESSAGE, { payload });
        this.sendMessageToBackground = (payload) => this._sendMessage(EVENT_SEND_BACKGROUND_MESSAGE, { payload });
        // WDA
        this.startCall = ({ targets, requestedModalities = ['audio'] }) => {
            this._sendMessage(EVENT_START_CALL, { targets, requestedModalities });
        };
        this.openLink = (url) => {
            this._sendMessage(EVENT_OPEN_LINK, { url });
        };
        this.createMeeting = (name, requireAuthorization = false, persistent = false) => {
            this._sendMessage(EVENT_CREATE_MEETING, { name, requireAuthorization, persistent });
        };
        this.openMeetingLobby = (extension) => {
            this._sendMessage(EVENT_OPEN_MEETING_LOBBY, { extension });
        };
        this.openSettings = () => {
            // @TODO: Fix it in WDA
            // this._sendMessage(EVENT_OPEN_SETTINGS);
        };
        this.closeLeftPanel = () => this._sendMessage(EVENT_CLOSE_LEFT_PANEL);
        this.openLeftPanel = () => this._sendMessage(EVENT_OPEN_LEFT_PANEL);
        this.playProgressSound = () => this._sendMessage(EVENT_PLAY_PROGRESS_SOUND);
        this.playNewMessageSound = () => this._sendMessage(EVENT_PLAY_NEW_MESSAGE_SOUND);
        this.playIncomingCallSound = () => this._sendMessage(EVENT_PLAY_INCOMING_CALL_SOUND);
        this.playDoubleCallSound = () => this._sendMessage(EVENT_PLAY_DOUBLE_CALL_SOUND);
        this.playHangupSound = () => this._sendMessage(EVENT_PLAY_HANGUP_SOUND);
        this.stopCurrentSound = () => this._sendMessage(EVENT_STOP_CURRENT_SOUND);
        this.changeNavBarColor = (color) => this._sendMessage(EVENT_CHANGE_NAVBAR_COLOR, { color });
        this.resetNavBarColor = () => this._sendMessage(EVENT_RESET_NAVBAR_COLOR);
        this.displayNotification = (title, text) => this._sendMessage(EVENT_DISPLAY_NOTIFICATION, { title, text });
        this.displayModal = ({ url, title, text, htmlText, height, width }) => this._sendMessage(EVENT_DISPLAY_MODAL, { url, title, text, htmlText, height, width });
        this.removeModal = () => this._sendMessage(EVENT_REMOVE_MODAL);
        this.hasLocalVideoStream = (call) => Wazo.Phone.phone.hasALocalVideoTrack(call);
        this.getLocalCurrentVideoStream = (call) => Wazo.Phone.phone.getLocalVideoStream(call);
        this.hasRemoveVideoStream = (call) => Wazo.Phone.phone.hasRemoteVideo(call);
        this.getRemoteVideoStream = (call) => Wazo.Phone.phone.getRemoteVideoStream(call);
        // Portal
        this.changeToolbarDisplay = (display) => this._sendMessage(EVENT_CHANGE_TOOLBAR_DISPLAY, { display });
        this._onMessage = (event) => {
            if (!event.data) {
                return;
            }
            switch (event.data.type) {
                // Global
                case EVENT_ON_LOADED:
                    this._onLoaded(event.data.session, event.data.theme, event.data.locale, event.data.extra);
                    break;
                case EVENT_APP_UNLOADED:
                    this.onAppUnLoaded(event.data.tabId);
                    break;
                case EVENT_ON_LOGOUT:
                    this.onLogout();
                    this._resetEvents();
                    break;
                case EVENT_ON_IFRAME_MESSAGE:
                    if (event.data._pluginId === this._pluginId) {
                        this.onIframeMessage(event.data.payload);
                    }
                    break;
                case EVENT_ON_BACKGROUND_MESSAGE:
                    if (event.data._pluginId === this._pluginId) {
                        this.onBackgroundMessage(event.data.payload);
                    }
                    break;
                case EVENT_USER_JOIN_ROOM:
                    this.onUserJoinRoom(event.data.room);
                    break;
                case EVENT_USER_LEAVE_ROOM:
                    this.onUserLeaveRoom(event.data.room);
                    break;
                case EVENT_PARTICIPANT_JOIN_ROOM:
                    this.onParticipantJoinRoom(event.data.room, event.data.participant);
                    break;
                case EVENT_PARTICIPANT_LEAVE_ROOM:
                    this.onParticipantLeaveRoom(event.data.room, event.data.participant);
                    break;
                // WDA
                case EVENT_WS_MESSAGE:
                    this.onWebsocketMessage(event.data.message);
                    break;
                case EVENT_ON_MEETING_CREATED:
                    this.onMeetingCreated(event.data.meeting);
                    break;
                case EVENT_ROUTE_CHANGE:
                    this.onRouteChanged(event.data.location, event.data.action);
                    break;
                case EVENT_ON_CALL_INCOMING:
                    this.onCallIncoming(event.data.call);
                    break;
                case EVENT_ON_CALL_MADE:
                    this.onCallMade(event.data.call);
                    break;
                case EVENT_ON_CALL_ANSWERED:
                    this.onCallAnswered(event.data.call);
                    break;
                case EVENT_ON_CALL_HANGED_UP:
                    this.onCallHangedUp(event.data.call);
                    break;
                // Portal
                case EVENT_ON_CONNECTED_TO_STACK:
                    this.onConnectedToStack(event.data.stackSession);
                    break;
                case EVENT_ON_SWITCH_STACK_TENANT:
                    this.onSwitchTenant(event.data.tenant.uuid, event.data.tenant.name);
                    break;
                default:
                    this.onUnHandledEvent(event);
                    break;
            }
        };
        this._sendMessage = (type, payload = {}) => {
            if (!this.isInitialized() && type !== EVENT_APP_INITIALIZE) {
                this._queuedMessages.push({ type, payload });
                return;
            }
            // @ts-ignore
            if (window.ReactNativeWebView) {
                // @ts-ignore (Mobile)
                return window.ReactNativeWebView.postMessage(JSON.stringify({ type, _pluginId: this._pluginId, ...payload }));
            }
            window.parent.postMessage({ type, _pluginId: this._pluginId, ...payload }, '*');
        };
        this._sendQueuedMessages = () => {
            this._queuedMessages.forEach(({ type, payload }) => {
                this._sendMessage(type, payload);
            });
        };
        this._onLoaded = (session, theme, locale, extra) => {
            if (this._initializeTimeout === null || this.isInitialized()) {
                return;
            }
            clearTimeout(this._initializeTimeout);
            this._initializeCompleted = true;
            this.context.app = {
                locale,
                theme,
                host: {
                    clientType: extra ? extra.clientType : null,
                },
                extra: extra,
            };
            this.context.user = session;
            if (this._initializeResolve) {
                this._initializeResolve();
            }
            this._sendQueuedMessages();
        };
        this._setPluginId = (pluginId) => {
            this._pluginId = pluginId;
        };
        this._resetEvents = () => {
            this.onUnLoaded = (e) => { };
            // WDA
            this.onLogout = () => { };
            this.onCallIncoming = (call) => { };
            this.onCallMade = (call) => { };
            this.onCallAnswered = (call) => { };
            this.onCallHangedUp = (call) => { };
            this.onUnHandledEvent = (event) => { };
            this.onWebsocketMessage = (message) => { };
            this.onMeetingCreated = (meeting) => { };
            this.onRouteChanged = (location, action) => { };
            // Portal
            this.onConnectedToStack = (stackSession) => { };
            this.onSwitchTenant = (uuid, name) => { };
        };
        this._resetEvents();
        this._initializeCompleted = false;
        this._initializeResolve = null;
        this._initializeTimeout = null;
        this._pluginId = null;
        this._isBackground = false;
        this._queuedMessages = [];
        this.context = {
            app: {
                locale: null,
                theme: null,
                host: {
                    clientType: null,
                },
                extra: null,
            },
        };
        // Can't be simplified as `window.onunload = this.onUnLoaded`
        // because `this.onUnLoaded` might not have been overridden by the module yet.
        window.onunload = (e) => {
            this.onUnLoaded(e);
        };
        // Used to fetch pluginId when loaded in an iframe
        if (window.name) {
            this._setPluginId(window.name);
        }
        // Used in background script, we expose a global method to be used in the <script> tag directly after importing the backgroundScript url
        globalThis._setPluginId = this._setPluginId;
    }
}
export default new App();
