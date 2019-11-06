class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :instrument
      t.string :resume
      t.string :photo

      t.timestamps
    end
  end
end
