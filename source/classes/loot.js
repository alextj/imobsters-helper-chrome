/**
 * Fix sell links to work on the Loot page.
 */
function loot_fixes() {

    // javascript:sellEquipmentDialog('profile.php?x=1&selectedTab=loot', 114, 0, 'Enemy Plans', 1, 'd0013ead3db3cfb51b19aa97ebd1608abe5d31df', 'sell')

    $('a[href^="javascript:sellEquipmentDialog"]').each(function (index) {
        var values = $.map(this.href.split(","), $.trim);
        this.href = "profile.php?x=1&selectedTab=loot&action=sell&iid=" + values[1] + "&cat=" + values[2] + "&formNonce=" + values[5].replace(/'/g, '');
    });

}