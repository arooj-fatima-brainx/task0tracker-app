class CreateTodoLists < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_lists do |t|
      t.string :title
      t.text :description
      t.boolean :done, default: false

      t.timestamps
    end
  end
end
