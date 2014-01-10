/**
 * Total on hand cash of the user.
 *
 * On hand means cash not in the bank.
 * @return {float} Numerical value of on hand cash.
 */

function get_current_cash() {
	return format_number($('#cashCurrent').text());
}

/**
 * Current amount of energy.
 *
 * @return {float} Numerical value of energy.
 */

function get_current_energy() {
    return format_number($('#energyCurrent').text());
}

/**
 * Current amount of stamina.
 *
 * @return {float} Numerical value of stamina.
 */

function get_current_stamina() {
    return format_number($('#staminaCurrent').text());
}

/**
 * Level of the user.
 * @return {string} Level represented as a string.
 */

function get_current_level() {
	return $('.levelFrontTopArea').text();
}

function get_current_health() {
	var health = $('#healthCurrent').text().trim();
	return health;
}

function set_current_health(health) {
	$('#healthCurrent').text(health);
}

function is_in_hospital() {
	var health = get_current_health();
	if (health < 27) {
		return true;
	}
	return false;
}

/**
 * Formats any ol' numba from a string into a float.
 *
 * Removes commas, dollar signs, and any other non 0-9 char.
 * @param  {string} numba The number to convert.
 * @return {float}       Number as a float.
 */

function format_number(numba) {

	var multiplier = 1;

	if (numba.lastIndexOf('K') != -1) {
		multiplier = 1000;
	} else if (numba.lastIndexOf('mil') != -1) {
		multiplier = 1000000;
	} else if (numba.lastIndexOf('bil') != -1) {
		multiplier = 1000000000;
	}

	// Remove commas
	numba = numba.replace(/[,]/g, '');

	// Keep only digits in this numbuh
	numba = numba.replace(/\D+/, '');

	// And turn it into a float
	numba = parseFloat(numba) * multiplier;

	return numba;
}

/**
 * Takes a number and adds pretty commas.
 * @param  {int} nahmba The number, eg 2003939
 * @return {string}        The number with commas added, eg 2,003,939
 */

function numberWithCommas(nahmba) {
	return nahmba.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
