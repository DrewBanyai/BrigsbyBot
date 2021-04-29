let addVoiceModItems = () => {
    if (!SETTINGS) { console.error("No SETTINGS structure found... could not add Voice Mod Items"); return; }
    if (!SETTINGS.hasOwnProperty("BOT_ITEMS_LIST")) { console.error("SETTINGS structure does not have an entry for BOT_ITEMS_LIST... could not add Voice Mod Items"); return; }
    if (!SETTINGS.hasOwnProperty("KEY_TRIGGER_EVENTS")) { console.error("SETTINGS structure does not have an entry for KEY_TRIGGER_EVENTS... could not add Key Trigger Events"); return; }

    //  Add the different items for the bot to manage, with prices and type
    SETTINGS.BOT_ITEMS_LIST["magicchords"] = { name: "MagicChords", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["santa"] = { name: "Santa", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["gameover"] = { name: "GameOver", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["titan"] = { name: "Titan", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["adulttochild"] = { name: "AdultToChild", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["cathedral"] = { name: "Cathedral", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["speechifier"] = { name: "Speechifier", type: "VoiceMod", price: 50 };
    SETTINGS.BOT_ITEMS_LIST["robot"] = { name: "Robot", type: "VoiceMod", price: 50 };

    //  Add the different key trigger events for each bot item added
    SETTINGS.KEY_TRIGGER_EVENTS["MagicChords"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 2" ], delay: 0, message: "Switching voice to MagicChords" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["Santa"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 3" ], delay: 0, message: "Switching voice to Santa" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["GameOver"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 4" ], delay: 0, message: "Switching voice to GameOver" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["Titan"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 5" ], delay: 0, message: "Switching voice to Titan" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["AdultToChild"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 6" ], delay: 0, message: "Switching voice to AdultToChild" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["Cathedral"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 7" ], delay: 0, message: "Switching voice to Cathedral" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["Speechifier"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 8" ], delay: 0, message: "Switching voice to Speechifier" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
    SETTINGS.KEY_TRIGGER_EVENTS["Robot"] = [
        { keys: [ "NUMPAD 0", "NUMPAD 9" ], delay: 0, message: "Switching voice to Robot" },
        { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
    ];
}

addVoiceModItems();