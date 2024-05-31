var map;
var geocoder;
var gmarkers = [];

var dtStoreLocatorMapUtils = {

	dtStoreLocatorMapInitialize : function() {

    	geocoder = new google.maps.Geocoder();

	    var listing_latitude = jQuery('#dtsl_latitude').val();
	    var listing_longitude = jQuery('#dtsl_longitude').val();

		var showMapMarker = true;
	    if(listing_latitude == '' || listing_longitude == '') {
	        listing_latitude = dtslmapobject.defaultLatitude;
			listing_longitude = dtslmapobject.defaultLongitude;
			showMapMarker = false;
	    }

	    var default_zoom_level = dtslmapobject.defaultZoomLevel;
	    var default_map_type = dtslmapobject.defaultMapType;

	    var mapOptions = {
							flat:false,
							noClear:false,
							zoom: parseInt(default_zoom_level, 10),
							scrollwheel: false,
							draggable: true,
							disableDefaultUI:false,
							center: new google.maps.LatLng( listing_latitude, listing_longitude),
							mapTypeId: default_map_type.toLowerCase()
						};


	    if(document.getElementById('dtsl-addlist-map-holder')) {
	        map = new google.maps.Map(document.getElementById('dtsl-addlist-map-holder'), mapOptions);
	    } else {
	        return;
	    }

	    google.maps.visualRefresh = true;

		if(showMapMarker) {
			var point = new google.maps.LatLng(listing_latitude, listing_longitude);
			dtStoreLocatorMapUtils.dtStoreLocatorMapPlaceSavedMarker(point);
		}

	    google.maps.event.addListener(map, 'click', function(event) {
	        dtStoreLocatorMapUtils.dtStoreLocatorMapPlaceMarker(event.latLng);
	    });

	},

	dtStoreLocatorMapPlaceSavedMarker : function(location) {

		dtStoreLocatorMapUtils.dtStoreLocatorMapRemoveMarkers();

		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		gmarkers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
		});

		infowindow.open(map,marker);

	},

	dtStoreLocatorMapPlaceMarker : function(location) {

		dtStoreLocatorMapUtils.dtStoreLocatorMapRemoveMarkers();

		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		gmarkers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
		});

		infowindow.open(map,marker);

		document.getElementById("dtsl_latitude").value=location.lat();
		document.getElementById("dtsl_longitude").value=location.lng();

	},

	dtStoreLocatorMapRemoveMarkers : function() {

	    for (i = 0; i<gmarkers.length; i++){
	        gmarkers[i].setMap(null);
	    }

	},

	dtStoreLocatorMapRegenerateMap : function() {

		dtStoreLocatorMapUtils.dtStoreLocatorMapRemoveMarkers();

		var address = document.getElementById('dtsl_address').value;
		var full_address = address;

		if( document.getElementById('dtsl_city') ) {
			var city = document.getElementById('dtsl_city').value;
			if(city) {
				full_address = full_address +','+ city;
			}
		}

		if( document.getElementById('dtsl_countystate') ) {
			var state = document.getElementById('dtsl_countystate').value;
			if(state) {
				full_address = full_address +','+ state;
			}
		}

		if( document.getElementById('dtsl_country') ) {
			var country   = document.getElementById('dtsl_country').value;
			if(country){
				full_address = full_address +','+ country;
			}
		}

		geocoder.geocode( { 'address': full_address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
				gmarkers.push(marker);

				var infowindow = new google.maps.InfoWindow({
					content: 'Latitude: ' + results[0].geometry.location.lat() + '<br>Longitude: ' + results[0].geometry.location.lng()
				});

				infowindow.open(map,marker);
				document.getElementById("dtsl_latitude").value=results[0].geometry.location.lat();
				document.getElementById("dtsl_longitude").value=results[0].geometry.location.lng();

			}
		});

	},

	dtStoreLocatorMapFillAddress : function(place) {

	    var componentForm = {
	        establishment:'long_name',
	        street_number: 'short_name',
	        route: 'long_name',
	        locality: 'long_name',
	        administrative_area_level_1: 'long_name',
	        administrative_area_level_2: 'long_name',
	        country: 'short_name',
	        postal_code: 'short_name',
	        postal_code_prefix:'short_name',
	        neighborhood:'long_name'
	    };

    	jQuery('#dtsl_city').val('');
        jQuery('#dtsl_neighborhood').val('');
        jQuery('#dtsl_zip').val('');
        jQuery('#dtsl_countystate').val('');
        jQuery('#dtsl_country').val('');

        for(var i = 0; i < place.address_components.length; i++) {

          	var addressType = place.address_components[i].types[0];

            var temp = '';
            var val = place.address_components[i][componentForm[addressType]];

            if(addressType=== 'street_number' || addressType=== 'route') {
            } else if(addressType=== 'neighborhood') {
                jQuery('#dtsl_neighborhood').val(val);
            } else if(addressType=== 'postal_code_prefix') {
                jQuery('#dtsl_zip').val(val);
            } else if(addressType=== 'postal_code') {
                jQuery('#dtsl_zip').val(val);
            } else if(addressType=== 'administrative_area_level_2') {
                jQuery('#dtsl_countystate').val(val);
            } else if(addressType=== 'administrative_area_level_1') {
                jQuery('#dtsl_countystate').val(val);
            } else if(addressType=== 'locality') {
                jQuery('#dtsl_city').val(val);
            } else if(addressType=== 'country') {
                jQuery('#dtsl_country').val(val);
            }

        }

	},

};

var dtStoreLocatorMap = {

	dtInit : function() {
		dtStoreLocatorMap.dtLoadMap();
		dtStoreLocatorMap.dtMapEvents();
	},

	dtLoadMap : function() {

		google.maps.event.addDomListener(window, 'load', dtStoreLocatorMapUtils.dtStoreLocatorMapInitialize());

	},

	dtMapEvents : function() {

	    if( document.getElementById('dtsl_address') ) {

	        var address_autocomplete = new google.maps.places.Autocomplete(( document.getElementById('dtsl_address')), {
	        	types: ['geocode'],
	            "partial_match" : true
	        });

	        var input = document.getElementById('dtsl_address');
            google.maps.event.addDomListener(input, 'keydown', function(e) {
                if (e.keyCode == 13) {
                    e.stopPropagation();
                    e.preventDefault();
                }
	        });

	        google.maps.event.addListener(address_autocomplete, 'place_changed', function(event) {
	            var place = address_autocomplete.getPlace();
	            dtStoreLocatorMapUtils.dtStoreLocatorMapFillAddress(place);
	            dtStoreLocatorMapUtils.dtStoreLocatorMapRegenerateMap();
	        });

	   }

	   if( document.getElementById('dtsl_city') ) {

	        city_autocomplete = new google.maps.places.Autocomplete(( document.getElementById('dtsl_city')), {
	        	types: ['(cities)']
	        });

	        var input = document.getElementById('dtsl_city');
	            google.maps.event.addDomListener(input, 'keydown', function(e) {
	                if (e.keyCode == 13) {
	                    e.stopPropagation();
	                    e.preventDefault();
	                }
	        });

	        google.maps.event.addListener(city_autocomplete, 'place_changed', function() {
	            var place = city_autocomplete.getPlace();
	            dtStoreLocatorMapUtils.dtStoreLocatorMapFillAddress(place);
	            dtStoreLocatorMapUtils.dtStoreLocatorMapRegenerateMap();
	        });

	    }

	},

};

jQuery(document).ready(function() {

	"use strict";

	dtStoreLocatorMap.dtInit();

});