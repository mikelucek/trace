class ScoresController < ApplicationController
  def submit
  	if params[:score].nil? || params[:letter].nil?
  		#we're not submitting scores. just give us a letter.
  		#make this smarter later.
  		@letter = ('A'..'Z').to_a.sample
  	else
  		#need to get the current_kid at some point.
  		#save a score.
  		@score = Score.new( score: params[:score], letter: params[:letter])
  		@score.save
  		#also set a letter, in a smarter way at some point.
  		@letter = ('A'..'Z').to_a.sample
  	end

  	puts "************************"
  	puts "ATTEMPTING TO SET"
  	#accept score and completed letter data.
  	#save that along with kid_id.

  	#return new letter in script in header.
  	@letter = ('A'..'Z').to_a.sample
  	
  end
end
