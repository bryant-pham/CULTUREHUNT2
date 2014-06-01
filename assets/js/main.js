
function toggleLocationPanel() {
    $('#location-panel-wrapper').animate({width: 'toggle'}, "slow");

    
   //$('#location-name').text(location.locationname);
}

$(function(){
	$('#menu-button-enter').click( 
	    function() {
		    $("#menu").animate({width: 'toggle'}, "slow");
    });

	$('#menu-button-exit').click( 
	    function() {
	        $('#menu').animate({width: 'toggle'}, "slow");
	    }
	);

});