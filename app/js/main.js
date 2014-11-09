/* global Konami */
$(function(){
	'use strict';

	//--- Global variables ---//
	var $body = $('body'),
		$header = $('.header'),
		$nav = $('#nav');


	//--- Helper functions ---//
	function roundLarge(x) {
		for(var i=1000000; i>=10; i=i/10) {
			if (x>(i*10)) return Math.round(x/i)*i;
		}
		return Math.round(x);
	}
	function si(x) {
		var n = { 'M': 1000000, 'K': 1000};
		for(var key in n){
			if (x>n[key]) return roundLarge(x) / n[key] + key;
		}
		return Math.round(x);
	}
	window.prettyNumbers = si;


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
	// Toggle style on click
	$styleLinks.on('click',function(e){
		e.preventDefault();
		var id = $(this).attr('id');
		$body.removeClass(styles.join(' ')).addClass(id);
		$styleLinks.removeClass('on');
		$(this).addClass('on');
		localStorage.setItem('styleSwitcher',id);
	});
	// Detect localstorage value and use that if it exists
	var localStyle = localStorage.getItem('styleSwitcher');
	if(localStyle !== null) {
		$body.removeClass(styles.join(' ')).addClass(localStyle);
		$styleLinks.removeClass('on');
		$('#'+localStyle).addClass('on');
	}



	//-- Toggle opening links in a new tab ---//
	var $linkSwitcher = $('#linkSwitcher').find('a');
	function toggleLinks(state){
		var $extLinks = $('a').filter(function() {
		   return this.hostname && this.hostname !== location.hostname;
		}).toggleClass('external',state).attr({
			target: function(){
				return state ? '_blank' : '_self';
			}
		});
	}
	$linkSwitcher.on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('on');
		var isOn = $(this).hasClass('on');
		localStorage.setItem('externalLinks',isOn);
		toggleLinks(isOn);
	});
	// Detect localstorage value and use that if it exists
	var localExt = localStorage.getItem('externalLinks');
	if(localExt !== null) {
		var isOn = JSON.parse(localExt);
		$linkSwitcher.toggleClass('on',isOn);
		toggleLinks(isOn);
	}



	//--- Konami code easter egg ---//
	var easterEgg = new Konami();
	easterEgg.code = function() {
		$body.addClass('konami');
		setTimeout(function(){
			$body.removeClass('konami');
		}, 3000);
	};
	easterEgg.load();


});