# frozen_string_literal: true

module Api
  module V1
    class SessionsController < DeviseTokenAuth::SessionsController
      protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

      def create
        super do
          @resource.update(resource_update_params)
        end
      end

      def destroy
        # remove auth instance variables so that after_action does not run
        user = remove_instance_variable(:@resource) if @resource
        @token.client
        @token.clear!

        if user
          user.tokens.clear
          user.update(device_token: "")
          render_destroy_success
        else
          render_destroy_error
        end
      end

      protected

      def render_create_success
        render json: @resource
      end

      def render_create_error_bad_credentials
        render_error(422, I18n.t("devise_token_auth.sessions.bad_credentials"))
      end

      def render_create_error_account_locked
        if @resource.active_for_authentication?
          render_error(401, I18n.t("devise.mailer.unlock_instructions.account_lock_msg"))
        else
          render_create_error_not_confirmed
        end
      end

      def render_create_error_not_confirmed
        render_error(401, I18n.t("devise.failure.#{@resource.inactive_message}"))
      end

      def render_destroy_error
        render_error(422, I18n.t("devise_token_auth.sessions.user_not_found"))
      end

      private

      def resource_params
        params.permit(:email, :password)
      end

      def resource_update_params
        params.permit(:device_token, :app_platform, :app_version)
      end
    end
  end
end
