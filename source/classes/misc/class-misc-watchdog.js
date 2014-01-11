
setTimeout(check_page_state, 10000);

function check_page_state() {
	if (typeof(g_page_loaded) == "undefined") {
		window.location.href = 'home.php';
	}
}