
function missions_task_run() {
    log_write("Task Missions");
    if (g_missionsAutoMissionEnabled) {
        var currentEnergy = get_current_energy();
        if (currentEnergy >= g_missionsNextEnergy) {
            missions_do();
        } else {
            scheduler_next_task();
        }
    } else {
        scheduler_next_task();
    }
}

function missions_do() {

    if (g_missionsCurrentCat == null) {
        g_missionsCurrentCat = 1;
    }
    if (document.URL.indexOf("missions.php?cat=" + g_missionsCurrentCat) < 1) {
        // Automatically move to missions page if not already there
        window.location.href = 'missions.php?cat=' + g_missionsCurrentCat;
        return false;
	}

    var currentRank = missions_current_rank();

    if (currentRank >= 4) {
        // All the missions were done 4 times in this city, move on to the next city!
        g_missionsCurrentCat++;
        g_save();
        missions_do();
        return false;
    }

    var nextMission = missions_next_mission();

    if (nextMission == -1) {
        log_write("Missions: no available missions to do *******");
        scheduler_next_task();
        return false;
    }

    var reqEnergy = mission_get_mission_energy(nextMission);
	if (reqEnergy != g_missionsNextEnergy) {
		// Update sideback with new energy requirement
        g_missionsNextEnergy = reqEnergy;
        g_save();
        sidebar_update_status();
	}
	
    var currentEnergy = get_current_energy();
    if (currentEnergy < reqEnergy) {
		// There is not enough energy to do the mission - quit
        scheduler_next_task();
        return false;
    }
	
	// There is enough energy - do the mission
	log_write("Missions: Doing mission")
    mission_do_mission(nextMission);
}

function missions_current_rank() {
	// Get the rank of the last mission on the page
	// beacause the missions are done is order, this means that all the other
	// missions on the page have either same or higher rank.
    var rankText = $('.masteryBarProgress > span').last().html();
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

function mission_do_mission(index) {
    $('.actionButton').get(index).click();
}
