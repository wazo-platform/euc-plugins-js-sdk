/* global Wazo */
import {
  Call,
  Room,
  Contact,
  Context,
  Meeting,
  UserInfo,
  Extra,
  ModalParameter,
  Sounds,
  PluginConfiguration,
  WDASession, PortalSession
} from './types';

declare global {
  // Deprecated, use `_configurePlugin` instead
  var _setPluginId: Function;
  var _configurePlugin: Function;
  var Wazo: any;
}

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
const EVENT_CONFIGURE_SOUNDS = 'wazo/EVENT_CONFIGURE_SOUNDS';
const EVENT_DISPLAY_NOTIFICATION = 'wazo/EVENT_DISPLAY_NOTIFICATION';
const EVENT_CHANGE_NAVBAR_COLOR = 'wazo/EVENT_CHANGE_NAVBAR_COLOR';
const EVENT_RESET_NAVBAR_COLOR = 'wazo/EVENT_RESET_NAVBAR_COLOR';
const EVENT_DISPLAY_MODAL = 'wazo/EVENT_DISPLAY_MODAL';
const EVENT_REMOVE_MODAL = 'wazo/EVENT_REMOVE_MODAL';
const EVENT_USER_JOIN_ROOM = 'wazo/EVENT_USER_JOIN_ROOM';
const EVENT_USER_LEAVE_ROOM = 'wazo/EVENT_USER_LEAVE_ROOM';
const EVENT_PARTICIPANT_JOIN_ROOM = 'wazo/EVENT_PARTICIPANT_JOIN_ROOM';
const EVENT_PARTICIPANT_LEAVE_ROOM = 'wazo/EVENT_PARTICIPANT_LEAVE_ROOM';
const EVENT_IGNORE_CALL = 'wazo/EVENT_IGNORE_CALL';
const EVENT_ON_NEW_SESSION = 'wazo/EVENT_ON_NEW_SESSION';

// Portal
const EVENT_ON_CONNECTED_TO_STACK = 'wazo/EVENT_ON_CONNECTED_TO_STACK';
const EVENT_ON_SWITCH_STACK_TENANT = 'wazo/EVENT_ON_SWITCH_STACK_TENANT';
const EVENT_CHANGE_TOOLBAR_DISPLAY = 'wazo/EVENT_CHANGE_TOOLBAR_DISPLAY';

const initializationTimeoutInMs = 5000;

type DelayedMessage = {
  type: string;
  payload: Object;
};

class App {
  context: Context;
  _initializeCompleted: boolean;
  _initializeResolve: Function | null;
  _initializeTimeout: ReturnType<typeof setTimeout> | null;
  _pluginId: string | null;
  _baseUrl: string | null;
  _queuedMessages: DelayedMessage[];
  _isBackground: boolean;

  // Global
  onNewSession = (session: WDASession | PortalSession) => {}
  onUnLoaded = (e: Event) => {};
  onAppUnLoaded = (tabId: string) => {};
  onIframeMessage = (message: Object) => { };
  onBackgroundMessage = (message: Object) => { };

  // WDA
  onLogout = () => {};
  onCallIncoming = (call: Call) =>  {};
  onCallMade = (call: Call) => {};
  onCallAnswered = (call: Call) => {};
  onCallHangedUp = (call: Call) => {};
  onUnHandledEvent = (event: MessageEvent) => {};
  onWebsocketMessage = (message: MessageEvent) => {};
  onMeetingCreated = (meeting: Meeting) => {};
  onRouteChanged = (location: Object, action: string) => {};
  onUserJoinRoom = (room: Room) => {};
  onUserLeaveRoom = (room: Room) => {};
  onParticipantJoinRoom = (room: Room, participant: Contact) => {};
  onParticipantLeaveRoom = (room: Room, participant: Contact) => {};

  // Portal
  onConnectedToStack = (stackSession: Object) => {};
  onSwitchTenant = (uuid: string, name: string) => {};

  constructor() {
    this._resetEvents();
    this._initializeCompleted = false;
    this._initializeResolve = null;
    this._initializeTimeout = null;
    this._pluginId = null;
    this._baseUrl = null;
    this._isBackground = !window.name;
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
    window.onunload = (e: Event) => {
      this.onUnLoaded(e);
    }

    // Used to fetch pluginId when loaded in an iframe
    if (window.name) {
      try {
        // Is window.name a valid JSON ?
        this._configurePlugin(JSON.parse(window.name));
      } catch (_) {
        // Deprecated way to do it, remove it in futures version
        this._configurePlugin({ pluginId: window.name });
      }
    }

    // deprecated: Used in background script, we expose a global method to be used in the <script> tag directly after importing the backgroundScript url
    globalThis._setPluginId = this._setPluginId;
    globalThis._configurePlugin = this._configurePlugin;
  }

  initialize = async () => {
    if (this.isInitialized()) {
      return Promise.resolve();
    }

    window.addEventListener('message', this._onMessage, false);

    return new Promise((resolve, reject) => {
      this._sendMessage(EVENT_APP_INITIALIZE, { bg: this._isBackground, pluginId: this._pluginId });

      this._initializeTimeout = setTimeout(() => {
        this._initializeTimeout = null;
        reject('SDK initialize timeout');
      }, initializationTimeoutInMs);

      this._initializeResolve = resolve;
    });
  };

  isInitialized = () => {
    return this._initializeCompleted;
  };

  // Global
  getContext = () => this.context;

  sendMessageToIframe = (payload: Object) => this._sendMessage(EVENT_SEND_IFRAME_MESSAGE, { payload });

  sendMessageToBackground = (payload: Object) => this._sendMessage(EVENT_SEND_BACKGROUND_MESSAGE, { payload });

  // WDA
  startCall = ({ targets , requestedModalities = ['audio'] }: { targets: string[], requestedModalities: string[] }) => {
    this._sendMessage(EVENT_START_CALL, { targets, requestedModalities });
  };

  openLink = (url: string) => {
    this._sendMessage(EVENT_OPEN_LINK, { url });
  };

  createMeeting = (name: string, requireAuthorization = false, persistent = false) => {
    this._sendMessage(EVENT_CREATE_MEETING, { name, requireAuthorization, persistent });
  };

  openMeetingLobby = (extension: string) => {
    this._sendMessage(EVENT_OPEN_MEETING_LOBBY, { extension });
  };

  openSettings = () => {
    // @TODO: Fix it in WDA
    // this._sendMessage(EVENT_OPEN_SETTINGS);
  };

  ignoreCall(call: Call) {
    this._sendMessage(EVENT_IGNORE_CALL, { call });
  }

  closeLeftPanel = () => this._sendMessage(EVENT_CLOSE_LEFT_PANEL);

  openLeftPanel = () => this._sendMessage(EVENT_OPEN_LEFT_PANEL);

  playProgressSound = () => this._sendMessage(EVENT_PLAY_PROGRESS_SOUND);

  playNewMessageSound = () => this._sendMessage(EVENT_PLAY_NEW_MESSAGE_SOUND);

  playIncomingCallSound = () => this._sendMessage(EVENT_PLAY_INCOMING_CALL_SOUND);

  playDoubleCallSound = () => this._sendMessage(EVENT_PLAY_DOUBLE_CALL_SOUND);

  playHangupSound = () => this._sendMessage(EVENT_PLAY_HANGUP_SOUND);

  stopCurrentSound = () => this._sendMessage(EVENT_STOP_CURRENT_SOUND);

  configureSounds = (sounds: Sounds) => this._sendMessage(EVENT_CONFIGURE_SOUNDS, { sounds });

  changeNavBarColor = (color: string) => this._sendMessage(EVENT_CHANGE_NAVBAR_COLOR, { color });

  resetNavBarColor = () => this._sendMessage(EVENT_RESET_NAVBAR_COLOR);

  displayNotification = (title: string, text: string) => this._sendMessage(EVENT_DISPLAY_NOTIFICATION, { title, text });

  displayModal = ({ url, title, text, htmlText, height, width }: ModalParameter) =>
    this._sendMessage(EVENT_DISPLAY_MODAL, { url, title, text, htmlText, height, width });

  removeModal = () => this._sendMessage(EVENT_REMOVE_MODAL);

  hasLocalVideoStream = (call: Call) => Wazo.Phone.phone.hasALocalVideoTrack(call);

  getLocalCurrentVideoStream = (call: Call) => Wazo.Phone.phone.getLocalVideoStream(call);

  hasRemoveVideoStream = (call: Call) => Wazo.Phone.phone.hasRemoteVideo(call);

  getRemoteVideoStream = (call: Call) => Wazo.Phone.phone.getRemoteVideoStream(call);

  // Portal
  changeToolbarDisplay = (display: boolean) => this._sendMessage(EVENT_CHANGE_TOOLBAR_DISPLAY, { display });

  _onMessage = (event: MessageEvent) => {
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
      case EVENT_ON_NEW_SESSION:
        this.onNewSession(event.data.session);
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
  }

  _sendMessage = (type: string, payload = {}) => {
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
  }

  _sendQueuedMessages = () => {
    this._queuedMessages.forEach(({ type, payload }: DelayedMessage) => {
      this._sendMessage(type, payload);
    });
  };

  _onLoaded = (session: UserInfo, theme: Object, locale: string, extra: Extra | null) => {
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
      extra: {
        ...extra,
        baseUrl: this._baseUrl,
        pluginId: this._pluginId,
      },
    };

    this.context.user = session;

    if (this._initializeResolve) {
      this._initializeResolve();
    }

    this._sendQueuedMessages();
  };

  // Deprecated, we should use `_configurePlugin` instead
  _setPluginId = (pluginId: string) => {
    this._pluginId = pluginId;
  }

  _configurePlugin = (configuration: PluginConfiguration) => {
    if (configuration.pluginId) {
      this._pluginId = configuration.pluginId;
    }
    if (configuration.baseUrl) {
      this._baseUrl = configuration.baseUrl;
    }
  }

  _resetEvents = () => {
    this.onUnLoaded = (e: Event) => {};
    this.onAppUnLoaded = (tabId: string) => {};
    this.onIframeMessage = (message: Object) => { };
    this.onBackgroundMessage = (message: Object) => { };

    // WDA
    this.onLogout = () => {};
    this.onNewSession = (session: WDASession | PortalSession) => {};
    this.onCallIncoming = (call: Call) =>  {};
    this.onCallMade = (call: Call) => {};
    this.onCallAnswered = (call: Call) => {};
    this.onCallHangedUp = (call: Call) => {};
    this.onUnHandledEvent = (event: MessageEvent) => {};
    this.onWebsocketMessage = (message: MessageEvent) => {};
    this.onMeetingCreated = (meeting: Meeting) => {};
    this.onRouteChanged = (location: Object, action: string) => {};

    // Portal
    this.onConnectedToStack = (stackSession: Object) => {};
    this.onSwitchTenant = (uuid: string, name: string) => {};
  };
}

export default new App();
