import {$} from './common';

// $(window).scroll(function(){
// 	if($(this).scrollTop()>300){
// 		$('.js-move-up').addClass('visible');
// 	}else{
// 		$('.js-move-up').removeClass('visible');
// 	}
// });
// $('.js-move-up').click(function(){$('body,html').animate({scrollTop:0},800);return false;});

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