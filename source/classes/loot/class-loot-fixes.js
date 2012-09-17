/**
 * Begin fixing the loot page!
 */

function loot_fixes_init() {

	loot_fix_sell_links();

}

/**
 * Fix sell links to work on the Loot page.
 */

function loot_fix_sell_links() {

	$('a[href^="javascript:sellEquipmentDialog"]').each(function(index) {
		var values = $.map(this.href.split(","), $.trim);
		this.href = "profile.php?x=1&selectedTab=loot&action=sell&iid=" + values[1] + "&cat=" + values[2] + "&formNonce=" + values[5].replace(/'/g, '');
	});

}