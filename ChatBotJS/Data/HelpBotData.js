
const helpCommand = "!help";

let parseHelpCommand = (message) => {
    let isHelpCommand = (message.substr(0, helpCommand.length) === helpCommand);
    if (!isHelpCommand) { return { success: false, reason: "Message is a " + helpCommand + " command", reply: [ "Failed to parse help command." ] }; }

    if (message === helpCommand || message === helpCommand + " ") {
        return { success: true, reply: [ "HELP: SimpleTwitchJSBot (that's me!) is a simple way to implement a Javascript Chat Bot in your Twitch channel. Ask me about a specific subject by using the command '" + helpCommand + " SUBJECT'. For a list of help subjects, type '" + helpCommand + " subjects'" ] };
    }

    let hasSubject = (message.substr(0, 6) === (helpCommand + " ")) && (message.length > 6);
    if (!hasSubject) { return { success: false, reason: helpCommand + " command is improperly formatted", reply: [ "Failed to parse help command." ] }; }
    let helpSubject = message.substr(6, message.length - 6).toLowerCase();
    
    switch (helpSubject) {
        case "subject":
        case "subjects":
        case "?":
            return { success: true, reply: [
                "HELP Subjects I can currently tell you about: [getting started]",
            ], };

        case "getting started":
            return { success: true, reply: [
                "If you need to implement a simple helper bot that answers questions, check HelpBotData.js in the project to see how " + helpCommand + " messages are processed.",
                "Basically, the script checks if the message begins with '" + helpCommand + "' and from there processes responses based on the keywords that follow.",
                "You can do other things with the bot by adding message responses in SiteMainArea.js under the PRIVMSG callback",
            ], };

        default:
            return { success: true, reply: [
                "The help command does not have an entry for string [" + helpSubject +"]. Please contact me if you think it should be added or if you have any questions.",
            ], };
    }
}