---
displayed_sidebar: softphoneSidebar
---

# Softphone Examples

import '../../src/softphone-example.js';

## Displaying the softphone

Please refer to the [Installation page](../installation) for information on how to import the Softphone SDK.

```js
softphone.show();
```

<a className="try-it button button--secondary button--lg" id="display-softphone">
    🚀 Display the Softphone
</a>


## Hiding the softphone

```js
softphone.hide();
```

<a className="try-it button button--secondary button--lg" id="hide-softphone">
    🙈 Hide it
</a>

## Minimize / restore the softphone

You can minimize and restore the softphone the way you would any regular window by adding your buttons to the wrapper element, which will allow you to position your buttons relative to the iframe.

```js
const minimizeButton = document.createElement('button');
minimizeButton.addEventListener('click', softphone.hide.bind(softphone));
softphone.wrapper.appendChild(minimizeButton);

const maximizeButton = document.createElement('button');
minimizeButton.addEventListener('click', softphone.show.bind(softphone));
softphone.wrapper.appendChild(minimizeButton);
```

## Move it right

```js
softphone.init({
  server: 'my-server',
  width: 400,
  iframeCss: {
    position: 'fixed',
    right: 0,
    top: '80px',
  },
});
softphone.show();
```

<a className="try-it button button--secondary button--lg" id="move-right">
    👉 This way
</a>

## Login directly from a token

```js
const login = document.querySelector('#login').value;
const password = document.querySelector('#password').value;
const server = document.querySelector('#server').value;

Wazo.Auth.init('softphone-example');
Wazo.Auth.setHost(server);
const session = await Wazo.Auth.logIn(login, password);

softphone.loginWithToken(session.token, session.refreshToken);
```

<form id="login-form">
    <input type="text" id="login" placeholder="Login" />
    <input type="password" id="password" placeholder="Password"  />
    <input type="text" id="server" placeholder="Server"  />
    <button className="button button--secondary button--md" type="submit">🔑 Login</button>
</form>

## Making a call

```js
softphone.makeCall('*10');
```

<a className="try-it button button--secondary button--lg" id="call-start-ten">
    ☎️ Call *10
</a>

## Parsing link on the page

We can parse links contains `tel://` and `callto://` on the current page.

<a className="call-link" href="tel://*10">This is a like to call *10</a>

Link are already parsed when we authenticate, so we have to call `removeParsedLinksEvent` to be able to parse them again.
```js
softphone.onLinkEnabled = (link => {
  link.style.color = 'red';
});

// We have to remove the previous parsing of the links
softphone.removeParsedLinksEvent();
softphone.parseLinks();
```

<a className="try-it button button--secondary button--lg" id="parse-links">
    🔗 Parse call links on this page
</a>

## Injecting CSS in the Softphone

```js
softphone.injectCss(`
a button {
  background-color: green !important;
}
`);
```

<a className="try-it button button--secondary button--lg" id="inject-css">
    ✨ Make the dialer button green
</a>

## Changing the appearance of the Softphone

```js
softphone.customizeAppearance({
  colors: {
    primary: '#d06c2b',
    button: '#4b2bd7',
    secondary: '#29877c',
  },
}, {
  // Translation
  // Set `debug: true` to know where to change translations, like below:
  en: {
    call: {
      searchInWazo: 'Type a number here !',
    },
    user: {
      login: 'My login button', // will be displayed as `user:login` in the button when settings `debug: true` in the init() method
    },
  },
}, {
  // Assets
  logo: 'my-logo.png',
});
```

<a className="try-it button button--secondary button--lg" id="customize-appearance">
    🌈 Customize the Softphone
</a>

## Adding a card form

We can add form so the user can fill some information during a call, it uses the [React Json schema form](https://rjsf-team.github.io/react-jsonschema-form/docs/) :

```js
softphone.setFormSchema({
  type: 'object',
  required: ['title', 'phone'],
  properties: {
    subject: ["Support", "Greetings", "Whant to talk to Bob"],
    title: { type: 'string', title: 'Title' },
    note: { type: 'string', title: 'Note' },
  },
}, {
  note: { 'ui:widget': 'textarea' },
});
```

<a className="try-it button button--secondary button--lg" id="add-form">
    📝 Add a form during the call
</a>

## Changing the value in the form

```js
softphone.setCardValue('title', 'My new title !');
```

<a className="try-it button button--secondary button--lg" id="update-form-value">
    ☀️ Update the call form value
</a>

## Advanced card form

We can add a new field to select the client and allow creating new one.

```js
softphone.setFormSchema({
  type: 'object',
  required: ['title', 'clientId'],
  properties: {
    clientId: {
      type: 'object',
      title: 'Client id',
      // triggers the `onDisplayLinkedOption` event when changing the value
      triggerDisplay: true,
      // createForm is another JSON schema the description the add option form.
      createForm: {
        optionLabel: '%firstname% %lastname%',
        schema: {
          type: 'object',
          required: ['phone'],
          properties: {
            firstname: { type: 'string', title: 'Firstname' },
            lastname: { type: 'string', title: 'Lastname' },
            phone: { type: 'string', title: 'Phone' },
          }
        },
        uiSchema: {}
      },
    },
    title: { type: 'string', title: 'Title' },
    note: { type: 'string', title: 'Note' },
  },
}, {
  note: { 'ui:widget': 'textarea' },
  clientId :{ 'ui:field': 'autocomplete'},
});

// Add select values
softphone.onOptionsResults('clientId',  [{ label: 'Alice', id: 1 }, { label: 'Bob', id: 2 }, { label: 'Charlies', id: 3 }]);

softphone.onSearchOptions = (fieldId, query) => {
  // Call you API here with `query`
  // const results = await fetchClient();
  const results = [{ label: 'Charles', id: 4}, { label: 'David', id: 5 }, { label: 'Henry', id: 6 }];
  softphone.onOptionsResults(fieldId, results);
};
```

<a className="try-it button button--secondary button--lg" id="advanced-form">
    👌 Raise up the form game !
</a>

## Events

### Iframe loaded

```js
softphone.onIFrameLoaded = () => {
  document.getElementById('iframe-loaded-event').innerText = 'Softphone iframe is loaded';
}
```

<div className="event-container" id="iframe-loaded-event">
    ⏰ Will react when the iframe is loaded
</div>

### User authenticated

```js
softphone.onAuthenticated = session => {
  document.getElementById('authenticated-event').innerText = `User authenticated, token: ${session.token}`;
}
```

<div className="event-container" id="authenticated-event">
    ⏰ Will react when the user logs in
</div>

### User logged out

```js
softphone.onLoggedOut = () => {
  document.getElementById('logout-event').innerText = 'Current user logged out';
}
```

<div className="event-container" id="logout-event">
    ⏰ Will react when the user logs out
</div>

### Call Incoming

```js
softphone.onCallIncoming = call => {
  document.getElementById('call-incoming-event').innerText = `Incoming call from ${call.displayName}, number: ${call.number}`
};
```

<div className="event-container" id="call-incoming-event">
    ⏰ Will react on incoming calls
</div>

### Call answered locally

```js
softphone.onCallLocallyAnswered = call => {
  document.getElementById('call-locally-answered-event').innerText = `Call answered here, number: ${call.number}`
};
```

<div className="event-container" id="call-locally-answered-event">
    ⏰ Will react on call answered by the user
</div>

### Call established

```js
softphone.onCallEstablished = call => {
  document.getElementById('call-established-event').innerText = `Call answered, number: ${call.number}`
};
```

<div className="event-container" id="call-established-event">
    ⏰ Will react on call answered
</div>

### Call created locally

```js
softphone.onOutgoingCallMade = call => {
  document.getElementById('call-outgoing-event').innerText = `Call created here, number: ${call.number}`
};
```

<div className="event-container" id="call-outgoing-event">
    ⏰ Will react on call created locally
</div>

### Call rejected locally

```js
softphone.onCallRejected = call => {
  document.getElementById('call-rejected-event').innerText = `Call rejected here, number: ${call.number}`
};
```

<div className="event-container" id="call-rejected-event">
    ⏰ Will react on call rejected locally
</div>

### Call ended

```js
softphone.onCallEnded = call => {
  document.getElementById('call-ended-event').innerText = `Call ended, duration: ${(call.endTime - call.answerTime) / 1000}s`;
};
```

<div className="event-container" id="call-ended-event">
    ⏰ Will react on call ended
</div>

### User saved the call form

```js
softphone.onCardSaved = card => {
  document.getElementById('card-saved-event').innerHTML = `Client: ${card.clientId.label}<br /> title: ${card.title}<br /> note: ${card.note}`;
};
```

<div className="event-container" id="card-saved-event">
    ⏰ Will react when the form is saved by the user
</div>

### User cancels the call form

```js
softphone.onCardCanceled = () => {
  document.getElementById('card-canceled-event').innerHTML = 'Card canceled 🙁';
};
```

<div className="event-container" id="card-canceled-event">
    ⏰ Will react when the form is canceled by the user
</div>

### User select a value in the select field of the call form

```js
softphone.onDisplayLinkedOption = optionId => {
  document.getElementById('display-linked-option-event').innerHTML = `Selected identified: ${optionId}`;
};
```

<div className="event-container" id="display-linked-option-event">
    ⏰ Will react when the user choose a value in a select field of the call form
</div>

### User select search for a contact

```js
softphone.onWazoContactSearch = query => {
  document.getElementById('wazo-search-contact-event').innerHTML = `Searching for: ${query}`;
};
```

<div className="event-container" id="wazo-search-contact-event">
    ⏰ Will react when the user searches for a contact
</div>

### User logs in as an agent

```js
softphone.onAgentLoggedIn = () => {
  document.getElementById('agent-logged-in-event').innerHTML = 'Agent logged in !';
};
```

<div className="event-container" id="agent-logged-in-event">
    ⏰ Will react when the user logs as an agent
</div>

### User logs out as an agent

```js
softphone.onAgentLoggedOut = () => {
  document.getElementById('agent-logged-out-event').innerHTML = 'Agent logged out !';
};
```

<div className="event-container" id="agent-logged-out-event">
    ⏰ Will react when the user logs out as an agent
</div>

### User pauses the agent

```js
softphone.onAgentPaused = () => {
  document.getElementById('agent-paused-event').innerHTML = 'Agent paused !';
};
```

<div className="event-container" id="agent-paused-event">
    ⏰ Will react when the user pauses the agent
</div>

### User resumes the agent

```js
softphone.onAgentResumed = () => {
  document.getElementById('agent-resumed-event').innerHTML = 'Agent resumed !';
};
```

<div className="event-container" id="agent-resumed-event">
    ⏰ Will react when the user pauses the agent
</div>

### User changes the language

```js
softphone.onLanguageChanged = language => {
  document.getElementById('language-changed-event').innerHTML = `Language changed: ${language}!`;
};
```

<div className="event-container" id="language-changed-event">
    ⏰ Will react when the user changes the language
</div>

### Current call is held

```js
softphone.onCallHeld = () => {
  document.getElementById('call-held-event').innerHTML = 'Current call is held ⏸️';
};
```

<div className="event-container" id="call-held-event">
    ⏰ Will react when the current call is held
</div>

### Current call is resumed

```js
softphone.onCallResumed = () => {
  document.getElementById('call-resumed-event').innerHTML = 'Current call is resumed ▶️️';
};
```

<div className="event-container" id="call-resumed-event">
    ⏰ Will react when the current call is resumed
</div>

### Current call is muted

```js
softphone.onCallMuted = () => {
  document.getElementById('call-muted-event').innerHTML = 'Current call is muted 🤐';
};
```

<div className="event-container" id="call-muted-event">
    ⏰ Will react when the current is muted
</div>

### Current call is un-muted

```js
softphone.onCallUnMuted = () => {
  document.getElementById('call-unmuted-event').innerHTML = 'Current call is un-muted 🔊';
};
```

<div className="event-container" id="call-unmuted-event">
    ⏰ Will react when the current is un-muted
</div>

### When the user send a DTMF in the current call

```js
softphone.onDtmfSent = tone => {
  document.getElementById('call-dtmf-event').innerHTML = `DTMF sent: ${tone}`;
};
```

<div className="event-container" id="call-dtmf-event">
    ⏰ Will react when a DTMF is sent in the current call
</div>

### When the user transfers directly the current call

```js
softphone.onDirectTransfer = number => {
  document.getElementById('call-direct-transfer-event').innerHTML = `Call directly transfered to: ${number}`;
};
```

<div className="event-container" id="call-direct-transfer-event">
    ⏰ Will react when the current call is transferred
</div>

### When the user creates an indirect transfer

```js
softphone.onCreateIndirectTransfer = number => {
  document.getElementById('call-indirect-transfer-event').innerHTML = `Indirect transfer created to: ${number}`;
};
```

<div className="event-container" id="call-indirect-transfer-event">
    ⏰ Will react when the user creates an indirect transfer
</div>


### When the indirect transfer call is created

```js
softphone.onIndirectCallMade = call => {
  document.getElementById('call-indirect-transfer-made-event').innerHTML = `Indirect transfer answered from: ${call.number}`;
};
```

<div className="event-container" id="call-indirect-transfer-made-event">
    ⏰ Will react when the user creates an indirect transfer
</div>

### When the user cancels an indirect transfer

```js
softphone.onCancelIndirectTransfer = () => {
  document.getElementById('call-indirect-transfer-cancel-event').innerHTML = 'Indirect transfer canceled';
};
```

<div className="event-container" id="call-indirect-transfer-cancel-event">
    ⏰ Will react when the user cancels an indirect transfer
</div>

### When the user confirms an indirect transfer

```js
softphone.onConfirmIndirectTransfer = () => {
  document.getElementById('call-indirect-transfer-confirm-event').innerHTML = 'Indirect transfer confirmed';
};
```

<div className="event-container" id="call-indirect-transfer-confirm-event">
    ⏰ Will react when the user confirms an indirect transfer
</div>

### When the user records the current call

```js
softphone.onStartRecording = () => {
  document.getElementById('call-start-record-event').innerHTML = 'Current call recorded';
};
```

<div className="event-container" id="call-start-record-event">
    ⏰ Will react when the user records the current call
</div>

### When the user stops the record of the current call

```js
softphone.onStopRecording = () => {
  document.getElementById('call-stop-record-event').innerHTML = 'Current record stopped';
};
```

<div className="event-container" id="call-stop-record-event">
    ⏰ Will react when the user stops the record of the current call
</div>

### When the user receives a call log

```js
softphone.onCallLogCreated = callLog => {
  document.getElementById('call-log-event').innerHTML = `A new call log was created, its duration: ${callLog.duration}`;
};
```

<div className="event-container" id="call-log-event">
    ⏰ Will react when the user receives a call log
</div>

### When the user receive a message from the Wazo's Websocket

```js
softphone.onWebsocketMessage = (message) => {
  document.getElementById('websocket-event').innerHTML = `A new websocket message was received: ${JSON.stringify(message)}`;
};
```

<div className="event-container" id="websocket-event">
    ⏰ Will react when the user receives a websocket message
</div>
