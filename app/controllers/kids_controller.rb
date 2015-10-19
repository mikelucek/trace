class KidsController < ApplicationController

	def show
		if current_admin
		@kid = Kid.find(params[:kid_id])
		@scores = @kid.scores.all
		@letters = []
		@scores.each do |x|
			if !@letters.include?(x.letter)
				@letters << x.letter
			end
		end

		puts "*************LETTERS SORT*******"
		puts @letters.sort!

		@hash = {}

		@letters.each do |thisletter|
			sum = 0
			count = 0
			@scores.each do |x|
				if x.letter == thisletter
					sum = sum + x.score
					count = count + 1
				end
			end
			average = sum/count
			puts "**************THIS LETTER"
			puts thisletter
			puts "***************AVERAGE"
			puts average
			@hash[thisletter] = average

		end

		@hash

	end
end

	private
  
  def kids_params
  	params.require(:kid).permit(:first, :last, :school, :age, :photo, :email, :password, :password_confirmation)
  end

end
