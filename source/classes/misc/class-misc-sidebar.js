/**
 * Creates a helpful sidebar to navigate through the screens.
 */
function create_sidebar() {
    var menu = get_menu_items();
    var nav = '';

    nav += create_button('', 'Auto deposit', 'auto_bank', 'btn-info' );
    nav += create_button('', 'Auto invest', 'auto_invest', 'btn-info' );

    for (var index in menu) {
        nav += create_button(menu[index], index, '', 'btn-inverse');
    }

    $(document.createElement('ul')).addClass('helper_sideBar').html(nav).appendTo('body');

}

/**
 * The standard navigation for iMobsters.
 * @return {object} An item in "Text : URL" format
 */
function get_menu_items() {

    var menu = {
        'Home'      : 'home.php',
        'Bank'      : 'bank.php',
        'Weapons'   : 'equipment.php?cat=1',
        'Protection': 'equipment.php?cat=2',
        'Vehicles'  : 'equipment.php?cat=3',
        'Fight'     : 'fight.php',
        'Missions'  : 'missions.php',
        'Investment': 'investment.php',
        'Hospital'  : 'hospital.php',
        'Profile'   : 'profile.php?x=1&selectedTab=main',
        'Skills'    : 'profile.php?x=1&selectedTab=skill',
        'Loot'      : 'profile.php?x=1&selectedTab=loot',
        'Comments'  : 'profile.php?x=1&selectedTab=comment',
        'Group'     : 'group.php',
    };

    return menu;

}

/**
 * A helper for creating button elements.
 * @param  {url} url  Href attribute.
 * @param  {string} text Text attribute.
 * @param  {string} id   ID attribute.
 * @param  {string} css  Class attribute.
 * @return {string}      Button element.
 */
function create_button(url, text, id, css) {

    var url = url ? url : '#';

    return "<a href='"+ url +"' class='btn btn-small " + css + "' id='" + id + "'>" + text + "</a>";

}