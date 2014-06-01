
function toggleLocationPanel(location) {
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