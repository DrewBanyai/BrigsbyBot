TwitchController.AddTwitchMessageCallback("PRIVMSG", async (message) => {
    let messageLower = message.message.toLowerCase();

    //  Check for cheer point bot commands. If any response is required, send each message separated by a short timer.
    let cheerBotResponse = await parseBrigsbyCommand(message.username, messageLower);
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


let parseBrigsbyCommand = async (username, message) => {
    //  Check for a command word at the beginning of the message
    let firstSpace = message.indexOf(" ");
    let commandStr = (firstSpace == -1) ? message : message.substr(0, firstSpace);
    if (commandStr[0] !== "!") { return { success: false, reason: "Message is not a CheerBot command", reply: [ "Failed to parse CheerBot command." ] }; }
    const commandWords = [
        "!brigsby",
        "!check_balance", "!checkbalance", "!balance",
        "!items", "!item_list", "!itemlist", "!items_list", "!itemslist",
        "!price", "!cost",
        "!buy", "!buy_item", "!buyitem",
        "!add", "!add_points", "!addpoints", "!give_points", "!givepoints", "!give",
        "!subtract", "!subtract_points", "!subtractpoints", "!take_points", "!takepoints" ];

    if (!commandWords.includes(commandStr)) { return { success: false, reason: "Message is not a CheerBot command", reply: [ "Failed to parse CheerBot command." ] }; }
    let commandArgs = message.substr(commandStr.length, message.length - commandStr.length).split(" ");
    if (commandArgs[0] === "") { commandArgs.shift(); }
    let itemsData = SETTINGS.BOT_ITEMS_LIST;

    let giveMultiplier = 1;

    switch (commandStr) {
        case "!brigsby":
            return { success: true, reply: [
                "BrigsbyBot is active, and will track all cheers in the channel, giving an equal number of points for use with the bot.",
                "You can check your balance at any time by typing '!balance' in the chat. Moderators will sometimes gift out points as well.",
                "You can buy an item by typing '!buy ITEMNAME'. You can check the price of an item by typing '!price ITEMNAME'",
                "You can check what items are available by typing '!items'. Let @" + channel + " know if you have any questions."
            ], };

        case "!check_balance":
        case "!checkbalance":
        case "!balance":
            let balanceUser = username;
            if (commandArgs.length > 0)
            {
                commandArgs[0] = commandArgs[0].replace("@", "");
                if (commandArgs[0] === "") commandArgs.shift();
                else balanceUser = commandArgs[0];
            }

            let balanceResult = await PostOffice.CheckBalance(balanceUser);
            if (balanceResult === null) { return { success: true, reply: [ "ERROR: Failed to return a balance for @" + balanceUser ], }; }
            return { success: true, reply: [ "Current balance for @" + balanceUser + ": " + balanceResult.toString(), ], };

        case "!items":
        case "!item_list":
        case "!itemlist":
        case "!items_list":
        case "!itemslist":
            let replyString = "Items available for purchase: [ ";
            let itemKeys = Object.keys(itemsData);
            itemKeys.forEach(value => replyString += itemsData[value].name + ", ");
            replyString = replyString.substr(0, replyString.length - 2) + " ]";
            return { success: true, reply: [ replyString ] }

        case "!price":
        case "!cost":
            if (commandArgs.length === 0) {
                return { success: true, reply: [ "Failed to retrieve price. Please specify the item to request the price of." ] };
            }

            if (!itemsData.hasOwnProperty(commandArgs[0].toLowerCase())) {
                return { success: true, reply: [ "Failed to retrieve price. Please specify a valid item. Get item names with '!items'." ]
            }; }

            let priceItem = itemsData[commandArgs[0].toLowerCase()];
            return { success: true, reply: [ priceItem.type + " item '" + priceItem.name + "' costs " + priceItem.price.toString() + " points." ] };

        case "!buy":
        case "!buy_item":
        case "!buyitem":
            if (commandArgs.length === 0) {
                return { success: true, reply: [ "Failed to retrieve price. Please specify the item to attempt to buy." ] };
            }

            if (!itemsData.hasOwnProperty(commandArgs[0].toLowerCase())) {
                return { success: true, reply: [ "Failed to retrieve item info. Please specify a valid item. Get item names with '!items'." ] };
            }

            let buyItem = itemsData[commandArgs[0].toLowerCase()];
            let purchaseResult = await PostOffice.BuyItem(username, buyItem.price);
            if (purchaseResult === null) { return { success: true, reply: [ "@" + username + " does not have the " + buyItem.price.toString() + " points required to purchase '" + buyItem.name + "'" ] }; }
            
            KEY_TRIGGER_MANAGER.AddTriggerToQueue(buyItem.name);
            return { success: true, reply: [ "Item purchased! New balance for @" + username + ": " + purchaseResult.balance.toString() ] };

        case "!subtract_points":
        case "!subtractpoints":
        case "!take_points":
        case "!takepoints":
        case "!subtract":
            giveMultiplier = -1;

        case "!add": 
        case "!add_points":
        case "!addpoints": 
        case "!give_points":
        case "!givepoints":
        case "!give":
            if (!SETTINGS.MODS_LIST.includes(username.toLowerCase()) && (SETTINGS.TWITCH_DATA.CHANNEL.toLowerCase() !== username.toLowerCase())) {
                return { success: true, reply: [ "Only moderators or the active streamer may use point-altering commands." ] };
            }

            if (commandArgs.length < 2) {
                return { success: true, reply: [ "Failed to give points. Please specify the username to give to." ] };
            }
            
            commandArgs[0] = commandArgs[0].replace("@", "");
            if (commandArgs[0] === "") commandArgs.shift();
            if (commandArgs.length < 2) {
                return { success: true, reply: [ "Failed to give points. Please specify the username to give to." ] };
            }
            let giveUser = commandArgs[0];

            if (parseInt(commandArgs[1]).toString() !== commandArgs[1]) {
                return { success: true, reply: [ "Failed to give points. Please specify a proper amount of points." ] };
            }
            if (parseInt(commandArgs[1]) < 0) {
                return { success: true, reply: [ "Failed to alter points. Use a positive number at all times." ] };
            }
            let giveAmount = commandArgs[1];

            let giveResult = await PostOffice.GivePoints(giveUser, giveAmount * ((giveMultiplier === undefined) ? 1 : giveMultiplier));
            if (giveResult === null) { return { success: true, reply: [ "ERROR: Failed to give points to @" + giveUser ], }; }
            return { success: true, reply: [ "Current balance for @" + giveUser + ": " + giveResult.toString(), ], };
    }
}

let respondToRewardMessage = async (message) => {
    let reward = SETTINGS.REWARD_ITEMS_LIST[message.tags.customRewardId];
    KEY_TRIGGER_MANAGER.AddTriggerToQueue(reward.name);
}