class Api::V1::UserTasksController < ApplicationController

    def get_tasks
        # puts 'get_tasks find id'
        # puts params
        # puts params[:user_id]
        # user_id = params[:user_id]
        # @user_tasks = UserTask.find_by( {user: { id: user_id } } )
        @user_tasks = UserTask.where(user_id: @user.id)
        render :json => @user_tasks
    end

    def index
        puts params[:user_id]
        @user_tasks = UserTask.all
        # byebug
        # @user_tasks = UserTask.find(params[:user_id])
        # @user_tasks = UserTask.where({user_id:1})
        # @user_tasks = UserTask.where({user_id: params[:user_id]})
        # @user_tasks = UserTask.where(params[:user_id] == current_user)
        render :json => @user_tasks
    end

    def show
        @user_task = UserTask.find(params[:id])
        render :json => @user_task
    end

    def show_current_user
        @user_task = UserTask.find(params[:user_id])
        render :json => { user_task: UserTaskSerializer.new(@user_task) }, status: :accepted 
    end

    def create
        # @user_tasks = UserTask.where(user_id: @user.id)
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
