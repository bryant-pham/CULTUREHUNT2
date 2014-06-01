var locLat;
var locLong;

function toggleLocationPanel() {
    var locationPanel = $('#location-panel-wrapper');
    if($(window).width() > 600) {
    	locationPanel.css({
    		width: '40%',
    		height: '100%',
    		top: '0'
    	});
    	locationPanel.animate({width: 'toggle'}, "slow");
    }
    else{
    	locationPanel.css({
    		width: '100%',
    		height: '50%',
    		top: '0'
    	});
    	locationPanel.slideToggle( "slow" );
    }
   //$('#location-name').text(location.locationname);
}

function passLatLong(jsonLat, jsonLong) {
	locLat = jsonLat;
	locLong = jsonLong;
}

$(function(){
	$('#menu-button-enter').click( 
	    function(event){
		    $("#menu").animate({width: 'toggle'}, "slow");
  			event.preventDefault();
    });

	$('#menu-button-exit').click( 
	    function(event){
	        $('#menu').animate({width: 'toggle'}, "slow");
  			event.preventDefault();
	    }
	);

	// Pass position to check in function
    $('#checkin-button').click(
    	function(event){ 
        checkIn(locLat, locLong);
    	}
    );

	$('#location-panel-button-exit').click(function(){
		if($('#location-panel-wrapper').css('display') != 'none'){
			toggleLocationPanel();
		}
		else{
			return
		}
	});		

	$('#leaderboard-li').click(function(){
		if($('#leaderboard-panel-wrapper').css('display') == 'none'){
			$('#leaderboard-panel-wrapper').animate({width: 'toggle'}, "slow");
		}
		else{
			return
		}
	});

	$('#leaderboard-exit-button').click(function(){
		if($('#leaderboard-panel-wrapper').css('display') != 'none'){
			$('#leaderboard-panel-wrapper').animate({width: 'toggle'}, "slow");
		}
		else{
			return
		}
	});
	
});