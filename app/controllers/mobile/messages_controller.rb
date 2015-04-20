class Mobile::MessagesController < Mobile::ApplicationController

  layout 'mobile'

  def new
    @message = Message.new(:user => current_user, :event => Event.first)
  end

  def create
    @message = Message.new(message_params)

    respond_to do |format|
      if @message.save
        format.html { redirect_to mobile_root_url, notice: 'Message was successfully created.' }
      else
        p @message.errors.full_messages
        format.html { render :new }
      end
    end
  end

  private

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:photo, :email, :body, :event_id)
  end

end
