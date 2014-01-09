
function log_write(str) {
    if (g_log == null) {
        g_log = "";
    }
    var currentdate = new Date();
    g_log += "[" +
             currentdate.getFullYear() + "-" +
            (currentdate.getMonth()+1)  + "-" +
             currentdate.getDate() + " " +
             currentdate.getHours() + ":" +
             currentdate.getMinutes() + ":" +
             currentdate.getSeconds() + "] " +
             str + '<br>';
    g_save();
}
