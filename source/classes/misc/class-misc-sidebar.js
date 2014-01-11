/**
 * Creates a helpful sidebar to navigate through the screens.
 */

function create_sidebar() {
	var menu = get_menu_items();
	var nav = '';

	for (var index in menu) {
		nav += create_button(menu[index], index, '', 'btn-inverse');
	}

	$(document.createElement('ul')).addClass('helper_sideBar').html(nav).appendTo('body');
	$(document.createElement('div')).addClass('helper_sideBar2').html(
        '<p id="sidebar_investment_cost">Next investment cost: $' + g_investmentNextCost + '</p>' +
        '<p id="sidebar_mission_req_energy">Next mission requires: ' + g_missionsNextEnergy + ' e</p>' +
        '<p id="sidebar_fighting_status"></p>' +
        '<input type="checkbox" id="checkbox_auto_invest_enabled"> Auto invest<br>' +
        '<input type="checkbox" id="checkbox_auto_missions_enabled"> Auto missions<br>' +
        '<input type="checkbox" id="checkbox_auto_fighting_enabled"> Auto fighting<br>' +
        '<input type="checkbox" id="checkbox_auto_skill_enabled"> Auto skill up<br>'
    ).appendTo('body');
	$(document.createElement('div')).attr("id","log_window").html(g_log).appendTo('body');
	$(document.createElement('div')).attr("id","log_window_btn").html('^').appendTo("body");
    $(document.createElement('div')).attr("id","fight_stats_window").html(
        'fight stats:<br><br>' +
        '<table>'+
        '   <tr><td style="height: 0px; width: 20px; border: 0px solid #FFF;"> </td></tr>'+
        '   <tr><td style="height: 30px; width: 20px; border: 0px solid #FFF;">123<br>435</td></tr>'+
        '   <tr><td style="height: 100px; width: 20px; border: 1px solid #FFF; background-color: #0F0;"> </td></tr>'+
        '   <tr><td style="height: 100px; width: 20px; border: 1px solid #FFF; background-color: #F00;"> </td></tr>'+
        '   <tr><td style="height: 20px; width: 20px; border: 1px solid #FFF;">11</td></tr>'+
        '</table>'+
        '<table>'+
        '   <tr><td style="height: 0px; width: 20px; border: 0px solid #FFF;"> </td></tr>'+
        '   <tr><td style="height: 30px; width: 20px; border: 0px solid #FFF;">34<br>345</td></tr>'+
        '   <tr><td style="height: 100px; width: 20px; border: 1px solid #FFF; background-color: #0F0;"> </td></tr>'+
        '   <tr><td style="height: 100px; width: 20px; border: 1px solid #FFF; background-color: #F00;"> </td></tr>'+
        '   <tr><td style="height: 20px; width: 20px; border: 1px solid #FFF;">12</td></tr>'+
        '</table>'+
        ''
    ).appendTo('body');
    $(document.createElement('div')).attr("id","fight_stats_size_btn").html('>').appendTo("body");


    // Draw fight stats
    // Fight the largest total fights
    var largestTotal = 0;
    for (var i = 0; i < g_fightHistory.length; i++) {
        var currentTotal = g_fightHistory[i][1];
        if (currentTotal > largestTotal) {
            largestTotal = currentTotal;
        }
    }
    // Define scalar
    var scalar = 200 / largestTotal;
    // Draw each bar
    for (var i = 0; i < g_fightHistory.length; i++) {
        var level = g_fightHistory[i][0];
        var total = g_fightHistory[i][1];
        var lost = g_fightHistory[i][2];
        var totalHeight = 
        $(document.createElement('table')).attr("id", "fight_stats_table_" + i).appendTo("fight_stats_window");
        $(document.createElement('tr')).appendTo("fight_stats_table_" + i);
    }

    $('#checkbox_auto_invest_enabled').change(function(){
        g_investmentAutoInvestEnabled = this.checked ? true : false;
        g_save();
    });
	
	$('#log_window_btn').click(function() {
		if ($('#log_window').css("height") == "200px") {
			$('#log_window').css("height", 30);
			$('#log_window_btn').html("^");
            g_guiLogWindowHeight = 30;
		} else {
			$('#log_window').css("height", 200);
			$('#log_window_btn').html("v");
            g_guiLogWindowHeight = 200;
		}
        g_save();
	});
    
    $('#fight_stats_size_btn').click(function() {
        if ($('#fight_stats_window').css("width") == "400px") {
            $('#fight_stats_window').css("width", 50);
            $('#fight_stats_size_btn').html("<");
            g_guiFightStatsWindowHeight = 50;
        } else {
            $('#fight_stats_window').css("width", 400);
            $('#fight_stats_size_btn').html(">");
            g_guiFightStatsWindowHeight = 400;
        }
        g_save();
    });

    $('#checkbox_auto_missions_enabled').change(function(){
        g_missionsAutoMissionEnabled = this.checked ? true : false;
        g_save();
    });
    $('#checkbox_auto_fighting_enabled').change(function(){
        g_fightAutoFightEnabled = this.checked ? true : false;
        g_save();
    });

    $('#checkbox_auto_skill_enabled').change(function(){
        g_autoSkillEnabled = this.checked ? true : false;
        g_save();
    });
}

function sidebar_init_ui() {
    if (g_investmentAutoInvestEnabled === true) {
        $('#checkbox_auto_invest_enabled').prop('checked', true);
    }

    if (g_missionsAutoMissionEnabled === true) {
        $('#checkbox_auto_missions_enabled').prop('checked', true);
    }

    if (g_fightAutoFightEnabled === true) {
        $('#checkbox_auto_fighting_enabled').prop('checked', true);
    }

    if (g_autoSkillEnabled === true) {
        $('#checkbox_auto_skill_enabled').prop('checked', true);
    }

    $('#log_window').css("height", g_guiLogWindowHeight);
    $('#fight_stats_window').css("width", g_guiFightStatsWindowHeight);
}

function sidebar_update_status() {
    $('#sidebar_investment_cost').text('Next investment cost: $' + g_investmentNextCost);
    $('#sidebar_mission_req_energy').text('Next mission requires: ' + g_missionsNextEnergy + ' e');
}
function sidebar_update_fighting_status(message) {
    $('#sidebar_fighting_status').text('Fighting: ' + message);
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
