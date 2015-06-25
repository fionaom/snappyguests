class Admin::WelcomeController < ApplicationController

  def index
    flash.now[:notice] = "Hello " + current_user.email
  end
end
