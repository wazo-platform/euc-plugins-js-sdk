export enum HostClientType {
  desktop = 'desktop',
  web = 'web',
  android = 'android',
  ios = 'ios',
}

export interface Extension {
  context: string,
  exten: string,
  id: number,
  links?: Array<{ href: string, rel: string }>,
}

export interface Endpoint {
  id: number,
  links: Array<{ href: string, rel: string }>,
  username?: string,
}

export interface SipLine {
  id: any;
  uuid: string;
  tenantUuid: string;
  username: string;
  secret: string;
  type: string;
  host: string;
  options: string[][] | null;
  endpointSectionOptions: string[][] | null;
  links: Array<Object>;
  trunk: string | null;
  line: Endpoint;
}

export interface Line {
  type: string;
  id: number;
  extensions: Array<Extension>;
  endpointCustom: Endpoint | null;
  endpointSccp: Endpoint | null;
  endpointSip: Endpoint | null;
}

export interface ForwardOption {
  destination: string;
  enabled: boolean;
  key: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lines: Array<Line>;
  sipLines: Array<SipLine>;
  username: string;
  mobileNumber: string;
  forwards: Array<ForwardOption>;
  doNotDisturb: boolean | null;
  onlineCallRecordEnabled: boolean | null;
  state: string | null;
  ringSeconds:  number | null;
  voicemail: { id: number, name: string } | null;
  status: string;
  subscriptionType:  number | null;
  agent: { firstname: string, id: number, lastname: string, number: string } | null;
  switchboards: Array<any>;
  callPickupTargetUsers: Array<{ firstname: string, lastname: string, uuid: string }>
}

export interface Authorization {
  uuid: string,
  rules: Array<{ name: string, options: Object }>,
  service: string | null,
}

export interface PortalSession {
  uuid: string;
  token: string;
  refreshToken: string;
  expiresAt: string;
  sessionUuid: string;
  tenantUuid: string;
}

export interface WDASession {
  acl: string[];
  token: string;
  refreshToken: string | null;
  uuid: string | null;
  tenantUuid: string | null;
  engineUuid: string | null;
  sessionUuid: string | null;
  engineVersion: string | null;
  profile: Profile | null;
  expiresAt: Date;
  host: string, // Representing the stack hostname where the user is connected
  authorizations: Array<Authorization>;
}

// Wazo Session
export type UserInfo = WDASession | PortalSession;

export interface AppHostInfo {
  clientType: HostClientType | null;
}

export interface AppInfo {
  locale: string | null;
  theme: Object | null;
  host: AppHostInfo | null;
  extra: Object | null;
}

export interface Context {
  app: AppInfo;
  user?: UserInfo;
}

export interface Call {
  answered: boolean;
  sipCallId: string;
  callId: string;
  sipStatus: string;
  number: string;
  displayName: string;
  callerNumber: string;
  creationTime: Date | null;
  answerTime: Date | null;
  endTime: Date | null;
}

export interface Sounds {
  progress?: string;
  ring?: string;
  message?: string;
  inboundCall?: string;
  hangup?: string;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  email: string;
  favorited?: boolean;
  address: string;
  mobile?: boolean;
  personalStatus?: string;
  sessions?: Array<{
    uuid: string;
    mobile: boolean;
  }>;
  connected?: boolean;
  doNotDisturb?: boolean;
}

export interface Room {
  id: string;
  name: string;
  connectedCall: Call;
  participants: Contact[];
}

export interface MeetingAuthorization {
  meetingUuid: string;
  uuid: string;
  userUuid: string;
  userName: string;
  status: string;
}

export interface Meeting {
  guestSipAuthorization: string;
  uri: string;
  uuid: string;
  name: string;
  port: string;
  extension: string;
  persistent: boolean;
  ownerUuids: Array<string>;
  creationTime: Date;
  pendingAuthorizations: Array<MeetingAuthorization>;
  requireAuthorization: boolean;
}

export interface Extra {
  clientType: HostClientType;
}

export interface PluginConfiguration {
  baseUrl?: string,
  pluginId?: string,
  entityId?: string,
}

export interface ModalParameter {
  url?: string;
  title?: string;
  text?: string;
  htmlText?: string;
  height?: string|number;
  width?: string|number;
  hideCloseButton?: boolean;
}

export interface IframeCss { [index: string]: string|number }

export interface SoftphoneInitArguments {
  url: string;
  server: string;
  width?: number;
  height?: number;
  port?: number | string;
  language?: string;
  wrapUpDuration?: number;
  enableAgent?: boolean;
  tenantId?: string;
  domainName?: string;
  debug?: boolean;
  disableAutoLogin?: boolean;
  iframeCss?: IframeCss;
}

export interface Card {
  cardId: string;
  phoneNumber: string;
  callId: string;
  // + fields that you've added in the `setFormSchema` methods
}

export interface CallLog {
  answer: Date | null;
  answered: boolean;
  callDirection: string;
  destination: { extension: string, name: string, uuid: string | null };
  duration: number;
  end: Date | null;
  id: number;
  newMissedCall: boolean;
  recordings: Object[];
  source:  { extension: string, name: string, uuid: string | null };
  start: Date | null
}

type MuiColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export type UpdateBadgeArgs = {
  entityId?: string,
  badgeContent: string | number | null,
  color?: MuiColor,
  variant?: 'dot' | 'standard',
  max?: number,
  overlap?: 'circular' | 'rectangular',
  showZero?: boolean,
  anchorOrigin?: { horizontal: 'left' | 'right', vertical: 'top' | 'bottom' }
};

export type DisplayBannerArgs = {
  url?: string,
  height: number,
};

export type MobileMenuItem = {
  label: string,
  id: string,
}
