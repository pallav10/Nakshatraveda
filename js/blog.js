$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/articles/",
		success: function(data,status) {
			console.log(data);
			console.log(status);
			for (var i = 0; i < data.length; i++) {
				$("#blogs").append(`<div class="well white-well">
											        <div id="blog-content" class="row">
											            <div class="col-xs-12 col-sm-6 col-md-3">
											                <h3>`+data[i].name+`</h3>
											                <img class="img-responsive" src="`+data[i].image+`" alt="Blog Image">
											            </div>
											            <div id="blog-text" class="col-xs-12 col-sm-6 col-md-9 pull-right">
											                <p>`+data[i].description+`</p>
											            </div>
											        </div>
											     </div>`);
			}
		},
		error: function(data,status) {
			console.log(data);
			console.log(status);
		}
	});
});