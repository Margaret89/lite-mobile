import {$} from './common';

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
			$('.js-cat-menu-item').removeClass('hover');
			$(this).addClass('hover');
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
	});

	$('.js-cat-menu-close').on('click', function() {
		$('.js-cat-menu').toggleClass('active inactive');
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
		});
	}
}

catalogSlider();

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

// Обрезание текста
// Clamps($('.js-catalog-item-title'));

// if(deviceType != 'mobile' && heightWindow <= 800){
// 	var moveMenu = $('.js-header-top').outerHeight() + $('.js-header-middle').outerHeight();
// 	console.log(moveMenu);
// 	$('.js-cat-menu').css({'height': 'calc(100vh - '+moveMenu+'px)', 'top': moveMenu+'px'})
// }