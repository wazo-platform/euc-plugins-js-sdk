import app from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

(async () => {
  await app.initialize();

  app.configureSounds({
    message: 'https://audio-previews.elements.envatousercontent.com/files/156322809/preview.mp3'
  });

  setTimeout(() => {
    // Let so time for the user ton click on the application allowing the sound to be played
    app.playNewMessageSound();
  }, 2000);
})();
