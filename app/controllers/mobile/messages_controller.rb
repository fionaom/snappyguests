class Mobile::MessagesController < Mobile::ApplicationController

  layout 'mobile'

  skip_before_action :verify_authenticity_token

  before_action :set_step, :except => [:check_event_code]
  before_action :set_event
  before_action :set_message, only: [:show, :delete, :show_polaroid, :download_polaroid]
  before_action :set_email, only: [:create]

  def new
    @message = Message.new(:user => current_user)
    @message.email = session[:email] if session[:email].present?
    @message.event = Event.find(session[:event_id]) if session[:event_id].present?
  end

  def create
    @message = Message.new(message_params)

    if !@event
      @step = "email_step"
    else
      session[:event_id] = @event.id
    end

    @message.event = @event

    respond_to do |format|
      if @message.save
        format.html { redirect_to message_path(@message), notice: 'Message was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def show
    @page_id = "show_message"
  end

  def index
    redirect_to new_message_path
  end

  def check_event_code
  end

  def show_polaroid
    @page_id = "download_polaroid"
  end

=begin
  def download_polaroid
    #kit = IMGKit.new(render_to_string(:show_polaroid), :quality => 50)
    kit = IMGKit.new("http://m.snappyguests.com/messages/polaroid/#{params[:id]}")
   # kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/imgkit/application.css"
   # kit.javascripts << "#{Rails.root}/app/assets/javascripts/imgkit/application.js"
    img =  kit.to_img(:png)
    #send_file img.to_s.gsub("\u0000", ''), type: 'image/png', disposition: 'inline'
    send_data(img, :type => "image/jpeg", :disposition => 'inline')
  end
=end

  private

  def set_step
    @step = "upload_step"
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find_by_code(params[:event_code]) if params[:event_code]
  end

  def set_message
    @message = Message.find(params[:id])
  end

  def set_email
    session[:email] = params[:message][:email] if params[:message][:email]
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:photo, :email, :body, :event_code)
  end

end
