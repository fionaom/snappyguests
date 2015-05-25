class Admin::SlideShowController < ApplicationController

  skip_before_filter :authenticate_user!

  before_action :set_event, only: [:show, :new_messages]

  layout 'slide_show'

  def show
    raise ActionController::RoutingError.new('Not Found') if !@event
  end

  def new_messages
    @new_messages = @event.messages.where("id > #{params[:last_id]}")
    respond_to do |format|
        format.js   {}
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find_by_uuid(params[:uuid])
  end

end