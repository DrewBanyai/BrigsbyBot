class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { progressCircle: null };
        this.content = this.generateContent();
        this.setOnChatMessage();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: { width: "1280px", height: "720px", }, });
        return container.content;
    }

    CreateTimer(seconds, title) {
        if (this.elements.progressCircle) { console.error("Progress Circle already exists!"); return; }

        this.elements.progressCircle = new ProgressCircle({
            title: title,
            time: seconds,
            style: { position: "relative", float: "right", margin: "20px 20px 0px 0px", opacity: "0", zIndex: "0" },
        });
        this.elements.progressCircle.content.style.transitionProperty = "opacity";
        this.elements.progressCircle.content.style.transitionDuration = "0.5s";
        this.elements.progressCircle.content.style.opacity = "1";

        this.content.appendChild(this.elements.progressCircle.content);
        let timerInterval = null;
        timerInterval = setInterval(() => {
            this.elements.progressCircle.updateCurrentTime();
            if (this.elements.progressCircle.currentTime <= 0) {
                clearInterval(timerInterval);
                this.elements.progressCircle.content.style.opacity = "0";
                setTimeout(() => {
                    this.content.removeChild(this.elements.progressCircle.content);
                    this.elements.progressCircle = null;
                }, 500);
            }
        }, 40);
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
            let messageLower = message.message.toLowerCase();

            //  Check for help commands. If any response is required, send each message separated by a short timer.
            let helpResponse = parseHelpCommand(messageLower);
            if (helpResponse.success) {
                let sendHelpResponse = null;
                sendHelpResponse = (helpResponse) => {
                    TwitchController.SendChatMessage(channel, helpResponse.reply[0]);
                    helpResponse.reply.shift();
                    if (sendHelpResponse && (helpResponse.reply.length !== 0)) { setTimeout(() => sendHelpResponse(helpResponse), 500); }
                };
                sendHelpResponse(helpResponse);
            }

            //  Check for cheer point bot commands. If any response is required, send each message separated by a short timer.
            let cheerBotResponse = await parseCheerBotCommand(message.username, messageLower);
            if (cheerBotResponse.success) {
                let sendResponse = null;
                sendResponse = (response) => {
                    TwitchController.SendChatMessage(channel, response.reply[0]);
                    response.reply.shift();
                    if (sendResponse && (response.reply.length !== 0)) { setTimeout(() => sendResponse(response), 500); }
                }
                sendResponse(cheerBotResponse);
            }
        });
    }
}