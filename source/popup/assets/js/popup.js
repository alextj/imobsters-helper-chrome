$(document).ready(function () {

	$('#generateUdid').click(function(e) {
		e.preventDefault();
		$('#inputUdid').val(generate_udid(40));
	})

	$('#imobsters_login').submit(function(e) {
		e.preventDefault();

		var udid = $('#inputUdid').val();
		var droid = $("#droid").is(':checked');

		var pf = convert_to_pf(udid, droid);
		var url = generate_url(udid, pf, droid);

		chrome.tabs.create({"url": url, "active":true}, function(tab) {
			// Stuff
		});

	})

	function generate_udid(length) {
	    var text = "";
	    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < length; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;

	}

	function convert_to_pf(udid, droid) {

		var ios_salt = 'UltraDoux174i';
		var droid_salt = 'pr3m1umWat3r154i:12';

		var salt = droid ? droid_salt : ios_salt;

		return $.md5(udid + ':' + salt);

	}

	function generate_url(udid, pf, droid) {

		if ( droid ) {

			var params = {
				'fpts' : 12,
				'version' : 'a1.54',
				'udid' : udid,
				'pf' : pf
			};
			var page = 'apoints.php';

		} else {

			var params = {
				'version' : '1.74',
				'udid' : udid,
				'pf' : pf
			};
			var page = 'index.php';

		}

		var params = $.param(params);

		return 'http://im.storm8.com/' + page + '?' + params;

	}


});