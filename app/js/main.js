$(function(){
	'use strict';

	//--- Global variables ---//



	//--- Helper functions ---//


	//---  ---//
	function Config(){
		this.active = false;
		this.html = $('#config_tmpl').html();
	}


	//--- Config popup ---//
	var $config = $( $('#config_tmpl').html() );
	$('body').prepend($config);
	$('.configBtn').on('click',function(e){
		e.preventDefault();
		$config.slideToggle(240);
	});
});