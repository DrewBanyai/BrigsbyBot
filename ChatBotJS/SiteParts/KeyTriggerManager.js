class KeyTriggerManager {
    constructor(options) {
        this.options = options;
        this.triggerQueue = [];
        this.queueFreeTime = (new Date()).getTime();
        this.queueShiftTime = -1;
        setInterval(() => { this.CheckQueueForTrigger(); }, 1000);
    }

    AddTriggerToQueue(triggerType) {
        this.triggerQueue.push(triggerType);
    }

    CheckQueueForTrigger() {
        let currentTime = (new Date()).getTime();

        if ((this.queueShiftTime !== -1) && (currentTime > this.queueShiftTime)) {
            this.triggerQueue.shift();
            this.queueShiftTime = -1;
        }

        if ((this.triggerQueue.length > 0) && (currentTime > this.queueFreeTime)) {
            if (!SETTINGS.KEY_TRIGGER_EVENTS.hasOwnProperty(this.triggerQueue[0])) {
                console.error(this.triggerQueue[0] + " not found in KEY_TRIGGER_EVENTS");
                return null;
            }
            let triggerKeys = SETTINGS.KEY_TRIGGER_EVENTS[this.triggerQueue[0]];
            let longestDelay = 0;
            triggerKeys.forEach((keyEvent) => {
                longestDelay = Math.max(longestDelay, keyEvent.delay);
                setTimeout(() => {
                    PostOffice.TriggerKeys(keyEvent.keys);
                }, Math.max(keyEvent.delay, 1));
            });
            this.queueShiftTime = currentTime + longestDelay;
            this.queueFreeTime = this.queueShiftTime + 1000;

            SITE_MAIN_AREA.CreateTimer(longestDelay / 1000, this.triggerQueue[0]);
        } 
    }


};

let KEY_TRIGGER_MANAGER = new KeyTriggerManager();