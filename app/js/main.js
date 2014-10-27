$(function(){
	'use strict';

	//--- Global variables ---//



	//--- Helper functions ---//


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