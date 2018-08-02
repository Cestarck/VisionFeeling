var context;
var imagen;
var timer;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  var canvas    = document.getElementById('canvas');
  context   = canvas.getContext('2d');
  let btnstart  = document.getElementById('btnstart');
  let btnstop   = document.getElementById('btnstop');
  const video   = document.getElementById('video');
  imagen = new Image();
  imagen.src = '/images/humanFace.jpg';
  btnstart.addEventListener('click', startCamera, false);
  btnstop.addEventListener('click', stopCamera, false);
}, false);

function stopCamera() {
  console.log('stop camera');
  draw(canvas.width, canvas.height, video, imagen);
  clearTimeout(timer);
  timer = 0;
  stream.getTracks()[0].stop();
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
  // if (stream) {
  //   stream.getTracks()[0].stop();
  // }
};

function startCamera() {
  console.log('start camera');
  const constraints = { video: { width: { exact: 250 }, height: { exact: 250 }, }, };
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}

function handleSuccess(stream) {
  video.srcObject = stream;
  draw(canvas.width, canvas.height, video, imagen);
}

function handleError(e) {
  console.log('Error: ' + e.code);
};

function draw(width, height, video, imagen){
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  context.drawImage(imagen, 0, 0);
  timer = setTimeout(draw, 250, width, height, video, imagen);
}
