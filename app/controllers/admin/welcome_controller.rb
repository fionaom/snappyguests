class Admin::WelcomeController < ApplicationController

  def index
    flash.now[:notice] = "Hello Fee Fee"
  end
end
