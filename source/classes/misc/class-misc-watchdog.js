
setTimeout(check_page_state, 10000);

function check_page_state() {
	if (g_page_loaded !== true) {
		window.location.href = 'home.php';
	}
}