Rails.application.routes.draw do

  # Devise Routes
  devise_for :users

  # User Admin Routes
  constraints(lambda { |request| !MobileSubdomain.matches?(request) }) do
    scope :module => :admin do

      resources :events

      # Root of site
      root 'welcome#index', as: :admin_root
    end
  end

  # User Mobile Routes
  constraints(lambda { |request| MobileSubdomain.matches?(request) }) do
    scope :module => :mobile do
      # Root of site
      root 'welcome#index', as: :mobile_root
    end
  end

end
