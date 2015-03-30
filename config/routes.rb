Rails.application.routes.draw do

  # Devise Routes
  devise_for :users

  # User Admin Routes
  constraints(lambda { |request| !MobileSubdomain.matches?(request) }) do
    scope :module => :admin do

      get  '/see/:uuid' => 'slide_show#show', as: :event_slideshow
      resources :events do
        resources :messages
      end

      # Root of site
      root 'welcome#index', as: :admin_root
    end
  end

  # User Mobile Routes
  constraints(lambda { |request| MobileSubdomain.matches?(request) }) do
    scope :module => :mobile do

      resources :messages

      # Root of site
      root 'messages#new', as: :mobile_root
    end
  end

end
