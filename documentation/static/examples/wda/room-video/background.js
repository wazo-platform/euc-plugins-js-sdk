import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

const app = new App();

// let local;
// let remote;
//
// const createVideoWithStream = stream => {
//   const video = document.createElement('video');
//   video.style.position = 'absolute';
//   video.style.width = '100px';
//   video.style.height = '60px';
//   video.style.top = '20px';
//   video.autoplay = true;
//
//   video.srcObject = stream;
//   video.muted = true;
//
//   video.onloadedmetadata = () => {
//     const tracks = stream.getVideoTracks();
//     tracks.forEach(track => {
//       track.enabled = true;
//       track.loaded = true;
//     });
//   };
//
//   document.body.appendChild(video);
//
//   return video;
// }

// const detach = video => {
//   video.srcObject.getTracks().forEach(track => {
//     track.stop();
//   });
//
//   video.remove();
// }

app.onUserJoinRoom = (room) => {
  console.log('onUserJoinRoom', room);
};
app.onUserLeaveRoom = (room) => {
  console.log('onUserLeaveRoom', room);
};
app.onParticipantJoinRoom = (room, participant) => {
  console.log('onParticipantJoinRoom', room, participant);
};
app.onParticipantLeaveRoom = (room, participant) => {
  console.log('onParticipantLeaveRoom', room, participant);
};


app.initialize();
