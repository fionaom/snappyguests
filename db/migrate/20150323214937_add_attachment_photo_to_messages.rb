class AddAttachmentPhotoToMessages < ActiveRecord::Migration
  def self.up
    change_table :messages do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :messages, :photo
  end
end
