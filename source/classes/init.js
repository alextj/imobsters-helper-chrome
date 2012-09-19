var options;
$(document).ready(function() {

	chrome.extension.sendRequest({action: 'gpmeGetOptions'}, function(theOptions) {
		options = theOptions;
		init();
	});

});

function init() {

	// Create the sidebar menu
	create_sidebar();

	// Remove advertisements
	remove_adverts();

	// Home fix
	if (document.URL.indexOf("home.php") > 0) {
		home_fixes_init();
	}

	// Equipment fix
	if (document.URL.indexOf("equipment.php") > 0) {
		equipment_fixes_init();
	}

	// Investment fix
	if (document.URL.indexOf("investment.php") > 0) {
		investment_fixes_init();
	}

	// Loot fix
	if (document.URL.indexOf("selectedTab=loot") > 0) {
		loot_fixes_init();
	}

	// Bank fix
	if (document.URL.indexOf("bank.php") > 0) {
		bank_fixes_init();
	}

	// Deposit all your monies
	$('#bank_auto').click(function(e) {
		e.preventDefault();
		bank_auto();
	});

	// Auto invest in real estate
	$('#investment_auto').click(function(e) {
		e.preventDefault();
		investment_auto();
	});

	// Auto heal
	$('#heal_auto').click(function(e) {
		e.preventDefault();
		heal_auto();
	});

	// Do auto heal
	if (options.heal_auto) {

		var health = $('#healthCurrent').text().trim();
		var maxHealth = $('#healthMax').text().trim();
		var ratio = (health / maxHealth) * 100;

		if ( ratio <= options.health_threshold) {
			heal_auto();
		}

	}

	// Auto invite mob codes
	$('#invite_auto').click(function(e) {
		e.preventDefault();
		invite_auto();
	});

}