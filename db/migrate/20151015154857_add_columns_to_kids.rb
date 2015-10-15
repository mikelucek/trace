class AddColumnsToKids < ActiveRecord::Migration
  def change
    add_column :kids, :first, :string
    add_column :kids, :last, :string
    add_column :kids, :photo, :string
    add_column :kids, :age, :integer
    add_column :kids, :school, :string
  end
end
