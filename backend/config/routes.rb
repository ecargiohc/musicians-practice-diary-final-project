Rails.application.routes.draw do
  # resources :user_tasks
  # resources :sub_tasks
  # resources :task_notes
  # resources :tasks
  # resources :comments
  # resources :media

  namespace :api do
    namespace :v1 do
      resources :user_tasks
      resources :sub_tasks
      resources :task_notes
      resources :tasks
      resources :comments
      resources :media
      post '/v1_user_tasks', to: 'user_tasks#get_tasks'
      post '/login', to: 'auth#create'
      get '/current_user', to: 'auth#show'
      # get '/profile', to: 'users#show'
      post '/profile', to: 'users#profile'
    end
  end
  resources :users, only: [:create]
  
  # post '/login', to: 'auth#create'
  # post '/profile', to: 'users#profile'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
