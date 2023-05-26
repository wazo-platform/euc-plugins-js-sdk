import { App } from 'https://cdn.jsdelivr.net/npm/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

let local;
let remote;

const createVideoWithStream = stream => {
  const video = document.createElement('video');
  video.style.position = 'absolute';
  video.style.width = '100px';
  video.style.height = '60px';
  video.style.top = '20px';
  video.autoplay = true;

  video.srcObject = stream;
  video.muted = true;

  video.onloadedmetadata = () => {
    const tracks = stream.getVideoTracks();
    tracks.forEach(track => {
      track.enabled = true;
      track.loaded = true;
    });
  };

  document.body.appendChild(video);

  return video;
}

const detach = video => {
  video.srcObject.getTracks().forEach(track => {
    track.stop();
  });

  video.remove();
}

app.onCallAnswered = (call) => {
  if (app.hasLocalVideoStream(call)) {
    local = createVideoWithStream(app.getLocalCurrentVideoStream(call));
    local.style.right = '10px';
  }

  if (app.hasRemoveVideoStream(call)) {
    remote = createVideoWithStream(app.getRemoteVideoStream(call));
    remote.style.right = '150px';
  }
};

app.onCallHangedUp = () => {
  if (local) {
    detach(local);
  }

  if (remote) {
    detach(remote);
  }
}

await app.initialize();
