var MAX_WIDTH = 281;
var MAX_HEIGHT = 220;

$(function() {

    $('.image_upload').click(function () {
        $('#message_photo').trigger('click');
        return false;
    });

    $('#message_photo').on('change', function (e) {
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
                $.mobile.changePage('#page_two', {'transition' : 'slide'});


                $('#imgresizepreview, #profilepicturepreview').attr('src', this.src);
            };
        };
        reader.readAsDataURL(this.files[0]);
    });

    $('#new_message').validate(function()
    {
        rules: {
            body: "required"
        }
    });

});
