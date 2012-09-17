/**
 * Begin fixing home!
 */

function home_fixes_init() {

	home_remove_section_tabs();

}

/*
 * Remove the top links "All, Attacks, Comments, Broadcasts".
 *
 * These links aren't functional, so I'd rather have
 * the user use the sidebar for navigation.
 */

function home_remove_section_tabs() {

	$('#newsFeedTabs').remove();

}