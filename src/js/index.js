import {$, Inputmask, noUiSlider} from './common';

var widthWindow = $(window).width();
var heightWindow = $(window).height();
var deviceType = 'desktop';
var changeDevice = false;

if(widthWindow < 768){
	deviceType = 'mobile';
}else if(widthWindow >= 768 && widthWindow < 992){
	deviceType = 'tablet';
}else{
	deviceType = 'desktop';
}

$(window).on('resize', function(){
	widthWindow = $(window).width();
	heightWindow = $(window).height();

	if(widthWindow < 768 && deviceType == 'tablet'){
		deviceType = 'mobile';
		changeDevice = true;
	}else if((widthWindow >= 768 && deviceType == 'mobile') ||(widthWindow < 992 && deviceType == 'desktop')){
		deviceType = 'tablet';
		changeDevice = true;
	}else if(widthWindow >= 992 && deviceType == 'tablet'){
		deviceType = 'desktop';
		changeDevice = true;
	}else{
		changeDevice = false;
	}
});

// move-up
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},800);return false;});

// hover main menu
if($('.js-cat-menu-item').length){
	$('.js-cat-menu-item').hover(
		function() {
			if(deviceType == 'desktop'){
				$('.js-cat-menu-item').removeClass('hover');
				$(this).addClass('hover');
			}
		}
	);

	$('.js-cat-menu-close').hover(
		function() {
			$('.js-cat-menu-item').removeClass('hover');
		}
	);

	$('.js-cat-menu').hover(
		function() {},
		function() {
			$('.js-cat-menu-item').removeClass('hover');
		}
	);
}

// Открыть/Закрыть меню
if($('.js-main-menu-cat').length){
	$('.js-main-menu-cat').on('click', function() {
		$('.js-cat-menu').toggleClass('active inactive');

		if(deviceType != 'desktop'){
			$('.js-body').addClass('no-scroll');
		}
	});

	$('.js-cat-menu-close').on('click', function() {
		$('.js-cat-menu').toggleClass('active inactive');

		if(deviceType != 'desktop'){
			$('.js-body').removeClass('no-scroll');
		}
	});
}

// Открыть/Закрыть подменю
if($('.js-cat-menu-arr').length){
	$('.js-cat-menu-arr').on('click', function(e){
		e.preventDefault();
		$(this).closest('.js-cat-menu-item').children('.js-cat-menu-sect').addClass('open');
	});

	$('.js-cat-menu-back').on('click', function(e){
		$(this).closest('.js-cat-menu-sect').removeClass('open');
	});
}

// Открыть/Закрыть мобильный сайдбар
if($('.js-header-top-menu').length){
	$('.js-header-top-menu').on('click', function(e){
		$(this).toggleClass('active');
		$('.js-mobile-sidebar').toggleClass('active');
		$('.js-body').toggleClass('no-scroll');
	});
}

// Показываем фиксированное меню при прокрутке
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-top-panel').addClass('visible');
	}else{
		$('.js-top-panel').removeClass('visible');
	}
});

// Слайдер инфокарточек
if ($('.js-card-slider').length) {
	$('.js-card-slider').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: false,
		dots: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
		]
	});
}

// Слайдер каталога
function catalogSlider() {
	if ($('.js-catalog-slider').length) {
		$('.js-catalog-slider').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: false,
			dots: true,
			responsive: [
				{
					breakpoint: 1350,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
			]
		});
	}
}

catalogSlider();

// Открыть быстрый просмотр
if ($('.js-btn-quick-view').length) {
	$('.js-btn-quick-view').on('click', function() {
		var idElem = $(this).closest('.js-catalog-item').data('count');

		$('.js-quick-view-item').removeClass('active');
		$('.js-quick-view').find('.js-quick-view-item[data-count='+idElem+']').addClass('active');

	
		$.fancybox.open({
			src  : '#quick-view',
			type : 'inline',
			opts : {}
		});
		
		if($('.js-view-slider').hasClass('slick-initialized')){
			$('.js-view-slider').slick('unslick');
		}

		$('.js-quick-view-item').find('.js-view-slider').slick({
			infinite: true,
			dots: true,
			prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="8" height="16"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
			nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="8" height="16"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
		});
	});
}


// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-item').on('click',function(e) {
		e.preventDefault();
		var $parent = $(this).parents('.js-tabs-page');

		$parent.find('.js-tabs-page-content-item').hide();
		$parent.find('.js-tabs-page-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();

		
		if($(this).closest('.js-tabs-page').find('.js-tabs-page-title').length){
			$(this).closest('.js-tabs-page').find('.js-tabs-page-title').html($(this).html());
		}

		$('.js-catalog-slider').slick('unslick');
		catalogSlider();
	});
}

// Слайдер предложений
if ($('.js-slider-offer').length) {
	$('.js-slider-offer').slick({
		infinite: true,
		arrows: false,
		dots: true,
	});
}

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		var email = $(this).val();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).attr('placeholder','Укажите корректный E-mail');
		}
	});


	form.find('input,textarea,select').filter('[required]').each(function(){
		if($(this).val().length < 1){
			$(this).closest('.js-form-site-item').addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите ваш номер телефона');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}

			if($(this).hasClass('js-auth')){
				var posClose = $(this).closest('.js-popup').find('.js-popup-error').outerHeight();
				$(this).closest('.js-popup').addClass('error');
				$(this).closest('.js-popup').siblings('.fancybox-button').css('top',posClose+'px');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	var defSuccessTitle = $('.js-success-alert-title').text();
	var defSuccessText = $('.js-success-alert-text').text();

	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});


	$('.js-valid-form').on('submit', 'form', function(e){
		var $form = $(this);
		var successTitle = $form.closest('.js-valid-form').data('success');
		var successText = $form.closest('.js-valid-form').data('text');

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(defSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else if(successText == undefined){
			$('.js-success-alert-text').text(defSuccessText);
			$('.js-success-alert-text').css('display', 'block');
		} else {
			$('.js-success-alert-text').text(successText);
			$('.js-success-alert-text').css('display', 'block');
		}

		$.ajax({
			type: $form.attr('method'),
			url: $form.attr('action'),
			data: $form.serialize(),
			success: function(){
				$.fancybox.close();
				$.fancybox.open({
					src  : '#msg-success',
					type : 'inline',
					opts : {
						
					}
				});
				$form[0].reset();
				// console.log('success');
			}
		})

		e.preventDefault();
	});

	$("[data-fancybox]").fancybox({
		afterClose: function (e) {
			var $authForm = $('#auth form');
			$('#auth .js-popup').removeClass('error');
			$authForm[0].reset();
			$authForm.find('.js-form-site-item').removeClass('error');
			$authForm.find('.form-site-msg-error').remove();
		}
	});
}

if($('.js-btn-registr').length){
	$('.js-btn-registr').on('click', function() {
		$.fancybox.close();
		$.fancybox.open({
			src  : '#registr',
			type : 'inline',
			opts : {}
		});
	})
}

if($('.js-auth-form-back').length){
	$('.js-auth-form-back').on('click', function() {
		$.fancybox.close();
		$.fancybox.open({
			src  : '#auth',
			type : 'inline',
			opts : {}
		});
	})
}

if($('.js-btn-foget').length){
	$('.js-btn-foget').on('click', function() {
		$.fancybox.close();
		$.fancybox.open({
			src  : '#foget',
			type : 'inline',
			opts : {}
		});
	})
}

// Открыть/Закрыть пункты фильтра
if($('.js-filter-head').length){
	$('.js-filter-head').on('click', function(){
		$(this).closest('.js-filter-item').toggleClass('active');
		$(this).siblings('.js-filter-content').slideToggle(300);
	});
}

if($('.js-filter-more').length){
	$('.js-filter-more').on('click',function(){
		$(this).addClass('hide');
		$(this).siblings('.js-filter-param').removeClass('hide');
	});
}

// range-slider
if($('.js-slider-range').length){
	var slider = document.getElementById('slider-range');
	var minRange = parseFloat(slider.getAttribute('data-min'));
	var maxRange = parseFloat(slider.getAttribute('data-max'));
	var start = parseFloat(slider.getAttribute('data-cur-min'));
	var finish = parseFloat(slider.getAttribute('data-cur-max'));
	
	noUiSlider.create(slider, {
		start: [start, finish],
		// step: 5,
		connect: true,
		range: {
			'min': minRange,
			'max': maxRange
		},
	});

	var snapValues = [
		document.getElementById('slider-range-min'),
		document.getElementById('slider-range-max')
	];

	var initRange = false;

	slider.noUiSlider.on('update', function (values, handle) {
		snapValues[handle].value = Math.round(values[handle]);
		// snapValues[handle].value = values[handle];

		if(initRange == false){
			if(handle == 1){
			  initRange = true;
			}
		}else{
			$('.js-slider-range-min').trigger("change");
			$('.js-slider-range-max').trigger("change");
		}
	});

	snapValues.forEach(function (input, handle) {
		input.addEventListener('change', function () {
			var valItem = this.value;
			var minValItem = parseFloat(snapValues[0].value);
			var maxValItem = parseFloat(snapValues[1].value);

			if(handle == 0){
				if((valItem < minRange) || (valItem > maxRange) || (valItem >= maxValItem)){
					valItem = minRange;
				}
			}else{
				if((valItem < minRange) || (valItem > maxRange) || (valItem <= minValItem)){
					valItem = maxRange;
				}
			}
			slider.noUiSlider.setHandle(handle, valItem);
		});
	});

	// Проверка полей на ввод цифор
	$('.js-slider-range-min').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}
	});

	$('.js-slider-range-max').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}
	});
}

// Открыть/Закрыть фильтр
if($('.js-filter-open').length){
	$('.js-filter-open').on('click', function() {
		$('.js-filter').addClass('active');
		$('.js-body').addClass('no-scroll');
	});
}

if($('.js-filter-close').length){
	$('.js-filter-close').on('click', function() {
		$('.js-filter').removeClass('active');
		$('.js-body').removeClass('no-scroll');
	});
}

// Открыть/Закрыть сортировку
if($('.js-sort-head').length){
	$('.js-sort-head').on('click', function() {
		$(this).find('.js-sort-head-arr').toggleClass('active');
		$(this).siblings('.js-sort-list').slideToggle(300);
	});
}

// select
if($('.js-select').length){
	$('.js-select').select2({
		minimumResultsForSearch: -1,
	});
}

// Слайдер продукта на детальной каталога
if($('.js-product-slider').length){
	$('.js-product-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.js-product-thumb-slider',
	});

	$('.js-product-thumb-slider').slick({
		vertical: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.js-product-slider',
		focusOnSelect: true,
		prevArrow: '<button id="prev" type="button" class="product-arr product-arr_up"><svg class="icon ic-arrow-up-thin" width="16" height="8"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-up-thin"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="product-arr product-arr_down"><svg class="icon ic-arrow-down-thin" width="16" height="8"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-down-thin"></use></svg></button>',
		// responsive: [
		// 	{
		// 		breakpoint: 1260,
		// 		settings: {
		// 			slidesToShow: 3,
		// 			vertical: true,
		// 			arrows: true,
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 992,
		// 		settings: {
		// 			slidesToShow: 4,
		// 			vertical: true,
		// 			arrows: true,
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
		// 			slidesToShow: 4,
		// 			vertical: false,
		// 			arrows: false,
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 480,
		// 		settings: {
		// 			slidesToShow: 3,
		// 			vertical: false,
		// 			arrows: false,
		// 		}
		// 	},
		// ]
	});


	$('.js-product-slider-count').text($('.js-product-slider-item').length);

	$('.js-product-slider').on("afterChange", function(event, slick, currentSlide, nextSlide){
		$('.js-product-slider-count-cur').text(currentSlide);
	});
}

// Обрезание текста
// Clamps($('.js-catalog-item-title'));

// if(deviceType != 'mobile' && heightWindow <= 800){
// 	var moveMenu = $('.js-header-top').outerHeight() + $('.js-header-middle').outerHeight();
// 	console.log(moveMenu);
// 	$('.js-cat-menu').css({'height': 'calc(100vh - '+moveMenu+'px)', 'top': moveMenu+'px'})
// }