(function ($) {

  const wdtPopupBoxWidgetHandler = function($scope) {
      const instance = new wdtPopupBoxWidgetHandlerInit($scope);
      instance.init();
  };

  const wdtPopupBoxWidgetHandlerInit = function($scope) {

    const $self = this;
    const $settings = $scope.find('.wdt-popup-box-trigger-holder').data('settings');
    const $module_ref_id = $settings['module_ref_id'];
    const $popup_class = $settings['popup_class'];
    const $trigger_type = $settings['trigger_type'] ? $settings['trigger_type'] : 'on-click';
    const $on_load_delay = $settings['on_load_delay'] ? +$settings['on_load_delay']['size'] : 200;
    const $on_load_after = $settings['on_load_after'] ? +$settings['on_load_after']['size'] : 1;
    const $external_class = $settings['external_class'] ? $settings['external_class'] : false;
    const $external_id = $settings['external_id'] ? $settings['external_id'] : false;
    const $show_close_Button = $settings['show_close_Button'] ? $settings['show_close_Button'] : false;
    const $esc_to_exit = $settings['esc_to_exit'] ? $settings['esc_to_exit'] : false;
    const $click_to_exit = $settings['click_to_exit'] ? $settings['click_to_exit'] : false;
    const $mfp_src = $settings['mfp_src'] ? $settings['mfp_src'] : false;
    const $mfp_type = $settings['mfp_type'] ? $settings['mfp_type'] : false;
    const $mfp_button_position = ($mfp_type === 'image') ? true : false;

    let $trigger_element = false;

    $self.init = function() {
      if($trigger_type === 'on-load') {
        $self.onLoadInit()
      } else if($trigger_type === 'on-click') {
        $trigger_element = $scope.find('.wdt-popup-box-trigger-item');
        $self.onClickInit();
      } else if($trigger_type === 'external-class') {
        $trigger_element = $($external_class);
        $self.onClickInit();
      } else if( $trigger_type === 'external-id') {
        $trigger_element = $($external_id);
        $self.onClickInit();
      }
    };

    $self.onLoadInit = function() {

      if($on_load_after === 0) {
        $.removeCookie($module_ref_id, { path: "/" });
      }
      if (!$.cookie($module_ref_id)) {
        setTimeout(function () {
          $.magnificPopup.open({
            items: {
              src: $mfp_src,
              type: $mfp_type,
            },
            removalDelay: 500,
            showCloseBtn: $show_close_Button,
            enableEscapeKey: $esc_to_exit,
            closeOnBgClick: $click_to_exit,
            mainClass: $popup_class,
            closeBtnInside: $mfp_button_position
          });


          if ($on_load_after > 0) {
            $.cookie($module_ref_id, $on_load_after, {
              expires: $on_load_after,
              path: "/",
            });
          } else {
            $.removeCookie($module_ref_id);
          }
        }, $on_load_delay);
      }

    };

    $self.onClickInit = function() {
      $trigger_element.magnificPopup({
        items: {
          src: $mfp_src,
          type: $mfp_type,
        },
        removalDelay: 500,
        showCloseBtn: $show_close_Button,
        enableEscapeKey: $esc_to_exit,
        closeOnBgClick: $click_to_exit,
        mainClass: $popup_class,
        closeBtnInside: $mfp_button_position
      });
    };

  };

  $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-popup-box.default', wdtPopupBoxWidgetHandler);
  });

})(jQuery);
