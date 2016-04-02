Modernizr.addTest('iphone-safari', function () {
   var deviceAgent = navigator.userAgent.toLowerCase(),
   agentID = deviceAgent.match(/(iphone|ipod|ipad)/),
   isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    if (agentID && isSafari ) {
		return true;
	}
});

function debounce(func, wait, immediate) {
// utility to trigger events after set time (used on scroll principally)
			var timeout;
			return function() {
				var context = this, args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					timeout = null;
					if (!immediate) {
						func.apply(context, args);
					}
				}, wait);
				if (immediate && !timeout) {
					func.apply(context, args);
				}
			};
}

$(function() {

	var 
	$body = $('body'),
	videoEle,
	$videoBgSelector = $('#bg-video'),
	videoBgEle = $videoBgSelector.get(0),
	$header = $('.header'),
	$modalVideo = $('.modal-video'),
	$fadeControls = $('.modal-video .fade-control'),
	$launchButton = $('.btn-launch-video'),
	$hasHint = $('.has-hint'),
	$hero = $('.level-hero'),
	controlsTimer = null,
	eventLastX = 0,
	eventLastY = 0,
	desktopView =  Modernizr.mq( "screen and ( min-width: 1200px )" ),
	canPlaceholder = Modernizr.input.placeholder;
	baseUrl = window.location.hostname;
	
	
	// hint arrows
	var levelHandler = function()  {
		
		var st = $(window).scrollTop(),
		wh = $(window).height(),
		hh = $hero.outerHeight(true),
		headerh = $header.outerHeight(true);
		
			if ( $hasHint.length ) {
			
				if ( wh > (hh+headerh) ) {
						$hasHint.removeClass('active-state');
				}
				
				else {
		
					if ( st <= 50 ) {
						$hasHint.addClass('active-state');
					}
			
					else {
						$hasHint.removeClass('active-state');
					}
				}
		}
		
	};
	
	// run on doc ready
	levelHandler();
	
	var scrollTrigger = debounce(function() {
		// re-run on scroll :)
		levelHandler();
	}, 1);
	// doesnt play well to debounce this
	
	if ( canPlaceholder ) {
		// switched. ie test
		$('label').addClass('sr-only');
	}
	
	
	// external links in new window 
	$('a[href^="http:"]').not('[href*="'+baseUrl+'"]').addClass('external').attr({target: "_blank"});
	
	if ( window.location.hash && $('.is-section-archived').length ) {
		var eleID = window.location.hash.split('#');
		$('[aria-controls="' + eleID[1] + '"]').hide();
	}
	
	if (window.history && window.history.pushState) {
	
		$('.show-section').on('click', function(e) {
				e.preventDefault();
				
				var $t = $(this),
				anchor = $t.attr('href'),
				offset = $(anchor).offset();
				
				$t.hide();
				history.pushState({}, "", anchor);
				$(anchor).addClass('is-archive-visible');
				$('body,html').animate({scrollTop: (offset.top)-50 }, 500);
			});
		
	}
	
	
	
	// util - needed ?
	$(window).on('load', function() {
		$body.addClass('loaded');
	});
	
	$(window).on('resize scroll',  scrollTrigger );
	
	// scroll to next level clicking on hint arrow - cheap!
	$('.hint-arrow').on('click', function ( e ) {
		var $parentLevel = $(this).closest('.level');
		
		if ( ! $parentLevel.length ) {
			$parentLevel = $('.level-hero');
		}
		
		var $nextLevel = $parentLevel.next('.level'),
		target = $nextLevel.offset(),
		target = target.top;
		if ( $nextLevel ) {
			$('body,html').animate({scrollTop: target}, 700, "linear");
		}
	});

	// scroll to next level - this should be merged with previous function
	$('.btn-scroll').on('click', function ( e ) {
		var href = $(this).attr('href');
		
		if ( href.length ) {
			var $target = $(href);
		}
		
		var target = $target.offset(),
		target = target.top;
		$('body,html').animate({scrollTop: target}, 700, "linear");

		e.preventDefault();

	});
	

	
});