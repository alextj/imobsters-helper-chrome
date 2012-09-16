/**
 * Fix being unable to click anywhere on the bank page.
 */
function bank_fixes() {

    $('input[onmousedown^="return"]').each(function (index) {
        $(this).attr('onmousedown', '');
    });

}