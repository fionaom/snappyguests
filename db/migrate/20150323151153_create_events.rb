class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.string :code
      t.date :start_date
      t.date :end_date
      t.float :latitude, precision: 9, scale: 6
      t.float :longitude, precision: 9, scale: 6
      t.string :status, :default => "Inactive"

      t.timestamps null: false
    end
  end
end
