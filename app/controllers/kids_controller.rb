class KidsController < ApplicationController

	private
  
  def kids_params
  	params.require(:kid).permit(:first, :last, :school, :age, :photo, :email, :password, :password_confirmation)
  end

end
