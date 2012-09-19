// SAMPLE
window.manifest = {
  "name": "iMobsters Helper",
  "settings": [

  /* Accounts */
    {
      "tab": "Accounts",
      "group": "Setup",
      "name": "mainAccount",
      "type": "text",
      "label": 'Enter UDID',
      "placeholder": "",
      "masked": false,
      "default": ""
    },
    {
      "tab": "Accounts",
      "group": "Setup",
      "name": "androidDevice",
      "type": "checkbox",
      "label": "Android device",
      "default": false
    },
    {
      "tab": "Accounts",
      "group": "History",
      "name": "generateUDID",
      "type": "pushButton",
      "label": "Generate a fake UDID",
      "value": "Generate"
    },
    {
      "tab": "Accounts",
      "group": "History",
      "name": "login",
      "type": "pushButton",
      "value": "Save"
    },
    {
      "tab": "Accounts",
      "group": "History",
      "name": "notes",
      "type": "textarea",
      "label": "This textbox contains UDIDs you've saved",
      "default": ""
    },

    /* Autos */

    // Invite
    {
      "tab": "Autos",
      "group": "Invite",
      "name": "inviteCodes",
      "type": "textarea",
      "label": "Enter a list of codes",
      "placeholder": "AJAF38,YP3ST3,938FJD,etc",
      "default": ""
    },

    // Heal
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "heal_auto",
      "type": "checkbox",
      "label": "Heal automatically",
      "default": true
    },
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "heal_auto_label",
      "type": "label",
      "label": "Automatically heal you as you're fighting other users. Only heals when your health is at or below the threshold point."
    },
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "health_threshold",
      "type": "slider",
      "label": "Threshold:",
      "min": 0,
      "max": 100,
      "step": 1,
      "display": true,
      "displayModifier": function (value) {
        return value + "%";
      },
      "default": 50
    },
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "heal_ninja",
      "type": "checkbox",
      "label": "Ninja heal",
      "default": false
    },
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "heal_silent_label",
      "type": "label",
      "label": "Hide the prompt that says whether healing was successful or not."
    },

    // Fight
    {
      "tab": "Autos",
      "group": "Fight",
      "name": "fight_hide_strong",
      "type": "checkbox",
      "label": "Hide strong players",
      "default": true
    },
    {
      "tab": "Autos",
      "group": "Fight",
      "name": "fight_hide_strong_label",
      "type": "label",
      "label": "Automatically hide players that are stronger than you. This will calculate each player's total defense points and compare it with your total attack points. If a player's defense is higher than your attack points, the player will be hidden."
    },
  ]
};
