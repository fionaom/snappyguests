class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  validates_presence_of :event_id, :message => "could not be found"
  validates_presence_of :email

  has_attached_file :photo, :styles => { :large => "1000x1000>", :medium => "281x220>", :thumb => "100x100>"}, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  after_post_process :save_photo_dimensions

  ROTATE_CLOCKWISE = 90
  ROTATE_ANTICLOCKWISE = -90

  def save_photo_dimensions
      geometry = Paperclip::Geometry.from_file(self.photo.queued_for_write[:original])
      image_exif_data = EXIFR::JPEG.new(self.photo.queued_for_write[:original].path).exif
      puts "#{image_exif_data[:orientation].inspect}"
      self.photo_width = geometry.width.to_i
      self.photo_height = geometry.height.to_i
      if (image_exif_data[:orientation] == EXIFR::TIFF::RightTopOrientation)
        self.photo_height = geometry.width.to_i
        self.photo_width = geometry.height.to_i
      end

=begin
      if (image_exif_data[:orientation] == EXIFR::TIFF::RightTopOrientation)
        degrees = ROTATE_CLOCKWISE
      elsif (image_exif_data[:orientation] == EXIFR::TIFF::LeftBottomOrientation)
        degrees = ROTATE_ANTICLOCKWISE
      else
        puts "Not rotating #{self.photo.queued_for_write[:original]}"
        return
      end

      image = (Magick::Image.read(self.photo.queued_for_write[:original])).first
      #image.rotate(degrees).write("#{file.split('.').first}_rotated.jpg")
      image.rotate(degrees).write("#{self.photo.queued_for_write[:original]}")
=end

  end

end
