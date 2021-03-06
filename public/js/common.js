"use strict";

var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),
	// // табы  . 
	// tabscostume(tab) {
	// 	$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
	// 		$(this)
	// 			.addClass('active').siblings().removeClass('active')
	// 			.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
	// 			.eq($(this).index()).show().addClass('active');
	// 	});
	// },
	// // /табы  
	inputMask: function inputMask() {
		// mask for input
		$('input[name="card"]').attr("pattern", "[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}").inputmask("9999-9999-9999-9999");
	} // // /inputMask

};

function eventHandler() {
	// полифил для object-fit
	objectFitImages(); // Picture element HTML5 shiv

	document.createElement("picture"); // для свг

	svg4everybody({}); // JSCCommon.tabscostume('tabs');

	JSCCommon.inputMask();
	$(".main-wrapper").after('<div class="screen" style="background-image: url(screen/main.jpg);"></div>');
	$('.header-block__main-price').click(function () {
		$(this).siblings('.header-block__info-block').slideToggle(500);
		$(this).toggleClass('active');
	});
	$(".custom-select").each(function () {
		var classes = $(this).attr("class"),
				id = $(this).attr("id"),
				name = $(this).attr("name");
		var template = '<div class="' + classes + '">';
		template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
		template += '<div class="custom-options">';
		$(this).find("option").each(function () {
			template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
		});
		template += '</div></div>';
		$(this).wrap('<div class="custom-select-wrapper"></div>');
		$(this).hide();
		$(this).after(template);
	});
	$(".custom-option:first-of-type").hover(function () {
		$(this).parents(".custom-options").addClass("option-hover");
	}, function () {
		$(this).parents(".custom-options").removeClass("option-hover");
	});
	$(".custom-select-trigger").on("click", function () {
		$('html').one('click', function () {
			$(".custom-select").removeClass("opened");
		});
		$(this).parents(".custom-select").toggleClass("opened");
		event.stopPropagation();
	});
	$(".custom-option").on("click", function () {
		$(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
		$(this).parents(".custom-options").find(".custom-option").removeClass("selection");
		$(this).addClass("selection");
		$(this).parents(".custom-select").removeClass("opened");
		$(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
	});
	$('.s-payment-order__payment-trigger').click(function () {
		$(this).toggleClass('active');
		$(this).siblings('.s-payment-order__payment-toggle').toggleClass('active');
	});
	$('.s-payment-order__order-item').click(function () {
		$('.s-payment-order__payment-trigger').toggleClass('active');
		$('.s-payment-order__payment-toggle').toggleClass('active');
	});
	$('.custom-select .custom-option').click(function () {
		var value = $(this).attr("data-value"),
				payItem = $('.s-payment-method__col');

		if (value === 'all') {
			payItem.removeClass('disabled');
		} else {
			payItem.addClass('disabled');
			payItem.each(function (e) {
				if ($(this).attr('data-value') === value) {
					$(this).removeClass('disabled');
				}
			});
		}
	});

	var gets = function () {
		var a = window.location.search;
		var b = new Object();
		var c;
		a = a.substring(1).split("&");

		for (var i = 0; i < a.length; i++) {
			c = a[i].split("=");
			b[c[0]] = c[1];
		}

		return b;
	}();
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}