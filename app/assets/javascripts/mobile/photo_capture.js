$(function() {

    var video = document.querySelector('video#getUserMedia');
    var canvas = document.querySelector('#canvas');
    var snapshot = document.querySelector('#display_photo');
    var localMediaStream = null;

    turnCameraOn(video, canvas, snapshot, $(this));

    $('#take_photo_button').click(function () {
        // Turn on camera
        if ($(this).data('camera-state') == 'on')
            takePhoto(video, canvas, snapshot);
        else
            turnCameraOn(video, canvas, snapshot, $(this));
    });

    $('#photo_button').click(function () {
        $('#message_photo').trigger('click');
        return false;
    });

    $('#message_photo').on('change', function (e) {
        e.preventDefault();
        if (this.files.length === 0) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var snapshot = $('#display_photo');
            snapshot.attr('src', e.target.result).show();
            $.mobile.changePage('#page_two', {'transition' : 'slide'});
        };
        reader.readAsDataURL(this.files[0]);
    });

});

function turnCameraOn(video, canvas, snapshot, captureButton) {
    var ctx = canvas.getContext('2d');

    captureButton.disabled = true;

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
    //if (localMediaStream)
     //   localMediaStream.stop();
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 198, 240);
    snapshot.src = canvas.toDataURL('image/webp');
    //video.style.display = "none";
    snapshot.style.display = "block";
    $.mobile.changePage('#page_two', {'transition' : 'slide'});
}