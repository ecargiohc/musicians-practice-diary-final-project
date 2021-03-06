class ApplicationController < ActionController::API
    before_action :authorized

    def encode_token(payload)
        puts "this is encode_token method"
        JWT.encode(payload, "secret", "HS256")
    end

    # def token
    #     request.headers['Authorization']
    # end

    def auth_header
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, "secret", true, {algorithm: 'HS256'})
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def authorized
        puts auth_header
        render json: {message: "Not logged in son"}, status: :unauthorized unless logged_in?
    end

    def logged_in?
        !!current_user
    end

    def current_user
        if decoded_token
            puts "XXXXXXXXXXX"
            user_id = decoded_token[0]['user_id']
            puts user_id
            @user = User.find(user_id)
        end
    end

    # def user_id
    #     # 11/7/19
    #     decoded_token.first['user_id']
    # end
end
