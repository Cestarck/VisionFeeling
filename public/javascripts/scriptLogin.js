console.log('Script del Login');
document.addEventListener('DOMContentLoaded', () => {

})

var imageCapture;
var mediaStreamPointer;
var img = new Image();

function camara(){
  navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {

    // PRENDER LA CAMARA
    document.querySelector('video').srcObject = mediaStream;
    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    mediaStreamPointer = mediaStream;

    // GRABAR LA IMAGEN EN EL CANVAS
    imageCapture.grabFrame()
    .then(imageBitmap => {

      const canvas = document.querySelector('#grabFrameCanvas');
      drawCanvas(canvas, imageBitmap);
      const track = mediaStreamPointer.getVideoTracks()[0];
      track.stop();

      // GRABAR EL CANVAS EN UNA IMAGEN
      img.src = canvas.toDataURL();
      // Get canvas contents as a data URL
      var imgAsDataURL = canvas.toDataURL('image/png');

    })
    .catch(error => ChromeSamples.log(error));

  })
  .catch(error => ChromeSamples.log(error));
  console.log('Fin prende Camara');
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
