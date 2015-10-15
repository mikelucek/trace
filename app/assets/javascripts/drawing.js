$(document).ready(function(){
	var el = document.getElementById('c');
	var ctx = el.getContext('2d');
	var isDrawing;

	///
	//let's calulate the number of transparent pixels and red pixels when we start, and then check again
	//on a #check click. 
	// score: 1 - ((endingred/startingred) - (endingtransparency/initialtransparency))
	//If the number goes down, that means we strayed outside
	//of the letter.
	//of course, we need to take our initial calculation *after* we put a letter onscreen.
	//
	//playtesters pointed out that this isn't sufficient, since we can still win by
	//tracing nothing at all.
	//

	
	text(letter);
	var initialBG = calculateColor(0,0,0,0);
	var initialLetter = calculateColor(255,0,0,1);

	draw();
	
	$("#check").click(function(){
		var currentBG = calculateColor(0,0,0,0);
		var currentLetter = calculateColor(255,0,0,1);

		var score = ((1-(currentLetter/initialLetter)) - (1-(currentBG/initialBG)));
		var score = parseInt(score*1000);
		console.log(score);
		//window.location = '/submit_score?score=' + score + '&letter=' + letter;
		//change this to post

		var form = document.createElement("form");
		form.method = 'post';
		form.action = '/submit_score';
		var input = document.createElement('input');
		input.type = "text";
		input.name = "score";
		input.value = score;
		form.appendChild(input);
		var input2 = document.createElement('input');
		input2.type = "text";
		input2.name = "letter";
		input2.value = letter;
		form.appendChild(input2);
		form.submit();

		
	});

		function draw(){
			//this.offsetLeft and this.offsetTop are needed to correct for the 
			//position of the canvas on the page
			el.onmousedown = function(e) {
			  isDrawing = true;
			  ctx.moveTo(e.clientX-this.offsetLeft, e.clientY-this.offsetTop);
			};
			el.onmousemove = function(e) {
			  if (isDrawing) {
			  	ctx.lineWidth = 40;
			  	ctx.lineJoin = ctx.lineCap = "round";
			    ctx.lineTo(e.clientX-this.offsetLeft, e.clientY-this.offsetTop);
			    ctx.stroke();
			  }
			};
			el.onmouseup = function() {
			  isDrawing = false;
			}
		}

		function text(t){
			//draw a letter on the canvas
			ctx.font = "300px sans-serif";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText(t, el.width/2, 300); 
		};

		function calculateColor(r, g, b, a){
		

			//get image data into an array
			var pixels = ctx.getImageData(0,0,el.width,el.height);
			
			

			//cycle thru the array stepping by 4
			//i = r, i+1 = g i+2 = b i+3 =a

			var PixelCount=0;
			for(i=0; i<pixels.data.length; i=i+4){
				var rx = pixels.data[i];
				var gx = pixels.data[i+1];
				var bx = pixels.data[i+2];
				var ax = pixels.data[i+3];
				// console.log(r + ":"+g);

				if ((r==rx) && (g==gx) && (b==bx) && (a==ax)){PixelCount += 1;}

			}
			return PixelCount;

		}
	
});