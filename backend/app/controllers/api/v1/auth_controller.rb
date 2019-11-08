class Api::V1::AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]
# move this file into api/v1
    def create
        puts "hello"
        # when login, fetch request is a post; creates a new token for new user (which stores user_id, etc.,)
        # byebug
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            token = 
            encode_token({user_id: @user.id})
            puts token
            render json: 
            {id: @user.id, username: @user.username, jwt: token}
            # {user: UserSerializer.new(@user), jwt: token}, status: :accepted
        else
            render json: {message: "We don't know you, stranger"}, status: :unauthorized
             # or '401'
        end
    end

    def show
        user = User.find_by(id: auth_header)
        if logged_in?
            render json: {id: current_user.id, username: current_user.username}
        else
            render json: {message: "We have never known you, stranger"}, status: :unauthorized
            # or '401'
        end
    end

private

    # def user_login_params
    #     params.require(:user).permit(:username, :password)
    # end

end