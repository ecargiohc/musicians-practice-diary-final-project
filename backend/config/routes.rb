Rails.application.routes.draw do
  resources :user_tasks
  resources :sub_tasks
  resources :task_notes
  resources :tasks
  resources :comments
  resources :media

  resources :users
  # , only: [:create]
  post '/login', to: 'auth#create'
  post '/profile', to: 'users#profile'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
