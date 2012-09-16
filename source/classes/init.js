$(document).ready(function () {

    function init() {

        // Create the sidebar menu
        create_sidebar();

        // Remove advertisements
        remove_adverts();

        // Equipment Fix
        if (document.URL.indexOf("equipment.php") > 0) {
            equipment_fixes();
        }

        // Investment Fix
        if (document.URL.indexOf("investment.php") > 0) {
            investment_fixes();
        }

        // Loot Fix
        if (document.URL.indexOf("selectedTab=loot") > 0) {
            loot_fixes();
        }

        // Bank Fix
        if (document.URL.indexOf("bank.php") > 0) {
            bank_fixes();
        }

        $('#auto_bank').click(function(e) {
            e.preventDefault();
            auto_bank();
        });

        $('#auto_invest').click(function(e) {
            e.preventDefault();
            auto_invest();
        });

    }

    init();

});