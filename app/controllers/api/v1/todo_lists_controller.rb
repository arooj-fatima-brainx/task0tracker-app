module Api
  module V1
    class TodoListsController < ApplicationController

      def index
        todo_lists = TodoList.order(created_at: :desc)
        render json: todo_lists
      end

      def create
        todo_list = TodoList.create(todo_list_params)
        render json: todo_list
      end

      def update
        todo_list = TodoList.find(params[:id])
        todo_list.update(todo_list_params)
        render json: todo_list
      end

      def destroy
        todo_list = TodoList.find(params[:id])
        todo_list.destroy
        head :no_content, status: :ok
      end

      private

      def todo_list_params
        params.require(:tdlist).permit(:title, :description, :done)
      end
    end
  end
end
