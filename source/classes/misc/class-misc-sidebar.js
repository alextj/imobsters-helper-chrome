/**
 * Creates a helpful sidebar to navigate through the screens.
 */

function create_sidebar() {
	var menu = get_menu_items();
	var nav = '';

	nav += create_button('', 'Auto deposit', 'bank_auto', 'btn-info');
	nav += create_button('', 'Auto invest', 'investment_auto', 'btn-info');
	nav += create_button('', 'Auto invite', 'invite_auto', 'btn-info');
	nav += create_button('', 'Heal', 'heal_auto', 'btn-success');

	for (var index in menu) {
		nav += create_button(menu[index], index, '', 'btn-inverse');
	}

	$(document.createElement('ul')).addClass('helper_sideBar').html(nav).appendTo('body');
	$(document.createElement('div')).addClass('helper_sideBar2').html(
        '<p id="sidebar_investment_cost">Next investment cost: $' + g_investmentNextCost + '</p>' +
        '<p id="sidebar_mission_req_energy">Next mission requires: ' + g_missionsNextEnergy + ' e</p>' +
        '<input type="checkbox" id="checkbox_auto_invest_enabled"> Auto invest<br>' +
        '<input type="checkbox" id="checkbox_auto_missions_enabled"> Auto missions<br>' +
        '<input type="checkbox" id="checkbox_auto_healing_enabled"> Auto healing<br>'
    ).appendTo('body');

    $('#checkbox_auto_invest_enabled').change(function(){
        g_investmentAutoInvestEnabled = this.checked ? true : false;
        g_save();
    });

    $('#checkbox_auto_missions_enabled').change(function(){
        g_missionsAutoMissionEnabled = this.checked ? true : false;
        g_save();
    });

    $('#checkbox_auto_healing_enabled').change(function(){
        g_missionsAutoHealingEnabled = this.checked ? true : false;
        g_save();
    });

}

function sidebar_update_status() {
    $('#sidebar_investment_cost').text('Next investment cost: $' + g_investmentNextCost);
    $('#sidebar_mission_req_energy').text('Next mission requires: ' + g_missionsNextEnergy + ' e');
}

/**
 * The standard navigation for iMobsters.
 * @return {object} An item in "Text : URL" format
 */

function get_menu_items() {

	var menu = {
		'Home'      : 'home.php',
		'Bank'      : 'bank.php',
		'Weapons'   : 'equipment.php?cat=1',
		'Protection': 'equipment.php?cat=2',
		'Vehicles'  : 'equipment.php?cat=3',
		'Fight'     : 'fight.php',
		'Missions'  : 'missions.php',
		'Investment': 'investment.php',
		'Hospital'  : 'hospital.php',
		'Profile'   : 'profile.php?x=1&selectedTab=main',
		'Skills'    : 'profile.php?x=1&selectedTab=skill',
		'Loot'      : 'profile.php?x=1&selectedTab=loot',
		'Comments'  : 'profile.php?x=1&selectedTab=comment',
		'Group'     : 'group.php',
	};

	return menu;

}

/**
 * A helper for creating button elements.
 * @param  {url} url  Href attribute.
 * @param  {string} text Text attribute.
 * @param  {string} id   ID attribute.
 * @param  {string} css  Class attribute.
 * @return {string}      Button element.
 */

function create_button(url, text, id, css) {

	var url = url ? url : '#';

	return "<a href='" + url + "' class='btn btn-small " + css + "' id='" + id + "'>" + text + "</a>";

}
