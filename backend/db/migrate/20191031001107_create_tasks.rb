class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.text :scales
      t.text :arpeggios
      t.text :etudes
      t.text :sight_reading
      t.text :solo
      t.text :concerto
      t.text :excerpts

      t.timestamps
    end
  end
end
