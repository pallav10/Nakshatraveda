$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/images/",
		success: function(data,status) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				$("#listOfImages").append(`<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 image-position"><a class="example-image-link" href="../images/items/`+parseInt(i+1)+`.png" data-lightbox="example-set" data-title="Image Description"><img style="width: 240px; height: auto;" class="example-image" src="../images/items/`+parseInt(i+1)+`.png" alt=""/></a></div>`);
			}
		},
		error: function(data,status) {
			console.log(data);
			console.log(status);
		}
	});
});