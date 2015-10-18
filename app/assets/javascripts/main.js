
$(document).ready(function(e) {
	console.log("Hi");
	alert("Hi");
	$(".hide_button").click(function (){
		$(".hide").show();
		$(e.target).hide();
	})
})

