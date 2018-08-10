document.addEventListener('DOMContentLoaded', () => {
  console.log('Script del Login');
})

var imageCapture;
var mediaStreamPointer;
var img = new Image();

function analizar() {

}

function save() {
  console.log('save');
  const canvas = document.querySelector('#grabFrameCanvas');
  img.src = canvas.toDataURL();
<<<<<<< HEAD
  // document.body.appendChild(img);
=======
  document.body.appendChild(img);
  document.getElementById("imagen1").src=img.src;
  document.getElementById("imgUrl").value=img.src;
  console.log('save...');
>>>>>>> cesar

  // Get canvas contents as a data URL
  var imgAsDataURL = canvas.toDataURL('image/png');
  
console.log(imgAsDataURL);
  // Save image into localStorage
  try { localStorage.setItem('imagen', imgAsDataURL); 

  //cloudinary.createUploader().upload(imgAsDataURL);
}
  catch (e) { console.log("Storage failed: " + e); }

  // Save image into Mongo database
  

}

function onGetUserMediaButtonClick() {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
    document.querySelector('video').srcObject = mediaStream;
    const track = mediaStream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
    mediaStreamPointer = mediaStream;
  })
  .catch(error => ChromeSamples.log(error));
}

function onGrabFrameButtonClick() {
  imageCapture.grabFrame()
  .then(imageBitmap => {
    const canvas = document.querySelector('#grabFrameCanvas');
    drawCanvas(canvas, imageBitmap);
  })
  .catch(error => ChromeSamples.log(error));
}

function onTakePhotoButtonClick() {
  imageCapture.takePhoto()
  .then(blob => createImageBitmap(blob))
  .then(imageBitmap => {
    const canvas = document.querySelector('#takePhotoCanvas');
    drawCanvas(canvas, imageBitmap);
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

function onStop(){
  const track = mediaStreamPointer.getVideoTracks()[0];
  track.stop();
}
