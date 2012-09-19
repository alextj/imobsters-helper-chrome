/**
 * Init for some healing power.
 */

function heal_auto() {

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
		alert("Action failed. Level could not be found.")
		return false;
	}

	if (level < 5) {
		alert("Action failed. You must be level 5+ to heal.")
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

		if (format_number(cash) < format_number(cost)) {
			alert("Failed. You don't have enough money in the bank to pay for that.")
			return false;
		} else {
			$.get(url, function(data) {
				heal_check_success(data, cost);
			})
		}

	} else {
		var text = $(data).find('.hospitalText').text();
		alert('Failed. ' + text);
		return false;
	}

	return false;

}

function heal_check_success(data, cost) {

	var failedText = $(data).find('.messageBoxFail').text();

	if (failedText) {
		alert("Failed. Cost to heal: " + cost + ". " + failedText.replace('Insuccesso: ', ''));
	} else {
		alert('Success. Healed for: ' + cost);
	}

}