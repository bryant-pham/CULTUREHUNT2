var user  = 'John Johnson';
var score = 100;
function addScore() {
	$.getJSON('/assets/db/users.json', function(json) {
		for(var i = 0; i < json.length; i++) {
			var obj = json[i];
			if(obj.usename == user) {
				console.log('YEAAHAH');
				score = score + 50;
				$('#points').text(score);
				$('#John-Johnson').text(score);
			}

		}
	});
}
