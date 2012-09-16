$(document).ready(function () {

    function init() {

        // Create the sidebar menu
        create_sidebar();

        // Remove advertisements
        remove_adverts();

        // Equipment fix
        if (document.URL.indexOf("equipment.php") > 0) {
            equipment_fixes_init();
        }

        // Investment fix
        if (document.URL.indexOf("investment.php") > 0) {
            investment_fixes_init();
        }

        // Loot fix
        if (document.URL.indexOf("selectedTab=loot") > 0) {
            loot_fixes_init();
        }

        // Bank fix
        if (document.URL.indexOf("bank.php") > 0) {
            bank_fixes_init();
        }

        // Deposit all your monies
        $('#bank_auto').click(function(e) {
            e.preventDefault();
            bank_auto();
        });

        // Auto invest in real estate
        $('#investment_auto').click(function(e) {
            e.preventDefault();
            investment_auto();
        });

    }

    init();

});