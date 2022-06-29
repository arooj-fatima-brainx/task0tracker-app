Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: '/users', controllers: {
        registrations: 'api/v1/registrations',
        sessions: 'api/v1/sessions',
        passwords: 'api/v1/passwords'
      }
      resources :todo_lists
    end
  end
end
