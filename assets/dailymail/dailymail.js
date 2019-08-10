$(function(){
	'use strict';
	var headlines = [
		'.article .linkro-darkred',
		'editors-choice li',
		'.linkro-wocc li'
	],
	commentClass = '.comment-text',
	maxLength = 200;
	function truncate(s,n,useWordBoundary){
		var toLong = s.length>n,
			s_ = toLong ? s.substr(0,n-1) : s;
		s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
		return  toLong ? s_ + '…' : s_;
	}
	var ajaxCalls = [];
	var loadingMessage = $('<p/>',{
				'class':'loadingMessage'
		}).html('Loading comments&hellip;')
		.css({
			'position':'fixed',
			'top': '10px',
			'left': '10px',
			'background': 'rgba(255,255,255,0.9)',
			'color': '#333',
			'font-weight': 'bold',
			'padding': '3px 15px',
			'z-index': '99',
			'font-size': '18px',
			'border-radius': '4px',
			'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif'
		});
	$(headlines).each(function(key,val){
		$(val).find('a').each(function(key2,val2){
			loadingMessage.appendTo('body');
			var $this = $(this),
				url = $this.attr('href'),
				uid = key+'-'+key2;
				ajaxCalls.push(uid);
			var get = $.get(url, function(data) {
				var comment = $(data).find(commentClass+':first').text();
				if (typeof comment !== 'string' || comment.length === 0) {
					comment = 'No comment';
				} else if(comment.length>maxLength) {
					comment = truncate(comment,maxLength,true);
				}
				if(val === '.linkro-wocc li'){
					$this.find('strong').text(comment);
				} else {
					$this.text(comment);
				}
			});
			get.always(function(){
				var i = ajaxCalls.indexOf(uid);
				if (i !== -1) {
					ajaxCalls.splice(i, 1);
				}
				if (ajaxCalls.length < 1){
					$('.loadingMessage').remove();
				}
			});
		});
	});
});