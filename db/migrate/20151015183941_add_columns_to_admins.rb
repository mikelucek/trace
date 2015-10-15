class AddColumnsToAdmins < ActiveRecord::Migration
  def change
    add_column :admins, :first, :string
    add_column :admins, :last, :string
  end
end
