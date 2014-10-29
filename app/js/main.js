$(function(){
	'use strict';

	//--- Global variables ---//
	var $body = $('body'),
		$header = $('.header'),
		$nav = $('#nav');


	//--- Helper functions ---//


	//--- In-page scroll ---//
	$('.scroll').on('click',function(e,target){
		e.preventDefault();
		var o = 0, t = 900; //offset (px), time delay (ms)
		var $anchor = $(this).attr('href');
		$('html, body').stop().animate({
			scrollTop: ($($anchor).offset().top) - o
		}, t);
	});


	//--- Header nav menu hamburger ---//
	// Toggle nav on button click
	$('.hamburger').on('click',function(e){
		e.preventDefault();
		$nav.toggleClass('visible');
	});
	// Hide nav on document click (except header)
    $(document).on('click', function(e) {
		// if the target of the click isn't the container, nor a descendant of the container
		if (!$header.is(e.target) && $header.has(e.target).length === 0) {
			$nav.removeClass('visible');
		}
	});


	//--- Linkblog Quicksearch ---//
	$('.quicksearchForm').on('submit',function(e){
		e.preventDefault();
	}).find('#quicksearch').quicksearch('.lb li',{
		'noResults': '.noResults'
	});


	//--- Config popup ---//
	var $config = $( $('#config_tmpl').html() );
	$body.prepend($config);
	$('.configBtn').on('click',function(e){
		e.preventDefault();
		$config.slideToggle(240);
	});


	//--- Style-switcher ---//
	var $styleLinks = $('#styleSwitcher').find('a');
	var styles = [];
	$styleLinks.each(function(i,d){
		styles.push( $(d).attr('id') );
	});
	// $body.addClass('geocities');
	$styleLinks.on('click',function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		$body.removeClass(styles.join(' ')).addClass(id);
		$styleLinks.removeClass('on');
		$(this).addClass('on');
	});


});