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
      "group": "Login",
      "name": "myPushButton",
      "type": "pushButton",
      "label": "Sign in with your device",
      "value": "Login"
    },
    {
      "tab": "Accounts",
      "group": "Notes",
      "name": "notes",
      "type": "textarea",
      "label": "Keep track of UDIDs you want to login with",
      "default": ""
    },

    /* Autos */
    {
      "tab": "Autos",
      "group": "Invite",
      "name": "inviteCodes",
      "type": "textarea",
      "label": "Enter a list of codes",
      "placeholder": "AJAF38,YP3ST3,938FJD,etc",
      "default": ""
    },
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
      "label": "Automatically heal you as you're fighting other users. Only heals when your health is at its lowest."
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
  ]
};
