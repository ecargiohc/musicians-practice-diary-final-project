class UserTasksController < ApplicationController

    def index
        @user_tasks = UserTask.all
        render :json => @user_tasks
    end

    def show
        @user_task = UserTask.find(params[:id])
        render :json => @user_task
    end

    def show_current_user
        @user_task = UserTask.find(params[:user_id])
        render :json => @user_task
    end

    def create
        @user_task = UserTask.new(user_task_params)
        @user_task.save!
        render :json => @user_task
    end

    def edit
        @user_task = UserTask.find(params[:id])
    end

    def update
        @user_task = UserTask.find(params[:id])
        @user_task.update(user_params)
        render :json => @user_task
    end

    def destroy
        @user_task = UserTask.find(params[:id])
        @user_task.destroy
    end 

private

    def user_task_params
        params.require(:user_task).permit(:id, :user_id, :task_id)
    end
end
