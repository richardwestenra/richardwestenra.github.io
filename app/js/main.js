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
	$('.hamburger').on('click',function(e){
		e.preventDefault();
		$('#nav').toggleClass('visible');
	})


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