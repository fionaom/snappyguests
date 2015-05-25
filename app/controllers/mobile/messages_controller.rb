class Mobile::MessagesController < Mobile::ApplicationController

  layout 'mobile'

  before_action :set_event
  before_action :set_message, only: [:show]
  before_action :set_email, only: [:create]

  def new
    @message = Message.new(:user => current_user, :event => Event.first)
    @message.email = session[:email] if session[:email].present?
  end

  def create
    @message = Message.new(message_params)

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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:event_id]) if params[:event_id]
  end

  def set_message
    @message = Message.find(params[:id])
  end

  def set_email
    session[:email] = params[:message][:email] if params[:message][:email]
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:photo, :email, :body, :event_id)
  end

end
