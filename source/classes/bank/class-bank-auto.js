/**
 * Automatically deposit your full cash on hand amount.
 */

function bank_auto() {

	if (!bank_verify()) {
		return false;
	}

	var amount = get_current_cash();

	bank_deposit(amount);

}

/**
 * Check whether this user can use the bank.
 * @return {boolean} Shows an alert if there's an issue, and returns false.
 */

function bank_verify() {

	var level = get_current_level();

	if (!level) {
		alert("Action failed. Level could not be found.")
		return false;
	}

	if (level < 5) {
		alert("Deposit failed. You must be level 5+ to use the bank.")
		return false;
	}

	return true;

}

/**
 * Deposit any amount.
 * @param  {int} amount The amount to deposit.
 * @return {boolean}        An alert as well as boolean is returned on success / fail.
 */

function bank_deposit(amount) {

	var curCash = get_current_cash();

	if (!amount || amount === 0) {
		alert("Deposit failed. Could not find cash value.");
		return false;
	}
	
	if (amount > curCash) {
		log_write("Deposit failed. Not enough cash!");
		return false;
	}

	$.post('bank.php', {
		depositAmount: amount,
		action: 'Deposit'
	}, function(data, textStatus, xhr) {
		log_write("Success! Amount deposited: " + numberWithCommas(amount));
		return true;
	});

	return false;

}

function bank_deposit_after_tax(amount) {

	if (!amount || amount === 0) {
		alert("Deposit failed. Could not find cash value.");
		return false;
	}
	/*
	if deposited amount is 100,
	10% is taken, which is 10.
	So the deposited money is 90.
	x = in * 0.9
	in = x / 0.9
	*/
	var requiredCash = amount / 0.9 + 1;
	var curCash = get_current_cash();
	
	if (requiredCash > curCash) {
		log_write("Deposit: failed. Not enough cash!");
		return false;
	}

	$.post('bank.php', {
		depositAmount: requiredCash,
		action: 'Deposit'
	}, function(data, textStatus, xhr) {
		//log_write("Deposit: Success! Amount deposited: " + numberWithCommas(amount));
		// go to home page to update the page header
		window.location = 'home.php';
		return true;
	});

	return false;
}