    var map;
    //var locationsJSON = $.getJSON('/assets/db/locations.json')

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
    
    function checkIn(checkinLat, checkinLong)  {
      var currentLat;
      var currentLong;
      //get the current position again to see if it has changed.
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          currentLat = pos.lat(); //lat1
          currentLong = pos.lng(); //long1

          //HAVERSINE FORMULA TO CALCULATE DISTANCE
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(checkinLat-currentLat);  // deg2rad below
          var dLon = deg2rad(checkinLong-currentLong); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(currentLat)) * Math.cos(deg2rad(checkinLat)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c * 1000; // Distance in meters

          //Check In Validation Condition
          if (d<=400) {
            alert("YOU CHECKED IN MANG");
          } else {
            alert("You are not close enough to check in.");
          }
          
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
            title: markerName,
            zIndex: 10
        });
      addMarkerListener(markerLoc);
    }

    function addMarkerListener(marker) {
        google.maps.event.addListener(marker, 'click', function() {


            findTitleInJSON(marker);
            toggleLocationPanel();

            //GET JSON OBJECT OF MARKER HERE
            //PASS JSON OBJECT AND UPDATE DIV
            
        });
    }

    function findTitleInJSON(marker) {
        var locationsJSON = $.getJSON('/assets/db/locations.json', function(json) {
            for(var i = 0; i < json.length; i++) {
                if(json[i].locationname == marker.getTitle()) {
                    console.log('FOUND YA');
                    return json[i];
                }
            }
        });
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

