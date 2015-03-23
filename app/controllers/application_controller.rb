class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Customize the Layout for Devise depending on whether or not it is a mobile request
  layout Proc.new { |controller|
      if MobileSubdomain.matches?(request)
          'mobile'
      else
          'application'
      end
  }
end
