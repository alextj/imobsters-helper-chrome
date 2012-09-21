var options;
window.addEvent("domready", function() {

    FancySettings.initWithManifest(function(fancySettings) {

        // Generate button should generate a UDID and fill it in the input.
        fancySettings.settings.save_udid.addEvent("click", function() {
            var settings = new Store("settings");
            options = settings.toObject();

            var udid = options.mainAccount;
            var old = options.notes;

            // No UDID was entered
            if (!udid.length) {
                alert("Please enter a UDID, or click Generate to create one.");
                return false;
            }

            if (!array_contains(old.split(/\n/), udid)) {
                settings.set("notes", udid + "\n" + old);
            }



        });

        // Generate button should generate a UDID and fill it in the input.
        fancySettings.settings.generateUDID.addEvent("click", function() {
            var settings = new Store("settings");
            options = settings.toObject();

            var newid = options.androidDevice ? generate_droid_id() : generate_ios_id();
            settings.set("mainAccount", newid);

        });


    });

});

function array_contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

/**
 * Random iOS UDID generator.
 * @return {string}        Generated UDID string.
 */

function generate_ios_id() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 40; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

/**
 * Random Android UUID generator.
 * @return {string}        Generated UUID string.
 */

function generate_droid_id() {
    var S4 = function() {
            return Math.floor(
            Math.random() * 0x10000 /* 65536 */ ).toString(16);
        };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * Converts a UDID to the PF equivalent.
 * @param  {string} udid  40 character UDID.
 * @param  {boolean} droid Whether the UDID belongs to a droid.
 * @return {[type]}       PF value from UDID.
 */

function convert_to_pf(udid, droid) {

    var ios_salt = 'UltraDoux174i';
    var droid_salt = 'pr3m1umWat3r154i:12';

    var salt = droid ? droid_salt : ios_salt;

    return (udid + ':' + salt).toMD5();

}