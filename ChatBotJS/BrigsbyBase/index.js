//  The TwitchJS library requires that these variables be named "token" and channel"
//  You can generate a token here: https://twitchapps.com/tmi/
let token = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.TOKEN) ? SETTINGS.TWITCH_DATA.TOKEN : null;
let username = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.USERNAME) ? SETTINGS.TWITCH_DATA.USERNAME : null
let channel = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.CHANNEL) ? SETTINGS.TWITCH_DATA.CHANNEL : null;

//  Display all appropriate errors
if (!token) { console.error("No token variable found in settings or URL variables."); }
if (!username) { console.error("No username variable found in settings or URL variables."); }
if (!channel) { console.error("No channel variable found in settings or URL variables."); }



let LoadSiteContent = async () => {
	//  Load in the mods list as all lower-case to avoid issues with string comparisons later
	if (SETTINGS && SETTINGS.MODS_LIST)
		for (let i = 0; i < SETTINGS.MODS_LIST.length; ++i)
			SETTINGS.MODS_LIST[i] = SETTINGS.MODS_LIST[i].toLowerCase();

	//  Load the site main page and attempt to auto-log in to twitch
    loadSiteMainArea();
	attemptAutoLogin();
};

let SITE_MAIN_AREA = null;

let loadSiteMainArea = () => {
	SITE_MAIN_AREA = new SiteMainArea({});
	document.body.appendChild(SITE_MAIN_AREA.content);
};

let attemptAutoLogin = async () => {
	if (!token || !channel) { return; }

	let connectResult = await TwitchController.Connect(channel, token);
	if (!connectResult) { console.warn("Failed to connect with given channel name and oauth token. Please try again."); return; }
};