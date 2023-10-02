import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

(async () => {
  await app.initialize();

  app.configureSounds({
    message: 'https://audio-previews.elements.envatousercontent.com/files/156322809/preview.mp3'
  });

  setTimeout(() => {
    // Leave some time for the user to click on the application, allowing the sound to be played.
    app.playNewMessageSound();
  }, 2000);
})();
