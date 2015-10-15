module KidsHelper

	def kid_login
		if !kid_signed_in?
			redirect_to new_admin_session_path
		end
	end
end
