class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        # when login, fetch request is a post; creates a new token (which stores user_id, etc.,)
        byebug
        @user = User.find_by(username: user_login_params[:username])
        if @user && @user.authenticate(user_login_params[:password])
            token = encode_token({user_id: @user.id})
            render json: {user: UserSerializer.new(@user), jwt: token}, status: :accepted
        else
            render json: {message: "I don't know you, stranger"}, status: :unauthorized
        end
    end

private

    def user_login_params
        params.require(:user).permit(:username, :password)
    end

end