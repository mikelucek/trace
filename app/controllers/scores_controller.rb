class ScoresController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
		#let's get smarter about this...
		@letter = ('A'..'Z').to_a.sample
	end

  def submit
  	if !params[:score].nil? && !params[:letter].nil?
  		#need to get the current_kid at some point.
  		#save a score.
  		@score = Score.new( score: params[:score], letter: params[:letter])
  		@score.save
  	end

  	puts "************************"
  	puts "ATTEMPTING TO SET"
  	#accept score and completed letter data.
  	#save that along with kid_id.

  	#return new letter in script in header.
  	@letter = ('A'..'Z').to_a.sample
  	redirect_to score_index_path
  	
  end
end
