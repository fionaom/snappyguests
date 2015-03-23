class Admin::WelcomeController < ApplicationController

  def index
    flash[:notice] = "Hi"
  end
end
