$(function(){"use strict";$(".quicksearchForm").on("submit",function(a){a.preventDefault()}).find("#quicksearch").quicksearch(".lb li",{noResults:".noResults"});var a=$($("#config_tmpl").html());$("body").prepend(a),$(".configBtn").on("click",function(b){b.preventDefault(),a.slideToggle(240)})});