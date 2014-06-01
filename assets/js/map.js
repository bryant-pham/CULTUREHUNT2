    var map;

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
          var ctx = '<center><img src="http://lorempixel.com/50/50/cats/"><br>John Johnson<br><div><span>Points: </span><span id="points">' + score + '</span></div></center>';
          var infowindow = new google.maps.InfoWindow({
            content: ctx
          });

          var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: pos,
            map: map,
            title: 'CURRENT LOCATION'
          });

          addLocationMarkers();

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
            alert("You earned " + score + " points!");
            addScore();
          } else {
            alert("Visit this location to checkin!");
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

    function deg2rad(deg) {
    return deg * (Math.PI/180)
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

    function addLocationMarkers() {
        $.getJSON('/assets/db/locations.json', function(json) {
            for(var i = 0; i < json.length; i++) {
                var obj = json[i];
                setLocalMarkers(obj.locationname, obj.latitude, obj.longitude)
            }
        });
    }

    var jsonReturned;
    function addMarkerListener(marker) {
        google.maps.event.addListener(marker, 'click', function(){
          
            //GET JSON OBJECT OF MARKER HERE
            findTitleInJSONAndSetSidebar(marker);
            
            if($('#location-panel-wrapper').css('display') == 'none'){
              toggleLocationPanel();
            }
            else{
              return
            }
            console.log(jsonReturned);

        });
    }

    function findTitleInJSONAndSetSidebar(marker) {
        var derp = $.getJSON('/assets/db/locations.json');
        console.log(derp);
        $.getJSON('/assets/db/locations.json', function(json) {
            for(var i = 0; i < json.length; i++) {
                if(json[i].locationname == marker.getTitle()) {
                    jsonReturned = json[i];
                    // Set #location-panel items
                    $('#location-name').text(json[i].locationname);
                    $('#location-address').text(json[i].address);
                    $('#location-hours').text(json[i].hours);
                    $('#location-description').text(json[i]["description"]);
                    var locLat = json[i].latitude;
                    var locLong = json[i].longitude;
                    passLatLong(locLat, locLong);
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

