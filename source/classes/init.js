$(document).ready(function () {

    function init() {

        // Create the sidebar menu
        create_sidebar();

        // Remove advertisements
        remove_adverts();

        // Equipment Fix
        if (document.URL.indexOf("equipment.php") > 0) {
            equipment_fixes_init();
        }

        // Investment Fix
        if (document.URL.indexOf("investment.php") > 0) {
            investment_fixes_init();
        }

        // Loot Fix
        if (document.URL.indexOf("selectedTab=loot") > 0) {
            loot_fixes_init();
        }

        // Bank Fix
        if (document.URL.indexOf("bank.php") > 0) {
            bank_fixes_init();
        }

        $('#bank_auto').click(function(e) {
            e.preventDefault();
            bank_auto();
        });

        $('#investment_auto').click(function(e) {
            e.preventDefault();
            investment_auto();
        });

    }

    init();

});