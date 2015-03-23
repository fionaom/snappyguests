class AddEventToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :event_id, :integer, :null => false
  end
end
