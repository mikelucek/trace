class Kids::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # super
    kid_params = params[:kid]
    kid = Kid.where(first: kid_params[:first]).first
    if kid
      puts sign_in(:kid, kid)
      puts "OK"
      redirect_to score_index_path
    else
      puts "FAILED"
      flash.now[:danger] = 'Invalid email/password combination'
      redirect_to root_path
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
