$(document).ready(function(){

//------ HOME PAGE ANIMATIONS ------------------

	var x = $('<hr>').css({
		"border-color": "rgb(205, 32, 44)",
		"width": "400px",
		"border-radius": "20px",
		"border-width": "10px",
		"padding": "0",
		"margin": "0 auto",
		"text-align": "center"
		});

	$(".hide_button").click(function (e){
		$("#gear").fadeIn(500);
		$("#anim").show();
		$(".kid_login").fadeIn(2000);
		$(e.target).slideUp();
		$('.inner_button').append(x);
	})

	function blink(){
	  $('.hide_button').fadeOut(500).fadeIn(1500);
	  $('.draw_button').fadeOut(500).fadeIn(1500);
	  $('.draw_button').mouseover(function() {
	  	clearInterval(blinker);
	  })
	}

	// function scale(){
	// 	$('.down').animate({width: 150px}, 1000);
 //    $('.down').animate({width: 100px}, 1000);
	// }
	var blinker = setInterval(blink, 500);

	//------- END HOME PAGE ANIMATIONS ----------------

	$('.login-photo').click(function(){
		var alt = $(this).attr("alt");
		console.log(alt);
		console.log("CLICK!");
		$("#kid_email").val(alt);
	});

	$('.password-icon').click(function(){
		var alt = $(this).attr("alt");
		console.log(alt);
		console.log("PASS");
		$("#kid_password").val(alt);
		$("#kid_password_confirmation").val(alt);
	});

	function Sound(fx){
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', fx);
		audioElement.setAttribute('autoplay', 'autoplay');
		audioElement.addEventListener("load", function() {
			audioElement.play();
		}, true);
	}

	var sound = '/' + letter + '.wav';

	Sound(sound);





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

		if (score>500){
			var scoreSound = '/good.wav';
			Sound(scoreSound);
		} else {var scoreSound = '/bad.wav';
		Sound(scoreSound);}





		//window.location = '/submit_score?score=' + score + '&letter=' + letter;
		//change this to post
		//we're waiting to submit the form so that we can hear the result sound.
		setTimeout(function(){

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
			var input3 = document.createElement('input');
			input3.type = "text";
			input3.name = "kid_id";
			input3.value = kid;
			form.appendChild(input3)
			form.submit();
		}, 2000);

		
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