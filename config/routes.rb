Rails.application.routes.draw do

  # Devise Routes
  devise_for :users

  # User Admin Routes
  constraints(lambda { |request| !MobileSubdomain.matches?(request) }) do
    scope :module => :admin do

      get  '/see/:uuid/messages/:last_id' => 'slide_show#new_messages'
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

      get  '/messages/check-event-code/:event_code' => 'messages#check_event_code'
      get '/messages/:id/delete' => 'messages#delete'
      resources :messages

      # Root of site
      root 'messages#new', as: :mobile_root
    end
  end

end
