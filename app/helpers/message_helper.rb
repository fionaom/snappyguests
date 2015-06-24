module MessageHelper

  def polaroid_font_size(message_body)
    font_size = '5vmin'
    line_height= '5vmin'

=begin
    font_size = 30
    line_height= 30

    if (message_body.length < 18)
      font_size = line_height = 30
    elsif message_body.length >= 52
      font_size = line_height = 18
    elsif message_body.length >= 18
      font_size = 20
      line_height = 30

      if message_body.length >= 18
        line_height = 20
      end
    end
=end


    if (message_body.length < 18)
        font_size = line_height = '5vmin'
    end
    if message_body.length >= 18
        font_size = line_height = '4vmin'
    end
    if message_body.length >= 48
        font_size = line_height = '3vmin'
    end

    return "font-size: #{font_size}; line-height: #{line_height}"
  end

end