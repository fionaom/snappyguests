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