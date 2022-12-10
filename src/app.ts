import { Call, Context, Meeting, UserInfo, Extra } from './types';

// WDA
const EVENT_APP_INITIALIZE = 'wazo/EVENT_APP_INITIALIZE';
const EVENT_CLOSE_LEFT_PANEL = 'wazo/EVENT_CLOSE_LEFT_PANEL';
const EVENT_OPEN_LEFT_PANEL = 'wazo/EVENT_OPEN_LEFT_PANEL';
const EVENT_ON_LOADED = 'wazo/ON_LOADED';
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
const EVENT_ON_LOGOUT = 'wazo/EVENT_ON_LOGOUT';
const EVENT_WS_MESSAGE = 'wazo/EVENT_WS_MESSAGE';

// Portal
const EVENT_ON_CONNECTED_TO_STACK = 'wazo/EVENT_ON_CONNECTED_TO_STACK';
const EVENT_ON_SWITCH_STACK_TENANT = 'wazo/EVENT_ON_SWITCH_STACK_TENANT';

const initializationTimeoutInMs = 5000;

class App {
  context: Context;
  initializeCompleted: boolean;
  initializeResolve: Function | null;
  initializeTimeout: ReturnType<typeof setTimeout> | null;

  onUnLoaded() {};

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

  // Portal
  onConnectedToStack = (stackSession: Object) => {};
  onSwitchTenant = (uuid: string, name: string) => {};

  constructor() {
    this.initializeCompleted = false;
    this.initializeResolve = null;
    this.initializeTimeout = null;

    this.context = {
      app: {
        locale: null,
        theme: null,
        host: {
          clientType: null,
        },
      },
    };

    window.onunload = this.onUnLoaded;
  }

  initialize = async () => {
    if (this.isInitialized()) {
      return Promise.resolve();
    }

    window.addEventListener('message', this._onMessage, false);

    return new Promise((resolve, reject) => {
      this._sendMessage(EVENT_APP_INITIALIZE);

      this.initializeTimeout = setTimeout(() => {
        this.initializeTimeout = null;
        reject('SDK initialize timeout');
      }, initializationTimeoutInMs);

      this.initializeResolve = resolve;
    });
  };

  isInitialized = () => {
    return this.initializeCompleted;
  };

  getContext = () => this.context;

  startCall = ({ targets , requestedModalities = ['audio'] }: { targets: string[], requestedModalities: string[] }) => {
    this._sendMessage(EVENT_START_CALL, { targets, requestedModalities });
  };

  openLink = (url: string) => {
    this._sendMessage(EVENT_OPEN_LINK, { url });
  };

  createMeeting = (name: string, requireAuthorization = false, persistent = false) => {
    this._sendMessage(EVENT_CREATE_MEETING, { name, requireAuthorization, persistent });
  };

  openMeetingLobby = (number: string) => {
    this._sendMessage(EVENT_OPEN_MEETING_LOBBY, { number });
  };

  openSettings = () => {
    this._sendMessage(EVENT_OPEN_SETTINGS);
  };

  closeLeftPanel = () => {
    this._sendMessage(EVENT_CLOSE_LEFT_PANEL);
  };

  openLeftPanel = () => {
    this._sendMessage(EVENT_OPEN_LEFT_PANEL);
  };

  _onMessage = (event: MessageEvent) => {
    if (!event.data) {
      return;
    }

    switch (event.data.type) {
      // WDA
      case EVENT_ON_LOADED:
        this._onLoaded(event.data.session, event.data.theme, event.data.locale, event.data.extra);
        break;
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
      case EVENT_ON_LOGOUT:
        this.onLogout();
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
    window.parent.postMessage({ type, ...payload }, '*');
  }

  _onLoaded = (session: UserInfo, theme: Object, locale: string, extra: Extra | null) => {
    if (this.initializeTimeout === null) {
      return;
    }

    clearTimeout(this.initializeTimeout);

    this.initializeCompleted = true;

    this.context.app = {
      locale,
      theme,
      host: {
        clientType: extra ? extra.clientType : null,
      },
      extra: extra,
    };

    this.context.user = session;

    if (this.initializeResolve) {
      this.initializeResolve();
    }
  };
}

export default new App();
