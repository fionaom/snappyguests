module MessageHelper

  def polaroid_font_size(message_body)
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

    return "font-size: #{font_size}px; line-height: #{line_height}px"
  end

end