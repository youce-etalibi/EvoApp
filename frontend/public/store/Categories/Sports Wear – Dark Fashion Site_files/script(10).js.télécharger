(function ($) {

    const wdtColumnsHandler = function($scope) {
        const instance = new wdtColumnsHandlerInit($scope);
        instance.init();
    };

    const wdtColumnsHandlerInit = function($scope) {

		const $self        = this,
		$window            = $(window),
		$columnId         = $scope.data('id'),
		$editMode          = Boolean(elementorFrontend.isEditMode()),
		$activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
		$isLegacyModeActive = !!$scope.find( '> .elementor-column-wrap' ).length,
		$deviceMode = elementorFrontend.getCurrentDeviceMode();

		let $stickySettings = {},
		$stickyInstance = null,
		$stickyInstanceOptions = {
			topSpacing: 50,
			bottomSpacing: 50,
			containerSelector: $isLegacyModeActive ? '.elementor-row' : '.elementor-container',
			innerWrapperSelector: $isLegacyModeActive ? '.elementor-column-wrap' : '.elementor-widget-wrap',
		};

        $self.init = function() {

            if($editMode) {
                $stickySettings = $self.generateEditorSettings($columnId);
				if($stickySettings['sticky']) {
					$scope.addClass('wdt-sticky-column');
				}
            } else {
				$stickySettings = $scope.data('wdt-settings');
            }

			if($stickySettings === undefined || !$stickySettings['sticky']) {
				return false;
			}

			if($stickySettings.stickyOn.indexOf($deviceMode) > -1) {

				$stickyInstanceOptions.topSpacing = $stickySettings['topSpacing'];
				$stickyInstanceOptions.bottomSpacing = $stickySettings['bottomSpacing'];

				$stickyInstance = new StickySidebar($scope[0], $stickyInstanceOptions);

			}

        };

        $self.generateEditorSettings = function($columnId) {

            let $editorModels = null,
            $editorSettings   = {};

            if(!window.elementor.hasOwnProperty('elements')) {
				return false;
			}

            $editorModels = window.elementor.elements.models;
            if(!$editorModels) {
				return false;
			}

            $.each( $editorModels, function( index, obj ) {
				$.each( obj.attributes.elements.models, function( index, obj ) {
					if($columnId == obj.id ) {
						$editorSettings = obj.attributes.settings.attributes;
					}
				});
            });

			return {
				'sticky': ($editorSettings['wdt_sticky_column'] === 'yes') ? true : false,
				'topSpacing': $editorSettings['wdt_sticky_top_spacing'] || 50,
				'bottomSpacing': $editorSettings['wdt_sticky_bottom_spacing'] || 50,
				'stickyOn': $editorSettings['wdt_sticky_on_devices'] || [ 'desktop', 'tablet']
			}

        };

    };

    $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/column', wdtColumnsHandler );
    });

})(jQuery);