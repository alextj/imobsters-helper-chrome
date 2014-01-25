/**
 * Init for some healing power.
 */

var heal_log_enabled = true;

function heal_auto() {
	heal_error_not_enough_money = false;
	if (!heal_verify()) {
		return false;
	}
	
	heal_find_button();

}

/**
 * Confirm whether the current user can heal
 * or not by checking their level.
 * @return {boolean} User is verified.
 */

function heal_verify() {

	var level = get_current_level();

	if (!level) {
		log_error("Healing: Action failed. Level could not be found.");
		scheduler_next_task();
		return false;
	}

	if (level < 5) {
		if (heal_log_enabled) log_write("Healing: Action failed. You must be level 5+ to heal.");
		scheduler_next_task();
		return false;
	}

	// Assuming all is well
	return true;

}

function heal_find_button() {

	var url = 'http://im.storm8.com/hospital.php';

	$.get(url, function(data) {

		heal_process(data);

	});

}

function heal_process(data) {

	var healButton = $(data).find('.healBtn > a');
	var url = $(healButton).attr('href');

	if (url) {

		var cost = $(healButton).find('.healActionInner > span').text();
		var cash = $(data).find('.hospitalText .cash').text();

		var iCost = format_number(cost);
		if (iCost >= 1000000) {
			// Multiply the cost of healing a little bit, because
			// healing might cost more than what's written! For example:
			// it says: Healing cost 1,221K
			// -- it doesn't show the last 3 numbers. They are not necessarily
			// "000", they might be "456".
			iCost = iCost * 1.01;
		}
		var iBank = format_number(cash);
		var iDiff = iCost - iBank;
		if (iBank < iCost) {
			if (heal_log_enabled) log_write("Healing: not enough money in bank to heal - cost of healing: $" + iCost + ", in bank: $" + iBank + ", depositing " + iDiff);
			bank_deposit_after_tax(iDiff);
			return false;
		} else {
			$.get(url, function(data) {
				heal_check_success(data, cost);
			})
		}

	} else {
		var text = $(data).find('.hospitalText').text();
		log_error('Healing: Failed. ' + text);
		scheduler_next_task();
		return false;
	}

	return false;

}

function heal_check_success(data, cost) {

	var failedText = $(data).find('.messageBoxFail').text();

	if (failedText) {
		if (heal_log_enabled) log_write("Healing: Failed. Cost to heal: " + cost + ". " + failedText.replace('Insuccesso: ', ''));
		scheduler_next_task();
		return false;
	} else {
		if (heal_log_enabled) log_write('Healing: Success. Healed for: ' + cost);
		window.location.href = 'home.php';
		return true;
	}

	return false;

}