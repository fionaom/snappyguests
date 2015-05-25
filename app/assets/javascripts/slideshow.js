var load_new_messages_interval = null;
var load_new_messages_interval_time = 5000;
var lightGallery = null;

$(function() {

    var hideThumbnailsTimeout = null;
    $('body#slide_show').on("mousemove", ".lg-slide.current", function() {
        $('#lg-gallery').addClass('open');
        clearTimeout(hideThumbnailsTimeout);
        hideThumbnailsTimeout = setTimeout(function () {
            $('#lg-gallery').removeClass('open');
        }, 800);
    });

    $('body#slide_show').on("mousemove", ".thumb-cont", function() {
        clearTimeout(hideThumbnailsTimeout);
        $('#lg-gallery').addClass('open');
    });

    $('body#slide_show').on("mouseleave", ".lg-slide.current", function() {
        clearTimeout(hideThumbnailsTimeout);
        $('#lg-gallery').removeClass('open');
    });

});

function loadNewMessages()
{
    var last_message_id = $('#light-gallery li:last-child').data('message-id');
   // console.log(last_message_id);
    $.get(window.location.href + '/messages/'+last_message_id, function(data){

    });
    //console.log('Check for new messages');
}

function bounceIn(messageId) {
    // Add a random rotation
    var random = Math.floor((Math.random() * 4) + 1); // Random number between 1 and 4

    $(messageId).css('-ms-transform', 'rotate('+random*4+'deg)');
    $(messageId).css('-webkit-transform', 'rotate('+random*4+'deg)');
    $(messageId).css('transform', 'rotate('+random*4+'deg)');

    $(messageId).toggle( "bounce", { times: 1 }, "slow" );
}

function initializeLightGallery()
{
    $('#light-gallery li').unbind('click');
    lightGallery = $('#light-gallery').lightGallery({
    lang: {
        allPhotos: $('#light-gallery').data('event-title')
    },
    mode: 'fade',
    auto: true,
    loop: false,
    speed: 1000,
    showThumbByDefault: true,
    onOpen        : function(el) {
        // Do not show controls - hiding them from config doesn't work correctly
        $("#lg-action").hide();
        setTimeout(function () {
            $('#lg-gallery').removeClass('open');
        }, 800);
    }
});
    return lightGallery;
}