var options;
$(document).ready(function() {

	$('#optionsPage').click(function(e){
		chrome.tabs.create({
	        url: "fancy-settings/source/index.html"
		})
	});

	chrome.extension.sendRequest({action: 'gpmeGetOptions'}, function(theOptions) {
		options = theOptions;
		init();
	});

});

function init() {

	var notes = options.notes.split(/\n/);

	$.each(notes, function(key, value) {
		if (notes[0] != '') {
			if(value.length) {
		     $('#udids')
		         .append($("<option></option>")
		         .attr("value",key)
		         .text(value));
		     }
	     } else {
	    	 $('#imobsters_login')
		         .before($("<div></div>")
		         .addClass('alert alert-info')
		         .text('Click Settings to add login devices.'));
	     }
	});

	// Login button has been clicked.
	$('#imobsters_login').submit(function(e) {
		e.preventDefault();

		var udid = options.notes.split(/\n/);
		udid = udid[$('#udids').val()];
		var droid = $("#droid").is(':checked');

		// No UDID was entered
		if (!udid.length) {
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
				'version': '1.85',
				'udid': udid,
				'pf': pf
			};
			var page = 'index.php';

		}

		var params = $.param(params);

		return 'http://im.storm8.com/' + page + '?' + params;

	}

}
