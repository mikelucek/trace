class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :kid_id
      t.integer :score
      t.string :letter

      t.timestamps null: false
    end
  end
end
