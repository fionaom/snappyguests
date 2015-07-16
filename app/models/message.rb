class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  validates_presence_of :event_id, :email

  has_attached_file :photo, :styles => { :large => "1000x1000>", :medium => "281x220>", :thumb => "100x100>"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  after_post_process :save_photo_dimensions

  def save_photo_dimensions
      geometry = Paperclip::Geometry.from_file(self.photo.queued_for_write[:original])
      self.photo_width = geometry.width.to_i
      self.photo_height = geometry.height.to_i
  end

end
