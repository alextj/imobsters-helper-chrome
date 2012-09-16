/**
 * Begin fixing the Bank page!
 */
function bank_fixes_init() {

	bank_fix_clicks();

}

/**
 * Fix being unable to click anywhere on the bank page.
 */
function bank_fix_clicks() {

    $('input[onmousedown^="return"]').each(function (index) {
        $(this).attr('onmousedown', '');
    });

}