var MAX_WIDTH = 281;
var MAX_HEIGHT = 220;
/*
$(document).bind('pageinit', function (event) {
   // $.mobile.hashListeningEnabled = false;
});*/

$(document).on('pageshow', function (event) {
    $('.image_upload').on('click', function () {
        $('input[type="file"]').trigger('click');
        return false;
    });

    $('input[type="file"]').on('change', function (e) {
        e.preventDefault();
        if (this.files.length === 0) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;

            image.onload = function() {
                var snapshot = $('#display_photo');

                var maxWidth = MAX_WIDTH; // Max width for the image
                var maxHeight = MAX_HEIGHT;    // Max height for the image
                var ratio = 0;  // Used for aspect ratio
                var width = this.width;    // Current image width
                var height = this.height;  // Current image height

                if (width > height)
                {
                    if(width > maxWidth)
                    {
                        ratio = maxWidth / width;   // get ratio for scaling image
                    }
                }
                else
                {
                    if(height > maxHeight)
                    {
                        ratio = maxHeight / height;   // get ratio for scaling image
                    }
                }
                height = height * ratio;    // Reset height to match scaled image
                width = width * ratio;    // Reset width to match scaled image
                snapshot.css("width", width); // Set new width
                snapshot.css("height", height);  // Scale height based on ratio

                snapshot.attr('src', e.target.result).show();
                changeStep('.upload_step', '.message_step', 'fwd');
              //  $.mobile.changePage('#message', {'transition' : 'slide'});
            };
        };
        reader.readAsDataURL(this.files[0]);
    });

    $('#message_back_button').on('click', function () {
        // Remove the previously selected image
        $('#message_photo').val('');
        changeStep('.message_step', '.upload_step', 'back');
    });

    $('#message_save_button').on('click', function () {
        changeStep('.message_step', '.email_step', 'fwd');
    });

    $('#email_back_button').on('click', function () {
        changeStep('.email_step', '.message_step', 'back');
    });

    $('#new_message').on('submit', function(e)
    {
        if ($('#new_message').valid()) {
            $.mobile.loading('show', {
                text: 'Uploading...',
                textVisible: true,
                theme: 'b',
                html: ""
            });
        }
        else
        {
            e.preventDefault();
        }
    });

});

function changeStep(from, to, direction)
{
   // $.mobile.silentScroll(0);
    if (direction == 'fwd') {
        $(to).find('.contents').fadeIn('slow');
        $(to).show('slide', {direction: 'right'});
        $(from).hide('slide', {direction: 'left'});
        $(from).find('.contents').fadeOut('slow');
    }
    else {
        $(to).find('.contents').fadeIn();
        $(to).show('slide', {direction: 'left'});
        $(from).hide('slide', {direction: 'right'});
        $(from).find('.contents').fadeOut('slow');
    }

    if (to == '.message_step')
    {
        setTimeout(function(){
            $('#message_body').focus();
        },500);
    }
}

function fadeInImage(imageContainer) {
    $(imageContainer).removeClass('loading');
    if ($(imageContainer).parent('#photo_container').children('.fadeInImage.loading').length == 0) {
        $(imageContainer).parent('#photo_container').removeClass('loadingImages');
        $(imageContainer).parent('#photo_container').children('.fadeInImage').css({opacity: 1});
    }
}

$(function() {


    $( "#new_message" ).validate({
        rules: {
            body: "required",
            email: {
                required: true,
                email: true
            }
        }
    });

});
