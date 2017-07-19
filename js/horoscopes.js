$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/horoscope/",
		success: function(data,status) {
			console.log(data);
			console.log(status);
			var categories = data.map(value => value.category).filter((item, pos, self) => self.indexOf(item) == pos);
			for (var i = 0; i < categories.length; i++) {
				$("#horoscope-categories").append(`<li><a data-horoscope="`+parseInt(i+1)+`">`+categories[i]+`</a></li>`);
				$("#horoscope-categories li:first").addClass("active");
			}
			let details = data.filter(value => value.category === categories[0]);
			console.log(details);
			for (var i = 0; i < details.length; i++) {
				$("#horoscope-details").append(`<div>
																					<h3>`+details[i].name+`</h3>
																					<p>`+details[i].description+`</p>
																				</div>`);
			}
		},
		error: function(data,status) {
			console.log(data);
			console.log(status);
		}
	});

	$("#horoscope-categories").on("click", "li", function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		var hid = $(e.target).data("horoscope");
		console.log(hid);
		$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/horoscope/",
		success: function(data,status) {
			console.log(data);
			console.log(status);
			$("#horoscope-details").empty();
			var categories = data.map(value => value.category).filter((item, pos, self) => self.indexOf(item) == pos);
			let details = data.filter(value => value.category === categories[hid - 1]);
			console.log(details);
			for (var i = 0; i < details.length; i++) {
				$("#horoscope-details").append(`<div>
																					<h3>`+details[i].name+`</h3>
																					<p>`+details[i].description+`</p>
																				</div>`);
			}
		},
		error: function(data,status) {
			console.log(data);
			console.log(status);
		}
	});		
	});
});