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
		missions_do();
        
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
	
/*
	
	Loot required:
	
<div class="messageBoxFail">
	<span class="fail">Insuccesso</span>
	You need additional equipment to complete the mission:<br>
	<table style="width: 100%; margin-top: 5px"><tbody><tr>
		<td class="vmid tac" width="60">
			<div class="equipmentReqItemPic">
				<img src="http://static.storm8.com/im/images/equipment/sm/113s.png?v=1040">
			</div>
		</td>
		<td width="4"></td>
		<td class="vmid" width="200" style="font-weight: normal">
			Bank Schematic:<span style="color: #ff1b1b">x1</span>
		</td>
	</tr></tbody></table>
</div>
	
	Equipment required:
	
<div class="messageBoxFail">
	<span class="fail">Insuccesso</span>
    You need additional equipment to complete the mission:<br>
	<table style="width: 100%; margin-top: 5px"><tbody><tr>
		<td class="vmid tac" width="60">
			<div class="equipmentReqItemPic">
				<img src="http://static.storm8.com/im/images/equipment/sm/14s.png?v=1040">
			</div>
		</td>
		<td width="4"></td>
		<td class="vmid" width="200" style="font-weight: normal">
			Molotov Cocktail: <span style="color: #ff1b1b">x1</span>
		</td>
	</tr></tbody></table>
	<div style="border-top: 1px solid rgb(51, 51, 51); padding-top: 5px; margin-top: 10px; color: white;"></div>
	<span style="font-weight: normal">
		Buy the equipment for <span class="cash"><span style="white-space: nowrap;">$700</span></span>.
	</span>
	<div style="padding-top: 7px; color: white"><center>
		<input type="button" style="width: 80px; height: 30px" class="btnMed btnDoAgain" onclick="window.location.href='/missions.php?jid=10&amp;action=buyMissingItems&amp;formNonce=9238fb083dc30a8d7ab673dd1804e41d973ed1ba&amp;setTab1Badge=4&amp;h=17a5ec387103ff90621f2599f1d91f12fdb7c837'" value="Buy">
	</center></div>
</div>
	
	
	
	
	
	GOT LOOT:
	
<div class="messageBoxSuccess missionSuccess">
	<div class="missionCompleteMessageTop">
		<img src="http://static.storm8.com/im/images/success.png?v=330">
	</div>
	<table class="missionMasteryTable">
		<tbody>
			<tr>
				<td class="missionMasteryCell1" style="vertical-align: bottom; padding-bottom: 2px;">
					<div class="missionHeader">
						Shoplifting
					</div>
				</td>
				<td align="right" class="missionMasteryCell">
					<div class="levelBox">
						<div class="levelBoxGlow">
						</div>
						<div class="levelBoxBackgr">
						</div>
						<div class="missionMastery" style="position: relative;">
							<div calss="missionMasteryBar" style="width:100px;">
           						<div class="bgMasteryBar">
             						<div class="frontMasteryBarDone" style="width: 97px;">
									</div>
           						</div>
           						<div class="masteryBarProgress" style="margin-top: -12px;">
									100% <span style="font-size: 11px;">(R4)</span>
								</div>
         					</div>
      					</div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="missionBar">
	</div>
	<table class="payoutMessage">
		<tbody>
			<tr>
				<td>
					<div class="missionPayoutGained">
						You gained:
					</div>
				</td>
				<td>
					<div class="missionPayoutUsed">
						You used:
					</div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="cash">
						<span style="white-space: nowrap;">
							$184
						</span>
					</div>
				</td>
				<td>
					1 Energy
				</td>
			</tr>
			<tr>
				<td>
					1 Experience
				</td>
				<td>
				</td>
			</tr>
		</tbody>
	</table>
	<table style="width: 100%">
		<tbody>
			<tr>
				<td>
					<div style="padding-top: 8px; padding-left: 5px">
						<span class="missionPayoutGained">
							You looted: 
						</span>
		 				Metal Pipe!<br>
						<img src="http://static.storm8.com/im/images/equipment/med/1m.png?v=1040" style="margin-top: 5px;">
					</div>
				</td>
				<td>
				</td>
				<td style="vertical-align: bottom;">
					<div style="float: right">
						<div class="doAgainTxt">
							<input type="button" class="btnMed btnDoAgain" onclick="window.location.href='/missions.php?jid=1&amp;cat=1&amp;formNonce=bde1fc12b3e1feaa0c2564441fb4ff12aca48378&amp;setTab1Badge=3&amp;h=5471070f2e085db59397aeecdcd445e00fbe8d09'" value="Do Again">
						</div>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>
*/
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
        		        log_write("Missions: purchasing " + itemName + " for $" + cashRequired);
        		
        		        $('.messageBoxFail > div > center > input.btnDoAgain').css("border", "2px dotted blue");
        		        $('.messageBoxFail > div > center > input.btnDoAgain').click();
        		        scheduler_next_task();
        		        return false;
        		    } else {
        		        // Not enough cash
        		        log_write("Missions: not enough cash to purchase " + itemName);
        		        scheduler_next_task();
        		        return false;
        		    }
        		} else {
        			// Error - couldn't find the the amount of cash required to purchase the item
					g_missionsAutoMissionEnabled = false;
					g_save();
					log_error('Missions: Couldn\t find the amount of cash needed to buy ' + itemName);
        		}
			} else {
				// This is loot item - start doing loot mission
				if (g_missionsRequiredLoot == null) {
					// This is the first time for this loot item - save item name
					log_write("Missions: Don't have the required loot item: " + itemName);
					// The text in itemName contains also amount, like so "Bank Schematic: 1x";
					g_missionsRequiredLoot = itemName.split(":")[0].trim();
					g_save();
				}
				// Start doing the loot mission
				missions_do_loot_mission();
			}
		} else if ($('div.missionSuccess').has('span.missionPayoutGained').length > 0) {
			/*<table style="width: 100%">
				<tbody>
					<tr>
						<td>
							<div style="padding-top: 8px; padding-left: 5px">
								<span class="missionPayoutGained">
									You looted: 
								</span>
				 				Metal Pipe!<br>*/
			var lootedItemName = $('div.missionSuccess > table > tbody > tr > td > div').has('span.missionPayoutGained').text().trim();
			// You looted:    Metal Pipe!
			lootedItemName = lootedItemName.split(":")[1].replace("!","").trim();
			if (lootedItemName == g_missionsRequiredLoot) {
				// Required loot found - no need to look for loot anymore.
				log_write("Missions: Found required loot item '" + g_missionsRequiredLoot + "'. Setting it to null.")
				g_missionsRequiredLoot = null;
			} else {
				var missionName = $('div.missionHeader').text();
				log_error("Missions: Received wrong loot item. Expected '"+g_missionsRequiredLoot+"', received: '"+lootedItemName+"' in mission '"+missionName+"'");
			}
		} else if ($('div.missionSuccess').length > 0 && g_missionsRequiredLoot != null) {
			var missionName = $('div.missionHeader').text();
			log_write("Missions: Loot item '" + g_missionsRequiredLoot + "' not received this time from mission '"+missionName+"'");
		}
    }
	
	if (g_missionsRequiredLoot != null) {
		// Start doing the loot mission
		missions_do_loot_mission();
		return false;
	}

	// See if there is enough stamina to do the next mission
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

	// TODO - DEBUG: remove this debug if you don't know what it is!!
	// It artificially modifies nextMission variable so that a certain mission would be triggered
	// while I'm debugging this thing! It will ruin your game if it's not removed at some point!
	//nextMission++;
	// TODO - END OF DEBUG
	
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
	log_write("Missions: doing loot mission '"+missions_loot[lootName][2]+"', looking for: " + lootName);
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
