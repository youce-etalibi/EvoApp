var dtStoreLocatorCountDownTimer = {

	dtInit : function() {

		if(jQuery('.dtsl-countdown-holder').length) {
			jQuery('.dtsl-countdown-holder').each(function(){
				var $this = jQuery(this);
				$this.downCount({
					date	: $this.attr('data-date'),
					offset	: $this.attr('data-offset')
				}, function () {
					location.reload();
					return false;
				});
			});
		}

	}

};

jQuery(document).ready(function() {

	"use strict";

	if(!dtslfrontendobject.elementorPreviewMode) {
		dtStoreLocatorCountDownTimer.dtInit();
	}

});

( function( $ ) {

	"use strict";

	var dtStoreLocatorCountDownTimerJs = function($scope, $){
		dtStoreLocatorCountDownTimer.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sp-countdown-timer.default', dtStoreLocatorCountDownTimerJs);
		}
	});

} )( jQuery );