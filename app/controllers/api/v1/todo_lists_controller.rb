module Api
  module V1
    class TodoListsController < ApplicationController
      before_action :authenticate_user!
      skip_before_action :verify_authenticity_token, except: :index

      def index
        todo_lists = current_user.todo_lists.order(created_at: :desc)
        render json: todo_lists
      end

      def create
        todo_list = current_user.todo_lists.create(todo_list_params)
        render json: todo_list
      end

      def update
        todo_list = current_user.todo_lists.find(params[:id])
        todo_list.update(todo_list_params)
        render json: todo_list
      end

      def destroy
        todo_list = current_user.todo_lists.find(params[:id])
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
