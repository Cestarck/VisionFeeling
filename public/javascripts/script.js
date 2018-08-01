document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  window.onload=function(){
    var player = document.getElementById('player'); 
    var snapshotCanvas = document.getElementById('snapshot');
    var captureButton = document.getElementById('capture');
    var videoTracks;
  
    var handleSuccess = function(stream) {
      // Attach the video stream to the video element and autoplay.
      player.srcObject = stream;
      videoTracks = stream.getVideoTracks();
    };
  
    captureButton.addEventListener('click', function() {
      var context = snapshot.getContext('2d');
      // frame to camvas.
      context.drawImage(player, 0, 0, snapshotCanvas.width, 
          snapshotCanvas.height);
          // Stop stream
      videoTracks.forEach(function(track) {track.stop()});
    });
  
  
    navigator.mediaDevices.getUserMedia({video: true})
        .then(handleSuccess);
}
}, false);
