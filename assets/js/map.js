    var map;
    var locationsJSON = $.getJSON('db/locations.json')

    function initialize() {
      var mapOptions = {
        zoom: 16
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      // Try HTML5 geolocation
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
            content: '<center><img src="http://lorempixel.com/50/50/cats/"><br>John Johnson<br>Points: 2391</center>'
          });

          var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: pos,
            map: map,
            title: 'CURRENT LOCATION'
          });

          google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
          }); 

          map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
        });
      } 
      else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }

    //creates marker using name, lats, and longs
    function setLocalMarkers(markerName, markerLat, markerLong) {
      var markerLoc = new google.maps.Marker({
            position: new google.maps.LatLng(markerLat, markerLong),
            map: map,
            title: markerName
        });
      addMarkerListener(markerLoc);
    }

    function addMarkerListener(marker) {
        google.maps.event.addListener(marker, 'click', function() {
            //console.log(marker.getTitle());
            findTitleInJSON(marker);
        });
    }

    function findTitleInJSON(marker) {
        console.log(locationsJSON[0]);
        for(var i = 0; i < locationsJSON.length; i++) {
            console.log(marker.getTitle());
            var obj = locationsJSON[i];
            
            if(obj.locationname == marker.getTitle())
                console.log('TRUE');
        }
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

