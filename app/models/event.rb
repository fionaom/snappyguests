class Event < ActiveRecord::Base

  has_many :messages
  has_many :user_events
  has_many :users, through: :user_events

  before_create :init_uuid

  validates_presence_of :title, :code, :start_date, :end_date
  validates_numericality_of :latitude, :if => Proc.new{|event| event.latitude.present?}
  validates_numericality_of :longitude, :if => Proc.new{|event| event.longitude.present?}

  private

  def init_uuid
    self.uuid = UUID.new.generate
  end

end
