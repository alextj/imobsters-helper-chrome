var options;
var uid;
$(document).ready(function() {

	chrome.extension.sendRequest({action: 'gpmeGetOptions'}, function(theOptions) {
		options = theOptions;
		chrome.storage.sync.get('udid', function(obj) {
            uid = obj['udid'];
            init();
		});

	});
});

function g_save() {

    localStorage.setItem(uid+'g_investmentNextCost', JSON.stringify(g_investmentNextCost));
    localStorage.setItem(uid+'g_missionsNextEnergy', JSON.stringify(g_missionsNextEnergy));
    localStorage.setItem(uid+'g_missionsStartDoingNow', JSON.stringify(g_missionsStartDoingNow));
    localStorage.setItem(uid+'g_investmentStartAutoInvestmentNow', JSON.stringify(g_investmentStartAutoInvestmentNow));
    localStorage.setItem(uid+'g_investmentAutoInvestEnabled', JSON.stringify(g_investmentAutoInvestEnabled));
    localStorage.setItem(uid+'g_missionsAutoMissionEnabled', JSON.stringify(g_missionsAutoMissionEnabled));
}

function init() {

    g_missionsAutoMissionEnabled = JSON.parse(localStorage.getItem(uid+'g_missionsAutoMissionEnabled'));
    g_missionsNextEnergy = JSON.parse(localStorage.getItem(uid+'g_missionsNextEnergy'));
    g_missionsStartDoingNow = JSON.parse(localStorage.getItem(uid+'g_missionsStartDoingNow'));
    g_investmentAutoInvestEnabled = JSON.parse(localStorage.getItem(uid+'g_investmentAutoInvestEnabled'));
    g_investmentNextCost = JSON.parse(localStorage.getItem(uid+'g_investmentNextCost'));
    g_investmentStartAutoInvestmentNow = JSON.parse(localStorage.getItem(uid+'g_investmentStartAutoInvestmentNow'));


	// Create the sidebar menu
	create_sidebar();

	// Remove advertisements
	remove_adverts();


    investment_timer_start();

    // Start auto-invest, if autoinvesting is enabled
    if (g_investmentAutoInvestEnabled === true) {
        $('#checkbox_auto_invest_enabled').prop('checked', true);
        investment_run_auto_invest();
    }

    // Start auto-missions, if auto missions are enabled
    if (g_missionsAutoMissionEnabled === true) {
        $('#checkbox_auto_missions_enabled').prop('checked', true);
        missions_run_auto_missions();
    }



	// Attack helper
	if (options.fight_hide_strong && document.URL.indexOf("fight.php") > 0) {
		fight_helper_init();
	}

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
		if (g_investmentStartAutoInvestmentNow) {
            g_investmentStartAutoInvestmentNow = false;
            g_save();
            investment_auto();
		}
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
