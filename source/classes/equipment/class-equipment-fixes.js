/**
 * Remove the top links "Weapons, Protection, Vehicles".
 * Also fix sell links to work on the Equipment page.
 */
function equipment_fixes() {

    $('.sectionTabs').remove();

    $('a[href^="javascript:sellEquipmentDialog"]').each(function (index) {
        var values = $.map(this.href.split(","), $.trim);
        this.href = "equipment.php?action=sell&iid=" + values[1] + "&cat=" + values[2] + "&formNonce=" + values[5].replace(/'/g, '');
    });

}