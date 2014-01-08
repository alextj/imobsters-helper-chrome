

function missions_run_auto_missions() {

    var currentEnergy = get_current_energy();
    if (currentEnergy >= g_missionsNextEnergy) {

    }
}

function missions_do() {

    if (document.URL.indexOf("missions.php") < 1) {
        // Automatically move to missions page if not already there
        missions_load_page_and_do();
        return false;
	}


}

function missions_load_page_and_do() {

    window.location.href = 'missions.php';
    g_missionsStartDoingNow = true;
    g_save();
}
