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
  WDASession,
  PortalSession,
  UpdateBadgeArgs,
  DisplayBannerArgs,
  MobileMenuItem,
} from './types.js';

import {
  EVENT_ON_LOADED,
  EVENT_APP_UNLOADED,
  EVENT_PLUGIN_UNLOADED,
  EVENT_APP_INITIALIZE,
  EVENT_ON_LOGOUT,
  EVENT_SEND_IFRAME_MESSAGE,
  EVENT_SEND_BACKGROUND_MESSAGE,
  EVENT_ON_IFRAME_MESSAGE,
  EVENT_ON_BACKGROUND_MESSAGE,
  EVENT_CLOSE_LEFT_PANEL,
  EVENT_OPEN_LEFT_PANEL,
  EVENT_START_CALL,
  EVENT_ON_CALL_INCOMING,
  EVENT_ON_CALL_MADE,
  EVENT_ON_CALL_ANSWERED,
  EVENT_ON_CALL_ACCEPTED,
  EVENT_ON_CALL_HUNG_UP,
  EVENT_OPEN_LINK,
  EVENT_CREATE_MEETING,
  EVENT_OPEN_MEETING_LOBBY,
  EVENT_OPEN_SETTINGS,
  EVENT_ON_MEETING_CREATED,
  EVENT_ROUTE_CHANGE,
  EVENT_WS_MESSAGE,
  EVENT_PLAY_PROGRESS_SOUND,
  EVENT_PLAY_NEW_MESSAGE_SOUND,
  EVENT_PLAY_INCOMING_CALL_SOUND,
  EVENT_PLAY_DOUBLE_CALL_SOUND,
  EVENT_PLAY_HANGUP_SOUND,
  EVENT_STOP_CURRENT_SOUND,
  EVENT_CONFIGURE_SOUNDS,
  EVENT_RESET_SOUNDS,
  EVENT_DISPLAY_NOTIFICATION,
  EVENT_CHANGE_NAVBAR_COLOR,
  EVENT_RESET_NAVBAR_COLOR,
  EVENT_DISPLAY_MODAL,
  EVENT_REMOVE_MODAL,
  EVENT_USER_JOIN_ROOM,
  EVENT_USER_LEAVE_ROOM,
  EVENT_PARTICIPANT_JOIN_ROOM,
  EVENT_PARTICIPANT_LEAVE_ROOM,
  EVENT_IGNORE_CALL,
  EVENT_ON_NEW_SESSION,
  EVENT_UPDATE_BADGE,
  EVENT_ON_CONNECTED_TO_STACK,
  EVENT_ON_SWITCH_STACK_TENANT,
  EVENT_CHANGE_TOOLBAR_DISPLAY,
  EVENT_MOBILE_HEADER,
  EVENT_MOBILE_CONTEXTUAL_MENU,
  EVENT_MOBILE_SHOW_BOTTOM_NAV,
  EVENT_MOBILE_ON_MENU_ACTION,
  EVENT_MOBILE_ON_HEADER_BACK,
  EVENT_DISPLAY_BANNER,
  EVENT_REMOVE_BANNER,
} from './constants.js';

declare global {
  // Used for mobile
  var pluginId: string;
  var _setPluginId: Function;
  var _configurePlugin: Function;
  var Wazo: any;
}

const initializationTimeoutInMs = 5000;

type DelayedMessage = {
  type: string;
  payload: Object;
};

export class App {
  context: Context;
  _initializeCompleted: boolean;
  _initializeResolve: Function | null;
  _initializeTimeout: ReturnType<typeof setTimeout> | null;
  _pluginId: string | null;
  _baseUrl: string | null;
  _entityId: string | null;
  _queuedMessages: DelayedMessage[];
  _isBackground: boolean;
  _headerBackCallbacks: Record<string, Function>;

  // Global
  onNewSession = (session: WDASession | PortalSession) => {}
  onUnLoaded = (e: Event) => {};
  onPluginUnLoaded = () => {};
  onAppUnLoaded = (tabId: string) => {};
  onIframeMessage = (message: Object) => { };
  onBackgroundMessage = (message: Object) => { };

  // WDA
  onLogout = () => {};
  onCallIncoming = (call: Call) =>  {};
  onCallMade = (call: Call) => {};
  onCallAnswered = (call: Call) => {};
  onCallAccepted = (call: Call) => {};
  onCallHungUp = (call: Call) => {};
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
    this._pluginId = globalThis?.pluginId || null;
    this._baseUrl = null;
    this._entityId = null;
    this._isBackground = !window.name;
    this._queuedMessages = [];
    this._headerBackCallbacks = {};

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
        // Deprecated way to do it, remove it in future version
        this._configurePlugin({ pluginId: window.name });
      }
    }

    // We expose a global method to be used in the <script> tag directly after importing the `backgroundScript` url
    // Also used in mobile
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

  resetSounds = () => this._sendMessage(EVENT_RESET_SOUNDS);

  changeNavBarColor = (color: string) => this._sendMessage(EVENT_CHANGE_NAVBAR_COLOR, { color });

  resetNavBarColor = () => this._sendMessage(EVENT_RESET_NAVBAR_COLOR);

  displayNotification = (title: string, text: string) => this._sendMessage(EVENT_DISPLAY_NOTIFICATION, { title, text });

  displayModal = ({ url, title, text, htmlText, height, width, hideCloseButton }: ModalParameter) =>
    this._sendMessage(EVENT_DISPLAY_MODAL, { url, title, text, htmlText, height, width, hideCloseButton });

  removeModal = () => this._sendMessage(EVENT_REMOVE_MODAL);

  hasLocalVideoStream = (call: Call) => Wazo.Phone.phone.hasALocalVideoTrack(call);

  getLocalCurrentVideoStream = (call: Call) => Wazo.Phone.phone.getLocalVideoStream(call);

  hasRemoveVideoStream = (call: Call) => Wazo.Phone.phone.hasRemoteVideo(call);

  getRemoteVideoStream = (call: Call) => Wazo.Phone.phone.getRemoteVideoStream(call);

  updateBadge = (args: UpdateBadgeArgs) => this._sendMessage(EVENT_UPDATE_BADGE, { ...args, entityId: args.entityId || this._entityId || 'update-badge-null-entity-id' });

  displayBanner = (args: DisplayBannerArgs) => this._sendMessage(EVENT_DISPLAY_BANNER, { ...args, entityId: this._entityId || 'display-banner-null-entity-id' });

  closeBanner = () => this._sendMessage(EVENT_REMOVE_BANNER, { entityId: this._entityId || 'remove-banner-null-entity-id' });

  // Portal
  changeToolbarDisplay = (display: boolean) => this._sendMessage(EVENT_CHANGE_TOOLBAR_DISPLAY, { display });

  // App to Mobile
  setMobileHeader = ({ title, callback }: { title?: string | null, callback?: Function | null }, entityId?: string) => {
    const id = entityId || this._entityId;

    if (id) {
      delete this._headerBackCallbacks[id];
      if (typeof callback === 'function') {
        this._headerBackCallbacks[id] = callback;
      }
    }

    this._sendMessage(EVENT_MOBILE_HEADER, {
      headerTitle: title,
      emitHeaderBack: !!callback,
      entityId: entityId || this._entityId,
    });
  }

  // @WIP
  setMobileContextualMenu = (contextualMenu: MobileMenuItem[], entityId?: string) => this._sendMessage(EVENT_MOBILE_CONTEXTUAL_MENU, { contextualMenu, entityId: entityId || this._entityId });

  // @WIP
  setMobileShowBottomNav = (showBottomNav: boolean, entityId?: string) =>  this._sendMessage(EVENT_MOBILE_SHOW_BOTTOM_NAV, { showBottomNav, entityId: entityId || this._entityId });

  // Mobile to app
  // @WIP
  onMobileMenuAction = (id: string) => this.sendMessageToIframe({ type: EVENT_MOBILE_ON_MENU_ACTION, id });

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
        delete this._headerBackCallbacks[event.data.tabId];
        this.onAppUnLoaded(event.data.tabId);
        break;
      case EVENT_PLUGIN_UNLOADED:
        this._unloadPlugin();
        break;
      case EVENT_ON_LOGOUT:
        this.onLogout();
        this._unloadPlugin();
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
      case EVENT_ON_CALL_ACCEPTED:
        this.onCallAccepted(event.data.call);
        break;
      case EVENT_ON_CALL_HUNG_UP:
        this.onCallHungUp(event.data.call);
        break;

      // Portal
      case EVENT_ON_CONNECTED_TO_STACK:
        this.onConnectedToStack(event.data.stackSession);
        break;

      case EVENT_ON_SWITCH_STACK_TENANT:
        this.onSwitchTenant(event.data.tenant.uuid, event.data.tenant.name);
        break;

      // Mobile
      case EVENT_MOBILE_ON_HEADER_BACK:
        const action = this._headerBackCallbacks[event.data.entityId || this._entityId];
        if (typeof action === 'function') {
          action();
        }
        break;

      case EVENT_MOBILE_ON_MENU_ACTION:
        this.onMobileMenuAction(event.data);
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
      return window.ReactNativeWebView.postMessage(JSON.stringify({ type, _pluginId: this._pluginId, _entityId: this._entityId, ...payload }));
    }

    window.parent.postMessage({ type, _pluginId: this._pluginId, _entityId: this._entityId, ...payload }, '*');
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

  _unloadPlugin = () => {
    this.onPluginUnLoaded();
    this._resetEvents();
  }

  _configurePlugin = (configuration: PluginConfiguration) => {
    if (configuration.pluginId) {
      this._pluginId = configuration.pluginId;
    }
    if (configuration.baseUrl) {
      this._baseUrl = configuration.baseUrl;
    }
    if (configuration.entityId) {
      this._entityId = configuration.entityId;
    }
  }

  _resetEvents = () => {
    this.onUnLoaded = (e: Event) => {};
    this.onPluginUnLoaded = () => {};
    this.onAppUnLoaded = (tabId: string) => {};
    this.onIframeMessage = (message: Object) => { };
    this.onBackgroundMessage = (message: Object) => { };

    // WDA
    this.onLogout = () => {};
    this.onNewSession = (session: WDASession | PortalSession) => {};
    this.onCallIncoming = (call: Call) =>  {};
    this.onCallMade = (call: Call) => {};
    this.onCallAnswered = (call: Call) => {};
    this.onCallAccepted = (call: Call) => {};
    this.onCallHungUp = (call: Call) => {};
    this.onUnHandledEvent = (event: MessageEvent) => {};
    this.onWebsocketMessage = (message: MessageEvent) => {};
    this.onMeetingCreated = (meeting: Meeting) => {};
    this.onRouteChanged = (location: Object, action: string) => {};

    // Portal
    this.onConnectedToStack = (stackSession: Object) => {};
    this.onSwitchTenant = (uuid: string, name: string) => {};
  };
}

// @deprecated: can conflict with other app when using the instance directly
export default new App();
