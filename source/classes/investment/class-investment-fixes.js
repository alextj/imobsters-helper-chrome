/**
 * Begin fixing the Real Estate page!
 */

function investment_fixes_init() {

	investment_fix_sell_links();
	investment_fix_add_roi_info();
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


var investment_roi_colors = [
	"#00ff00",
	"#15ea00",
	"#2bd400",
	"#40bf00",
	"#55aa00",
	"#6a9500",
	"#808000",
	"#956a00",
	"#aa5500",
	"#bf4000",
	"#d42b00",
	"#ea1500",
	"#ff0000"
];
/**
 * Add ROI information to each real estate item.
 */

function investment_fix_add_roi_info() {
	// Real estate data
	var owned = invest_find_estate_data('.ownedNum');
	var cost = invest_find_estate_data('.reBuyAction .cash > span');
	var income = new invest_find_estate_data('.reInfoItem > .cash > span');

	// Initial cost of each real estate
	var initialCosts = [2000, 10000, 30000, 200000, 500000, 1100000, 4000000, 10000000, 20000000, 40000000, 55000000, 75000000, 105000000, 150000000, 250000000, 420000000];
	
	var roi = new Array();
	// Calculate roi for each element
	for (var i = 0; i < owned.length; i++) {
		roi.push({
			index : i,
			roi : cost[i] / income[i]
		});
	}
	
	// Sort ROI array in ascending order
	roi.sort(function(a,b){return a.roi-b.roi});
	
	// Apply colors for each element
	for (var i = 0; i < roi.length; i++) {
		if (i < investment_roi_colors.length) {
			roi[i].color = investment_roi_colors[i];
		} else {
			roi[i].color = investment_roi_colors[investment_roi_colors.length - 1];
		}
	}
	
	for (var i = 0; i < owned.length; i++) {
		var element = $('div.investItem:eq('+roi[i].index+') td.reSp:eq(0)');
		element.html('ROI: ' + roi[i].roi.toFixed(1));
		element.attr('class','roi_info');
		element.css('color', roi[i].color);
	}
}
