$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://nksv-beta.herokuapp.com/api/users/"+sessionStorage.getItem("u_id")+"/cart",
		headers: {"Content-Type": "application/json", "Authorization": "Token "+sessionStorage.getItem("Token")},
		contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data,status) {
    	console.log(data);
    	console.log(status);
    	var totalPrice = data.map(value => value.price).reduce((sum,value) => {
    		return sum+value
    	}, 0);
    	for (var i = 0; i < data.length; i++) {
	    	$("#services-ordered").append(`<div class="row cartItem">
															            <div class="col-md-6 col-sm-12 col-xs-12 nameCarrier">
															                <p id="item-name" class="cart-elements">`+data[i].name+`</p>
															            </div>
															            <div class="col-md-2 col-sm-12 col-xs-12">
															                <div class="input-sm input-group">
															                  <span class="input-group-addon btn change-qty" role="button">-</span>
															                  <input type="text" class="form-control align-qty" value="`+data[i].quantity+`">
															                  <span class="input-group-addon btn change-qty" role="button">+</span>
															                </div>
															            </div>
															            <div id="show-price" class="col-md-2 col-sm-6 col-xs-6">
																						<p data-price="`+data[i].price+`" id="item-price" class="cart-elements">`+`₹ `+data[i].price+`</p>
															            </div>
															            <div class="col-md-2 col-sm-6 col-xs-6 adjust-remove-item text-center">
															                <button data-item-id="`+data[i].item+`" id="remove-item" class="btn btn-default btn-sm">Remove</button>
															            </div>
															         </div>`);
    	}
		$("#total-price").append(totalPrice);    	
    },
    error: function(data,status) {
    	console.log();
    	console.log(status);
    	$("#cartContainer").html(`<p class="text-center">`+JSON.parse(data.responseText).message+`</p>`);
    }
	});

	$("#services-ordered").on('click', '.change-qty', function() {
					console.log('clicked');
					var oldVal = parseInt($(this).parent().find(".align-qty").val());
					console.log(oldVal);
					const basePrice = $(this).closest(".row").find("#show-price").children().data("price");
					if($(this).text() == '+') {
						var newVal = parseInt(oldVal + 1);
						console.log(newVal);
						var newPrice = parseInt(basePrice * newVal);
					}
					else {
						if(oldVal > 1) {
							var newVal = parseInt(oldVal - 1);
							console.log(newVal);
							var newPrice = parseInt(basePrice * newVal);
						}
						else {
							newVal = 1;
						}
					}
					$(this).parent().find("input").val(newVal);
					$(this).closest(".row").find("#item-price").text(newPrice);
					var itemId = $(this).closest(".row").find("#remove-item").data("item-id");
					console.log(itemId);
					$.ajax({
						type: "PUT",
						url: "https://nksv-beta.herokuapp.com/api/users/"+sessionStorage.getItem("u_id")+"/cart/"+itemId+"/",
						data: JSON.stringify({ "quantity": newVal, "price": newPrice }),
						headers: {"Content-Type": "application/json", "Authorization": "Token "+sessionStorage.getItem("Token")},
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

	$("#services-ordered").on("click", "#remove-item", function() {
		var removeItem = $(this).data("item-id");
		$.ajax({
			type: "DELETE",
			url: "https://nksv-beta.herokuapp.com/api/users/"+sessionStorage.getItem("u_id")+"/cart/"+removeItem+"/",
			headers: {"Content-Type": "application/json", "Authorization": "Token "+sessionStorage.getItem("Token")},
			contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data,status) {
	    	console.log(data);
	    	console.log(status);
	    	$.ajax({
					type: "GET",
					url: "https://nksv-beta.herokuapp.com/api/users/"+sessionStorage.getItem("u_id")+"/cart",
					headers: {"Content-Type": "application/json", "Authorization": "Token "+sessionStorage.getItem("Token")},
					contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function(data,status) {
			    	console.log(data);
			    	console.log(status);
			    	$("#services-ordered").empty();
			    	var totalPrice = data.map(value => value.price).reduce((sum,value) => {
			    		return sum+value
			    	}, 0);
			    	for (var i = 0; i < data.length; i++) {
				    	$("#services-ordered").append(`<div class="row cartItem">
																		            <div class="col-md-6 col-sm-12 col-xs-12 nameCarrier">
																		                <p id="item-name" class="cart-elements">`+data[i].name+`</p>
																		            </div>
																		            <div class="col-md-2 col-sm-12 col-xs-12">
																		                <div class="input-sm input-group">
																		                  <span class="input-group-addon btn change-qty" role="button">-</span>
																		                  <input type="text" class="form-control align-qty" value="`+data[i].quantity+`">
																		                  <span class="input-group-addon btn change-qty" role="button">+</span>
																		                </div>
																		            </div>
																		            <div id="show-price" class="col-md-2 col-sm-6 col-xs-6">
																									<p data-price="`+data[i].price+`" id="item-price" class="cart-elements">`+`₹ `+data[i].price+`</p>
																		            </div>
																		            <div class="col-md-2 col-sm-6 col-xs-6 adjust-remove-item text-center">
																		                <button data-item-id="`+data[i].item+`" id="remove-item" class="btn btn-default btn-sm">Remove</button>
																		            </div>
																		         </div>`);
			    	}
			    	$("#total-price").append(totalPrice);
			    },
			    error: function(data,status) {
			    	console.log(data);
			    	console.log(status);
			    }
				});
	    },
	    error: function(data,status) {
	    	console.log(data);
	    	console.log(status);
	    }
		});
	});
});