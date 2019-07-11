$(function() {
	"use strict";
	$(function() {
		$(".preloader").fadeOut();
	});		

	// this is for close icon when navigation open in mobile view
	$(".menu .nav-item").click(function() {
		$(this).parent().toggleClass('nav-active');
	});
	$(".sidebartoggler").on('click', function() {
		$(".sidebartoggler i").toggleClass("ti-menu");
	});
	
});