class TaskNotesController < ApplicationController

    def index
        @task_notes = TaskNote.all
        render :json => @task_notes
    end

    def show
        @task_note = TaskNote.find(params[:id])
        render :json => @task_note
    end

    def create
        # byebug
        @task_note = TaskNote.new(task_note_params)
        # byebug
        if @task_note.save
            render :json => @task_note
        else
            puts @task_note.errors
        end
    end

    def edit
        @task_note = TaskNote.find(params[:id])
    end

    def update
        @task_note = TaskNote.find(params[:id])
        if @task_note.update(task_note_params)
            render :json => @task_note
        else 
            puts @task_note.errors
        end
    end

    def destroy
        @task_note = TaskNote.find(params[:id])
        @task_note.destroy
    end 

private

    def task_note_params
        params.require(:task_note).permit(:id, :objectives, :progress_report, :takeaway, :user_task_id)
    end
end
