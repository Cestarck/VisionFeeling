document.addEventListener('DOMContentLoaded', () => {
  console.log('Script del Login');
})

const vgaConstraints = {
  video: {
    width: { exact: 320 },
    height: { exact: 240 },
  },
};

var imageCapture;
var mediaStreamPointer;
var img = new Image();
var track;

function camara(){
  console.log('camara');
  navigator.mediaDevices.getUserMedia(vgaConstraints)
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;
    track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    mediaStreamPointer = mediaStream;
    imageCapture.grabFrame()
    .then(imageBitmap => {
      const canvas = document.querySelector('#grabFrameCanvas');
      drawCanvas(canvas, imageBitmap);
      track.stop();
      // SAVE Image
      console.log('save');
      img.src = canvas.toDataURL();
      // document.getElementById("imagen1").src = img.src;
      document.getElementById("imgUrl").value = img.src;

      // Get canvas contents as a data URL
      var imgAsDataURL = canvas.toDataURL('image/png');
      console.log(imgAsDataURL);
    })
    .catch(error => ChromeSamples.log(error));
  })
  .catch(error => ChromeSamples.log(error));
}

function drawCanvas(canvas, img) {
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);
}
