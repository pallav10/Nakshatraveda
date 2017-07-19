$(document).ready(function() {
	$("form").submit(function(e) {
		e.preventDefault();
		$.ajax({
	    type: "POST",
	    url: "https://nksv-beta.herokuapp.com/api/password_reset/",
	    data: JSON.stringify({"email": $("#reset-email").val()}),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data,status) {
	        console.log(data);
	        console.log(status);
	        $("reset-message").text(data.message);
	    },
	    error: function(data,status){
	        console.log(data);
	        console.log(status); 
	    }
		});
    $("#send-reset-link").prop('disabled', true);
    setTimeout(function(){
        $("#send-reset-link").prop('disabled', false);
    }, 5000);
	});
});