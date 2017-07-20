$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/videos/",
		success: function(data,status) {
			console.log(data);
			console.log(status);
			for (var i = 0; i < data.length; i++) {
				$("#listOfVideos").append(`<div class="col-md-4 col-sm-12 col-xs-12"><video class="align-video" controls src="../media/`+parseInt(i+1)+`.mp4"></video></div>`);
			}
		},
		error: function(data,status) {
			console.log(data);
			console.log(status);
		}
	});
});