/*
 - if loot required, get loot item name
   + Save loot name to g_lootName
 - if g_lootName != null
   + Get category and mission name from missions_loot
   + Open category if it's not open
   + Find the mission and click on Do button
 - If mission success & got loot & g_lootName != null & g_lootName == receivedLootName
   + g_lootName = null
*/

var missions_log_enabled = false;

var missions_loot = {
	// item name, missions tab (cat), mission index, mission name
	"Metal Pipe": [1, 0, "Shoplifting"],
	"Revolver": [1, 1, "Street Mugging"],
	"Machete": [1, 2, "Breaking and Entering"],
	"Barracuda": [1, 3, "Grand Theft Auto"],
	"Machete": [1, 4, "Liquor Store Robbery"],
	"Prison Map": [1, 5, "Start Protection Racket"],
	"Riot Shield": [2, 1, "Prison Break"],
	"Bank Schematic": [2, 3, "Infiltrate Mob Base"],
	"Enemy Plans": [2, 7, "Take Out Snitch"],
	"M4 Carbine": [3, 0, "Steal Weapons From Mob"],
	"Armored Bank Truck": [4, 0, "Hi-Jack a Bank Truck"],
	"Fire Fighting Tank": [5, 0, "Burn Down Casino"],
	"High Tech SWAT Van": [5, 4, "Escape FBI Lockdown"],
	"FBI Mobile Command Center": [6, 3, "Drive Out Russian Mob"],
	"FMG 9 Folding Machine Gun": [7, 3, "Hide Bodies in Desert"],
	"Russian Roulette Revolver": [7, 7, "Bribe Zoning Committee"],
	"Stealth Copter": [7, 11, "Doublecross Partner"],
	"SPAS-12 Shotgun": [8, 3, "Run Off Local Gangs"],
	"An-225 Air Transport": [8, 8, "Threaten Studio Execs"],
	"Silenced Ruger 9mm": [9, 1, "Ransack Village"],
	"Bridge Builder Truck": [9, 6, "Ship Goods to Hollywood"],
	"Godfather Pinky Ring": [9, 11, "Support Political Group"]
};

function missions_task_run() {
    if (g_missionsAutoMissionEnabled) {
		setTimeout(function() {
			missions_do();
		}, (1000 + Math.random() * 1500));
    } else {
        scheduler_next_task();
    }
}

function missions_do() {

    if (g_missionsCurrentCat == null) {
        g_missionsCurrentCat = 1;
    }
	
    if (document.URL.indexOf("missions.php") > 0) {
		if ($('div.messageBoxFail:contains("You need additional equipment to complete the mission")').length > 0) {
			// Need equipment: either loot or some item that can be bought
			var itemName = $('div.messageBoxFail > table > td.vmid').eq(1).text();
			var result = $('div.messageBoxFail > table > tbody > tr > td.vmid');
			var itemName = $('div.messageBoxFail > table > tbody > tr > td.vmid').eq(1).text();
			if ($('div.messageBoxFail:contains("Buy the equipment for")').length > 0) {
				// This equipment can be bought - buy it now
        		if ($('.messageBoxFail > span > span.cash > span').length > 0) {
        		    var cashRequired = format_number($('.messageBoxFail > span > span.cash > span').text().trim());
        		    var currentCash = get_current_cash();
        		    if (currentCash >= cashRequired) {
        		        // Buy
        		        if (missions_log_enabled) log_write("Missions: purchasing " + itemName + " for $" + cashRequired);
        		
        		        $('.messageBoxFail > div > center > input.btnDoAgain').css("border", "2px dotted blue");
        		        $('.messageBoxFail > div > center > input.btnDoAgain').click();
        		        scheduler_next_task();
        		        return false;
        		    } else {
        		        // Not enough cash
        		        if (missions_log_enabled) log_write("Missions: not enough cash to purchase " + itemName);
        		        scheduler_next_task();
        		        return false;
        		    }
        		} else {
        			// Error - couldn't find the the amount of cash required to purchase the item
					g_missionsAutoMissionEnabled = false;
					g_save();
					log_error('Missions: Couldn\'t find the amount of cash needed to buy ' + itemName);
        		}
			} else {
				// This is loot item - start doing loot mission
				if (g_missionsRequiredLoot == null) {
					// This is the first time for this loot item - save item name
					if (missions_log_enabled) log_write("Missions: Don't have the required loot item: " + itemName);
					// The text in itemName contains also amount, like so "Bank Schematic: 1x";
					g_missionsRequiredLoot = itemName.split(":")[0].trim();
					g_save();
				}
				// Start doing the loot mission
				missions_do_loot_mission();
			}
		} else if ($('div.missionSuccess').has('span.missionPayoutGained').length > 0 && g_missionsRequiredLoot != null) {
			var lootedItemName = $('div.missionSuccess > table > tbody > tr > td > div').has('span.missionPayoutGained').text().trim();
			if (lootedItemName.length > 0) {
				// You looted:    Metal Pipe!
				lootedItemName = lootedItemName.split(":")[1].replace("!","").trim();
				if (lootedItemName == g_missionsRequiredLoot) {
					// Required loot found - no need to look for loot anymore.
					if (missions_log_enabled) log_write("Missions: Found required loot item '" + g_missionsRequiredLoot + "'. Setting it to null.")
					g_missionsRequiredLoot = null;
				} else {
					var missionName = $('div.missionHeader').text();
					log_error("Missions: Received wrong loot item. Expected '"+g_missionsRequiredLoot+"', received: '"+lootedItemName+"' in mission '"+missionName+"'");
				}
			}
		} else if ($('div.missionSuccess').length > 0 && g_missionsRequiredLoot != null) {
			var missionName = $('div.missionHeader').text();
			if (missions_log_enabled) log_write("Missions: Loot item '" + g_missionsRequiredLoot + "' not received this time from mission '"+missionName+"'");
		}
    }
	
	if (g_missionsRequiredLoot != null) {
		// Start doing the loot mission
		missions_do_loot_mission();
		return false;
	}

	// See if there is enough stamina to do the next mission
	// This is not always correct - if previous mission was just completed to 100%
	// This will hold the energy requirement for that mission, not the next one.
	// But this is an insignificant problem, since the accurate energy requirement
	// will be found out on the next Missions page visit.
    var currentEnergy = get_current_energy();
    if (currentEnergy < g_missionsNextEnergy) {
        scheduler_next_task();
		return false;
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
        if (missions_log_enabled) log_write("Missions: no available missions to do *******");
        scheduler_next_task();
        return false;
    }

    var reqEnergy = mission_get_mission_energy(nextMission);
	if (reqEnergy != g_missionsNextEnergy) {
		// Update sidebar with new energy requirement
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
	if (missions_log_enabled) log_write("Missions: Doing mission " + missions_get_mission_name(nextMission) + " (" + missions_get_mission_completion(nextMission) + "%)");
    mission_do_mission(nextMission);
}

function missions_do_loot_mission() {
	// Get the category and mission from the loot list
	var lootName = g_missionsRequiredLoot;
	var cat = missions_loot[lootName][0];
    if (document.URL.indexOf("missions.php?") < 0 ||
        document.URL.indexOf("cat=" + cat) < 0) {
        // Automatically move to missions page if not already there
        window.location.href = 'missions.php?cat=' + cat;
        return false;
	}
	var missionId = missions_loot[lootName][1];
	var staminaRequired = mission_get_mission_energy(missionId);
	// See if there is enough stamina to do the next mission
    var currentEnergy = get_current_energy();
    if (currentEnergy < staminaRequired) {
        scheduler_next_task();
		return false;
    }
	if (missions_log_enabled) log_write("Missions: doing loot mission '"+missions_loot[lootName][2]+"', looking for: " + lootName);
	mission_do_mission(missionId);
	//g_missionsAutoMissionEnabled = false;
	//g_save();
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
	$('.missionDetails .masteryBarProgress').each(
        function(index) {
            var progressPercent = parseInt($(this).html(), 10);
            if (progressPercent < 100 && nextMission == -1) {
                nextMission = index;
				return false;
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

function missions_get_mission_name(index) {
	return $('.missionName').eq(index).html().trim();
}

function missions_get_mission_completion(index) {
	return parseInt($('.missionDetails .masteryBarProgress').eq(index).html(), 10);
}


function mission_do_mission(index) {
    $('.actionButton').get(index).click();
}
