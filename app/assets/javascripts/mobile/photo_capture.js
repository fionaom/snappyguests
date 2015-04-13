$(function() {

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
