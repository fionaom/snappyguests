class Mobile::WelcomeController < Mobile::ApplicationController

  layout 'mobile'

  def index
    flash[:notice] = "Hi"
  end

end
