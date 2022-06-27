Rails.application.routes.draw do
  # get 'hello_world', to: 'hello_world#index'
  # resources :todo_lists, except: [:new, :edit, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :todo_lists
    end
  end
  # scope '/api/v1' do
  #   resources :todo_lists
  # end
end
