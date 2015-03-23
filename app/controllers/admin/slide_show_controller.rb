class Admin::SlideShowController < ApplicationController

  skip_before_filter :authenticate_user!

  layout 'slide_show'

  def show
    @event = Event.find_by_uuid(params[:uuid])
    raise ActionController::RoutingError.new('Not Found') if !@event
  end

end