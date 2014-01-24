/**
 * Total on hand cash of the user.
 *
 * On hand means cash not in the bank.
 * @return {float} Numerical value of on hand cash.
 */

function get_current_cash() {
	return format_number($('#cashCurrent').text());
}


function get_current_income() {
	return format_number($('#cashTimerDiv > span > span').text());
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

function get_max_stamina() {
	return format_number($('#staminaMax').text());
}

/**
 * Level of the user.
 * @return {string} Level represented as a string.
 */

function get_current_level() {
	var level = parseInt($('.levelFrontTopArea').text(), 10);
	return level;
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
 * Adds thousand separation commas to numbers.
 * @return {string}	Formatted number
 * Taken from http://www.mredkj.com/javascript/numberFormat.html#addcommas
 * Author: Keith Jenci
 */
function print_num(num) {
	num += '';
	x = num.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
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
