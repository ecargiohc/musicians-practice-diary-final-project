class Api::V1::TasksController < ApplicationController

    def index
        @tasks = Task.all
        render :json => @tasks
    end

    def show
        @task = Task.find(params[:id])
        render :json => @task
    end

    def create
        # byebug
        @task = Task.new(task_params)
        @task.save
        render :json => @task
    end

    def edit
        @task = Task.find(params[:id])
    end

    def update
        @task = Task.find(params[:id])
        @task.update(task_params)
        render :json => @task
    end

    def destroy
        @task = Task.find(params[:id])
        @task.destroy
    end 

private

    def task_params
        params.require(:task).permit(:id, :scales, :arpeggios, :etudes, :sight_reading, :concerto, :solo, :excerpts)
    end
end
