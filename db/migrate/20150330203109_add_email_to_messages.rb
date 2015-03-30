class AddEmailToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :email, :string, :null => false
  end
end
