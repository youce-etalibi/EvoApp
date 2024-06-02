(function ($) {

    const wdtAnimationWidgetHandler = function($scope, $) {

          let $settings =  $scope.find('.wdt-animation-holder').data('settings');

          let $direction = $settings['direction'] ? $settings['direction'] : 'left-to-right';
          let $speed = $settings['speed']['size'] ? $settings['speed']['size'] : 1;
          let $itemDiffPadding = $settings['padding']['size'] ? $settings['padding']['size'] : 10;
          let $boundTo = $settings['bound_to'] ? $settings['bound_to'] : 'section';
          let $boundToElement = ($boundTo === 'section') ? $scope.parents('.elementor-section') : $scope.parents('.elementor-column');
          let $parentWidth = $boundToElement.width();
          let $itemsTotal = $scope.find('.wdt-animation-item').length;
          let $itemMaxWidth = 0;
          let $itemMaxHeight = 0;

          // Initialize each item with position and height
          $scope.find('.wdt-animation-item').each(function () {

              let $marqueeItem = $(this);
              let $itemWidth;
              let $itemHeight;
              if($marqueeItem.hasClass('image-item')) {
                  $itemWidth = +$marqueeItem.find('img').attr('width');
                  $itemHeight = +$marqueeItem.find('img').attr('height');
              } else {
                  $itemWidth = +$marqueeItem.width();
                  $itemHeight = +$marqueeItem.height();
              }

              $marqueeItem.css({
                  'position': 'absolute',
                  'height': $itemHeight
              });

              if($itemWidth > $itemMaxWidth){
                  $itemMaxWidth = $itemWidth;
              }

              if($itemHeight > $itemMaxHeight){
                  $itemMaxHeight = $itemHeight;
              }

          });

          // Update parent div with maximum height
          $scope.find('.wdt-animation-holder').css({
              'height': $itemMaxHeight
          });

          // Clone all items and append it to parent div
          let clonedItems =  $scope.find('.wdt-animation-item').clone().addClass('wdt-cloned-item');
          clonedItems.appendTo($scope.find('.wdt-animation-wrapper'));

          // Basic calculations
          let $itemsTotalWidth = ($itemsTotal * $itemMaxWidth);
          let $maxImages = false;
          let $itemPadding;
          if($itemsTotalWidth > $parentWidth) {
              $itemPadding = $itemDiffPadding;
              $maxImages = true;
          } else {
              let $paddingItemCount = (2 * $itemsTotal);
              let $parentExcessWidth = ($parentWidth - $itemsTotalWidth);
              $itemPadding = ($parentExcessWidth / $paddingItemCount);
          }

          // Update all items with caluclated styles
          let $nextItemLeft = 0;
          $scope.find('.wdt-animation-item').each(function () {

              let $marqueeItem = $(this);
              $marqueeItem.css({
                  'width': $itemMaxWidth,
                  'left': $nextItemLeft,
                  'margin-left': $itemPadding,
                  'margin-right': $itemPadding
              });

              $nextItemLeft += $itemMaxWidth;
              $nextItemLeft += (2 * $itemPadding);

          });

          // Animations
          function marqueeAnimation($animMode) {

              let $loopNextItemLeft = 0;
              $scope.find('.wdt-animation-item').each(function () {

                  let $marqueeItem = $(this);
                  let $itemWidth = $marqueeItem.width();
                  if($animMode) {
                      $loopNextItemLeft = +$marqueeItem.attr('position-x');
                  }

                  if($direction == 'right-to-left') {

                      let $itemInitPositionX = $loopNextItemLeft;
                      let $maxPositionX =  -(($itemMaxWidth + (2 * $itemPadding)));
                      let $loopInitPositionX = (((2 * $itemsTotal) - 1) * ($itemMaxWidth + (2 * $itemPadding)));

                      function animationLoop() {

                          $itemInitPositionX = $itemInitPositionX - $speed;
                          $marqueeItem.css({
                              'left': $itemInitPositionX + 'px'
                          });
                          $frameRtlID = window.requestAnimationFrame(animationLoop);

                          // If maximum position reached, reinitialize item from right starting point
                          if ($itemInitPositionX <= $maxPositionX) {
                              window.cancelAnimationFrame($frameRtlID);
                              $itemInitPositionX = $loopInitPositionX;
                              $marqueeItem.css({
                                  'left': $itemInitPositionX + 'px'
                              });
                              $frameRtlID = window.requestAnimationFrame(animationLoop);
                          }

                          $marqueeItem.attr('animation-id', $frameRtlID);
                          $marqueeItem.attr('position-x', $itemInitPositionX);

                      }

                      let $frameRtlID = window.requestAnimationFrame(animationLoop);
                      $marqueeItem.attr('animation-id', $frameRtlID);

                  } else {

                      let $itemInitPositionX = $loopNextItemLeft;
                      let $loopInitPositionX = ($itemMaxWidth) + (2*$itemPadding);
                      let $maxPositionX;

                      if($maxImages) {
                          $maxPositionX = ((2 * $itemsTotal) - 1) * ($itemMaxWidth + (2 * $itemPadding));
                      } else {
                          $maxPositionX = ($parentWidth * 2) - ($itemMaxWidth + (2*$itemPadding));
                      }

                      function animationLoop() {

                          $itemInitPositionX = $itemInitPositionX + $speed;
                          $marqueeItem.css({
                              'left': $itemInitPositionX + 'px'
                          });
                          $frameLtrID = window.requestAnimationFrame(animationLoop);

                          // If maximum position reached, reinitialize item from left starting point
                          if($itemInitPositionX >= $maxPositionX) {
                              window.cancelAnimationFrame($frameLtrID);
                              $itemInitPositionX = -$loopInitPositionX;
                              $frameLtrID = window.requestAnimationFrame(animationLoop);
                          }

                          $marqueeItem.attr('animation-id', $frameLtrID);
                          $marqueeItem.attr('position-x', $itemInitPositionX);

                      }

                      let $frameLtrID = window.requestAnimationFrame(animationLoop);
                      $marqueeItem.attr('animation-id', $frameLtrID);

                  }

                  $loopNextItemLeft += $itemWidth;
                  $loopNextItemLeft += (2 * $itemPadding);

              });

          }
          marqueeAnimation(false);


          $scope.find('.wdt-animation-holder')[0].addEventListener("mouseover", onItemMouseOver);
          function onItemMouseOver() {
              $scope.find('.wdt-animation-item').each(function () {

                  let $marqueeItem = $(this);
                  let $animationId = +$marqueeItem.attr('animation-id');
                  window.cancelAnimationFrame($animationId);

              });
          }

          $scope.find('.wdt-animation-holder')[0].addEventListener("mouseout", onItemMouseOut);
          function onItemMouseOut() {
              marqueeAnimation(true);
          }

    };

    $(window).on('elementor/frontend/init', function () {
          elementorFrontend.hooks.addAction('frontend/element_ready/wdt-animation.default', wdtAnimationWidgetHandler);
    });

  })(jQuery);
