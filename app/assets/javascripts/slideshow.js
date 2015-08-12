var load_new_messages_interval = null;
var load_new_messages_interval_time = 5000;
var lightGallery = null;

// This variable will be used to keep track of whether or not we have reached the end of the slide show
var slide_show_reached_end = false;

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

    $('body#slide_show').on("mouseover", "#lg-next, #lg-prev", function() {
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
    var direction_random = Math.floor((Math.random() * 2) + 1); // Random number between 1 and 2
    var direction = 1;
    if (direction_random == 2)
       direction *= -1;
    var random = Math.floor((Math.random() * 4) + 1); // Random number between 1 and 4

    $(messageId).css('-ms-transform', 'rotate('+direction*random*4+'deg)');
    $(messageId).css('-webkit-transform', 'rotate('+direction*random*4+'deg)');
    $(messageId).css('transform', 'rotate('+direction*random*4+'deg)');

    $(messageId).toggle( "bounce", { times: 1 }, "slow" );
}

function initializeLightGallery(previouslySelectedMessageId, newlyAddedMessageId)
{

   // console.log('Previously Selected Message Id: '+previouslySelectedMessageId);

   // console.log('Newly Added Message Id: '+newlyAddedMessageId);
    $('#light-gallery li').unbind('click');

  //  if (lightGallery)
   // {
       // current_index = lightGallery.getIndex();
     //   console.log("HI");
    //    console.log(current_index);
    //}

    lightGallery = $('#light-gallery').lightGallery({
    lang: {
        allPhotos: $('#light-gallery').data('event-title')
    },
    addClass: 'showThumbByDefault',
    mode: 'fade',
    auto: true,
    loop: true,
    speed: 1000,
    pause: 10000,
    showThumbByDefault: true,
    hideControlOnEnd: true,
    onOpen        : function(el) {
        // Do not show controls - hiding them from config doesn't work correctly
        setTimeout(function () {
            $('#lg-gallery').removeClass('open');
        }, 800);
    },
    onFinishedInitializing: function(el)
    {
        if (typeof(previouslySelectedMessageId) != "undefined")
        {

         //   console.log('Previously Selected Message Id: '+previouslySelectedMessageId);
            var open_message_id = previouslySelectedMessageId;
            if ($('#slide_show').hasClass('looped')) {
            //    console.log("selecting image" + newlyAddedMessageId);
                open_message_id = newlyAddedMessageId;
                $('#slide_show').removeClass('looped');
            }
          //  console.log("Opening" + open_message_id);
            $("#light-gallery li#message_" + open_message_id).trigger('click');
        }
        }
   // }
});

    return lightGallery;
}