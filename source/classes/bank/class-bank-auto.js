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

	if (amount === 0) {
		alert("Deposit failed. You have no cash to bank!")
		return false;
	}

	if (!amount) {
		alert("Deposit failed. Could not find cash value.");
		return false;
	}

	$.post('bank.php', {
		depositAmount: amount,
		action: 'Deposit'
	}, function(data, textStatus, xhr) {
		alert("Success! Amount deposited: " + amount);
		return true;
	});

	return false;

}