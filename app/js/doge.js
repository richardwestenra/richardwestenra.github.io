'use strict';
/* global _, Modernizr */
/* jshint camelcase: false */

$(function(){

	// Get Query String
	function queryString() {
		return location.search.slice(1).split('&');
	}
	// <=IE8 polyfill
	if ( !Array.prototype.forEach ) {
	    Array.prototype.forEach = function(fn, scope) {
	        for(var i = 0, len = this.length; i < len; ++i) {
	            fn.call(scope, this[i], i, this);
	        }
	    };
	}

	function randomVal(range,min){
		return Math.ceil(Math.random()*range) + min;
	}
	function plusOrMinus(){
		return Math.random()<0.5 ? -1 : 1;
	}

	(function doge(){
		var wowTemplate = _.template(
			$('#wowTemplate').html()
		);
		var textSolo = [
			'wow',
			'excite',
			'amaze'
		];
		var q =  _.compact(queryString());
		var nouns = q.length > 0 ? q : ['doge'];
		var textCompound = [
			'very',
			'much',
			'so',
			'such',
			'many'
		];
		if(q.length>0){
			$('#suchInput').val( decodeURIComponent( nouns.join(', ') ) );
		}
		var text = [];
		_.each(nouns,function(n){
			text = text.concat(_.map(textCompound,function(d){
				return d + ' ' + decodeURIComponent(n);
			})).concat(textSolo);
		});

		var $doge = $('.doge');
		var colours = ['lime','cyan','lime','cyan','yellow','pink','blue','red','purple','green','orange','brown','teal'];
		var suchWow = function(duration){
			var ml = randomVal(50,0) * plusOrMinus(),
				mt = randomVal(50,0) * plusOrMinus() + 2,
				id = 'wow'+Math.ceil(Math.random()*999999);
		    var wow = wowTemplate({
				'text': _.sample(text),
				'ml': ml,
				'mt': mt,
				'c': _.sample(colours),
				'id': id
		    });
		    $doge.append(wow);
			$('#'+id)
				.fadeIn(400)
				.css({'margin-top': mt - 3 +'%' })
				.delay(duration)
				.fadeOut(500,function(){
					$(this).remove();
				});
		};

		function loop(){
			var duration = 1000,
				interval = randomVal(200,0);
			setTimeout(function(){
				suchWow(duration);
				loop();
			},interval);
		}
		loop();
	})();
	function makeWords(t){
		return _.map( t.val().split(','), function(d){
			return d.replace(/^\s+|\s+$/g,'');
		}).join('&');
	}

	$('#suchForm').on('submit',function(e){
		e.preventDefault();
		var words = makeWords($(this).find('#suchInput'));
		window.open('?'+words,'_self');
	});
	$('.makeDoge').on('click',function(e){
		e.preventDefault();
		$(this).addClass('inactive').removeClass('active').text('make your own:');
		$('#suchInput').addClass('active');
	});

	function makeUrl(words){
		// console.log(window.location.origin+window.location.pathname, words);
		var q = words.length>0 ? '?' : '';
		var url = window.location.origin + window.location.pathname + q + words;
		$('.url').addClass('active').html('url 2 share: <a href="'+url+'">'+url+'</a>');
	}
	$('#suchInput').on('keyup keypress blur focus change',function(){
		makeUrl ( makeWords($(this)) );
	});


	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function(){
			var ph = $(this).attr('placeholder');
			$(this).val(ph);
			$(this).focus(function(){
				if (this.value === ph) {this.value = '';}
			});
			$(this).blur(function(){
				if (this.value === '') {this.value = ph;}
			});
		});
	}

  if (location.hash === '#hideui') {
    $('.header, .social, #suchForm').css('visibility','hidden');
  }
});
