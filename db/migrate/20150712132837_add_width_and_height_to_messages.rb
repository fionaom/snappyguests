class AddWidthAndHeightToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :photo_width, :integer
    add_column :messages, :photo_height, :integer

    Message.all.each do |msg|
      geometry = Paperclip::Geometry.from_file(msg.photo.path(:original))
      msg.photo_width = geometry.width.to_i
      msg.photo_height = geometry.height.to_i
      msg.save!
    end

  end
end
