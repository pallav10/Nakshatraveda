$(document).ready(function() {

	// If shop is accessed through home page services
	
	if(sessionStorage.getItem("sp_id") != 0) {
		spid = sessionStorage.getItem("sp_id");
		console.log(spid);
		$.ajax({
			type: "GET",
			url: "https://nksv-beta.herokuapp.com/api/categories/"+sessionStorage.getItem("sc_id")+"/",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data,status) {
				console.log(data);
				console.log(status);

				// Load Service Categories from database

				for (i = 0; i < data.length; i++) {
					$("#load-categories").append("<li><a href='#' class='productMenu' data-id="+data[i].id+">"+data[i].name+"</a></li>");
					$("#load-categories > li:nth-child("+spid+")").addClass("active");
				}

				// Get all services of a category from the database

				$.ajax({
				type: "GET",
				url: "https://nksv-beta.herokuapp.com/api/categories/"+spid+"/items/",
				success: function(data, status) {
					console.log(data);
					for(i = 0; i < 5; i++) {
						$("#load-details").append(`<div class="div-count">
																				 <h3>`+data[i].name+`</h3>
																				 <div class='row'>
																				 	<div class='col-md-6 col-sm-12 col-xs-12'>
																				 		<img src="../images/items/`+data[i].id+`.png">
																				 	</div>
																				 	<div class='col-md-6 col-sm-12 col-xs-12'>
																				 		<p>`+data[i].description+`</p>
																				 		<div class="row">
																				 			<div class="col-md-4 col-sm-6 col-xs-6"><p data-price="`+data[i].price+`" class="item-price">INR `+data[i].price+`/- </p></div>
																						 	<div class="col-md-4 col-sm-6 col-xs-6"><button data-price="`+data[i].price+`" id="buy-item" data-id="`+data[i].id+`" class="btn btn-default buy-items">Add to Cart</button></div>
																						 	<div class="col-md-4 col-sm-12 col-xs-12"><p class="text-center" id="login-to-buy"></p></div>	
																				 		</div>
																				 	</div>
																				 </div>
																			 </div>`);
					}
				},
				error: function(data, status) {
					console.log(data);
				}
				});
			},
			error: function(data,status) {
				console.log(data);
				console.log(status);
			}
		});
	}

	// If shop is accessed through Shop Navigation Button

	else {

		// Check if user has clicked products or services and load categories accordingly

		$.ajax({
			type: "GET",
			url: "https://nksv-beta.herokuapp.com/api/categories/"+sessionStorage.getItem("c_id")+"/",
			contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data,status) {
	    	console.log(data);
	    	console.log(status);
	    	for (var i = 0; i < data.length; i++) {
				$("#load-categories").append("<li><a href='#' class='productMenu' data-id="+data[i].id+">"+data[i].name+"</a></li>");
				$("#load-categories li:first").addClass("active");
				}
				var x = $("#load-categories li:first a").data("id");
				console.log(x);

				// Load first category products/services by default

				$.ajax({
				type: "GET",
				url: "https://nksv-beta.herokuapp.com/api/categories/"+x+"/items/",
				success: function(data, status) {
					console.log(data);
					for(i = 0; i < 5; i++) {
						$("#load-details").append(`<div class="div-count">
																				 <h3>`+data[i].name+`</h3>
																				 <div class='row'>
																				 	<div class='col-md-6 col-xs-12'>
																				 		<img src="../images/items/`+data[i].id+`.png">
																				 	</div>
																				 	<div class='col-md-6 col-xs-12'>
																				 		<p>`+data[i].description+`</p>
																				 		<div class="row">
																				 			<div class="col-md-4 col-sm-6 col-xs-6"><p data-price="`+data[i].price+`" class="item-price">INR `+data[i].price+`/- </p></div>
																						 	<div class="col-md-4 col-sm-6 col-xs-6"><button data-price="`+data[i].price+`" id="buy-item" data-id="`+data[i].id+`" class="btn btn-default buy-items">Add to Cart</button></div>
																						 	<div class="col-md-4 col-sm-12 col-xs-12"><p class="text-center" id="login-to-buy"></p></div>	
																				 		</div>
																				 	</div>
																				 </div>
																			 </div>`);
					}
				},
				error: function(data, status) {
					console.log(data);
				}
				});
	    },
	    error: function(data,status) {
	    	console.log(data);
	    	console.log(status);
	    }
		});
	}

	// Load particular services/products on clicking Product/Service categories

	$("#load-categories").on('click', 'li', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		var cid = $(e.target).data("id");
		console.log(cid);
		$.ajax({
			type: "GET",
			url: "https://nksv-beta.herokuapp.com/api/categories/"+cid+"/items",
			success: function(data, status) {
				console.log(data);
				console.log(status);
				$("#load-details").empty();
				for(i = 0;i < 5; i++) {
					$("#load-details").append(`<div class="div-count">
																		   <h3>`+data[i].name+`</h3>
																		   <div class='row'>
																		     <div class='col-md-6 col-xs-12'>
																		     	<img src="../images/items/`+data[i].id+`.png">
																		     </div>
																		     <div class='col-md-6 col-xs-12'>
																		     	<p>`+data[i].description+`</p>
																		     	<div class="row">
																			 			<div class="col-md-4 col-sm-6 col-xs-6"><p class="item-price">INR `+data[i].price+`/- </p></div>
																					 	<div class="col-md-4 col-sm-6 col-xs-6"><button data-price="`+data[i].price+`" id="buy-item" data-id="`+data[i].id+`" class="btn btn-default buy-items">Add to Cart</button></div>
																					 	<div class="col-md-4 col-sm-12 col-xs-12"><p class="text-center" id="login-to-buy"></p></div>	
																			 		</div>
																		     </div>
																		   </div>
																		 </div>`);
				}
			},
			error: function(data, status) {
				console.log(data);
			}
		});
	});

	// Add Items to cart on clicking Add to Cart
	if(sessionStorage.getItem("u_id") !== null) {
		$("#load-details").on("click", "#buy-item", function() {
			var pid = $(this).data("id");
			console.log(pid);
			var price = $(this).data("price");
			console.log(price);
			$.ajax({
				type: "POST",
				url: "https://nksv-beta.herokuapp.com/api/users/"+sessionStorage.getItem("u_id")+"/cart/"+pid+"/",
				headers: {"Content-Type": "application/json", "Authorization": "Token "+sessionStorage.getItem("Token")},
				data: JSON.stringify({"price": price}),
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data,status) {
		    	console.log(data);
		    	console.log(status);
		    },
		    error: function(data,status) {
		    	console.log(data);
		    	console.log(status);
		    }
			});
		});
	}
	else {
		$("#load-details").on("click", "#buy-item", function() {
			$("#load-details").children().find("#login-to-buy").empty();
			$(this).closest(".row").find("#login-to-buy").text("Please login to buy items!");
		});
	}

	// Load More functionality for Products/Services

		$("#load-more-btn").click(function() {
			var divs = $('.div-count:visible').length;
			console.log(divs);
			var activeId = $(".active:visible").children().data("id");
			console.log(activeId);
			$.ajax({
				type: "GET",
				url: "https://nksv-beta.herokuapp.com/api/categories/"+activeId+"/items",
				contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(data,status) {
		    	console.log(data);
		    	console.log(status);
					for (i = divs; i < divs + 5; i++) {
						$("#load-details").append(`<div class="div-count">
																				   <h3>`+data[i].name+`</h3>
																				   <div class='row'>
																				     <div class='col-md-6 col-xs-12'>
																				     	<img src="../images/items/`+data[i].id+`.png">
																				     </div>
																				     <div class='col-md-6 col-xs-12'>
																				     	<p>`+data[i].description+`</p>
																				     	<div class="row">
																					 			<div class="col-md-4 col-sm-6 col-xs-6"><p class="item-price">INR `+data[i].price+`/- </p></div>
																							 	<div class="col-md-4 col-sm-6 col-xs-6"><button data-price="`+data[i].price+`" id="buy-item" data-id="`+data[i].id+`" class="btn btn-default buy-items">Add to Cart</button></div>
																							 	<div class="col-md-4 col-sm-12 col-xs-12"><p class="text-center" id="login-to-buy"></p></div>	
																					 		</div>
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

		$(window).resize(function() {
			if(window.innerWidth < 992)
		  $( "#load-details" ).removeClass("border-left");
		});
});