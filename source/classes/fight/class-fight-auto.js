/*
Auto-fighting - Normal mob attack (no hitlist attack) Version 1.0

When to attack:
 - As soon as there is any Stamina.
 - There is enough health.
   + If not enough health, heal and try fighting again, if there is enough money in bank.
     - If not enough money in bank, deposit and try to heal again, if there is enough cash.
       + If there is not enough cash, write down required amount and try depositing again where there is enough.

Who to attack:
 - Anyone with mob size < (current_mob_size - 2).
 - Keep a list of last 20 attacked mobsters and do not attack the same ones. The list is FIFO.
 - If there is no suitable mobster to attack, refresh the list and try again.

Usage of auto-attack timer:
 - At least 10 seconds interval
 - 

Keep track of fight results

-----------------------------------
Auto-fighting - Normal mob attack (no hitlist attack) Version 1.1

Smart use of health (stay in hospital tactic):
 - If not in hospital
   + Attack as soon as there is any Stamina.
 - If in hospital
   + Heal only when there is enough Stamina to put us back into hospital (~10 Stamina for starters).

Smart user of health - checking if in hospital
 - Check if health is less than N.
   + N depends on maximum health. N can be found manually by trying and then hardcoded.
     - 26 is in hospital
     - 27 is out of hospital
   + The only maximum health supported is 100, because increasing it is useless.

Smart use of health - result monitoring:
 - If we don't end up in hospital immediately after healing and attacking with a set number of Stamina
   + Increase the number of Stamina required to heal by 1
 - If we end up in hospital with more than 3 stamina
   + Decrease the number of Stamina required to heal by 1

*/

var fight_timer = 0;
// TODO: get mob size dynamically
var mob_size = 4;

function fight_timer_start() {
    fight_timer = setInterval(fight_timer_tick, 10000);
}

function fight_timer_tick() {
    fight_run_auto_fight();
}

function fight_timer_stop() {
    clearInterval(fight_timer);
}

function fight_run_auto_fight() {
    if (g_fightAutoFightEnabled === true) {
		var currentStamina = get_current_stamina();
		if (is_in_hospital()) {
			// Initialize minimum stamina if it was never set
			if (g_fightMinStaminaToHeal == null) {
				g_fightMinStaminaToHeal = 5;
			}
			if (currentStamina < g_fightMinStaminaToHeal) {
				// Not enough stamina to heal, wait for more stamina
				log_write('In hospital, waiting for ' + g_fightMinStaminaToHeal + ' S before healing');
				return false;
			} else {
				// There is enough stamina - heal now and fight!
				log_write('In hospital, healing!');
				heal_auto();
			}
		} else {
			if (currentStamina > 0) {
				// Find someone to attack now!
				fight_do();
			} else {
				// Wait till there is enough stamina
				return false;
			}
		}
    }
}

function fight_do() {
	if (g_foughtMobsters == null) {
		g_foughtMobsters = [];
	}
    if (document.URL.indexOf("fight.php") < 1) {
        // Automatically move to fight page if not already there
        window.location.href = 'fight.php';
        return false;
	}
	$('.fightMobSize').each(function(index) {
		var thisMobSize = $(this).text().trim();
		if (thisMobSize <= mob_size - 3) {
			// Small enough to attack
			var mob_id = fight_mob_id(index);
			if (fight_mob_not_attacked_before(mob_id)) {
				
				var mob_name = fight_mob_name(index);
				log_write("Fight: attacking mobster " + mob_name + ", id " + mob_id + ", size " + thisMobSize);
				fight_add_mob_to_attacked_list(mob_id);
				fight_attack_mob(index);
				// return false to break from each loop
				return false;
			} else {
				// This mob was recentyl attacked, skip it
			}
		} else {
			// This mob is too big, skip it
		}
	});
}
function fight_mob_id(index) {
	var mob_id = 0;
	var link_text = $('.fightMobster > div > a').eq(index).attr("href");
	var start = link_text.indexOf("puid=");
	if (start > 0) {
		start = start + ("puid=").length;
		var end = link_text.indexOf("&", start);
		if (end < 0) {
			end = link_text.length;
		}
		mob_id = link_text.substring(start, end);
	}
	return mob_id;
}
function fight_mob_name(index) {
	return $('.fightMobster > div > a').eq(index).text().trim();
}
function fight_attack_mob(index) {
    $('.fightAction > a').get(index).click();
}
function fight_add_mob_to_attacked_list(mob_id) {
	g_foughtMobsters.push(mob_id);
	if (g_foughtMobsters.length > 20) {
		// Queue maximum size reached, remove the oldest mob_id form the list
		g_foughtMobsters.shift();
	}
}

function fight_mob_not_attacked_before(mob_id) {
	var not_attacked = true;
	for (var i = 0; i < g_foughtMobsters.length; i++) {
		if (g_foughtMobsters[i] == mob_id) {
			not_attacked = false;
			break;
		}
	}
	return not_attacked;
}

function fight_reset_fight_count() {
	g_totalFights = 0;
	g_lostFights = 0;
}

function fight_get_fight_result() {
	/*
	<div id="fightResult">
    	<div class="messageBoxSuccess">
    		<span class="success">Eccellente!</span>
    		<div style="height:12px"></div>
    		<span class="wonFight">You won the fight</span>
	
	<div id="fightResult">
    	<div class="messageBoxFail" style="width: 92%">
    		<span class="fail">Insuccesso...</span>
    		<div style="height:12px"></div>
    		<span class="lostFight">You lost the fight</span>
	*/
	if (g_totalFights == null) {
		g_totalFights = 0;
	}
	if (g_lostFights == null) {
		g_lostFights = 0;
	}
	var hasWon = false;
	if ($('#fightResult > div').first().attr("class") == "messageBoxSuccess") {
		hasWon = true;
	} else {
	}

	g_totalFights++;
	if (hasWon == false) {
		g_lostFights++;
	}

	var percentage = g_lostFights * 100 / g_totalFights;
	if (hasWon) {
		log_write("Fight: won (" + percentage + "% lost total)");
	} else {
		log_write("Fight: LOST! (" + percentage + "% lost total)");
	}

	if (g_totalFights > 10 && percentage > 10) {
		log_write("Fight: auto-fight stopped, losing percentage too high (" + percentage + "% lost total)");
		g_fightAutoFightEnabled = false;
		g_save();
	}
}