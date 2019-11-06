class CreateSubTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :sub_tasks do |t|
      t.string :tempo
      t.string :rhythm
      t.text :articulation
      t.text :dynamics
      t.text :phrasing
      t.text :style
      t.text :intonation
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
