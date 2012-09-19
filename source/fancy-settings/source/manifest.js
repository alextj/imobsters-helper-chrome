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
      "name": "autoHeal",
      "type": "checkbox",
      "label": "Heal automatically while fighting",
      "default": true
    },
    {
      "tab": "Autos",
      "group": "Heal",
      "name": "myLabel",
      "type": "label",
      "label": "As you're fighting other users, if the bot detects that your health is too low to fight anymore, it will automatically heal you. An alert message will show with the status of the healing, whether it was successful or not."
    },
  ]
};
