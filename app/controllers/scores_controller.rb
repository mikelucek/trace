class ScoresController < ApplicationController
  def submit
  	puts "************************"
  	puts "ATTEMPTING TO SET"
  	#accept score and completed letter data.
  	#save that along with kid_id.

  	#return new letter in script in header.
  	redirect_to "/"
  	@script = "var letter = 'qq'"
  	
  end
end
