/**
 * Begin fixing the Real Estate page!
 */

function investment_fixes_init() {

	investment_fix_sell_links();

}

/**
 * Fix sell links to work on the Real Estate page.
 */

function investment_fix_sell_links() {

	$('a[href^="javascript:sellInvestmentDialog"]').each(function(index) {
		var values = $.map(this.href.split(","), $.trim);
		this.href = 'investment.php?action=sell&inv_id=' + values[1] + '&formNonce=' + values[4].replace(/'/g, '');
	});

}