var MAX_WIDTH = 260;
var MAX_HEIGHT = 280;
var MAX_MSG_LENGTH = 75;
/*
$(document).bind('pageinit', function (event) {
   // $.mobile.hashListeningEnabled = false;
});*/

$(document).on('pageshow', '#show_message', function (event) {
    polaroidMessageFontSize($('.polaroid_message'), $('.polaroid_message').html().length);
});

$(document).on('pageshow', function (event) {
    $('.image_upload').on('click', function () {
        $('input[type="file"]').trigger('click');
        return false;
    });

    $("#message_body").on('change keydown paste input', function() {

        var charsRemaining = $('#chars-remaining');

        // Display the characters remaining if there are only < 10 remaining
        if ($(this).val().length > MAX_MSG_LENGTH) {
            $(this).val($(this).val().substr(0, MAX_MSG_LENGTH));
        }
        if ((MAX_MSG_LENGTH - $(this).val().length) < 10) {
            $('#chars-remaining').html((MAX_MSG_LENGTH - $(this).val().length) + ' chars remaining');
            charsRemaining.css("display", "block");
        }
        else {
            $('#chars-remaining').html('');
            charsRemaining.css("display", "none");
        }
        polaroidMessageFontSize($(this), $(this).val().length);
    });


  //  $('#message_body').on('keyup', function()
   // {
    //    $(this).fitText(1.0, { minFontSize: '12px', maxFontSize: '60px', outerContainerSize: 280 });
  //  });

    $('input[type="file"]').on('change', function (e) {
        e.preventDefault();
        if (this.files.length === 0) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;

            image.onload = function() {

                var snapshot = $('.display_photo');
                scaleImage(snapshot, this.width, this.height);

                // Rotate image based on EXIF
                // http://www.impulseadventure.com/photo/exif-orientation.html
                EXIF.getData(this, function() {
                    var orientation = EXIF.getTag(this, 'Orientation');
                    if (orientation == "3") {
                        snapshot.addClass("rotate180");
                    }
                    else if (orientation == "6") {
                        snapshot.addClass("rotate90");
                    }
                    else if (orientation == "8") {
                        snapshot.addClass("rotate270");
                    }
                });

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
        polaroidMessageFontSize($('.polaroid_message'), $('.polaroid_message').val().length);

      /*  setTimeout(function(){
            $('#message_body').focus();
        },500); */
    }
}



function fadeInImage(imageContainer) {
    $(imageContainer).removeClass('loading');
    if ($(imageContainer).parents('#polaroid_container').find('.fadeInImage.loading').length == 0) {
        $(imageContainer).parents('#polaroid_container').removeClass('loadingImages');
        $(imageContainer).parents('#polaroid_container').find('.fadeInImage').css({opacity: 1});
    }
}

function aspectFit(imageContainer) {

    scaleImage(imageContainer, $(imageContainer).width(), $(imageContainer).height());
}

$(function() {


    $( "#new_message" ).validate({
        rules: {
            body: "required",
            email: {
                required: true,
                email: true
            },
            event_code: {
                required: true
            }
        },
        errorPlacement: function(error, element) {
            $(element).closest(".ui-input-text").addClass('error');
            $(element).append(error);
        }
    });

});
