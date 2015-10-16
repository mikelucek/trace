module KidsHelper

	def kid_login
		if !kid_signed_in?
			redirect_to new_admin_session_path
		else 
			redirect_to score_index_path
		end
	end
end
