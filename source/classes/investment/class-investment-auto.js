function investment_auto() {

    if ( !invest_verify() ) {
        return false;
    }

	var owned = new Array();
	var cost = new Array();
	var income = new Array();
	var buyThese = {};

	$('.ownedNum').each(function (index) {
        owned.push(format_number($(this).html()));
    });

	$('.reBuyAction .cash > span').each(function (index) {
        cost.push(format_number($(this).html()));
    });

	$('.reInfoItem > .cash > span').each(function (index) {
        income.push(format_number($(this).html()));
    });

    formNonce = $('a[href*="investment.php?action=buy&inv_id=1&formNonce"]').attr('href').split('&');
    formNonce = formNonce[2].replace('formNonce=', '');

    data = do_calculations(owned, cost, income);
    buyThese = data['buyThese'];

	for (var index in buyThese) {

		var amount = buyThese[index];

		if ( amount == 0 ) {
			continue;
		}

        console.log('http://im.storm8.com/investment.php?action=buy&formNonce=' + formNonce + '&inv_id=' + (parseInt(index)+1));

		$.post('http://im.storm8.com/investment.php?action=buy&formNonce=' + formNonce + '&inv_id=' + (parseInt(index)+1), {numberOfInv: amount}, function(data, textStatus, xhr) {
	        formNonce = $(data).find('a[href*="investment.php?action=buy&inv_id=1&formNonce"]').attr('href').split('&');
	        formNonce = formNonce[2].replace('formNonce=', '');
		});

	}

    alert(
        "Newly gained income: " + numberWithCommas(data['newIncome']) + "\n\n\
        Total money spent: " + numberWithCommas(data['totalCost'])
    );

}

function invest_verify() {

    var level = get_current_level();

    if ( !level ) {
        alert("Action failed. Level could not be found.")
        return false;
    }

    if ( level < 7 ) {
        alert("Action failed. You must be level 7+ to purchase buildings.")
        return false;
    }

    if (document.URL.indexOf("investment.php") < 1) {
      alert("Action failed. You must be on the investment page to use this button");
      return false;
    }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function do_calculations(owned, cost, income) {

    /* Initial cost of each real estate */
    var initialCosts = [
        2000,
        10000,
        30000,
        200000,
        500000,
        1100000,
        4000000,
        10000000,
        20000000,
        40000000,
        55000000,
        75000000,
        105000000,
        150000000,
        250000000,
        420000000,
    ]

    var spendingAmount = get_current_cash();
    var totalCost = 0;
    var newIncome = 0;
    var buyThese = {};
    for (var i=0; i < owned.length; i++) {
        buyThese[i] = 0;
    }

    Array.min = function( array ){
       return Math.min.apply( Math, array );
    };

    while ( totalCost < spendingAmount ) {

        /* Find next building to buy */
        var roi = new Array();
        for (var i=0; i < owned.length; i++) {
            roi.push(cost[i] / income[i]);
        }


        /* Find the best ROI */
        minRoi = Array.min(roi);

        /* Identify the best ROI */
        minRoiIndex = $.inArray(minRoi, roi);

        /* Cost to buy this */
        costOfminRoi = cost[minRoiIndex];

        /* We ran out of funds! We're done here */
        if ( (totalCost + costOfminRoi) > spendingAmount ) {
            return {
                'buyThese': buyThese,
                'newIncome': newIncome,
                'totalCost': totalCost
            };
        }

        newIncome += income[minRoiIndex];
        buyThese[minRoiIndex]++;
        totalCost += costOfminRoi;

        /* Increase cost by 10% now that it's bought */
        cost[minRoiIndex] = (0.10 * initialCosts[minRoiIndex]) + costOfminRoi;

        /* Increase current owned by one */
        owned[minRoiIndex] += 1;

    }

}