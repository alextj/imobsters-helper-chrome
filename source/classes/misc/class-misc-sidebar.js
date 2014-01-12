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
        '<p id="sidebar_current_task"></p>' +
        '<p id="sidebar_investment_cost">Next investment cost: $' + g_investmentNextCost + '</p>' +
        '<p id="sidebar_mission_req_energy">Next mission requires: ' + g_missionsNextEnergy + ' e</p>' +
        '<p id="sidebar_fighting_status"></p>' +
        '<input type="checkbox" id="checkbox_auto_invest_enabled"> Auto invest<br>' +
        '<input type="checkbox" id="checkbox_auto_missions_enabled"> Auto missions<br>' +
        '<input type="checkbox" id="checkbox_auto_fighting_enabled"> Auto fighting<br>' +
        '<input type="checkbox" id="checkbox_auto_skill_enabled"> Auto skill up<br>'
    ).appendTo('body');
    $(document.createElement('div')).attr("id","fight_stats_window").html(
        'fight stats:<br><br>'
    ).appendTo('body');
    $(document.createElement('div')).attr("id","fight_stats_size_btn").html('>').appendTo("body");


	if (g_fightHistory == null) {
		g_fightHistory = [];
		g_save();
	}
	if (g_currentLevel == null) {
		g_currentLevel = get_current_level();
		g_save();
	}
	if (g_totalFights == null) {
		g_totalFights = 0;
		g_save();
	}
	if (g_lostFights == null) {
		g_lostFights = 0;
		g_save();
	}
	
	// [[9,45,3],[10,65,7],[11,78,34],[12,145,2],[13,170,160]]
    // Draw fight stats, something like this:
	/*
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
	*/
    // Fight the largest total fights
    var largestTotal = 0;
    for (var i = 0; i < g_fightHistory.length; i++) {
        var currentTotal = g_fightHistory[i][1];
        if (currentTotal > largestTotal) {
            largestTotal = currentTotal;
        }
    }
	if (g_totalFights > largestTotal) {
		largestTotal = g_totalFights;
	}
    // Define scalar
    var scalar = 200 / largestTotal;
    var level;
    var total;
    var lost;
    var totalHeight;
	var lostHeight;
	var topHeight;
	var percentage;
    // Draw each bar
    sidebar_draw_fight_stat(g_currentLevel, g_totalFights, g_lostFights, scalar, i);
    for (var i = g_fightHistory.length - 1; i >= 0; i--) {
        level = g_fightHistory[i][0];
        total = g_fightHistory[i][1];
        lost = g_fightHistory[i][2];
		if (level != null && total != null && lost != null) {
        	sidebar_draw_fight_stat(level, total, lost, scalar, i);
		}
    }

    $('#checkbox_auto_invest_enabled').change(function(){
        g_investmentAutoInvestEnabled = this.checked ? true : false;
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
	
	sidebar_update_current_task();
}

function sidebar_draw_fight_stat(level, total, lost, scalar, i) {
    var totalHeight = total * scalar;
	var topHeight = 200 - totalHeight;
	var lostHeight = lost * scalar;
	if (total == 0) {
		percentage = 0;
		topHeight = 200;
		totalHeight = 0;
		lostHeight = 0;
	} else {
		if (totalHeight != 0) {
			percentage = lostHeight * 100 / totalHeight;
		} else {
			percentage = 0;
		}
	}
	totalHeight = totalHeight - lostHeight;
    $(document.createElement('table')).attr("id", "fight_stats_table" + i).appendTo("#fight_stats_window");
	
    $(document.createElement('tr')).attr("id", "fight_stats_table" + i + "_tr1").appendTo("#fight_stats_table" + i);
    $(document.createElement('td')).attr("id", "fight_stats_table" + i + "_td1").appendTo("#fight_stats_table" + i + "_tr1");
	$("#fight_stats_table" + i + "_td1").html(" ");
	$("#fight_stats_table" + i + "_td1").css("height", topHeight);
	$("#fight_stats_table" + i + "_td1").css("width", 20);
	
    $(document.createElement('tr')).attr("id", "fight_stats_table" + i + "_tr2").appendTo("#fight_stats_table" + i);
    $(document.createElement('td')).attr("id", "fight_stats_table" + i + "_td2").appendTo("#fight_stats_table" + i + "_tr2");
	$("#fight_stats_table" + i + "_td2").html(total+"<br>"+lost);
	$("#fight_stats_table" + i + "_td2").css("height", 30);
	$("#fight_stats_table" + i + "_td2").css("width", 20);
	
    $(document.createElement('tr')).attr("id", "fight_stats_table" + i + "_tr3").appendTo("#fight_stats_table" + i);
    $(document.createElement('td')).attr("id", "fight_stats_table" + i + "_td3").appendTo("#fight_stats_table" + i + "_tr3");
	$("#fight_stats_table" + i + "_td3").html(" ");
	$("#fight_stats_table" + i + "_td3").css("height", totalHeight);
	$("#fight_stats_table" + i + "_td3").css("width", 20);
	$("#fight_stats_table" + i + "_td3").css("background-color", "#0F0");
	$("#fight_stats_table" + i + "_td3").css("border", "1px solid #FFF");
	
    $(document.createElement('tr')).attr("id", "fight_stats_table" + i + "_tr4").appendTo("#fight_stats_table" + i);
    $(document.createElement('td')).attr("id", "fight_stats_table" + i + "_td4").appendTo("#fight_stats_table" + i + "_tr4");
	$("#fight_stats_table" + i + "_td4").html(Math.round(percentage) + "%");
	$("#fight_stats_table" + i + "_td4").css("height", lostHeight);
	$("#fight_stats_table" + i + "_td4").css("width", 20);
	$("#fight_stats_table" + i + "_td4").css("background-color", "#F00");
	$("#fight_stats_table" + i + "_td4").css("border", "1px solid #FFF");
	$("#fight_stats_table" + i + "_td4").css("vertical-align", "top");
	if (percentage < 15) {
		$("#fight_stats_table" + i + "_td4").html(" ");
	}
	
    $(document.createElement('tr')).attr("id", "fight_stats_table" + i + "_tr5").appendTo("#fight_stats_table" + i);
    $(document.createElement('td')).attr("id", "fight_stats_table" + i + "_td5").appendTo("#fight_stats_table" + i + "_tr5");
	$("#fight_stats_table" + i + "_td5").html(level);
	$("#fight_stats_table" + i + "_td5").css("height", 20);
	$("#fight_stats_table" + i + "_td5").css("width", 20);
	
}

function sidebar_update_current_task() {
	var currentTask = 'none';
	switch (g_schedulerCurrentTask) {
		case TASK_INVEST:
			currentTask = 'Investment';
			break;
		case TASK_SKILL:
			currentTask = 'Skills';
			break;
		case TASK_MISSION:
			currentTask = 'Missions';
			break;
		case TASK_FIGHT:
			currentTask = 'Fighting';
			break;
		default:
			currentTask = "g_schedulerCurrentTask = " + g_schedulerCurrentTask;
			break;
	}
	$('#sidebar_current_task').html("Current task:<br>" + currentTask);
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

    $('#fight_stats_window').css("width", g_guiFightStatsWindowHeight);
	init_log_window();
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
