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
 * Level of the user.
 * @return {string} Level represented as a string.
 */
function get_current_level() {
    return $('.levelFrontTopArea').text();
}

/**
 * Formats any ol' numba from a string into a float.
 *
 * Removes commas, dollar signs, and any other non 0-9 char.
 * @param  {string} numba The number to convert.
 * @return {float}       Number as a float.
 */
function format_number(numba) {

    numba = numba.replace(/[$,]/g,'');

    if (numba.lastIndexOf('K') != -1) {
        numba = parseFloat(numba) * 1000;
    } else if (numba.lastIndexOf('mil') != -1) {
        numba = parseFloat(numba) * 1000000;
    } else if (numba.lastIndexOf('bil') != -1) {
        numba = parseFloat(numba) * 1000000000;
    } else {
        numba = parseFloat(numba);
    }

    return numba;
}