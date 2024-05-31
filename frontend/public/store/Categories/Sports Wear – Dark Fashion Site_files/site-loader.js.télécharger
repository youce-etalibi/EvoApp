(function ($) {
    "use strict";

    const $ready = function ($readyFn) {
        document.readyState === 'loading'
            ? // If document is still loading
                document.addEventListener('DOMContentLoaded', function (e) {
                    $readyFn();
                })
            : // If document is loaded completely
                $readyFn();
    };

    $ready(function() {
        $('.pre-loader').fadeOut(500);
    });


})(jQuery);