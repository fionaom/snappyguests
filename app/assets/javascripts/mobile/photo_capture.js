$(function() {

    var video = document.querySelector('video#getUserMedia');
    var canvas = document.querySelector('#canvas');
    var snapshot = document.querySelector('#display_photo');

    $('#takePhotoButton').click(function () {
        // Turn on camera
        if ($(this).data('camera-state') == 'on')
            takePhoto(video, canvas, snapshot);
        else
            turnCameraOn(video, canvas, snapshot, $(this));
    });

});

function turnCameraOn(video, canvas, snapshot, captureButton) {
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;

    captureButton.disabled = true;

    console.log(captureButton);

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var constraints = {
        video: true
    }

    var successCallback = function (mediaStream) {
        video.src = (window.URL && window.URL.createObjectURL(mediaStream)) || mediaStream;
        video.addEventListener("loadedmetadata", function (e) {
            video.style.display = "block";
            localMediaStream = mediaStream;
            captureButton.data('camera-state', 'on');
        });
    };

    var errorCallback = function () {
        console.log("failure to get media");
    };

    if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, successCallback, errorCallback);
    } else {
        console.log("getUserMedia not supported");
    }
}

function takePhoto(video, canvas, snapshot)
{
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 320, 400);
    snapshot.src = canvas.toDataURL('image/webp');
    video.style.display = "none";
    snapshot.style.display = "block";
}