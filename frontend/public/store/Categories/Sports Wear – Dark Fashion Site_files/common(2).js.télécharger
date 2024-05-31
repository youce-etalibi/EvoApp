
var dtDirectorEventsCommon = {

	dtInit : function() {

		// Date Picker
		if(jQuery('.dtsl-datepicker').length) {
			jQuery('.dtsl-datepicker').datepicker({
				minDate: '0d'
			});
		}

	},

};

jQuery(document).ready(function() {

	"use strict";

	if((typeof dtslfrontendobject === 'undefined') || !dtslfrontendobject.elementorPreviewMode) {
		dtDirectorEventsCommon.dtInit();
	}

});

( function( $ ) {

	"use strict";

	var dtDirectorEventsCommonJs = function($scope, $){
		dtDirectorEventsCommon.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(dtslfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/dtsl-widget-sf-start-date.default', dtDirectorEventsCommonJs);
		}
	});

} )( jQuery );