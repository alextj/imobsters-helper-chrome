var options;
var uid;
var g_page_loaded = false;
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

    localStorage.setItem(uid+'g_schedulerCurrentTask', JSON.stringify(g_schedulerCurrentTask));
    localStorage.setItem(uid+'g_schedulerLastTaskStartTime', JSON.stringify(g_schedulerLastTaskStartTime));
    localStorage.setItem(uid+'g_log', JSON.stringify(g_log));
    localStorage.setItem(uid+'g_autoSkillEnabled', JSON.stringify(g_autoSkillEnabled));
    localStorage.setItem(uid+'g_lostFights', JSON.stringify(g_lostFights));
    localStorage.setItem(uid+'g_totalFights', JSON.stringify(g_totalFights));
    localStorage.setItem(uid+'g_foughtMobsters', JSON.stringify(g_foughtMobsters));
    localStorage.setItem(uid+'g_fightMinStaminaToHeal', JSON.stringify(g_fightMinStaminaToHeal));
    localStorage.setItem(uid+'g_fightAutoFightEnabled', JSON.stringify(g_fightAutoFightEnabled));
    localStorage.setItem(uid+'g_missionsAutoHealingEnabled', JSON.stringify(g_missionsAutoHealingEnabled));
    localStorage.setItem(uid+'g_investmentNextCost', JSON.stringify(g_investmentNextCost));
    localStorage.setItem(uid+'g_missionsNextEnergy', JSON.stringify(g_missionsNextEnergy));
    localStorage.setItem(uid+'g_missionsStartDoingNow', JSON.stringify(g_missionsStartDoingNow));
    localStorage.setItem(uid+'g_investmentStartAutoInvestmentNow', JSON.stringify(g_investmentStartAutoInvestmentNow));
    localStorage.setItem(uid+'g_investmentAutoInvestEnabled', JSON.stringify(g_investmentAutoInvestEnabled));
    localStorage.setItem(uid+'g_missionsAutoMissionEnabled', JSON.stringify(g_missionsAutoMissionEnabled));
    localStorage.setItem(uid+'g_missionsCurrentCat', JSON.stringify(g_missionsCurrentCat));
}

function init() {
	g_page_loaded = true;
    g_schedulerCurrentTask = JSON.parse(localStorage.getItem(uid+'g_schedulerCurrentTask'));
    g_schedulerLastTaskStartTime = new Date(JSON.parse(localStorage.getItem(uid+'g_schedulerLastTaskStartTime')));
    g_log = JSON.parse(localStorage.getItem(uid+'g_log'));
    g_autoSkillEnabled = JSON.parse(localStorage.getItem(uid+'g_autoSkillEnabled'));
    g_lostFights = JSON.parse(localStorage.getItem(uid+'g_lostFights'));
    g_totalFights = JSON.parse(localStorage.getItem(uid+'g_totalFights'));
    g_foughtMobsters = JSON.parse(localStorage.getItem(uid+'g_foughtMobsters'));
    g_fightMinStaminaToHeal = JSON.parse(localStorage.getItem(uid+'g_fightMinStaminaToHeal'));
    g_fightAutoFightEnabled = JSON.parse(localStorage.getItem(uid+'g_fightAutoFightEnabled'));
    g_missionsAutoHealingEnabled = JSON.parse(localStorage.getItem(uid+'g_missionsAutoHealingEnabled'));
    g_missionsAutoMissionEnabled = JSON.parse(localStorage.getItem(uid+'g_missionsAutoMissionEnabled'));
    g_missionsNextEnergy = JSON.parse(localStorage.getItem(uid+'g_missionsNextEnergy'));
    g_missionsStartDoingNow = JSON.parse(localStorage.getItem(uid+'g_missionsStartDoingNow'));
    g_investmentAutoInvestEnabled = JSON.parse(localStorage.getItem(uid+'g_investmentAutoInvestEnabled'));
    g_investmentNextCost = JSON.parse(localStorage.getItem(uid+'g_investmentNextCost'));
    g_investmentStartAutoInvestmentNow = JSON.parse(localStorage.getItem(uid+'g_investmentStartAutoInvestmentNow'));
    g_missionsCurrentCat = JSON.parse(localStorage.getItem(uid+'g_missionsCurrentCat'));

	// Create the sidebar menu
	create_sidebar();

	// Remove advertisements
	remove_adverts();

	sidebar_init_ui();
	
	// If fighting, get fight result
	if (document.URL.indexOf("fight.php?action=fight") > 0) {
		fight_get_fight_result();
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
	}

	// Loot fix
	if (document.URL.indexOf("selectedTab=loot") > 0) {
		loot_fixes_init();
	}

	// Bank fix
	if (document.URL.indexOf("bank.php") > 0) {
		bank_fixes_init();
	}

	var taskChanged = scheduler_run();
	if (taskChanged == false) {
		scheduler_run_task(g_schedulerCurrentTask);
	}
}
