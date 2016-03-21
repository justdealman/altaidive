function videoScale() {
	var x = $('.introduction video').attr('width');
	var y = $('.introduction video').attr('height');
	var ratio = x/y;
	var w = $('.introduction').width();
	var h = $('.introduction').height();
	$('.introduction .video').height(h);
	if (  w/h > ratio ) {
		$('.introduction video').css({
			'left': '0',
			'top': -(w/x*y-h)*0.5+'px',
			'-webkit-transform': 'scale('+w/x+')',
			'transform': 'scale('+w/x+')',
		});
	}
	else {
		$('.introduction video').css({
			'left': -(h/y*x-w)*0.5+'px',
			'top': '0',
			'-webkit-transform': 'scale('+h/y+')',
			'transform': 'scale('+h/y+')',
		});
	}
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() < $('.introduction').height() && w/h > ratio ) {
			$('.introduction video').css({
				'top': -(w/x*y-h)*0.5+$(document).scrollTop()+'px'
			});
		}
		if ( $(document).scrollTop() < $('.introduction').height() && w/h <= ratio ) {
			$('.introduction video').css({
				'top': $(document).scrollTop()+'px'
			});
		}
	});
}
$(function() {
	if ( $('.introduction .bg').length > 0 ) {
		$('.introduction').css({
			'background': 'url("'+$('.introduction .bg').attr('src')+'") no-repeat center 59% fixed',
			'background-size': 'cover'
		});
	}
	if ( $('.introduction .video').length > 0 ) {
		videoScale();
		$('.introduction .video').stop().animate({
			'opacity': '1'
		}, 400);
		$(window).resize(function() {
			videoScale();
		});
	}
	if ( $('.event-grid').length > 0 ) {
		$('.event-grid li').each(function() {
			$(this).css({
				'background': 'url("'+$(this).find('img').attr('src')+'") no-repeat center bottom'
			});
		});
	}
	$('.media-e > li > ul > li').bind('click', function(e) {
		e.preventDefault();
		$(this).parent().siblings('[data-media="'+$(this).attr('data-source')+'"]').show().siblings('[data-media]').hide();
		$(this).addClass('active').siblings().removeClass();
	}).filter(':first').click();
	if ( $('.gallery-b').length > 0 ) {
		$('.gallery-b li').each(function() {
			$(this).css({
				'background': 'url("'+$(this).find('img').attr('src')+'") no-repeat center bottom'
			});
		});
	}
	if ( $('.event-grid').length > 0 ) {
		$('.event-grid').masonry({
			itemSelector: 'li',
			columnWidth: 488,
			gutter: 24
		});
	}
	if ( $('input[type="checkbox"]').length > 0 ) {
		$('input[type="checkbox"]').uniform();
	}
	if ( $('.map-b').length > 0 ) {
		$('header').addClass('custom');
	}
	$('.modal').append('<span class="close"></span>');
	$('[data-open]').bind('click', function(e) {
		e.preventDefault();
		var t = $('.modal[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade').stop(true,true).fadeIn(400);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < 0 ) {
			h = 0;
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(400);
	});
	$('.fade, .modal .close').bind('click', function(e) {
		e.preventDefault();
		$('.fade, .modal').stop(true,true).fadeOut(400);
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});