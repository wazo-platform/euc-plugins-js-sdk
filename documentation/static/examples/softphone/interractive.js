import softphone from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/softphone.js';

console.log('!interractive', softphone);

softphone.init({ server: 'my-server' });

// Had to use setTimeout because `window.load` or `window.addEventListener('load', ...)` aren't called
setTimeout(() => {
  document.querySelector('#display-softphone').addEventListener('click', e => {
    e.preventDefault();
    softphone.displaySoftphone();
  });

  document.querySelector('#hide-softphone').addEventListener('click', e => {
    e.preventDefault();
    softphone.hideSoftphone();
  });

  document.querySelector('#move-right').addEventListener('click', e => {
    e.preventDefault();
    softphone.displaySoftphone();
  });
}, 1000);
