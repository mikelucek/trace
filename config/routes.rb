 Rails.application.routes.draw do

  get 'scores/submit'

  # devise_for :kids
  # devise_for :admins

  devise_for :kids, controllers: {
    sessions: 'kids/sessions',
    registrations: 'kids/registrations',
    passwords: 'kids/passwords'
  }

  devise_for :admins, controllers: {
    sessions: 'admins/sessions',
    registrations: 'admins/registrations',
    passwords: 'admins/passwords'
  }

  get '/admin_path', to: 'users#profile', as: :admin_root
  get '/index_score', to: 'scores#index', as: :kid_root
  post '/submit_score', to: 'scores#submit', as: :submit_score
  get '/index_score', to: 'scores#index', as: :score_index
  get '/kid_profile', to: 'kids#show', as: :kid_profile

  root 'users#index'

end
