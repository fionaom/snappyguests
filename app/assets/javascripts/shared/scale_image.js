/**
 * Created by johnowens0 on 24/06/15.
 */
function scaleImage(image_id, imageOriginalWidth, imageOriginalHeight, force_parent) {
    var imageID = $(image_id);

    var ratio = 1;  // Used for aspect ratio
    var width = imageOriginalWidth;    // Current image width
    var height = imageOriginalHeight;  // Current image height

    if (typeof force_parent === 'undefined') {
        parent_width = imageID.parent("div").width();
        parent_height = imageID.parent("div").height();
    }
    else {
        var forceParent = $(force_parent);
        parent_width = forceParent.width();
        parent_height = forceParent.height();
    }


    if (width > height) {
        ratio = parent_width / width;   // get ratio for scaling image
        imageID.css("width", "100%");
        height = height * ratio;

        height_percent = 100* (height / parent_height);
        imageID.css("height", height_percent+"%");
        top_gap = 0.5 * (parent_height - height);
        top_gap_percent = 100* (top_gap / parent_height);
        imageID.css("margin-top", top_gap_percent+"%");

        //console.log(imageID.parent('div'));
        //alert("w>h Scaler - name: " + imageID.parent('div').hasClass('.black_bg_thumb') + ", pw: " + parent_width + ", ph: " + parent_height);
    }
    else {
        ratio = parent_height / height;   // get ratio for scaling image
        imageID.css("height", "100%");
        width = width * ratio;
        width_percent = 100* (width / parent_width);
        imageID.css("width", width_percent+"%");
        imageID.css("margin-top", "0");
        imageID.css("margin-left", "auto");
        imageID.css("margin-right", "auto");

        //alert("h>w Scaler - r: " + ratio + ", w%: " + width_percent + ", fp: " + force_parent);
    }
}