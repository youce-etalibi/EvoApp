(function ($) {

  var wdtMailchimpWidgetHandler = function($scope, $) {

    var $this_item = $scope.find('.wdt-mailchimp-holder');

    $this_item.find('.wdt-mailchimp-subscribe-form').on('submit', function(e) {

      e.preventDefault();

      var $this     = $(this),
        $mc_apikey  = $this_item.find('input[name = "wdt_mc_apikey"]').val(),
        $mc_listid  = $this_item.find('input[name = "wdt_mc_listid"]').val(),
        $mc_fname   = $this_item.find('input[name = "wdt_mc_fname"]').val(),
        $mc_emailid = $this_item.find('input[name="wdt_mc_emailid"]').val();

      $.ajax({
        type: 'post',
        dataType : 'html',
        url: wdtElementorAddonGlobals.ajaxUrl,
        data:	{
          action: 'wedesigntech_mailchimp_subscribe',
          mc_apikey: $mc_apikey,
          mc_listid: $mc_listid,
          mc_fname: $mc_fname,
          mc_emailid: $mc_emailid
        },
        beforeSend: function(){
					$this_item.find('.wdt-mailchimp-subscription-button-holder button').addClass('loading');
				},
        success: function (response) {
          $this_item.find('.wdt-mailchimp-subscription-msg').html(response);
          $this_item.find('.wdt-mailchimp-subscription-msg').slideDown('slow');
        },
        complete: function(){
          $this_item.find('.wdt-mailchimp-subscription-button-holder button').removeClass('loading');
				}
      });

    });

  };

  $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-mailchimp.default', wdtMailchimpWidgetHandler);
  });

})(jQuery);
