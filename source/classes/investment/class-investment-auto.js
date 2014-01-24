
function investment_task_run() {
	if (g_investmentAutoInvestEnabled == true) {
		if (get_current_level() >= 7) {
			var currentIncome = get_current_income();
			// We want to always leave at least (1x current income) of cash - 
			// So purchase only when there is (current income + price of investment) cash at hand
        	if (get_current_cash() > g_investmentNextCost + currentIncome) {
				setTimeout(function() {
					investment_do();
				}, (1000 + Math.random() * 1500));
        	} else {
        		scheduler_next_task();
        	}
		} else {
        	scheduler_next_task();
		}
	} else {
		scheduler_next_task();
	}
}

function investment_do() {

	if (document.URL.indexOf("investment.php") < 1) {
      	window.location.href = 'investment.php';
      	return false;
	}

    var estateNames = [
        "Street Vendor",
        "Shack",
        "Convenience Store",
        "Restaurant",
        "Night Club",
        "Luxury Condos",
        "Shopping Mall",
        "Resort Hotel",
        "Office Tower",
        "Casino",
        "Amusement Park",
        "Horse Racing Circuit",
        "Professional Basketball Team",
        "Television Studio  ",
        "Auction House",
        "Record Label",
    ];

	data = invest_calculations();

	var buyThese = data['buyThese'];
	var formNonce = invest_find_formnonce();
    var itemsBought = 0;
	for (var index in buyThese) {

		var amount = buyThese[index];

		// Skip buildings that do not require a purchase
		if (amount == 0) {
			continue;
		}
		
		invest_purchase(parseInt(index) + 1, amount, formNonce);
        //log_write("Investment: purchased " + amount + "x " + estateNames[index]);
        itemsBought++;
	}
    if (itemsBought > 0) {
        var cost = invest_find_estate_data('.reBuyAction .cash > span');
        var nextName = estateNames[data['nextItemIndex']];
        var nextCost = cost[data['nextItemIndex']];
        //log_write("Investment: now saving up for " + nextName + " ($" + nextCost + ")");
	}
	window.location.href = 'home.php';
}

/**
 * Find the best ROI for each building, and
 * calculate how much of each should be bought.
 * @return {array} buyThese, newIncome, totalCost are the keys
 *                 in the return array.
 */

function invest_calculations() {

	// Initalizations
	var totalCost = 0;
	var newIncome = 0;
	var buyThese = {};

	// Cash on hand
	var spendingAmount = get_current_cash();

	// Real estate data
	var owned = invest_find_estate_data('.ownedNum');
	var cost = invest_find_estate_data('.reBuyAction .cash > span');
	var income = new invest_find_estate_data('.reInfoItem > .cash > span');

	// Initial cost of each real estate
	var initialCosts = [2000, 10000, 30000, 200000, 500000, 1100000, 4000000, 10000000, 20000000, 40000000, 55000000, 75000000, 105000000, 150000000, 250000000, 420000000];

	for (var i = 0; i < owned.length; i++) {
		buyThese[i] = 0;
	}

	Array.min = function(array) {
		return Math.min.apply(Math, array);
	};
	var numBuildingsToBuy = 0;
	while (totalCost < spendingAmount) {

		// Find next building to buy
		var roi = new Array();
		for (var i = 0; i < owned.length; i++) {
			roi.push(cost[i] / income[i]);
		}

		// Find the best ROI
		minRoi = Array.min(roi);

		// Identify the best ROI
		minRoiIndex = $.inArray(minRoi, roi);

		// Cost to buy this
		costOfminRoi = cost[minRoiIndex];

		// We ran out of funds! We're done here
		/* Note: small hack to set maximum number of buildings to buy at one time */
		/* Currently set to 1 (end when numBuildingsToBuy > 0)*/
		if ((totalCost + costOfminRoi) > spendingAmount || numBuildingsToBuy > 0) {
            g_investmentNextCost = costOfminRoi;
            g_save();
            sidebar_update_status();
			return {
				'buyThese': buyThese,
				'newIncome': newIncome,
				'totalCost': totalCost,
				'nextItemIndex' : minRoiIndex
			};
		}

		buyThese[minRoiIndex]++;
		newIncome += income[minRoiIndex];
		totalCost += costOfminRoi;

		// Increase cost by 10% now that it's bought
		cost[minRoiIndex] = (0.10 * initialCosts[minRoiIndex]) + costOfminRoi;

		// Increase current owned by one
		owned[minRoiIndex] += 1;
		numBuildingsToBuy++;
	}
}

/**
 * The csrf token should be found and used
 * when purchasing real estate.
 * @param  {string} data An HTML body, optional.
 * @return {string}      The csrf token, aka nonce.
 */

function invest_find_formnonce(data) {

	searchDis = 'a[href*="investment.php?action=buy&inv_id=1&formNonce"]';

	url = data ? $(data).find(searchDis) : $(searchDis);

	nonce = $(url).attr('href').split('&');
	nonce = nonce[2].replace('formNonce=', '');

	return nonce;

}

/**
 * Helper function for findng all instances of
 * an element, and returning it's html (text) value.
 * @param  {string} find The element, such as a[href="google.com"].
 * @return {array}      Each instance of the found's text value.
 */

function invest_find_estate_data(find) {

	var temp = new Array();

	$(find).each(function(index) {
		temp.push(format_number($(this).html()));
	});

	return temp;

}

/**
 * Purchase a set amount of real estate.
 * @param  {int} itemID    The estate's ID.
 * @param  {int} amount    Amount to purchase.
 * @param  {string} formNonce A unique token, set by the website.
 */

function invest_purchase(itemID, amount, formNonce) {

	$.ajax({
		type: 'POST',
		url: 'http://im.storm8.com/investment.php?action=buy&formNonce=' + formNonce + '&inv_id=' + itemID,
		data: {
			numberOfInv: amount
		},
		success: function(dataReturn) {
			formNonce = invest_find_formnonce(dataReturn);
		},
		async: false
	});

}
