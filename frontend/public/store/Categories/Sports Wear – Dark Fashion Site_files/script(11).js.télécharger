(function ($) {

    const wdtWidgetsOptionsHandler = function($scope) {
		const animationEffectInstance = new wdtWidgetsAnimationEffectHandlerInit($scope);
        animationEffectInstance.init();
        const inviewInstance = new wdtWidgetsInViewHandlerInit($scope);
        inviewInstance.init();
    };

    const wdtWidgetsAnimationEffectHandlerInit = function($scope) {

        const $self   = this,
            $window   = $(window),
            $widgetId = $scope.data('id'),
            $editMode = Boolean(elementorFrontend.isEditMode()),
			$activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
			$deviceMode = elementorFrontend.getCurrentDeviceMode();

		let $parallaxInstance;
		let $activeBreakpointkeys = [];
		let $animationEffectSettings = false;
		let $animationEffectBreakpointSettings = [];

		let $autoMoveElement;

		$self.init = function() {
			$self.animationEffectInit();
		};

		$self.animationEffectInit = function() {

			if($editMode) {
				$animationEffectSettings = $self.generateEditorSettings($widgetId);
			} else {
				$animationEffectSettings = $scope.data('settings') || false;
				$animationEffectSettings = (false !== $animationEffectSettings) ? $animationEffectSettings : false;
			}

			if(!$animationEffectSettings || $animationEffectSettings['wdt_animation_effect'] === 'none') {
				return false;
			}

			// Updatebreakpoints
				$self.updateActiveBreakpoints();

			// Mouse Move Effect
				if($animationEffectSettings['wdt_animation_effect'] === 'mouse-move') {
					$self.animationEffectMouseMove();
				}

			// Scroll Effect
				if($animationEffectSettings['wdt_animation_effect'] === 'scroll') {
					$self.animationEffectScroll();
				}

			// Auto Moving Effect
				if($animationEffectSettings['wdt_animation_effect'] === 'auto-movement') {
					$self.animationEffectAutoMovement();
				}

			// Marquee Effect
				if($animationEffectSettings['wdt_animation_effect'] === 'marquee') {
					$self.animationEffectMarquee();
				}

		};

		$self.generateEditorSettings = function($widgetId) {

            let $editorModels = null;
            let $editorSettings   = {};

            if(!window.elementor.hasOwnProperty('elements')) {
				return false;
			}

            $editorModels = window.elementor.elements.models;
            if(!$editorModels) {
				return false;
			}

			$.each( $editorModels, function( index, obj ) {
				$.each( obj.attributes.elements.models, function( index, obj ) {
					$.each( obj.attributes.elements.models, function( index, obj ) {
						if($widgetId === obj.id) {
							$editorSettings = obj.attributes.settings.attributes;
						}
					});
				});
            });

			let $wdtEditorKeys = Object.keys($editorSettings).filter((key) => key.includes('wdt'));
			let $wdtEditorSettings = $wdtEditorKeys.reduce((cur, key) => { return Object.assign(cur, { [key]: $editorSettings[key] })}, {});

			let $customDirections = [];
			if($wdtEditorSettings['wdt_ame_custom_directions']) {
				$.each( $wdtEditorSettings['wdt_ame_custom_directions'].models, function( index, obj ) {
					let $customDirection = obj.attributes;
					$customDirections.push($customDirection);
				});
			}
			$wdtEditorSettings['wdt_ame_custom_directions'] = $customDirections;

			return $wdtEditorSettings;

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

		$self.getMouseMoveResponsiveSettings = function() {

            $activeBreakpointkeys.forEach( function( $breakpoint ) {

                if('desktop' === $breakpoint) {
                    $animationEffectBreakpointSettings[$breakpoint] = {
						'speed' : ($animationEffectSettings['wdt_mme_speed']['size'] && '' != $animationEffectSettings['wdt_mme_speed']['size']) ? $animationEffectSettings['wdt_mme_speed']['size'] : 0.1,
						'depth' : ($animationEffectSettings['wdt_mme_depth']['size'] && '' != $animationEffectSettings['wdt_mme_depth']['size']) ? $animationEffectSettings['wdt_mme_depth']['size'] : 1
					};
                } else {
                    $animationEffectBreakpointSettings[$breakpoint] = {
						'speed' : ($animationEffectSettings['wdt_mme_speed_' + $breakpoint]['size'] && '' != $animationEffectSettings['wdt_mme_speed_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_mme_speed_' + $breakpoint]['size'] : $animationEffectSettings['wdt_mme_speed']['size'],
						'depth' : ($animationEffectSettings['wdt_mme_depth_' + $breakpoint]['size'] && '' != $animationEffectSettings['wdt_mme_depth_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_mme_depth_' + $breakpoint]['size'] : $animationEffectSettings['wdt_mme_depth']['size']
					};
                }

            });

        };

		$self.animationEffectMouseMove = function() {

			// Responsivewise Options
				$self.getMouseMoveResponsiveSettings();

			// Get settings
				if(!$animationEffectBreakpointSettings[$deviceMode]) {
					return false;
				}

				const $speed = $animationEffectBreakpointSettings[$deviceMode].speed;
				const $depth = $animationEffectBreakpointSettings[$deviceMode].depth;
				const $moveAlong = $animationEffectSettings['wdt_mme_move_along'] ? $animationEffectSettings['wdt_mme_move_along'] : 'both';
				const $invertMovement = $animationEffectSettings['wdt_mme_invert_movement'] ? Boolean($animationEffectSettings['wdt_mme_invert_movement']) : false;

			// Wrap with div to apply mouse move effect

				let $options = {};

				$scope.find('.elementor-widget-container').wrapInner('<div class="wdt-effect-mouse-move-wrapper layer" />')
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

		$self.getScrollResponsiveSettings = function() {

			let $wdt_sle_parallax_x_depth = ($animationEffectSettings['wdt_sle_parallax_x_depth'] && '' != $animationEffectSettings['wdt_sle_parallax_x_depth']['size']) ? $animationEffectSettings['wdt_sle_parallax_x_depth']['size'] : 50;
			let $wdt_sle_parallax_y_depth = ($animationEffectSettings['wdt_sle_parallax_y_depth'] && '' != $animationEffectSettings['wdt_sle_parallax_y_depth']['size']) ? $animationEffectSettings['wdt_sle_parallax_y_depth']['size'] : 50;
			let $wdt_sle_rotate_x_angle = ($animationEffectSettings['wdt_sle_rotate_x_angle'] && '' != $animationEffectSettings['wdt_sle_rotate_x_angle']['size']) ? $animationEffectSettings['wdt_sle_rotate_x_angle']['size'] : 45;
			let $wdt_sle_rotate_y_angle = ($animationEffectSettings['wdt_sle_rotate_y_angle'] && '' != $animationEffectSettings['wdt_sle_rotate_y_angle']['size']) ? $animationEffectSettings['wdt_sle_rotate_y_angle']['size'] : 45;
			let $wdt_sle_rotate_z_angle = ($animationEffectSettings['wdt_sle_rotate_z_angle'] && '' != $animationEffectSettings['wdt_sle_rotate_z_angle']['size']) ? $animationEffectSettings['wdt_sle_rotate_z_angle']['size'] : 45;
			let $wdt_sle_scale_value = ($animationEffectSettings['wdt_sle_scale_value'] && '' != $animationEffectSettings['wdt_sle_scale_value']['size']) ? $animationEffectSettings['wdt_sle_scale_value']['size'] : 1;
			let $wdt_sle_blur_value = ($animationEffectSettings['wdt_sle_blur_value'] && '' != $animationEffectSettings['wdt_sle_blur_value']['size']) ? $animationEffectSettings['wdt_sle_blur_value']['size'] : 0;
			let $wdt_sle_opacity_value = ($animationEffectSettings['wdt_sle_opacity_value'] && '' != $animationEffectSettings['wdt_sle_opacity_value']['size']) ? $animationEffectSettings['wdt_sle_opacity_value']['size'] : 1;

            $activeBreakpointkeys.forEach( function( $breakpoint ) {

                if('desktop' === $breakpoint) {
                    $animationEffectBreakpointSettings[$breakpoint] = {
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
                    $animationEffectBreakpointSettings[$breakpoint] = {
						'parallaxDepthX' : ($animationEffectSettings['wdt_sle_parallax_x_depth_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_parallax_x_depth_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_parallax_x_depth_' + $breakpoint]['size'] : $wdt_sle_parallax_x_depth,
						'parallaxDepthY' : ($animationEffectSettings['wdt_sle_parallax_y_depth_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_parallax_y_depth_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_parallax_y_depth_' + $breakpoint]['size'] : $wdt_sle_parallax_y_depth,
						'rotateAngleX' : ($animationEffectSettings['wdt_sle_rotate_x_angle_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_rotate_x_angle_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_rotate_x_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_x_angle,
						'rotateAngleY' : ($animationEffectSettings['wdt_sle_rotate_y_angle_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_rotate_y_angle_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_rotate_y_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_y_angle,
						'rotateAngleZ' : ($animationEffectSettings['wdt_sle_rotate_z_angle_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_rotate_z_angle_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_rotate_z_angle_' + $breakpoint]['size'] : $wdt_sle_rotate_z_angle,
						'scaleValue' : ($animationEffectSettings['wdt_sle_scale_value_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_scale_value_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_scale_value_' + $breakpoint]['size'] : $wdt_sle_scale_value,
						'blurValue' : ($animationEffectSettings['wdt_sle_blur_value_' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_blur_value_' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_blur_value_' + $breakpoint]['size'] : $wdt_sle_blur_value,
						'opacityValue' : ($animationEffectSettings['wdt_sle_opacity_value' + $breakpoint] && '' != $animationEffectSettings['wdt_sle_opacity_value' + $breakpoint]['size']) ? $animationEffectSettings['wdt_sle_opacity_value' + $breakpoint]['size'] : $wdt_sle_opacity_value,
					};
                }

            });

        };

		$self.animationEffectScroll = function() {

			// Responsivewise Options
				$self.getScrollResponsiveSettings();

			// Get settings
				if(!$animationEffectBreakpointSettings[$deviceMode]) {
					return false;
				}

				// Wrap with div with apply scroll effect div
				$scope.find('.elementor-widget-container').wrapInner('<div class="wdt-effect-scroll-wrapper" />')

				const $parallaxDirectionX = $animationEffectSettings['wdt_sle_parallax_x_direction'] ? Boolean($animationEffectSettings['wdt_sle_parallax_x_direction']) : false;
				const $parallaxDepthX = $animationEffectBreakpointSettings[$deviceMode].parallaxDepthX;
				const $parallaxDirectionY = $animationEffectSettings['wdt_sle_parallax_y_direction'] ? Boolean($animationEffectSettings['wdt_sle_parallax_y_direction']) : false;
				const $parallaxDepthY = $animationEffectBreakpointSettings[$deviceMode].parallaxDepthY;

				const $rotateX = $animationEffectSettings['wdt_sle_rotate_x'] ? Boolean($animationEffectSettings['wdt_sle_rotate_x']) : false;
				const $rotateAngleX = $animationEffectBreakpointSettings[$deviceMode].rotateAngleX;
				const $rotateY = $animationEffectSettings['wdt_sle_rotate_y'] ? Boolean($animationEffectSettings['wdt_sle_rotate_y']) : false;
				const $rotateAngleY = $animationEffectBreakpointSettings[$deviceMode].rotateAngleY;
				const $rotateZ = $animationEffectSettings['wdt_sle_rotate_z'] ? Boolean($animationEffectSettings['wdt_sle_rotate_z']) : false;
				const $rotateAngleZ = $animationEffectBreakpointSettings[$deviceMode].rotateAngleZ;

				const $scale = $animationEffectSettings['wdt_sle_scale'] ? Boolean($animationEffectSettings['wdt_sle_scale']) : false;
				const $scaleValue = $animationEffectBreakpointSettings[$deviceMode].scaleValue;

				const $blur = $animationEffectSettings['wdt_sle_blur'] ? Boolean($animationEffectSettings['wdt_sle_blur']) : false;
				const $blurValue = $animationEffectBreakpointSettings[$deviceMode].blurValue;

				const $opacity = $animationEffectSettings['wdt_sle_opacity'] ? Boolean($animationEffectSettings['wdt_sle_opacity']) : false;
				const $opacityValue = $animationEffectBreakpointSettings[$deviceMode].opacityValue;

                const $itemTop = +$scope.find('.wdt-effect-scroll-wrapper').offset().top;
                const $itemHeight = +$scope.find('.wdt-effect-scroll-wrapper').height();
                const $toScroll = ($itemTop + $itemHeight);
                const $windowHeight = $window.height();
                const $fromScroll = ($itemTop - $windowHeight);

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

		$self.autoMovementOnIntersect= function(entries, $observer) {

			entries.forEach((entry) => {
				if(entry.isIntersecting) {
					$autoMoveElement.play();
				} else {
					$autoMoveElement.pause();
				}
			});

		}

		$self.generateResponsiveRandomPoints = function($direction) {

			let $reponsiveRandoms = {};

			let $wdt_x_depth = ($direction['wdt_x_depth'] && '' != $direction['wdt_x_depth']['size']) ? $direction['wdt_x_depth']['size'] : 0;
			let $wdt_y_depth = ($direction['wdt_y_depth'] && '' != $direction['wdt_y_depth']['size']) ? $direction['wdt_y_depth']['size'] : 0;
			let $wdt_rotate_angle = ($direction['wdt_rotate_angle'] && '' != $direction['wdt_rotate_angle']['size']) ? $direction['wdt_rotate_angle']['size'] : 0;
			let $wdt_scale_value = ($direction['wdt_scale_value'] && '' != $direction['wdt_scale_value']['size']) ? $direction['wdt_scale_value']['size'] : 1;
			let $wdt_blur_value = ($direction['wdt_blur_value'] && '' != $direction['wdt_blur_value']['size']) ? $direction['wdt_blur_value']['size'] : 0;
			let $wdt_opacity_value = ($direction['wdt_opacity_value'] && '' != $direction['wdt_opacity_value']['size']) ? $direction['wdt_opacity_value']['size'] : 1;

            $activeBreakpointkeys.forEach( function( $breakpoint ) {

                if('desktop' === $breakpoint) {
                    $reponsiveRandoms[$breakpoint] = {
						'depthX'      : $wdt_x_depth,
						'depthY'      : $wdt_y_depth,
						'rotateAngle' : $wdt_rotate_angle,
						'scaleValue'  : $wdt_scale_value,
						'blurValue'   : $wdt_blur_value,
						'opacityValue': $wdt_opacity_value
					};
                } else {
                    $reponsiveRandoms[$breakpoint] = {
						'depthX' : ($direction['wdt_x_depth_' + $breakpoint] && '' != $direction['wdt_x_depth_' + $breakpoint]['size']) ? $direction['wdt_x_depth_' + $breakpoint]['size'] : $wdt_x_depth,
						'depthY' : ($direction['wdt_y_depth_' + $breakpoint] && '' != $direction['wdt_y_depth_' + $breakpoint]['size']) ? $direction['wdt_y_depth_' + $breakpoint]['size'] : $wdt_y_depth,
						'rotateAngle' : ($direction['wdt_rotate_angle_' + $breakpoint] && '' != $direction['wdt_rotate_angle_' + $breakpoint]['size']) ? $direction['wdt_rotate_angle_' + $breakpoint]['size'] : $wdt_rotate_angle,
						'scaleValue' : ($direction['wdt_scale_value_' + $breakpoint] && '' != $direction['wdt_scale_value_' + $breakpoint]['size']) ? $direction['wdt_scale_value_' + $breakpoint]['size'] : $wdt_scale_value,
						'blurValue' : ($direction['wdt_blur_value_' + $breakpoint] && '' != $direction['wdt_blur_value_' + $breakpoint]['size']) ? $direction['wdt_blur_value_' + $breakpoint]['size'] : $wdt_blur_value,
						'opacityValue' : ($direction['wdt_opacity_value' + $breakpoint] && '' != $direction['wdt_opacity_value' + $breakpoint]['size']) ? $direction['wdt_opacity_value' + $breakpoint]['size'] : $wdt_opacity_value,
					};
                }

            });

			return $reponsiveRandoms;

        };

		$self.generateRandomPoints = function($ameCustomDirections) {

			let $points = [];

			$ameCustomDirections.forEach(($direction) => {

				let $unitPoint = {};

				const $responsiveDirections = $self.generateResponsiveRandomPoints($direction);

				// Transform
					$unitPoint = {
						transform: ''
					};

					const $xDirection = $direction['wdt_x_direction'] ? Boolean($direction['wdt_x_direction']) : false;
					const $depthX = $responsiveDirections[$deviceMode].depthX;
					const $yDirection = $direction['wdt_y_direction'] ? Boolean($direction['wdt_y_direction']) : false;
					const $depthY = $responsiveDirections[$deviceMode].depthY;
					const $rotate = $direction['wdt_rotate'] ? Boolean($direction['wdt_rotate']) : false;
					const $rotateAngle = $responsiveDirections[$deviceMode].rotateAngle;
					const $scale = $direction['wdt_scale'] ? Boolean($direction['wdt_scale']) : false;
					const $scaleValue = $responsiveDirections[$deviceMode].scaleValue;

					if($xDirection) {
						$unitPoint['transform'] += 'translateX('+$depthX+'px) ';
					}
					if($yDirection) {
						$unitPoint['transform'] += 'translateY('+$depthY+'px) ';
					}
					if($rotate) {
						$unitPoint['transform'] += 'rotate('+$rotateAngle+'deg) ';
					}
					if($scale) {
						$unitPoint['transform'] += 'scale('+$scaleValue+') ';
					}

					$unitPoint['transform'] = $.trim($unitPoint['transform'])
					$unitPoint['opacity'] = 0.2;

				// Blur
					const $blur = $direction['wdt_blur'] ? Boolean($direction['wdt_blur']) : false;
					const $blurValue = $responsiveDirections[$deviceMode].blurValue;

					if($blur) {
						$unitPoint['filter'] = 'blur('+$blurValue+'px)';
					}

				// Opacity
					const $opacity = $direction['wdt_opacity'] ? Boolean($direction['wdt_opacity']) : false;
					const $opacityValue = $responsiveDirections[$deviceMode].opacityValue;

					if($opacity) {
						$unitPoint['opacity'] = +$opacityValue;
					}


				if($unitPoint) {
					$points.push($unitPoint);
				}

			});

			return $points;

		}

		$self.animationEffectAutoMovement = function() {

			// Wrap with auto movement div
				$scope.find('.elementor-widget-container').wrapInner('<div class="wdt-effect-auto-movement-wrapper" />')

			// Animation
				let $autoMoveElementItem = $scope.find('.wdt-effect-auto-movement-wrapper')[0];
				let $ameDirection = $animationEffectSettings['wdt_ame_direction'];
				let $ameDuration = $animationEffectSettings['wdt_ame_duration']['size'] ? Math.ceil($animationEffectSettings['wdt_ame_duration']['size']*1500) : 10000;
				let $ameIteration = ($animationEffectSettings['wdt_ame_iteration'] === 'infinity') ? Infinity : 1;
				let $boundTo = $animationEffectSettings['wdt_bound_to'] ? $animationEffectSettings['wdt_bound_to'] : 'section';
				let $boundToElement = ($boundTo === 'section') ? $scope.parents('.elementor-section') : $scope.parents('.elementor-column');

				let $itemWidth = +$scope.find('.wdt-effect-auto-movement-wrapper').width();
				let $sectionWidth = +$boundToElement.width();
				let $sectionItemWidth = +$sectionWidth + +$itemWidth;

				let $itemHeight = +$scope.find('.wdt-effect-auto-movement-wrapper').height();
				let $sectionHeight = +$boundToElement.height();
				let $sectionItemHeight = +$sectionHeight + +$itemHeight;

				if($ameDirection === 'left-to-right') {
					$autoMoveElement = $autoMoveElementItem.animate([
							{ transform: 'translateX(-'+$itemWidth+'px)' },
							{ transform: 'translateX('+$sectionWidth+'px)' }
						], {
						duration: $ameDuration,
						iterations: $ameIteration
					});
					$autoMoveElement.pause();
				} else if($ameDirection === 'right-to-left') {
					$autoMoveElement = $autoMoveElementItem.animate([
							{ transform: 'translateX('+$sectionItemWidth+'px)' },
							{ transform: 'translateX(-'+$itemWidth+'px)' }
						], {
						duration: $ameDuration,
						iterations: $ameIteration
					});
					$autoMoveElement.pause();
				} else if($ameDirection === 'top-to-bottom') {
					$autoMoveElement = $autoMoveElementItem.animate([
							{ transform: 'translateY(-'+$itemHeight+'px)' },
							{ transform: 'translateY('+$sectionHeight+'px)' }
						], {
						duration: $ameDuration,
						iterations: $ameIteration
					});
					$autoMoveElement.pause();
				} else if($ameDirection === 'bottom-to-top') {
					$autoMoveElement = $autoMoveElementItem.animate([
							{ transform: 'translateY('+$sectionItemHeight+'px)' },
							{ transform: 'translateY(-'+$itemHeight+'px)' }
						], {
						duration: $ameDuration,
						iterations: $ameIteration
					});
					$autoMoveElement.pause();
				} else if($ameDirection === 'custom') {

					let $ameCustomDirections = $animationEffectSettings['wdt_ame_custom_directions'];
					if($ameCustomDirections.length) {
						let $ameCustomDirectionPoints = $self.generateRandomPoints($ameCustomDirections);
						$autoMoveElement = $autoMoveElementItem.animate($ameCustomDirectionPoints, {
							duration: $ameDuration,
							iterations: $ameIteration
						});
						$autoMoveElement.pause();
					}

				}

			// If the widget is in view port init animation
                if('IntersectionObserver' in window) {
                    let $observer;
                    let $observerOptions = {
                        root: null,
                        rootMargin: "0px",
                        threshold: 0.1
                    };

                    $observer = new IntersectionObserver($self.autoMovementOnIntersect, $observerOptions);
                    $observer.observe($scope[0]);
                } else {
                    $autoMoveElement.play();
                }

		};

        $self.animationEffectMarquee = function() {

            // Wrap with auto movement div
                $scope.find('.elementor-widget-container').wrapInner('<div class="wdt-effect-marquee-wrapper" />')

            // Animation
                let $marqueeElementItem = $scope.find('.wdt-effect-marquee-wrapper');
                let $width = $animationEffectSettings['wdt_mqe_width']['size'] ? $animationEffectSettings['wdt_mqe_width']['size'] : 200;
                let $height = $animationEffectSettings['wdt_mqe_height']['size'] ? $animationEffectSettings['wdt_mqe_height']['size'] : 120;
                let $speed = $animationEffectSettings['wdt_mqe_speed']['size'] ? $animationEffectSettings['wdt_mqe_speed']['size'] : 1;
                let $direction = $animationEffectSettings['wdt_mqe_direction'] ? $animationEffectSettings['wdt_mqe_direction'] : 'left-to-right';
                let $boundTo = $animationEffectSettings['wdt_mqe_bound_to'] ? $animationEffectSettings['wdt_mqe_bound_to'] : 'section';
                let $boundToElement = ($boundTo === 'section') ? $scope.parents('.elementor-section') : $scope.parents('.elementor-column');

                $marqueeElementItem.css({
                    'position': 'absolute',
                    'width': $width,
                    'height': $height
                });

                const $itemWidth = $marqueeElementItem.width();
                const $itemOffset = $marqueeElementItem.offset();
                const $itemOffsetLeft = $itemOffset.left;

                const $parentWidth = $boundToElement.width();
                const $parentOffset = $boundToElement.offset();
                const $parentOffsetLeft = $parentOffset.left;

                if($direction == 'right-to-left') {

                    let $itemInitPosition = 0;
                    const $leftDiff = parseFloat($itemOffsetLeft) - parseFloat($parentOffsetLeft);
                    const $rightPositionX = parseFloat($parentWidth) - parseFloat($leftDiff);
                    let $leftOffset = parseFloat($leftDiff) + parseFloat($itemWidth);
                    $leftOffset = '-' + parseFloat($leftOffset);

                    function animationLoop() {

                        $itemInitPosition = $itemInitPosition - $speed;
                        $marqueeElementItem.css({
                            'left': $itemInitPosition + 'px'
                        });
                        $frameRtlID = window.requestAnimationFrame(animationLoop);

                        if ($itemInitPosition <= $leftOffset) {
                            window.cancelAnimationFrame($frameRtlID);
                            $itemInitPosition = $rightPositionX;
                            $frameRtlID = window.requestAnimationFrame(animationLoop);
                        }

                    }

                    let $frameRtlID = window.requestAnimationFrame(animationLoop);

                } else {

                    let $itemInitPosition = 0;
                    const $leftDiff = parseFloat($itemOffsetLeft) - parseFloat($parentOffsetLeft);
                    const $maxPositionWidth = parseFloat($leftDiff) + parseFloat($itemWidth);
                    const $maxPositionX = parseFloat($parentWidth) - parseFloat($maxPositionWidth) + parseFloat($itemWidth);
                    const $loopPositionX = parseFloat($leftDiff) + parseFloat($itemWidth);

                    function animationLoop() {

                        $itemInitPosition = $itemInitPosition + $speed;
                        $marqueeElementItem.css({
                            'left': $itemInitPosition + 'px'
                        });
                        $frameLtrID = window.requestAnimationFrame(animationLoop);

                        if ($itemInitPosition >= $maxPositionX) {
                            window.cancelAnimationFrame($frameLtrID);
                            $itemInitPosition = -$loopPositionX;
                            $frameLtrID = window.requestAnimationFrame(animationLoop);
                        }

                    }

                    let $frameLtrID = window.requestAnimationFrame(animationLoop);

                }

        };

	};

    const wdtWidgetsInViewHandlerInit = function($scope) {

        const $self   = this,
            $window   = $(window),
            $widgetId = $scope.data('id'),
            $editMode = Boolean(elementorFrontend.isEditMode());

		let $inViewSettings = false;
		let $inViewLoop = false;
		let $inViewElement = $scope[0];

		$self.init = function() {
			$self.inViewStatusUpdateInit();
		};

		$self.inViewStatusUpdateInit = function() {

			if($editMode) {
				$inViewSettings = $self.generateEditorSettings($widgetId);
			} else {
				$inViewSettings = $scope.data('settings') || false;
				$inViewSettings = (false !== $inViewSettings) ? $inViewSettings : false;
			}

			if(!$inViewSettings || !$inViewSettings['wdt_enable_inview_status']) {
				return false;
			}

			$inViewLoop = $inViewSettings['wdt_enable_inview_loop'];

			if('IntersectionObserver' in window) {
				$self.createObserver();
			}

		};

		$self.generateEditorSettings = function($widgetId) {

            let $editorModels = null;
            let $editorSettings   = {};

            if(!window.elementor.hasOwnProperty('elements')) {
				return false;
			}

            $editorModels = window.elementor.elements.models;
            if(!$editorModels) {
				return false;
			}

			$.each( $editorModels, function( index, obj ) {
				$.each( obj.attributes.elements.models, function( index, obj ) {
					$.each( obj.attributes.elements.models, function( index, obj ) {
						if($widgetId === obj.id) {
							$editorSettings = obj.attributes.settings.attributes;
						}
					});

				});
            });

			let $wdtEditorKeys = Object.keys($editorSettings).filter((key) => key.includes('wdt'));
			let $wdtEditorSettings = $wdtEditorKeys.reduce((cur, key) => { return Object.assign(cur, { [key]: $editorSettings[key] })}, {});

			return $wdtEditorSettings;

        };

		$self.createObserver = function() {
			let $observer;

			let $options = {
			  root: null,
			  rootMargin: "0px",
			  threshold: 1
			};

			$observer = new IntersectionObserver($self.handleIntersect, $options);
			$observer.observe($inViewElement);
		}

		$self.handleIntersect= function(entries, $observer) {
			entries.forEach((entry) => {
				if(entry.isIntersecting) {
					entry.target.classList.add('wdt-item-is-inview');
				} else {
					if($inViewLoop) {
						entry.target.classList.remove('wdt-item-is-inview');
					}
				}
			});
		}

	};

    $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', wdtWidgetsOptionsHandler );
    });

})(jQuery);