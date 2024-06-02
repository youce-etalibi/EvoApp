// Search js
(function ($) {

    var dtHeaderIconsWidgetHandler = function($scope, $){

        $search = $scope.find("div.search-overlay");
        if( $search.length ) {
            if($search.parents('.elementor-section').hasClass('sticky-header-active')) {
                $search.find(".wdt-search-form-container").remove();
            } else {
                $form = $search.find(".wdt-search-form-container").clone();
                $search.find(".wdt-search-form-container").remove();
                $form.appendTo( $("body") );
            }
        }

        $('.wdt-search-form-close').on('click', function(e){
            if ($(this).parents('.wdt-search-form-container').length) {
                $(this).parents('.wdt-search-form-container').removeClass('show');
            } else {
                $('.wdt-search-form-container').toggleClass('show');
            }
        });

        $scope.find('.wdt-search-icon').on('click', function(e) {
            if($(this).parents('.wdt-header-icons-list-item').hasClass('search-expand')) {
                $searchItem = $scope.find('.wdt-search-form-container');
            } else  {
                $searchItem = $('body').find('.wdt-search-form-container')[0];
            }
            if($searchItem) {
                $($searchItem).toggleClass('show');
            }
        });

        $scope.find('.wdt-shop-menu-cart-icon').on('click', function(e) {

            if($('.wdt-shop-cart-widget').hasClass('activate-sidebar-widget')) {

                $('.wdt-shop-cart-widget').addClass('wdt-shop-cart-widget-active');
                $('.wdt-shop-cart-widget-overlay').addClass('wdt-shop-cart-widget-active');

                // Nice scroll script

                var winHeight = $(window).height();
                var headerHeight = $('.wdt-shop-cart-widget-header').height();
                var footerHeight = $('.woocommerce-mini-cart-footer').height();

                var height = parseInt((winHeight-headerHeight-footerHeight), 10);

                $('.wdt-shop-cart-widget-content').height(height).niceScroll({ cursorcolor:"#000", cursorwidth: "5px", background:"rgba(20,20,20,0.3)", cursorborder:"none" });

                e.preventDefault();
            }

        });

        // Wishlist count update
        $(document).on( 'added_to_wishlist removed_from_wishlist', function(){

            var html = $('.wdt-wishlist-count');
            $.ajax({
                url: yith_wcwl_l10n.ajax_url,
                data: {
                    action: 'yith_wcwl_update_wishlist_count'
                },
                dataType: 'json',
                success: function( data ){
                    html.html( data.count );
                }
            })
        } );
    };

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-header-icons.default', dtHeaderIconsWidgetHandler);

    });

})(jQuery);