class Api::V1::MediaController < ApplicationController

    def index
        @medias = Media.all
        render :json => @medias
    end
    
    def show
        @media = Media.find(params[:id])
        render :json => @media
    end

    def create
        @media = Media.new(media_params)
        # byebug
        if @media.save
            render :json => @media
        else
            puts @media.errors
        end
    end

    def edit
        @media = Media.find(params[:id])
    end

    def update
        @media = Media.find(params[:id])
        @media.update(media_params)
        render :json => @media
    end

    def destroy
        @media = Media.find(params[:id])
        @media.destroy
    end 

private

    def media_params
        params.require(:media).permit(:id, :name, :url, :user_id)
    end
end
