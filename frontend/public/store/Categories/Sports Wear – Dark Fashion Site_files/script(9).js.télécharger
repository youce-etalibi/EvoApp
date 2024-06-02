(function ($) {

    const wdtSectionsOptionsHandler = function($scope) {
		const animationEffectInstance = new wdtWidgetsAnimationEffectHandlerInit($scope);
        animationEffectInstance.init();
    };

    const wdtWidgetsAnimationEffectHandlerInit = function($scope) {

        const $self   = this,
            $window   = $(window),
            $sectionId = $scope.data('id'),
            $editMode = Boolean(elementorFrontend.isEditMode()),
			$activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
			$deviceMode = elementorFrontend.getCurrentDeviceMode();

		let $activeBreakpointkeys = [];
		let $animationEffectSettings = false;
		//let $animationEffectBreakpointSettings = [];
		let $mouseMoveItemSettings = {};
		let $scrollItemSettings = {};

		$self.init = function() {
			$self.animationEffectInit();
		};

		$self.filterObjects = function($settings, $searchKey) {
			let $settingKeys = Object.keys($settings).filter((key) => key.includes($searchKey));
			let $filteredSettings = $settingKeys.reduce((cur, key) => { return Object.assign(cur, { [key]: $settings[key] })}, {});
			if(Object.keys($filteredSettings).length) {
				return $filteredSettings;
			}
			return false;
		};

		$self.animationEffectInit = function() {

			if($editMode) {
				$animationEffectSettings = $self.generateEditorSettings($sectionId);
			} else {
				$animationEffectSettings = $scope.data('settings') || false;
				$animationEffectSettings = $self.filterObjects($animationEffectSettings, 'wdt_');
			}

			if(!$animationEffectSettings || $animationEffectSettings['wdt_animation_effect'] === 'none' || $animationEffectSettings['wdt_animation_effect'] === '') {
				return false;
			}

			// Updatebreakpoints
				$self.updateActiveBreakpoints();

			// Generate Background sections for effects
				$self.generateBgItemsInSections();

			// Mouse Move Effect
				if(Object.keys($mouseMoveItemSettings).length) {
					$self.animationEffectMouseMove();
				}

			// Scroll Effect
				if(Object.keys($scrollItemSettings).length) {
					let img = new Image();
					if($animationEffectSettings['wdt_bg_image']['url'] !== '') {
						img.src = $animationEffectSettings['wdt_bg_image']['url'];
						img.onload = function() {
							let $bgCSS = {
								'height': this.height+'px'
							};
							$scope.find('.wdt-section-bgeffects-image').css($bgCSS);
							$self.animationEffectScroll();
						}
					}
				}

		};

		$self.generateEditorSettings = function($sectionId) {

            let $editorModels     = null,
            $editorSettings       = {};

            if(!window.elementor.hasOwnProperty('elements')) {
				return false;
			}

            $editorModels = window.elementor.elements.models;
            if(!$editorModels) {
				return false;
			}

            $.each( $editorModels, function( index, obj ) {
                if($sectionId === obj.id) {
                    $editorSettings = obj.attributes.settings.attributes;
                }
            });

			if(!Object.keys($editorSettings).length) {
				return false;
			}

			return $self.filterObjects($editorSettings, 'wdt_');

        };

		$self.updateActiveBreakpoints = function() {

            $.each($activeBreakpoints, function (key, value) {
                if('widescreen' === key) {
                    $activeBreakpointkeys.push( 'desktop' );
                    $activeBreakpointkeys.push( key );
                } else {
                    $activeBreakpointkeys.push( key );
                }

            });

			if ( -1 === $activeBreakpointkeys.indexOf( 'widescreen' ) ) {
				$activeBreakpointkeys.push( 'desktop' );
			}

        };

		$self.generateBreakpointwiseBgItems = function($section) {

			let $bgItems = {};
			let $wdt_bg_image = ($section['wdt_bg_image'] && '' != $section['wdt_bg_image']['url']) ? $section['wdt_bg_image']['url'] : '';
			let $wdt_bg_position = ($section['wdt_bg_position'] && '' != $section['wdt_bg_position']) ? $section['wdt_bg_position'] : 'center center';
			let $wdt_bg_size = ($section['wdt_bg_size'] && '' != $section['wdt_bg_size']) ? $section['wdt_bg_size'] : '';

            $activeBreakpointkeys.forEach( function( breakpoint ) {

                if('desktop' === breakpoint) {
                    $bgItems[breakpoint] = {
                        'bgImage' : $wdt_bg_image,
                        'bgPosition' : $wdt_bg_position,
                        'bgSize' : $wdt_bg_size
                    };
                } else {
                    $bgItems[breakpoint] = {
                        'bgImage' : ($section['wdt_bg_image_' + breakpoint] && '' != $section['wdt_bg_image_' + breakpoint]['url']) ? $section['wdt_bg_image_' + breakpoint]['url'] : $wdt_bg_image,
                        'bgPosition' : ($section['wdt_bg_position_' + breakpoint] && '' != $section['wdt_bg_position_' + breakpoint]) ? $section['wdt_bg_position_' + breakpoint] : $wdt_bg_position,
                        'bgSize' : ($section['wdt_bg_size_' + breakpoint] && '' != $section['wdt_bg_size_' + breakpoint]) ? $section['wdt_bg_size_' + breakpoint] : $wdt_bg_size
                    };
                }

            });

			return $bgItems;

        };

        $self.generateBgItemsInSections = function() {

			// Remove existing background items
            	$('.wdt-section-bgeffects-item', $scope).remove();

			// Generate background settings and layout html
				const $effectType = $animationEffectSettings['wdt_animation_effect'];

				let $bgItem = $self.generateBreakpointwiseBgItems($animationEffectSettings);

				if($effectType === 'none' || $effectType === '' || !$bgItem[$deviceMode]) {
                    return false;
                }

                if(!$scope.hasClass('wdt-section-bgeffects')) {
					$scope.addClass('wdt-section-bgeffects');
				}

				const $bgImage = $bgItem[$deviceMode].bgImage;
				const $bgPosition = $bgItem[$deviceMode].bgPosition;
				const $bgSize = $bgItem[$deviceMode].bgSize;

				if($effectType === 'mouse-move') {

					let $layout = $( '<div class="wdt-section-bgeffects-item wdt-effect-mouse-move-wrapper layer"><img src="' + $bgImage + '" class="wdt-section-bgeffects-image-tag" /></div>' ).prependTo($scope);

					// Filter mouse move animation settings
					$mouseMoveItemSettings = $self.filterObjects($animationEffectSettings, 'wdt_mme_');
					$mouseMoveItemSettings['wdt_item'] = $layout;

				} else if($effectType === 'scroll') {

					let $layout = $( '<div class="wdt-section-bgeffects-item wdt-effect-scroll-wrapper"><div class="wdt-section-bgeffects-image"></div><img src="' + $bgImage + '" class="wdt-section-bgeffects-image-tag" style="display:none;" /></div>' ).prependTo($scope);

					let $bgCSS = {
						'background-image': 'url(' + $bgImage + ')',
						'background-position': $bgPosition,
                        'background-repeat': 'no-repeat',
						'background-size': $bgSize
					};

					$( '> .wdt-section-bgeffects-image', $layout ).css( $bgCSS );

					// Filter scroll animation settings
					$scrollItemSettings = $self.filterObjects($animationEffectSettings, 'wdt_sle_');
					$scrollItemSettings['wdt_item'] = $layout;

				}

        };

		$self.getMouseMoveResponsiveSettings = function($mouseMoveItem) {

			let $mouseMoveBreakpointItem = {};

            $activeBreakpointkeys.forEach( function( $breakpoint ) {

                if('desktop' === $breakpoint) {
                    $mouseMoveBreakpointItem[$breakpoint] = {
						'speed' : ($mouseMoveItem['wdt_mme_speed']['size'] && '' != $mouseMoveItem['wdt_mme_speed']['size']) ? $mouseMoveItem['wdt_mme_speed']['size'] : 0.1,
						'depth' : ($mouseMoveItem['wdt_mme_depth']['size'] && '' != $mouseMoveItem['wdt_mme_depth']['size']) ? $mouseMoveItem['wdt_mme_depth']['size'] : 1
					};
                } else {
                    $mouseMoveBreakpointItem[$breakpoint] = {
						'speed' : ($mouseMoveItem['wdt_mme_speed_' + $breakpoint]['size'] && '' != $mouseMoveItem['wdt_mme_speed_' + $breakpoint]['size']) ? $mouseMoveItem['wdt_mme_speed_' + $breakpoint]['size'] : $mouseMoveItem['wdt_mme_speed']['size'],
						'depth' : ($mouseMoveItem['wdt_mme_depth_' + $breakpoint]['size'] && '' != $mouseMoveItem['wdt_mme_depth_' + $breakpoint]['size']) ? $mouseMoveItem['wdt_mme_depth_' + $breakpoint]['size'] : $mouseMoveItem['wdt_mme_depth']['size']
					};
                }

            });

			return $mouseMoveBreakpointItem;

        };

		$self.animationEffectMouseMove = function() {

			// Responsivewise Options
				let $mouseMoveBreakpointwiseItem = $self.getMouseMoveResponsiveSettings($mouseMoveItemSettings);

			// Get settings
				if(!$mouseMoveBreakpointwiseItem[$deviceMode]) {
					return false;
				}

				const $speed = $mouseMoveBreakpointwiseItem[$deviceMode].speed;
				const $depth = $mouseMoveBreakpointwiseItem[$deviceMode].depth;
				const $moveAlong = $mouseMoveItemSettings['wdt_mme_move_along'] ? $mouseMoveItemSettings['wdt_mme_move_along'] : 'both';
				const $invertMovement = $mouseMoveItemSettings['wdt_mme_invert_movement'] ? Boolean($mouseMoveItemSettings['wdt_mme_invert_movement']) : false;

			// Wrap with div to apply mouse move effect

				let $options = {};

				$scope.find('.wdt-effect-mouse-move-wrapper').attr('data-depth', $depth);

				if($moveAlong === 'x-axis') {
					$options['scalarX'] = 10.0;
					$options['scalarY'] = 0.0;
				}
				if($moveAlong === 'y-axis') {
					$options['scalarX'] = 0.0;
					$options['scalarY'] = 10.0;
				}
				if($moveAlong === 'both') {
					$options['scalarX'] = 10.0;
					$options['scalarY'] = 10.0;
				}

				$options['frictionX'] = $speed;
				$options['frictionY'] = $speed;
				$options['invertX'] = $invertMovement;
				$options['invertY'] = $invertMovement;

				$parallaxInstance = $scope.parallax($options);

		};

		$self.getScrollResponsiveSettings = function($scrollItem) {

			let $scrollBreakpointItem = {};

			let $wdt_sle_parallax_x_depth = ($scrollItem['wdt_sle_parallax_x_depth'] && '' != $scrollItem['wdt_sle_parallax_x_depth']['size']) ? $scrollItem['wdt_sle_parallax_x_depth']['size'] : 50;
			let $wdt_sle_parallax_y_depth = ($scrollItem['wdt_sle_parallax_y_depth'] && '' != $scrollItem['wdt_sle_parallax_y_depth']['size']) ? $scrollItem['wdt_sle_parallax_y_depth']['size'] : 50;
			let $wdt_sle_rotate_x_angle = ($scrollItem['wdt_sle_rotate_x_angle'] && '' != $scrollItem['wdt_sle_rotate_x_angle']['size']) ? $scrollItem['wdt_sle_rotate_x_angle']['size'] : 45;
			let $wdt_sle_rotate_y_angle = ($scrollItem['wdt_sle_rotate_y_angle'] && '' != $scrollItem['wdt_sle_rotate_y_angle']['size']) ? $scrollItem['wdt_sle_rotate_y_angle']['size'] : 45;
			let $wdt_sle_rotate_z_angle = ($scrollItem['wdt_sle_rotate_z_angle'] && '' != $scrollItem['wdt_sle_rotate_z_angle']['size']) ? $scrollItem['wdt_sle_rotate_z_angle']['size'] : 45;
			let $wdt_sle_scale_value = ($scrollItem['wdt_sle_scale_value'] && '' != $scrollItem['wdt_sle_scale_value']['size']) ? $scrollItem['wdt_sle_scale_value']['size'] : 1;
			let $wdt_sle_blur_value = ($scrollItem['wdt_sle_blur_value'] && '' != $scrollItem['wdt_sle_blur_value']['size']) ? $scrollItem['wdt_sle_blur_value']['size'] : 0;
			let $wdt_sle_opacity_value = ($scrollItem['wdt_sle_opacity_value'] && '' != $scrollItem['wdt_sle_opacity_value']['size']) ? $scrollItem['wdt_sle_opacity_value']['size'] : 1;

            $activeBreakpointkeys.forEach( function( $breakpoint ) {

                if('desktop' === $breakpoint) {
                    $scrollBreakpointItem[$breakpoint] = {
						'parallaxDepthX': $wdt_sle_parallax_x_depth,
						'parallaxDepthY': $wdt_sle_parallax_y_depth,
						'rotateAngleX'  : $wdt_sle_rotate_x_angle,
						'rotateAngleY'  : $wdt_sle_rotate_y_angle,
						'rotateAngleZ'  : $wdt_sle_rotate_z_angle,
						'scaleValue'    : $wdt_sle_scale_value,
						'blurValue'     : $wdt_sle_blur_value,
						'opacityValue'  : $wdt_sle_opacity_value
					};
                } else {
                    $scrollBreakpointItem[$breakpoint] = {
						'parallaxDepthX' : ($scrollItem['wdt_sle_parallax_x_depth_' + $breakpoint] && '' != $scrollItem['wdt_sle_parallax_x_depth_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_parallax_x_depth_' + $breakpoint]['size'] : $wdt_sle_parallax_x_depth,
						'parallaxDepthY' : ($scrollItem['wdt_sle_parallax_y_depth_' + $breakpoint] && '' != $scrollItem['wdt_sle_parallax_y_depth_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_parallax_y_depth_' + $breakpoint]['size'] : $wdt_sle_parallax_y_depth,
						'rotateAngleX' : ($scrollItem['wdt_sle_rotate_x_angle_' + $breakpoint] && '' != $scrollItem['wdt_sle_rotate_x_angle_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_rotate_x_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_x_angle,
						'rotateAngleY' : ($scrollItem['wdt_sle_rotate_y_angle_' + $breakpoint] && '' != $scrollItem['wdt_sle_rotate_y_angle_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_rotate_y_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_y_angle,
						'rotateAngleZ' : ($scrollItem['wdt_sle_rotate_z_angle_' + $breakpoint] && '' != $scrollItem['wdt_sle_rotate_z_angle_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_rotate_z_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_z_angle,
						'scaleValue' : ($scrollItem['wdt_sle_scale_value_' + $breakpoint] && '' != $scrollItem['wdt_sle_scale_value_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_scale_value_' + $breakpoint]['size'] : $wdt_sle_scale_value,
						'blurValue' : ($scrollItem['wdt_sle_blur_value_' + $breakpoint] && '' != $scrollItem['wdt_sle_blur_value_' + $breakpoint]['size']) ? $scrollItem['wdt_sle_blur_value_' + $breakpoint]['size'] : $wdt_sle_blur_value,
						'opacityValue' : ($scrollItem['wdt_sle_opacity_value' + $breakpoint] && '' != $scrollItem['wdt_sle_opacity_value' + $breakpoint]['size']) ? $scrollItem['wdt_sle_opacity_value' + $breakpoint]['size'] : $wdt_sle_opacity_value,
					};
                }

            });

			return $scrollBreakpointItem;

        };

		$self.animationEffectScroll = function() {

			// Responsivewise Options
				let $scrollBreakpointwiseItem = $self.getScrollResponsiveSettings($scrollItemSettings);

			// Get settings
				if(!$scrollBreakpointwiseItem[$deviceMode]) {
					return false;
				}

				const $parallaxDirectionX = $scrollItemSettings['wdt_sle_parallax_x_direction'] ? Boolean($scrollItemSettings['wdt_sle_parallax_x_direction']) : false;
				const $parallaxDepthX = $scrollBreakpointwiseItem[$deviceMode].parallaxDepthX;
				const $parallaxDirectionY = $scrollItemSettings['wdt_sle_parallax_y_direction'] ? Boolean($scrollItemSettings['wdt_sle_parallax_y_direction']) : false;
				const $parallaxDepthY = $scrollBreakpointwiseItem[$deviceMode].parallaxDepthY;

				const $rotateX = $scrollItemSettings['wdt_sle_rotate_x'] ? Boolean($scrollItemSettings['wdt_sle_rotate_x']) : false;
				const $rotateAngleX = $scrollBreakpointwiseItem[$deviceMode].rotateAngleX;
				const $rotateY = $scrollItemSettings['wdt_sle_rotate_y'] ? Boolean($scrollItemSettings['wdt_sle_rotate_y']) : false;
				const $rotateAngleY = $scrollBreakpointwiseItem[$deviceMode].rotateAngleY;
				const $rotateZ = $scrollItemSettings['wdt_sle_rotate_z'] ? Boolean($scrollItemSettings['wdt_sle_rotate_z']) : false;
				const $rotateAngleZ = $scrollBreakpointwiseItem[$deviceMode].rotateAngleZ;

				const $scale = $scrollItemSettings['wdt_sle_scale'] ? Boolean($scrollItemSettings['wdt_sle_scale']) : false;
				const $scaleValue = $scrollBreakpointwiseItem[$deviceMode].scaleValue;

				const $blur = $scrollItemSettings['wdt_sle_blur'] ? Boolean($scrollItemSettings['wdt_sle_blur']) : false;
				const $blurValue = $scrollBreakpointwiseItem[$deviceMode].blurValue;

				const $opacity = $scrollItemSettings['wdt_sle_opacity'] ? Boolean($scrollItemSettings['wdt_sle_opacity']) : false;
				const $opacityValue = $scrollBreakpointwiseItem[$deviceMode].opacityValue;

                const $itemTop = +$scope.find('.wdt-effect-scroll-wrapper').offset().top;
                const $itemHeight = +$scope.find('.wdt-effect-scroll-wrapper .wdt-section-bgeffects-image').height();
                const $toScroll = ($itemTop + $itemHeight);
                const $windowHeight = $window.height();
                const $fromScroll = ($itemTop - $windowHeight);

				if($parallaxDirectionX) {
					$scope.find('.wdt-effect-scroll-wrapper .wdt-section-bgeffects-image').css({
						'left': '-'+$parallaxDepthX+'px'
					})
				} else if($parallaxDirectionY) {
					$scope.find('.wdt-effect-scroll-wrapper .wdt-section-bgeffects-image').css({
						'top': '-'+$parallaxDepthY+'px'
					})
				}

			// Build options json
                let $options = {'distance': 10, 'smoothness': 30, 'from-scroll': $fromScroll, 'to-scroll': $toScroll};
				if($parallaxDirectionX) {
					$options['x'] = $parallaxDepthX;
				}
				if($parallaxDirectionY) {
					$options['y'] = $parallaxDepthY;
				}
				if($rotateX) {
					$options['rotateX'] = $rotateAngleX;
				}
				if($rotateY) {
					$options['rotateY'] = $rotateAngleY;
				}
				if($rotateZ) {
					$options['rotateZ'] = $rotateAngleZ;
				}
				if($scale) {
					$options['scale'] = $scaleValue;
				}
				if($blur) {
					$options['blur'] = $blurValue;
				}
				if($opacity) {
					$options['opacity'] = $opacityValue;
				}

			// Init parallax
				$scope.find('.wdt-effect-scroll-wrapper').attr('data-parallax', JSON.stringify($options));

		};

	};

    $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/section', wdtSectionsOptionsHandler );
    });

})(jQuery);