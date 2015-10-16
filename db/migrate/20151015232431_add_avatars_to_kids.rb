class AddAvatarsToKids < ActiveRecord::Migration
  def self.up
    change_table :kids do |t|
      t.attachment :avatar
    end
  end

  def self.down
    drop_attached_file :kids, :avatar
  end
end
