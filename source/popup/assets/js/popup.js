$(document).ready(function() {

	// Retrieve the last stored UDID
	var storage = chrome.storage.sync.get('udid', function(items) {
		$('#inputUdid').val(items.udid);
	});

	// Generate button should generate a UDID and fill it in the input.
	$('#generateUdid').click(function(e) {
		e.preventDefault();
		var newid = $('#droid').is(':checked') ? generate_droid_id() : generate_ios_id();
		$('#inputUdid').val(newid);
	})

	// Login button has been clicked.
	$('#imobsters_login').submit(function(e) {
		e.preventDefault();

		var udid = $('#inputUdid').val();
		var droid = $("#droid").is(':checked');

		// No UDID was entered
		if (!udid) {
			alert("Please enter a UDID, or click Generate to create one.");
			return false;
		}

		// Save the submitted UDID to storage
		chrome.storage.sync.set({
			'udid': udid
		}, function() {});

		var pf = convert_to_pf(udid, droid);
		var url = generate_url(udid, pf, droid);

		// Open the login page in a new tab
		chrome.tabs.create({
			"url": url,
			"active": true
		}, function(tab) {});

	})

	/**
	 * Random iOS UDID generator.
	 * @return {string}        Generated UDID string.
	 */

	function generate_ios_id() {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 40; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;

	}

	/**
	 * Random Android UUID generator.
	 * @return {string}        Generated UUID string.
	 */

	function generate_droid_id() {
		var S4 = function() {
				return Math.floor(
				Math.random() * 0x10000 /* 65536 */ ).toString(16);
			};

		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

	/**
	 * Converts a UDID to the PF equivalent.
	 * @param  {string} udid  40 character UDID.
	 * @param  {boolean} droid Whether the UDID belongs to a droid.
	 * @return {[type]}       PF value from UDID.
	 */

	function convert_to_pf(udid, droid) {

		var ios_salt = 'UltraDoux174i';
		var droid_salt = 'pr3m1umWat3r154i:12';

		var salt = droid ? droid_salt : ios_salt;

		return $.md5(udid + ':' + salt);

	}

	/**
	 * Login URL for accessing Storm8.
	 * @param  {string} udid  UDID for the device.
	 * @param  {string} pf    Generated PF from UDID.
	 * @param  {boolean} droid Android device?
	 * @return {string}       The URL to login.
	 */

	function generate_url(udid, pf, droid) {

		if (droid) {

			var params = {
				'fpts': 12,
				'version': 'a1.54',
				'udid': udid,
				'pf': pf
			};
			var page = 'apoints.php';

		} else {

			var params = {
				'version': '1.74',
				'udid': udid,
				'pf': pf
			};
			var page = 'index.php';

		}

		var params = $.param(params);

		return 'http://im.storm8.com/' + page + '?' + params;

	}

});