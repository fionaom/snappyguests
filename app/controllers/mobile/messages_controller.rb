class Mobile::MessagesController < Mobile::ApplicationController

  layout 'mobile'

  before_action :set_event
  before_action :set_message, only: [:show]

  def new
    @message = Message.new(:user => current_user, :event => Event.first)
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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:event_id]) if params[:event_id]
  end

  def set_message
    @message = Message.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:photo, :email, :body, :event_id)
  end

end
