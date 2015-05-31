function polaroidMessageFontSize(textField, textLength)
{
    if (textLength < 18) {
        textField.css('font-size', '30px');
        textField.css('line-height', '30px');
    }
    else if (textLength >= 52) {
        textField.css('font-size', '14px');
        textField.css('line-height', '14px');
    }
    else if (textLength >= 18) {
        textField.css('font-size', '20px');
        textField.css('line-height', '30px');

        // Since going to two lines now
        if (textLength >= 26)
            textField.css('line-height', '20px');
    }
}