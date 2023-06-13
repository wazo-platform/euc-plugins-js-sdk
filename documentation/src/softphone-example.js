// We don 't want to run this server-side
if (typeof window !== "undefined") {
  const { softphone } = require('@wazo/euc-plugins-sdk');
  const Wazo = require('@wazo/sdk/lib/simple').default;

  const initSoftphone = (server = defaultServer) => {
    softphone.init({ server: defaultServer, width: 400 });

    softphone.onIFrameLoaded = () => {
      document.getElementById('iframe-loaded-event').innerText = 'Softphone iframe is loaded';
    }

    softphone.onAuthenticated = session => {
      document.getElementById('authenticated-event').innerText = `User authenticated, token: ${session.token}`;
    }

    softphone.onLoggedOut = () => {
      document.getElementById('logout-event').innerText = 'User logged out';
    }

    softphone.onCallIncoming = call => {
      document.getElementById('call-incoming-event').innerText = `Incoming call from ${call.displayName}, number: ${call.number}`;
    };

    softphone.onCallLocallyAnswered = call => {
      document.getElementById('call-locally-answered-event').innerText = `Call answered here, number: ${call.number}`;
    };

    softphone.onCallEstablished = call => {
      document.getElementById('call-established-event').innerText = `Call answered, number: ${call.number}`;
    };

    softphone.onOutgoingCallMade = call => {
      document.getElementById('call-outgoing-event').innerText = `Call created here, number: ${call.number}`;
    };

    softphone.onCallRejected = call => {
      document.getElementById('call-rejected-event').innerText = `Call rejected here, number: ${call.number}`;
    };

    softphone.onCallEnded = call => {
      document.getElementById('call-ended-event').innerText = `Call ended, duration: ${(call.endTime - call.answerTime) / 1000}s`;
    };

    softphone.onCardSaved = card => {
      document.getElementById('card-saved-event').innerHTML = `Client: ${card.clientId.label}<br /> title: ${card.title}<br /> note: ${card.note}`;
    };

    softphone.onCardCanceled = () => {
      document.getElementById('card-canceled-event').innerHTML = 'Card canceled 🙁';
    };

    softphone.onDisplayLinkedOption = optionId => {
      document.getElementById('display-linked-option-event').innerHTML = `Selected identified: ${optionId}`;
    };

    softphone.onWazoContactSearch = query => {
      document.getElementById('wazo-search-contact-event').innerHTML = `Searching for: ${query}`;
    };

    softphone.onAgentLoggedIn = () => {
      document.getElementById('agent-logged-in-event').innerHTML = 'Agent logged in !';
    };

    softphone.onLanguageChanged = language => {
      document.getElementById('language-changed-event').innerHTML = `Language changed: ${language} !`;
    };

    softphone.onCallHeld = () => {
      document.getElementById('call-held-event').innerHTML = 'Current call is held ⏸️';
    };

    softphone.onCallResumed = () => {
      document.getElementById('call-resumed-event').innerHTML = 'Current call is resumed ▶️️';
    };

    softphone.onCallMuted = () => {
      document.getElementById('call-muted-event').innerHTML = 'Current call is muted 🤐';
    };

    softphone.onCallUnMuted = () => {
      document.getElementById('call-unmuted-event').innerHTML = 'Current call is un-muted 🔊';
    };

    softphone.onDtmfSent = tone => {
      document.getElementById('call-dtmf-event').innerHTML = `DTMF sent: ${tone}`;
    };

    softphone.onDirectTransfer = number => {
      document.getElementById('call-direct-transfer-event').innerHTML = `Call directly transferred to: ${number}`;
    };

    softphone.onCreateIndirectTransfer = number => {
      document.getElementById('call-indirect-transfer-event').innerHTML = `Indirect transfer created to: ${number}`;
    };

    softphone.onIndirectCallMade = call => {
      document.getElementById('call-indirect-transfer-made-event').innerHTML = `Indirect transfer answered from: ${call.number}`;
    };

    softphone.onCancelIndirectTransfer = () => {
      document.getElementById('call-indirect-transfer-cancel-event').innerHTML = 'Indirect transfer canceled';
    };

    softphone.onConfirmIndirectTransfer = () => {
      document.getElementById('call-indirect-transfer-confirm-event').innerHTML = 'Indirect transfer confirmed';
    };

    softphone.onStartRecording = () => {
      document.getElementById('call-start-record-event').innerHTML = 'Current call recorded';
    };

    softphone.onStopRecording = () => {
      document.getElementById('call-stop-record-event').innerHTML = 'Current record stopped';
    };

    softphone.onCallLogCreated = callLog => {
      document.getElementById('call-log-event').innerHTML = `A new call log was created, its duration: ${callLog.duration}`;
    };

    softphone.onWebsocketMessage = (message) => {
      document.getElementById('websocket-event').innerHTML = `A new websocket message was received: ${JSON.stringify(message)}`;
    };

    softphone.on('show', () => {
      minimizeButton.style.display = 'block';
      maximizeButton.style.display = 'none';
    })

    softphone.on('hide', () => {
      minimizeButton.style.display = 'none';
      maximizeButton.style.display = 'block';
    })

    // add minimize / maximize buttons
    const minimizeButton = document.createElement('button');
    minimizeButton.id = 'minimize-button';
    minimizeButton.innerHTML = 'X';
    softphone.wrapper.appendChild(minimizeButton);

    const maximizeButton = document.createElement('button');
    maximizeButton.id = 'maximize-button';
    maximizeButton.innerHTML = 'Show Softphone';
    softphone.wrapper.appendChild(maximizeButton);

    minimizeButton.addEventListener('click', softphone.hide.bind(softphone));
    maximizeButton.addEventListener('click', softphone.show.bind(softphone));
  }

  const updateSoftphone = (extra = { right: 'auto', top: 'auto', left: 0, bottom: 0 }, server = null) => {
    softphone.updateCss(extra);
    softphone.show();
    if (server) {
      softphone.configureServer(server);
    }
  }

  // Had to use setTimeout because `window.load` or `window.addEventListener('load', ...)` aren't called
  global.initButtons = () => {
    initSoftphone();

    // Display
    document.querySelector('#display-softphone').addEventListener('click', e => {
      e.preventDefault();
      softphone.show();
    });

    // Hide
    document.querySelector('#hide-softphone').addEventListener('click', e => {
      e.preventDefault();
      softphone.hide();
    });

    // Move right
    document.querySelector('#move-right').addEventListener('click', e => {
      e.preventDefault();

      updateSoftphone({
        bottom: 0,
        left: 'auto',
        right: 0,
      });
    });

    // Login from token
    document.querySelector('#login-form').addEventListener('submit', async e => {
      e.preventDefault();

      const login = document.querySelector('#login').value;
      const password = document.querySelector('#password').value;
      const server = document.querySelector('#server').value;

      localStorage.setItem('softphone-server', server);
      defaultServer = server;

      updateSoftphone(null, server);
      Wazo.Auth.init('softphone-example');
      Wazo.Auth.setHost(server);

      try {
        const session = await Wazo.Auth.logIn(login, password);

        softphone.loginWithToken(session.token, session.refreshToken);
      } catch (e) {
      }
    });

    // Call *10
    document.querySelector('#call-start-ten').addEventListener('click', e => {
      e.preventDefault();
      if (!displayed) {
        updateSoftphone();
      }

      softphone.makeCall('*10');
    });

    // Parse links
    document.querySelector('#parse-links').addEventListener('click', e => {
      e.preventDefault();
      if (!displayed) {
        updateSoftphone();
      }

      softphone.removeParsedLinksEvent();
      softphone.onLinkEnabled = (link => {
        link.style.color = 'red';
      });
      softphone.parseLinks();
    });

    // Inject CSS
    document.querySelector('#inject-css').addEventListener('click', e => {
      e.preventDefault();
      if (!displayed) {
        updateSoftphone();
      }

      softphone.injectCss(`
        a button.MuiFab-circular {
          background-color: green !important;
        }
      `);
    });

    // Customize appearance
    document.querySelector('#customize-appearance').addEventListener('click', e => {
      e.preventDefault();
      if (!displayed) {
        updateSoftphone();
      }

      softphone.customizeAppearance({
        colors: {
          primary: '#d06c2b',
          button: '#4b2bd7',
          secondary: '#29877c',
        },
      }, {
        en: {
          call: {
            searchInWazo: 'Type a number here !',
          },
          user: {
            login: 'My login button',
          },
        },
      }, {
        // Assets
        logo: 'http://localhost:3000/examples/softphone/assets/logo.png',
      });
      softphone.show();
    });

    document.querySelector('#update-form-value').addEventListener('click', e => {
      e.preventDefault();

      softphone.setCardValue('title', 'My new title !');
    });

    // Add simple form
    document.querySelector('#add-form').addEventListener('click', e => {
      e.preventDefault();

      if (!displayed) {
        updateSoftphone();
      }

      softphone.setFormSchema({
        type: 'object',
        required: ['subject', 'title'],
        properties: {
          subject: { type: "string", enum: ["Support", "Greetings", "Want to talk to Bob"], title: 'Subject' },
          title: { type: 'string', title: 'Title' },
          note: { type: 'string', title: 'Note' },
        },
      }, {
        note: { 'ui:widget': 'textarea' },
      });
    });

    // Advanced form
    document.querySelector('#advanced-form').addEventListener('click', e => {
      e.preventDefault();
      if (!displayed) {
        updateSoftphone();
      }

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
        clientId: { 'ui:field': 'autocomplete' },
      });

      softphone.onOptionsResults('clientId', [{ label: 'Alice', id: 1 }, { label: 'Bob', id: 2 }, { label: 'Charlies', id: 3 }]);

      softphone.onSearchOptions = (fieldId, query) => {
        const results = [{ label: 'Charles', id: 4 }, { label: 'David', id: 5 }, { label: 'Henry', id: 6 }];
        softphone.onOptionsResults(fieldId, results);
      };
    });
  };

  global.removeSoftphone = () => {
    softphone.remove();
    document.querySelector('#minimize-button')?.remove();
    document.querySelector('#maximize-button')?.remove();
  };

  let defaultServer = typeof localStorage !== 'undefined' ? localStorage.getItem('softphone-server') || 'my-server' : 'my-server';
  let displayed = false;
}
