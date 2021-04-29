class SiteMainArea {
    constructor(options) {
        this.options = options;
        this.elements = { progressCircle: null };
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteMainArea", style: { width: "1280px", height: "720px", }, });
        return container.content;
    }

    setOnChatMessage() {
        TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
            //  You can add anything in here you'd like the program to do
        });
    }
}