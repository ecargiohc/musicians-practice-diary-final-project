class Api::V1::CommentsController < ApplicationController

    def index
        @comments = Comment.all
        render :json => @comments
    end

    def show
        @comment = Comment.find(params[:id])
        render :json => @comment
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.save
        render :json => @comment
    end

    def edit
        @comment = Comment.find(params[:id])
    end

    def update
        @comment = Comment.find(params[:id])
        @comment.update(comment_params)
        render :json => @comment
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
    end 

private

    def comment_params
        params.require(:comment).permit(:id, :text, :media_id, :user_id)
    end
end
