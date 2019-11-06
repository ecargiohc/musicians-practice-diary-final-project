class CreateTaskNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :task_notes do |t|
      t.text :objectives
      t.text :progress_report
      t.text :takeaway
      t.references :user_task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
