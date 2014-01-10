
function log_write(str) {
    if (g_log == null) {
        g_log = "";
    }
    var currentdate = new Date();
    g_log = "[" +
             currentdate.getFullYear() + "-" +
             num_two_digits(currentdate.getMonth()+1)  + "-" +
             num_two_digits(currentdate.getDate()) + " " +
             num_two_digits(currentdate.getHours()) + ":" +
             num_two_digits(currentdate.getMinutes()) + ":" +
             num_two_digits(currentdate.getSeconds()) + "] " +
             str + '<br>' + g_log;
    g_save();
	$('#log_window').html(g_log);
}

function num_two_digits(num) {
	if (num < 10) {
		num = "0" + num;
	}
	return num;
}
