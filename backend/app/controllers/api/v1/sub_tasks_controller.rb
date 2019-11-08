class Api::V1::SubTasksController < ApplicationController

    def index
        @sub_tasks = SubTask.all
        render :json => @sub_tasks
    end

    def show
        @sub_task = SubTask.find(params[:id])
        render :json => @sub_task
    end

    def create
        @sub_task = SubTask.new(sub_task_params)
        @sub_task.save
        render :json => @sub_task
    end

    def edit
        @sub_task = SubTask.find(params[:id])
    end

    def update
        @sub_task = SubTask.find(params[:id])
        @sub_task.update(sub_task_params)
        render :json => @sub_task
    end

    def destroy
        @sub_task = SubTask.find(params[:id])
        @sub_task.destroy
    end 

private

    def sub_task_params
        params.require(:sub_task).permit(:id, :tempo, :rhythm, :articulation, :dynamics, :phrasing, :style, :intonation, :task_id)
    end
end
