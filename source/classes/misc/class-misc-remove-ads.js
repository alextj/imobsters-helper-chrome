/**
 * Removes advertisement banners.
 */

function remove_adverts() {

	$('.messageBoxSuccess').each(function(index) {
		if ($(this).text().indexOf('FREE') != -1) {
			$(this).remove();
		}
	});

}