

// TODO:
// - auto purchase items if required by mission
// - safe fail if no money to purchase required items (simply purcahse when there happens to be enough cash)
// - safe fail if not enough mob members (paint auto-missions check box text red to inform user and write in log)
// - safe fail if the only missions that are not done are still locked (simply wait if there are no more missions to do, paint check box text green)


var missions_timer = 0;

function missions_timer_start() {
    missions_timer = setInterval(missions_timer_tick, 2000);
}

function missions_timer_tick() {
    missions_run_auto_missions();
}

function missions_timer_stop() {
    clearInterval(missions_timer);
}


function missions_run_auto_missions() {
    if (g_missionsAutoMissionEnabled === true) {
        var currentEnergy = get_current_energy();
        if (currentEnergy >= g_missionsNextEnergy) {
            missions_do();
        }
    }
}

function missions_do() {

    if (g_missionsCurrentCat == null) {
        g_missionsCurrentCat = 1;
    }
    if (document.URL.indexOf("missions.php?cat=" + g_missionsCurrentCat) < 1) {
        // Automatically move to missions page if not already there
        missions_load_page_and_do();
        return false;
	}

    var currentRank = missions_current_rank();

    if (currentRank >= 4) {
        // All the missions were done 4 times in this city, move on to the next city!
        g_missionsCurrentCat++;
        g_save();
        missions_load_page_and_do();
        return false;
    }

    var nextMission = missions_next_mission();

    if (nextMission == -1) {
        log_write("Missions: no available missions to do");
        return false;
    }

    var reqEnergy = mission_get_mission_energy(nextMission);
    var currentEnergy = get_current_energy();
    if (currentEnergy < reqEnergy) {
        g_missionsNextEnergy = reqEnergy;
        g_save();
        sidebar_update_status();
        return false;
    }

    var nextMissionCode = mission_get_action_link(nextMission);
    eval(nextMissionCode);
}

function missions_load_page_and_do() {

    window.location.href = 'missions.php?cat=' + g_missionsCurrentCat;
    g_missionsStartDoingNow = true;
    g_save();
}

function missions_current_rank() {
    var rankText = $('.masteryBarProgress > span').first().html();
    return parseInt(rankText.slice(-1), 10);
}

function missions_next_mission() {
    var nextMission = -1;
	$('.masteryBarProgress').each(
        function(index) {
            var progressPercent = parseInt($(this).html(), 10);
            if (progressPercent < 100 && nextMission == -1) {
                nextMission = index;
            }
        }
    );
	return nextMission;
}
function mission_get_mission_energy(index) {
    var reqEnergy = 0;
    reqEnergy = parseInt($('.requiredEnergy').eq(index).html(), 10);
    return reqEnergy;
}

function mission_get_action_link(index) {
    var link = 0;
    $('.actionButton').get(index).click();
    return link;
}
