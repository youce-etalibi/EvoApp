function dtStoreLocatorCustomMarker( latlng, map, args, infobox ) {
	this.latlng  = latlng;
	this.map     = map;
	this.args    = args
	this.infobox = infobox;
	this.setMap(map);
}

dtStoreLocatorCustomMarker.prototype = new google.maps.OverlayView();

dtStoreLocatorCustomMarker.prototype.draw = function() {

	var self = this,
		div  = self.div;

	if (!div) {

		div = self.div = document.createElement('div');
		if(self.args.listingid == undefined) {
			div.id = 'dtsl-user';
		} else {
			div.id = 'dtsl-'+self.args.listingid;
		}

		div.className = 'dtsl-marker-container';
		div.style.position = 'absolute';
		div.style.cursor = 'pointer';
		div.style.zIndex = 10;
		div.style.display = 'none';

		// Marker
        if(self.args.map_icon != undefined) {

	        var maskimg = document.createElement('div');
			maskimg.className = 'dtsl-marker-image';

			maskimg.style.webkitMaskImage = 'url('+self.args.map_icon+')';
	        div.appendChild(maskimg);

	    }


	    // Additional detail along with marker
        if(self.args.additional_info_type == 'categoryimage') {

	        var addinfo = document.createElement('div');
			addinfo.className = 'dtsl-marker-addition-info dtsl-marker-addition-info-'+self.args.additional_info_type;
			addinfo.style.backgroundColor = self.args.category_background_color;

			if(self.args.additional_info != '') {

		        var addinfodiv = document.createElement('div');
				addinfodiv.className = 'dtsl-marker-addition-info-categoryimage-inner';
				addinfodiv.style.webkitMaskImage  = 'url("'+self.args.additional_info+'")';
				addinfodiv.style.backgroundColor = self.args.category_color;
				addinfo.appendChild(addinfodiv);

			}

			div.appendChild(addinfo);

        } else if(self.args.additional_info_type == 'categoryicon') {

	        var addinfo = document.createElement('div');
			addinfo.className = 'dtsl-marker-addition-info dtsl-marker-addition-info-'+self.args.additional_info_type;

			if(self.args.additional_info != '') {

		        var addinfospan = document.createElement('span');
				addinfospan.className = self.args.additional_info;
				addinfospan.style.color = self.args.category_color;
				addinfospan.style.backgroundColor = self.args.category_background_color;
				addinfo.appendChild(addinfospan);

			}

	        div.appendChild(addinfo);

        } else if(self.args.additional_info_type == 'totalviews' || self.args.additional_info_type == 'averageratings' || self.args.additional_info_type == 'distance') {

			if(self.args.additional_info != '') {

		        var addinfo = document.createElement('div');
				addinfo.className = 'dtsl-marker-addition-info dtsl-marker-addition-info-'+self.args.additional_info_type;

				var newContent = document.createTextNode(self.args.additional_info);

				addinfo.appendChild(newContent);

		        div.appendChild(addinfo);

			}

        }


        // Marker Info Box
		google.maps.event.addDomListener(div, 'click', function(event) {

			event.preventDefault();

			google.maps.event.trigger(self, 'click');

			jQuery('div.dtsl-marker-info-box').removeClass('show');

			if(self.args.info_content != undefined) {

				self.infobox.setContent(self.args.info_content);
				self.infobox.setPosition(self.latlng);
				self.infobox.open(self.map);
				setTimeout(function(){
					self.infobox.setOptions({
						boxClass: 'dtsl-marker-info-box show',
					});
				}, 10);

			}

		});

		if(self.args.marker_animation == 'true') {

			setTimeout(function(){

				div.style.display = 'block';

				div.style.animation = 'bounce-in-top 1.1s both';
				div.style.webkitAnimation ='bounce-in-top 1.1s both';

				google.maps.event.addDomListener(div, 'mouseover', function() {
					div.style.animation = 'ping 0.8s ease-in-out infinite both';
					div.style.webkitAnimation ='ping 0.8s ease-in-out infinite both';
				});

				google.maps.event.addDomListener(div, 'mouseout', function() {
					div.style.removeProperty('animation');
					div.style.removeProperty('webkitAnimation');
				});

			}, 1200);

		} else {
			div.style.display = 'block';
		}

		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);

		var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

		if (point) {
			div.style.left = point.x + 'px';
			div.style.top = point.y + 'px';
		}

		this.div = div;
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}

};

dtStoreLocatorCustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}
};

dtStoreLocatorCustomMarker.prototype.getPosition = function() {
	return this.latlng;
};