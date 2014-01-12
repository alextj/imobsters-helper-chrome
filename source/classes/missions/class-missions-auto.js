
function missions_task_run() {
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

    // See if there is a box saying that mission failed because of 
    // missing eqipment
    if (document.URL.indexOf("missions.php") > 0) {
        if ($('.messageBoxFail > span > span.cash > span').length > 0) {
            var cashRequired = format_number($('.messageBoxFail > span > span.cash > span').text().trim());
            var currentCash = get_current_cash();
            if (currentCash >= cashRequired) {
                // Buy
                log_write("Missions: purchasing required equipment for " + cashRequired);

                $('.messageBoxFail > div > center > input.btnDoAgain').css("border", "2px dotted blue");
                $('.messageBoxFail > div > center > input.btnDoAgain').click();
                scheduler_next_task();
                return false;
            } else {
                // Not enough cash
                log_write("Missions: not enough cash to purchase required equipment");
                scheduler_next_task();
                return false;
            }
        }
    }

    if (document.URL.indexOf("missions.php?") < 0 ||
        document.URL.indexOf("cat=" + g_missionsCurrentCat) < 0) {
        // Automatically move to missions page if not already there
        window.location.href = 'missions.php?cat=' + g_missionsCurrentCat;
        return false;
	}

    var currentRank = missions_current_rank();

    if (currentRank > 4) {
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
	var percentage = parseInt($('.masteryBarProgress').last().text());
	var rank = parseInt(rankText.slice(-1), 10);
	if (rank == 4 && percentage == 100) {
		rank++;
	}
    return rank;
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
