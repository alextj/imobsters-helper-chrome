function get_current_cash() {
    return parseFloat($('#cashCurrent').text());
}

function get_current_level() {
    return $('.levelFrontTopArea').text();
}

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