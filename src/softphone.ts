/* eslint-disable no-unused-vars */
/* global window, document */
import EventEmitter from 'events';

import { SoftphoneInitArguments, Call, WDASession, Card, CallLog, IframeCss } from './types.js';

const BRIDGE_CONFIG_RETRIEVED = 'bridge/CONFIG_RETRIEVED';
const BRIDGE_LOGGED_OUT = 'bridge/LOGGED_OUT';
const BRIDGE_CREATE_OR_UPDATE_CARD = 'bridge/BRIDGE_CREATE_OR_UPDATE_CARD';
const BRIDGE_OPTIONS_FETCHED = 'bridge/BRIDGE_OPTIONS_FETCHED';
const BRIDGE_OPTIONS_FOUND = 'bridge/BRIDGE_OPTIONS_FOUND';
const BRIDGE_SEARCH_OPTIONS = 'bridge/BRIDGE_SEARCH_OPTIONS';
const BRIDGE_DISPLAY_LINKED_OPTION = 'bridge/DISPLAY_LINKED_OPTION';
const BRIDGE_UPDATE_FORM_SCHEMA = 'bridge/BRIDGE_UPDATE_FORM_SCHEMA';
const BRIDGE_WAZO_CONTACT_SEARCH = 'bridge/BRIDGE_WAZO_CONTACT_SEARCH';
const BRIDGE_ON_AGENT_LOGGED_IN = 'bridge/BRIDGE_ON_AGENT_LOGGED_IN';
const BRIDGE_ON_AGENT_LOGGED_OUT = 'bridge/BRIDGE_ON_AGENT_LOGGED_OUT';
const BRIDGE_ON_AGENT_PAUSED = 'bridge/BRIDGE_ON_AGENT_PAUSED';
const BRIDGE_ON_AGENT_RESUMED = 'bridge/BRIDGE_ON_AGENT_RESUMED';
const BRIDGE_ON_LANGUAGE_CHANGED = 'bridge/BRIDGE_ON_LANGUAGE_CHANGED';
const BRIDGE_ON_CALL_LOCALLY_ACCEPTED = 'bridge/BRIDGE_ON_CALL_LOCALLY_ACCEPTED';
const BRIDGE_ON_CALL_REJECTED = 'bridge/BRIDGE_ON_CALL_REJECTED';
const BRIDGE_ON_CALL_ESTABLISHED = 'bridge/BRIDGE_ON_CALL_ESTABLISHED';
const BRIDGE_ON_CALL_HELD = 'bridge/BRIDGE_ON_CALL_HELD';
const BRIDGE_ON_CALL_RESUMED = 'bridge/BRIDGE_ON_CALL_RESUMED';
const BRIDGE_ON_CALL_MUTED = 'bridge/BRIDGE_ON_CALL_MUTED';
const BRIDGE_ON_CALL_UN_MUTED = 'bridge/BRIDGE_ON_CALL_UN_MUTED';
const BRIDGE_ON_DTMF = 'bridge/BRIDGE_ON_DTMF';
const BRIDGE_ON_DIRECT_TRANSFER = 'bridge/BRIDGE_ON_DIRECT_TRANSFER';
const BRIDGE_ON_CREATE_INDIRECT_TRANSFER = 'bridge/BRIDGE_ON_CREATE_INDIRECT_TRANSFER';
const BRIDGE_ON_CANCEL_INDIRECT_TRANSFER = 'bridge/BRIDGE_ON_CANCEL_INDIRECT_TRANSFER';
const BRIDGE_ON_CONFIRM_INDIRECT_TRANSFER = 'bridge/BRIDGE_ON_CONFIRM_INDIRECT_TRANSFER';
const BRIDGE_ON_INDIRECT_TRANSFER_CALL_MADE = 'bridge/BRIDGE_ON_INDIRECT_TRANSFER_CALL_MADE';
const BRIDGE_ON_INDIRECT_TRANSFER_DONE = 'bridge/BRIDGE_ON_INDIRECT_TRANSFER_DONE';
const BRIDGE_ON_START_RECORDING = 'bridge/BRIDGE_ON_START_RECORDING';
const BRIDGE_ON_STOP_RECORDING = 'bridge/BRIDGE_ON_STOP_RECORDING';
const BRIDGE_ON_CARD_CANCELED = 'bridge/BRIDGE_ON_CARD_CANCELED';
const BRIDGE_ENABLE_AGENT = 'bridge/BRIDGE_ENABLE_AGENT';
const BRIDGE_SET_CARD_CONTENT = 'bridge/BRIDGE_SET_CARD_CONTENT';
const BRIDGE_ENABLE_DEBUG = 'bridge/BRIDGE_ENABLE_DEBUG';
const BRIDGE_CALL_LOG_CREATED = 'bridge/BRIDGE_CALL_LOG_CREATED';
const BRIDGE_ON_WEBSOCKET_MESSAGE = 'bridge/BRIDGE_ON_WEBSOCKET_MESSAGE';
const BRIDGE_LOGIN_WITH_TOKEN = 'bridge/BRIDGE_LOGIN_WITH_TOKEN';
const BRIDGE_ON_CLICK_TO_CALL = 'bridge/ON_CLICK_TO_CALL';

const BRIDGE_INJECT_CSS = 'bridge/BRIDGE_INJECT_CSS';
const BRIDGE_CUSTOMIZE_APPEARANCE = 'bridge/BRIDGE_CUSTOMIZE_APPEARANCE';

const SDK_ON_OUTGOING_CALL_MADE = 'sdk/SDK_ON_OUTGOING_CALL_MADE';
const SDK_CALL_ENDED = 'sdk/ON_CALL_ENDED';
const SDK_CALL_INCOMING = 'sdk/SDK_CALL_INCOMING';
const SDK_AUTHENTICATED = 'sdk/SDK_AUTHENTICATED';

// Events
export const SHOW = 'show';
export const HIDE = 'hide';

interface SoftphoneBridgeConfig {
  server: string;
  language?: string;
  port?: number | string;
  tenantId?: string;
  domainName?: string;
  wrapUpDuration?: number;
  disableAutoLogin?: boolean;
}

type Message = [string, Object];

class Softphone extends EventEmitter {
  url: string = 'https://softphone.wazo.io';
  width: number = 500;
  height: number = 600;
  iframeCss: IframeCss = { left: 0, bottom: 0 };
  displayed: boolean = false;
  wrapper: HTMLDivElement | null = null;
  iframe: HTMLIFrameElement | null = null;
  iframeLoaded: boolean = false;
  session: WDASession | null = null;

  // Message waiting for the iframe to be loaded
  _pendingMessages: Message[] = [];

  onLinkEnabled(link: HTMLLinkElement) { }
  onIFrameLoaded() { }

  onCallLocallyAnswered(call: Call) { }
  onCallEstablished(call: Call) { }
  onOutgoingCallMade(call: Call) { }
  onCallIncoming(call: Call) { }
  onCallRejected(call: Call) { }
  onCallEnded(call: Call, card: Card, direction: string, fromExtension: string) { }

  onCardSaved(card: Card) { }
  onCardCanceled() { }
  onAuthenticated(session: WDASession) { }
  onLoggedOut() { }

  onSearchOptions(fieldId: string, query: string) {
    this.onOptionsResults(fieldId, []);
  }

  onDisplayLinkedOption(optionId: string) { }
  onWazoContactSearch(query: string) { }
  onAgentLoggedIn() { }
  onAgentLoggedOut() { }
  onAgentPaused() { }
  onAgentResumed() { }
  onLanguageChanged(language: string) { }
  onCallHeld() { }
  onCallResumed() { }
  onCallMuted() { }
  onCallUnMuted() { }
  onDtmfSent(tone: string) { }
  onDirectTransfer(number: string) { }
  onCreateIndirectTransfer(number: string) { }
  onCancelIndirectTransfer() { }
  onConfirmIndirectTransfer() { }
  onIndirectCallMade(call: Call) { }
  onIndirectTransferDone(call: Call) { }
  onStartRecording() { }
  onStopRecording() { }
  onCallLogCreated(callLog: CallLog) { }
  onWebsocketMessage(message: Object) { }
  onUnHandledEvent(event: Object) { }

  init({
    url,
    width,
    height,
    server,
    port,
    language,
    wrapUpDuration,
    iframeCss,
    enableAgent = true,
    tenantId,
    domainName,
    debug = false,
    disableAutoLogin = false,
  }: SoftphoneInitArguments) {
    this.url = url || this.url;
    this.width = width || this.width;
    this.height = height || this.height;
    this.iframeCss = iframeCss || this.iframeCss;
    this.displayed = false;
    this.iframeLoaded = false;

    this.iframeLoaded = false;
    this._pendingMessages = [];
    window.addEventListener('message', this._onMessage.bind(this), false);

    if (!server) {
      throw new Error('`server` is not set');
    }

    const config: SoftphoneBridgeConfig = { server, disableAutoLogin };
    if (language) {
      config.language = language;
    }
    if (port) {
      config.port = port;
    }
    if (tenantId) {
      console.warn('Use of `tenantId` is deprecated when calling `Softphone.init()`, use `domainName` instead');
      config.tenantId = tenantId;
    }
    if (domainName) {
      config.domainName = domainName;
    }
    if (wrapUpDuration) {
      config.wrapUpDuration = wrapUpDuration;
    }

    this._sendMessage(BRIDGE_CONFIG_RETRIEVED, { config });

    if (enableAgent) {
      this._sendMessage(BRIDGE_ENABLE_AGENT);
    }

    if (debug) {
      this._sendMessage(BRIDGE_ENABLE_DEBUG);
    }

    this._createIframe(() => {
      this.iframeLoaded = true;
      this._pendingMessages.forEach(([type, payload]: Message) => this._sendMessage(type, payload));

      this.onIFrameLoaded();
    });
  }

  parseLinks() {
    const links = this._getLinks();

    links.forEach((link: HTMLLinkElement) => {
      link.setAttribute('data-wazo-parsed', 'true');
      link.addEventListener('click', this._onLinkClick.bind(this));
      this.onLinkEnabled(link);
    });
  }

  removeParsedLinksEvent() {
    [].slice.call(document.querySelectorAll('a[data-wazo-parsed]'), 0).forEach((link: HTMLLinkElement) => {
      link.removeAttribute('data-wazo-parsed');
      link.removeEventListener('click', this._onLinkClick.bind(this));
    });
  }

  makeCall(number: string) {
    this.show();

    this._sendMessage(BRIDGE_ON_CLICK_TO_CALL, { number });
  }

  toggleDisplay() {
    if (this.displayed) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (!this.iframe) {
      this._createIframe();
    }

    if (this.iframe) {
      this.iframe.style.display = 'block';
    }

    this.displayed = true;
    this.emit(SHOW);
  }

  hide() {
    if (this.iframe) {
      this.iframe.style.display = 'none';
    }

    this.displayed = false;
    this.emit(HIDE);
  }

  remove() {
    if (this.iframe) {
      this.iframe.remove();
    }
    if (this.wrapper) {
      this.wrapper.remove();
    }
    this.iframe = null;
    this.wrapper = null;
  }

  optionsFetched(fieldId: string, options: any[]) {
    this._sendMessage(BRIDGE_OPTIONS_FETCHED, { fieldId, options });
  }

  onOptionsResults(fieldId: string, options: any[]) {
    this._sendMessage(BRIDGE_OPTIONS_FOUND, { fieldId, options });
  }

  setFormSchema(schema: Object, uiSchema: Object) {
    this._sendMessage(BRIDGE_UPDATE_FORM_SCHEMA, { schema, uiSchema });
  }

  setCardValue(field: string, value: any) {
    this._sendMessage(BRIDGE_SET_CARD_CONTENT, { field, value });
  }

  injectCss(css: string) {
    this._sendMessage(BRIDGE_INJECT_CSS, { css });
  }

  customizeAppearance(themes: Object, translations: Object, assets: Object) {
    this._sendMessage(BRIDGE_CUSTOMIZE_APPEARANCE, { themes, translations, assets });
  }

  loginWithToken(token: string, refreshToken?: string) {
    this._sendMessage(BRIDGE_LOGIN_WITH_TOKEN, { token, refreshToken });
  }

  configureServer(server: string) {
    this._sendMessage(BRIDGE_CONFIG_RETRIEVED, { config: { server } });
  }

  updateCss(iframeCss: IframeCss | null = null) {
    if (!iframeCss) {
      return
    }

    if (this.wrapper) {
      Object.keys(iframeCss).forEach(key => {
        // @ts-ignore: fix CSS key here
        this.wrapper.style[key] = iframeCss[key];
      });
    }

    this.iframeCss = iframeCss;
  }

  _createIframe(cb?: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
    // Remove iframe before creating it.
    this.remove();

    this.wrapper = document.createElement('div');
    this.wrapper.id = 'iframe-wrapper';
    this.wrapper.style.position = 'fixed';

    this.updateCss(this.iframeCss);

    this.iframe = document.createElement('iframe');
    this.iframe.width = String(this.width);
    this.iframe.height = String(this.height);
    this.iframe.allow = 'camera *; microphone *; autoplay *; display-capture *';

    this.iframe.style.border = '1px solid #aaa';
    this.iframe.style.backgroundColor = 'white';
    this.iframe.style.display = 'none';

    this.iframe.src = this.url;
    this.iframe.id = 'wazo-softphone';

    if (cb) {
      this.iframe.onload = cb;
    }

    this.wrapper.appendChild(this.iframe);
    document.body.appendChild(this.wrapper);
  }

  _getLinks() {
    return [].slice.call(document.querySelectorAll('a:not([data-wazo-parsed])'), 0)
      .filter((link: HTMLLinkElement) => link.href.indexOf('tel:') === 0 || link.href.indexOf('callto:') === 0);
  }

  _onLinkClick(e: Event) {
    e.preventDefault();
    const number = (e.target as HTMLLinkElement).href.split('//')[1];

    this.makeCall(number);
  }

  _onAuthenticated(session: WDASession) {
    this.session = session;

    this.parseLinks();
  }

  _onMessage(event: MessageEvent) {
    if (!event.data) {
      return;
    }

    switch (event.data.type) {
      case SDK_ON_OUTGOING_CALL_MADE:
        this.onOutgoingCallMade(event.data.callSession);
        break;
      case SDK_CALL_ENDED: {
        const { callSession, content, direction, userExtension } = event.data;
        this.onCallEnded(callSession, content, direction, userExtension);
        break;
      }
      case SDK_CALL_INCOMING:
        this.onCallIncoming(event.data.callSession);
        break;
      case SDK_AUTHENTICATED:
        this._onAuthenticated(event.data.session);
        this.onAuthenticated(event.data.session);
        break;
      case BRIDGE_LOGGED_OUT:
        this.onLoggedOut();
        break;
      case BRIDGE_CREATE_OR_UPDATE_CARD: {
        const { content } = event.data;
        this.onCardSaved(content);
        break;
      }
      case BRIDGE_SEARCH_OPTIONS: {
        const { fieldId, query } = event.data;
        this.onSearchOptions(fieldId, query);
        break;
      }
      case BRIDGE_DISPLAY_LINKED_OPTION:
        this.onDisplayLinkedOption(event.data.linkedOptionId);
        break;
      case BRIDGE_WAZO_CONTACT_SEARCH:
        this.onWazoContactSearch(event.data.query);
        break;
      case BRIDGE_ON_AGENT_LOGGED_IN:
        this.onAgentLoggedIn();
        break;
      case BRIDGE_ON_AGENT_LOGGED_OUT:
        this.onAgentLoggedOut();
        break;
      case BRIDGE_ON_AGENT_PAUSED:
        this.onAgentPaused();
        break;
      case BRIDGE_ON_AGENT_RESUMED:
        this.onAgentResumed();
        break;
      case BRIDGE_ON_LANGUAGE_CHANGED:
        this.onLanguageChanged(event.data.language);
        break;
      case BRIDGE_ON_CALL_HELD:
        this.onCallHeld();
        break;
      case BRIDGE_ON_CALL_RESUMED:
        this.onCallResumed();
        break;
      case BRIDGE_ON_CALL_MUTED:
        this.onCallMuted();
        break;
      case BRIDGE_ON_CALL_UN_MUTED:
        this.onCallUnMuted();
        break;
      case BRIDGE_ON_DTMF:
        this.onDtmfSent(event.data.tone);
        break;
      case BRIDGE_ON_DIRECT_TRANSFER:
        this.onDirectTransfer(event.data.number);
        break;
      case BRIDGE_ON_CREATE_INDIRECT_TRANSFER:
        this.onCreateIndirectTransfer(event.data.number);
        break;
      case BRIDGE_ON_CANCEL_INDIRECT_TRANSFER:
        this.onCancelIndirectTransfer();
        break;
      case BRIDGE_ON_CONFIRM_INDIRECT_TRANSFER:
        this.onConfirmIndirectTransfer();
        break;
      case BRIDGE_ON_INDIRECT_TRANSFER_CALL_MADE:
        this.onIndirectCallMade(event.data.call);
        break;
      case BRIDGE_ON_INDIRECT_TRANSFER_DONE:
        this.onIndirectTransferDone(event.data.call);
        break;
      case BRIDGE_ON_START_RECORDING:
        this.onStartRecording();
        break;
      case BRIDGE_ON_STOP_RECORDING:
        this.onStopRecording();
        break;
      case BRIDGE_ON_CARD_CANCELED:
        this.onCardCanceled();
        break;
      case BRIDGE_ON_CALL_LOCALLY_ACCEPTED:
        this.onCallLocallyAnswered(event.data.call);
        break;
      case BRIDGE_ON_CALL_REJECTED:
        this.onCallRejected(event.data.call);
        break;
      case BRIDGE_ON_CALL_ESTABLISHED:
        this.onCallEstablished(event.data.call);
        break;
      case BRIDGE_CALL_LOG_CREATED:
        this.onCallLogCreated(event.data.callLog);
        break;
      case BRIDGE_ON_WEBSOCKET_MESSAGE:
        this.onWebsocketMessage(event.data.message);
        break;
      default:
        this.onUnHandledEvent(event);
        break;
    }
  }

  _sendMessage(type: string, payload: Object = {}) {
    if (!this.iframe || !this.iframeLoaded) {
      this._pendingMessages.push([type, payload]);
      return;
    }

    if (this.iframe && this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage({ type, ...payload }, '*');
    }
  }
}

export default new Softphone();
