# BrigsbyBot

BrigsbyBot is a chat bot Twitch that allows a streamer to create functionality that viewers can use through chat commands in order to control hotkey-enabled functionality on the streamer's personal computer. The project consists of two elements. The **Control Box** runs on the streamer's computer and acts as a microservice which can keep track of a standard currency we'll refer to as **points** and can trigger keyboard press simulations which can be used to set off hotkey-enabled software the streamer is running. The  **ChatBotJS** can be added as a browser source in OBS to help viewers interact with the **Control Box**, listing items and prices in **points**, as well as allowing the streamer or specified users to give out **points** for any reason.

## Popular uses of BrigsbyBot

* **Allow users to trigger VoiceMod filters on and off** - By setting a hotkey for a VoiceMod voice changer and setting another for the "Clear" filter (aka returning to normal voice), you can set up an item that can be purchased with **points**, which then starts a voice filter and stops it after a certain amount of time.
* **Allow users to control in-game keyboard presses** - By setting key presses that the viewers can purchase, the streamer can allow them to create difficulty in a game (allowing players to pay to hit the quick reload so you lose your progress, or maybe the key to quick turn around in an FPS) or maybe even to control the game themselves (a la Twitch Plays Pokemon).
* **Controlling scene changes in OBS** - By setting hotkeys in OBS, you can allow viewers to turn on or off scenes for given amounts of time, allowing them to change your current state or maybe just fire off animations/sounds you've put into OBS for this specific purpose.

## Try Out BrigsbyBot

- Download and extract the [latest version of BrigsbyBot](https://github.com/DrewBanyai/BrigsbyBot/archive/refs/heads/release.zip) to your computer
- Add the ChatBotJS/index.htm file to your OBS as a browser source in a scene that you'll be using the bot in. If you have something like an AlertBox scene you drop into every other scene, this would be a perfect place for it
- Open ChatBotJS/Settings.js and edit in your *CHANNEL* (just your username, not the URL), *USERNAME* (whichever account you want the bot to use, usually the same as *CHANNEL*), and *TOKEN* (an OAuth key you can generate [here](https://twitchapps.com/tmi/))
- Fill out your *MODS_LIST* with whoever you want to be able to give out and take points in your channel. Leaving this blank will result in only the channel streamer being able to use !add and !subtract commands to give and take points. Adding mods can be done by adding quoted usernames like so:
```sh
    MODS_LIST: [
        "DrewTheBear",
        "BrigsbyBot"
    ],
```
- Run ControlBox/ControlBox.exe
- You can add in your own custom items by adding entries in *BOT_ITEMS_LIST* and *KEY_TRIGGER_EVENTS* like so:
```sh
    BOT_ITEMS_LIST: {
		"taskmanager": { name: "TaskManager", type: "Keyboard", price: 50 },
		"startmenu": { name: "StartMenu", type: "Keyboard", price: 50 },
		"refresh": { name: "Refresh", type: "Keyboard", price: 50 },
    },
	REWARD_ITEMS_LIST: {
		"85fa2f51-9a7f-4273-8779-53ceb2b57f3f": { name: "Enter" },
	},
    KEY_TRIGGER_EVENTS: {
		"TaskManager": [
			{
				keys: [ "LEFT CONTROL", "LEFT SHIFT", "ESCAPE" ],
				delay: 0,
				message: "Opening the task manager"
			},
		],
		"StartMenu": [
			{
				keys: [ "LEFT WINDOWS" ],
				delay: 0,
				message: "Opening the start menu"
			},
		],
		"Refresh": [
			{
				keys: [ "F5" ],
				delay: 0,
				message: "Refreshing"
			}
		],
		"Enter": [
			{
				keys: [ "Return" ],
				delay: 0,
				message: "Hitting Enter"
			}
		],
    }
```
- Note that the name of the entry in *BOT_ITEMS_LIST* should be in all lower-case, but the **name** value can use any capitalization you'd like. Once you've given it a **name**, that same string (with all capitalization) should be used as the name of the entry in *KEY_TRIGGER_EVENTS*. The **keys** value is an array that contains strings that identify keys (the list of which you can find below in this README) and must be comma deliniated if you wish to combine multiple keys. See the **TaskManager** entry for an example of this. The **message** value can be anything, as it will just show in the console of the **ControlBox**.
- Note that the name of the entry in *REWARD_ITEMS_LIST* should be the custom reward ID of the channel point reward you want to use to set off a key trigger event. You can discover the customRewardId of a channel point reward by using [this tool](https://www.instafluff.tv/TwitchCustomRewardID/?channel=YOURTWITCHCHANNEL) and changing out the URL to have your channel name. The *name* entry is the *KEY_TRIGGER_EVENTS* entry name you want to fire off with that channel point reward.
- Once ControlBox.exe is running and OBS is running with the ChatBotJS index file as a browser source, test out some of the following commands in chat:

| Command |  |
| ------ | ------ |
| !brigsby | Will display some helpful information in your chat about how the bot works, and what commands are available |
| !items | Will display the current list of buyable items available to exchange **points** for |
| !balance | Will display the current balance of **points** for the account that requests it (Note: You can specify a username after this command to get their balance.. i.e. *!balance @DrewTheBear*) |
| !price | Can be used to get the price of a specified item. Usage: *!price speechifier* |
| !buy | Can be used to spend points on an item, if the user has the points. Usage: *!buy speechifier* |
| !add | (Note: *Streamer and any specified mods only) Can be used to add **points** to another user. Usage: *!add @DrewTheBear 100* |
| !subtract | (Note: *Streamer and any specified mods only) Can be used to subtract **points** from another user. This will always have a minimum point balance result of 0. Usage: *!subtract @DrewTheBear 50* |

Using the bot items and key trigger events from this example, you'd want to use this grouping of commands to test.
```sh
!brigsby
!items
!add @YOUR_NAME 200
!buy taskmanager
!buy startmenu
!buy refresh
!balance
```

*NOTE: Obviously, replace YOUR_NAME with your twitch username*

## Add your own items to be purchased with points

If you know some JavaScript, it should be trivial to alter VoiceModItems.js to your liking to make a new grouping of items. The JS file is built in such a way that you could make a copy of it, place your new file alongside VoiceModItems.js, reference it in index.htm, and alter the items list, prices, and keypress simulation details to your specific liking.

**If you'd rather just put in some simple data** it isn't too difficult. You can open up ChatBotJS/Settings.js and alter the BOT_ITEMS_LIST and KEY_TRIGGER_EVENTS to add what you'd like. Here is an example of an alteration that will create an item called "QuickLoad" which will hit F9 on the streamer's computer (the quick load button in many games):

```sh
    BOT_ITEMS_LIST: {
        quickload: { name: "QuickLoad", type: "Keyboard", price: 100 },
    },
    KEY_TRIGGER_EVENTS: {
        QuickLoad: [ { keys: [ "F9" ], delay: 0, message: "Pressing the QuickLoad key!" }, ],
    }
```

As you can see, the key trigger key must have the same capitalization as the *name* value in the item on the BOT_ITEMS_LIST object. The key in the BOT_ITEMS_LIST should be all lowercase though, as seen above. The *type* value is just used to specify in the chat when someone inquires about the item, so setting it to "Keyboard" is entirely optional. The price is the amount of **points** the user will need to spend to fire off the item. The list of values that can be put in the *keys* array are as follows: 
- TAB
- RETURN
- ESCAPE
- SPACE
- END
- HOME
- LEFT
- UP
- RIGHT
- DOWN
- INSERT
- DELETE
- 0
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- A
- B
- C
- D
- E
- F
- G
- H
- I
- J
- K
- L
- M
- N
- O
- P
- Q
- R
- S
- T
- U
- V
- W
- X
- Y
- Z
- LEFT WINDOWS
- RIGHT WINDOWS
- NUMPAD 0
- NUMPAD 1
- NUMPAD 2
- NUMPAD 3
- NUMPAD 4
- NUMPAD 5
- NUMPAD 6
- NUMPAD 7
- NUMPAD 8
- NUMPAD 9
- MULTIPLY
- ADD
- DECIMAL
- DIVIDE
- F1
- F2
- F3
- F4
- F5
- F6
- F7
- F8
- F9
- F10
- F11
- F12
- NUMLOCK
- LEFT SHIFT
- RIGHT SHIFT
- LEFT CONTROL
- RIGHT CONTROL

## Any Questions?

Please feel free to reach out to me at DrewTheBearTwitch@gmail.com or by finding me on [my Twitch Channel](http://twitch.tv/DrewTheBear). I'm happy to answer any questions, or even help you set it up through Discord to do whatever you want it to do. I would love any feedback/suggestions as well, as I'm sure the capability of the ControlBox is only in it's infancy at the moment and could do a lot more than simulate key presses.

Enjoy!