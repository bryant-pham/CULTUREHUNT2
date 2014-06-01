
function toggleLocationPanel() {
    $('#location-panel').animate({width: 'toggle'}, "slow");
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