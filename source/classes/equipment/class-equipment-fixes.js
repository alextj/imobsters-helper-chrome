/**
 * Begin fixing equipments!
 */

function equipment_fixes_init() {

	equipment_remove_section_tabs();
	equipment_fix_sell_links();

}

/**
 * Also fix sell links to work on the Equipment page.
 */

function equipment_fix_sell_links() {

	$('a[href^="javascript:sellEquipmentDialog"]').each(function(index) {
		var values = $.map(this.href.split(","), $.trim);
		this.href = "equipment.php?action=sell&iid=" + values[1] + "&cat=" + values[2] + "&formNonce=" + values[5].replace(/'/g, '');
	});

}

/*
 * Remove the top links "Weapons, Protection, Vehicles".
 *
 * These links aren't functional, so I'd rather have
 * the user use the sidebar for navigation.
 */

function equipment_remove_section_tabs() {

	$('.sectionTabs').remove();

}