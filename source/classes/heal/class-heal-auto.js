/**
 * Init for some healing power.
 */

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
		log_write("Healing: Action failed. Level could not be found.");
		return false;
	}

	if (level < 5) {
		log_write("Healing: Action failed. You must be level 5+ to heal.");
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
		var iBank = format_number(cash);
		var iDiff = iCost - iBank;
		if (iBank < iCost) {
			log_write("Healing: not enough money in bank to heal - depositing " + iDiff);
			bank_deposit_after_tax(iDiff);
			return false;
		} else {
			$.get(url, function(data) {
				heal_check_success(data, cost);
			})
		}

	} else {
		var text = $(data).find('.hospitalText').text();
		log_write('Healing: Failed. ' + text);
		return false;
	}

	return false;

}

function heal_check_success(data, cost) {

	var failedText = $(data).find('.messageBoxFail').text();

	if (failedText) {
		log_write("Healing: Failed. Cost to heal: " + cost + ". " + failedText.replace('Insuccesso: ', ''));
		return false;
	} else {
		log_write('Healing: Success. Healed for: ' + cost);
		location.reload();
		return true;
	}

	return false;

}