//  The TwitchJS library requires that these variables be named "token" and channel"
//  You can generate a token here: https://twitchapps.com/tmi/
let token = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.TOKEN) ? SETTINGS.TWITCH_DATA.TOKEN : null;
let username = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.USERNAME) ? SETTINGS.TWITCH_DATA.USERNAME : null
let channel = (SETTINGS && SETTINGS.TWITCH_DATA && SETTINGS.TWITCH_DATA.CHANNEL) ? SETTINGS.TWITCH_DATA.CHANNEL : null;

//  If the token, username, or channel are not provided, attempt to find them in the URL variables
if (!token || !username || !channel) {
	let URL_OPTIONS = getOptionsInURL();

	//  If new URL arguments are put in the URL, this will grab those and override the ones set in code (if any)
	if (URL_OPTIONS && URL_OPTIONS.token) { token = "oauth:" + URL_OPTIONS.token; }
	if (URL_OPTIONS && URL_OPTIONS.username) { username = URL_OPTIONS.username; }
	if (URL_OPTIONS && URL_OPTIONS.channel) { channel = URL_OPTIONS.channel; }

	//  If any of the pieces are still not available, display an error
	if (!token) { console.error("No token variable found in settings or URL variables."); }
	if (!username) { console.error("No username variable found in settings or URL variables."); }
	if (!channel) { console.error("No channel variable found in settings or URL variables."); }
}

let LoadSiteContent = async () => {
    loadSiteMainArea();
	attemptAutoLogin();
};

let SITE_MAIN_AREA = null;

let getLocalStorage = () => {
	let storageTSSP = localStorage.getItem('BrigsbyBot');
	return (storageTSSP ? JSON.parse(storageTSSP) : {});
}

let setLocalStorage = (storageData) => {
	localStorage.setItem("BrigsbyBot", JSON.stringify(storageData));
}

let loadSiteMainArea = () => {
	SITE_MAIN_AREA = new SiteMainArea({});
	document.body.appendChild(SITE_MAIN_AREA.content);
};

let attemptAutoLogin = async () => {
	if (!token || !channel) { return; }

	let connectResult = await TwitchController.Connect(channel, token);
	if (!connectResult) { console.warn("Failed to connect with given channel name and oauth token. Please try again."); return; }
};