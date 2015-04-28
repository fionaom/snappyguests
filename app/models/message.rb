class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  validates_presence_of :event_id, :email

  has_attached_file :photo, :styles => { :large => "1000x1000>", :medium => "281x220>", :thumb => "100x100>"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

end
