(function ($) {

  const wdtImageBoxWidgetHandler = function($scope) {
    const instance = new wdtImageBoxWidgetHandlerInit($scope);
    if($scope.find('.wdt-image-box-holder').data('settings')) {
      const settings = $scope.find('.wdt-image-box-holder').data('settings');
      if(settings['enable_popup']) {
        instance.init();
      }
    }
  };

  const wdtImageBoxWidgetHandlerInit = function($scope) {

    const $self = this;
    $self.init = function() {

      const $image_box_content_repeater = $scope.find('.wdt-content-image-wrapper');
      $image_box_content_repeater.each(function() {
  
        const $this_image_box = $(this);
        const $image_url = $this_image_box.find('img').attr('src');
        $self.onClickInit($this_image_box, $image_url);

      });

    };

    $self.onClickInit = function($this_image_box, $image_url) {

      $this_image_box.magnificPopup({
        items: {
          src: $image_url,
          type: 'image',
        },
        removalDelay: 500,
        showCloseBtn: true,
        enableEscapeKey: true,
        closeOnBgClick: true,
        mainClass: 'wdt-image-box-popup wdt-popup-box-window',
      });

    };

  };

  $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-image-box.default', wdtImageBoxWidgetHandler);
  });

})(jQuery);
