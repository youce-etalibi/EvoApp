jQuery.noConflict();
jQuery(document).ready(function($) {
    "use strict";

    // Sticky Row
    if( $("#header-wrapper .sticky-header").length > 0 ) {
        var $sticky_header_cloned = $('.sticky-header').clone();
        $sticky_header_cloned.removeClass('sticky-header').addClass('sticky-header-active');
        $( $sticky_header_cloned ).insertAfter( $('.sticky-header') );

        var position = $(window).scrollTop();

        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if((scroll > 0 && position > 0) && scroll > position) {
                $("#header-wrapper .sticky-header-active").addClass('wdt-header-top');
                $("#header-wrapper .sticky-header-active").addClass('wdt-header-scroll');

                $("#header-wrapper .sticky-header-active").show();
            } else {
                 $("#header-wrapper .sticky-header-active").removeClass('wdt-header-top');
                 $("#header-wrapper .sticky-header-active").removeClass('wdt-header-scroll');
            }
            position = scroll;
        });
    }

    // Mega Menu
    function megaMenu() {

        var $header = 0;
        if( $("#header .container").length ) {
            $header = $("#header .container").offset().left;
        }
        $("li.has-mega-menu").each(function(){
            var $parent      = $(this),
                $parent_left = $parent.offset().left,
                $sub_menu    = $parent.children("ul.sub-menu"),
                $section     = $sub_menu.find('section');

            if( $section.hasClass('elementor-section-stretched') ) {
            	setTimeout(function() {
           			$sub_menu.css('left', - ( $parent_left ) );

            		var pad = $sub_menu.css('padding-left');
            		$section.css('left', - ( parseInt(pad) ) );

                    var windowWidth = $(window).width();
                    $sub_menu.css('width', parseInt( windowWidth ) );
            	}, 100);
            } else {
                $sub_menu.css('left', ( $header - $parent_left ) );
                if( !($("#header .container").length) ) {
                    $sub_menu.css('width', ( document.documentElement.clientWidth ) );
                }
            }
        });
    }
    megaMenu();

    $(window).on("resize", function() {
        megaMenu();
    });
});