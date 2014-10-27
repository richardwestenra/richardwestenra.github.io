$(function(){
	'use strict';

	//--- Global variables ---//



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
	// Cache elements in vars
	var $header = $('.header'),
		$nav = $('#nav');
	// Toggle nav on button click
	$('.hamburger').on('click',function(e){
		e.preventDefault();
		$nav.toggleClass('visible');
	})
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
	$('body').prepend($config);
	$('.configBtn').on('click',function(e){
		e.preventDefault();
		$config.slideToggle(240);
	});


});