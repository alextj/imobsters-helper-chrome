
function log_write(str) {
    if (g_log == null) {
        g_log = [];
		g_save();
    }
    var currentdate = new Date();
    g_log.unshift("[" +
             currentdate.getFullYear() + "-" +
             num_two_digits(currentdate.getMonth()+1)  + "-" +
             num_two_digits(currentdate.getDate()) + " " +
             num_two_digits(currentdate.getHours()) + ":" +
             num_two_digits(currentdate.getMinutes()) + ":" +
             num_two_digits(currentdate.getSeconds()) + "] " +
             str);

    if (g_log.length > 50) {
        g_log.pop();
    }

    g_save();
	var html = g_log.join('<br>');
	$('#log_window').html(html);
}

function init_log_window() {
	if (g_log == null) {
		g_log = [];
	}
	var html = g_log.join('<br>');
	$(document.createElement('div')).attr("id","log_window").html(html).appendTo('body');
	$(document.createElement('div')).attr("id","log_window_btn").html('^').appendTo("body");
	
	$('#log_window_btn').click(function() {
		if ($('#log_window').css("height") == "200px") {
			$('#log_window').css("height", 30);
			$('#log_window_btn').html("^");
            g_guiLogWindowHeight = 30;
		} else {
			$('#log_window').css("height", 200);
			$('#log_window_btn').html("v");
            g_guiLogWindowHeight = 200;
		}
        g_save();
	});
	
    $('#log_window').css("height", g_guiLogWindowHeight);
}

function num_two_digits(num) {
	if (num < 10) {
		num = "0" + num;
	}
	return num;
}