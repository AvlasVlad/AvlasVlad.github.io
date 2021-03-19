function collectOrderParameters() {
	let form_data = $(this).serialize();
	let text_items = getOrderProducts();
	
	form_data += "&itog=" + $('.cart-senk .itog small').text() + "&textmail=" + text_items;
	
	if (sessionStorage.getItem('coupon')) {
		form_data += "&coupon=Купон на " + sessionStorage.getItem('coupon') + '%';
	}
	
	form_data += getUserInfo();
	form_data += "&dostavka=" + $("#dostavka").val();
	form_data += "&oplata=" + $("#oplata").val();
	form_data += '&sdl_delivery_id=' + getSdlDeliveryId();
	form_data += '&sdl_payment_id=' + getSdlPaymentId();
	
	return form_data;
}

function getOrderProducts() {
	let text_items = '';
	let products = JSON.parse(sessionStorage.getItem('cart'));
	
	for (var _key in products) {
		if (products.hasOwnProperty(_key)) {
			var title = products[_key]['name']; // Заголовок
			
			var img = products[_key]['img']; // Изображение
			
			var id = products[_key]['idtovar']; // ID
			
			var price = products[_key]['price']; // Цена
			
			var color_sel = products[_key]['color_sel']; // Цвет
			
			var colors = products[_key]['colors']; // Цвета?
			
			var size_sel = products[_key]['size_sel']; // Размеры?
			
			var data_color = products[_key]['data_color']; // Цвета?
			
			var color_name = products[_key]['color_name']; // Цвета?
			
			var item = '<div class="tovar" data-id="' + id + '">' +
				'<div class="item">' +
					'<div class="title">' + title + '</div>' +
				'</div>' +
				'<div class="item">' +
					'<div class="size">Размер:' + size_sel + '</div>' +
				'</div>' +
				'<div class="item">' +
					'<div class="color">Цена: ' + price + '</div>' +
				'</div>' +
				'<hr>' +
				'<br>';
			
			text_items += item;
		}
	}
	
	return text_items;
}

function getSdlDeliveryId() {
	if ($("[id='delivery_pickup']").prop('checked')) {
		return 1;
	}
	
	if ($("[id='delivery_cdek']").prop('checked')) {
		return 5;
	}
}

function getSdlPaymentId() {
	if ($("[id='payment_with_card']").prop('checked')) {
		return 1;
	}
	
	if ($("[id='payment_with_cash']").prop('checked')) {
		return 3;
	}
	
	if ($("[id='payment_with_cdek']").prop('checked')) {
		return 6;
	}
}

function getUserInfo() {
	let user_info = '';
	
	user_info += "&name=" + getUsername();
	user_info += "&lastname=" + $("#lastname").val();
	user_info += "&midname=" + $("#midname").val();
	user_info += "&country=" + $("#country").val();
	user_info += "&city=" + $("#city").val();
	user_info += "&address=" + $("#address").val();
	user_info += "&index=" + $("#index").val();
	user_info += "&phone=" + $("#phone").val();
	user_info += "&email=" + $("#email").val();
	user_info += "&child_name=" + $("#child_name").val();
	
	return user_info;
}

function getUsername() {
	
	if ($("#username").val().length > 0) {
		return $("#username").val();
	} else {
		return $("#username_short").val();
	}
	
}

function sendAjaxRequest(form_data, goal_name, callback = null) {
	$.ajax({
		type: "POST",
		url: "send.php",
		data: form_data,
		success: function success(data) {
			
			if (callback) {
				callback(data);
			}
			
			// XXX return;
			yaCounter73169539.reachGoal(goal_name);
			
			$(".cart-senk").show();
			$(".cart-dost").hide();
			$('.cart').hide();
			$('.cart.cart-senk').show();
			sessionStorage.removeItem('cart');
			sessionStorage.removeItem('coupon');
			$('body').removeClass('oh1');
			$('.tovar').remove();
			$('.cart-fix').hide();
			$('.cart-fix').addClass('nocart');
			$('.shap .podar .item .button button.del').hide();
			$('.shap .podar .item .button button.add').show();
			var destination = +$('.cart-senk').offset().top - 80;
			$('body,html').animate({
				scrollTop: destination
			}, 1100);
			$('.shapbtn').slideUp(300);
		}
	});
}


