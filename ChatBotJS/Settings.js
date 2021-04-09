let SETTINGS = {
    TWITCH_DATA: {
        CHANNEL: "CHANNEL NAME HERE",
        USERNAME: "BOT USERNAME HERE",
        TOKEN: "OAUTH TOKEN HERE"
    },
    MICROSERVICE_URL: "http://localhost:5000/",
    MODS_LIST: [
		"MOD NAME HERE",
    ],
    CHEER_BOT_BUY_ITEMS: {
        "magicchords": { name: "MagicChords", type: "VoiceMod", price: 50 },
        "santa": { name: "Santa", type: "VoiceMod", price: 50 },
        "gameover": { name: "GameOver", type: "VoiceMod", price: 50 },
        "titan": { name: "Titan", type: "VoiceMod", price: 50 },
        "adulttochild": { name: "AdultToChild", type: "VoiceMod", price: 50 },
        "cathedral": { name: "Cathedral", type: "VoiceMod", price: 50 },
        "speechifier": { name: "Speechifier", type: "VoiceMod", price: 50 },
        "robot": { name: "Robot", type: "VoiceMod", price: 50 }
    },
    KEY_TRIGGER_EVENTS: {
        "MagicChords": [
            { keys: [ "NUMPAD 0", "NUMPAD 2" ], delay: 0, message: "Switching voice to MagicChords" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "Santa": [
            { keys: [ "NUMPAD 0", "NUMPAD 3" ], delay: 0, message: "Switching voice to Santa" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "GameOver": [
            { keys: [ "NUMPAD 0", "NUMPAD 4" ], delay: 0, message: "Switching voice to GameOver" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "Titan": [
            { keys: [ "NUMPAD 0", "NUMPAD 5" ], delay: 0, message: "Switching voice to Titan" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "AdultToChild": [
            { keys: [ "NUMPAD 0", "NUMPAD 6" ], delay: 0, message: "Switching voice to AdultToChild" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "Cathedral": [
            { keys: [ "NUMPAD 0", "NUMPAD 7" ], delay: 0, message: "Switching voice to Cathedral" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "Speechifier": [
            { keys: [ "NUMPAD 0", "NUMPAD 8" ], delay: 0, message: "Switching voice to Speechifier" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
        "Robot": [
            { keys: [ "NUMPAD 0", "NUMPAD 9" ], delay: 0, message: "Switching voice to Robot" },
            { keys: [ "NUMPAD 0", "NUMPAD 1" ], delay: 30000, message: "Switching voice back to Normal" }
        ],
    }
}