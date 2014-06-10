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
	
	// Menu
	// ================================================================
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

	
	// Checkin & Location Panel 
	// ================================================================
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

	// Leaderboard
	// ================================================================
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

	// Nearby-List
	// ================================================================
	$('#nearby-list-li').click(function(){
		if($('#nearby-list-panel').css('display') == 'none'){
			$('#nearby-list-panel').animate({width: 'toggle'}, "slow");
			$('#nearby-list-panel').scrollTop();	
		}
		else{
			return
		}
	});

	$('#nearby-list-exit-button').click(function(){
		if($('#nearby-list-panel').css('display') != 'none'){
			$('#nearby-list-panel').animate({width: 'toggle'}, "slow");
		}
		else{
			return
		}
	});

	// About
	// ================================================================
	$('#about-li').click(function(){
		if($('#about-panel-wrapper').css('display') == 'none'){
			$('#about-panel-wrapper').animate({width: 'toggle'}, "slow");
			$(window).scrollTop();	
		}
		else{
			return
		}
	});

	$('#about-exit-button').click(function(){
		if($('#about-panel-wrapper').css('display') != 'none'){
			$('#about-panel-wrapper').animate({width: 'toggle'}, "slow");
		}
		else{
			return
		}
	});

	// Continue to Game Button
	// ================================================================
	$('#continue-to-site-button').click(function(){
		$('#content-intro').animate({'padding-left': '0%', 'opacity': '0' }, 250, 
			function(){
				$(this).css({'display':'none'});
			});
	});

});