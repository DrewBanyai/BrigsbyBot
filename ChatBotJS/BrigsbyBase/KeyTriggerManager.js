class KeyTriggerManager {
    constructor(options) {
        this.options = options;
        this.triggerQueue = [];
        this.queueFreeTime = (new Date()).getTime();
        this.queueShiftTime = -1;
        this.progressCircle = null;
        setInterval(() => { this.CheckQueueForTrigger(); }, 1000);
    }

    AddTriggerToQueue(triggerType) {
        this.triggerQueue.push(triggerType);
    }

    CheckQueueForTrigger() {
        if (!SETTINGS) { console.error("No SETTINGS structure found... could not check for Key Trigger Events"); return; }
        if (!SETTINGS.hasOwnProperty("KEY_TRIGGER_EVENTS")) { console.error("SETTINGS structure does not have an entry for KEY_TRIGGER_EVENTS... could not check for Key Trigger Events"); return; }

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

            this.CreateTimer(longestDelay / 1000, this.triggerQueue[0]);
        } 
    }

    CreateTimer(seconds, title) {
        if (this.progressCircle) { console.error("Timer Circle already exists!"); return; }

        this.progressCircle = new ProgressCircle({
            title: title,
            time: seconds,
            style: { position: "relative", float: "right", margin: "20px 20px 0px 0px", opacity: "0", zIndex: "0" },
        });
        this.progressCircle.content.style.transitionProperty = "opacity";
        this.progressCircle.content.style.transitionDuration = "0.5s";
        this.progressCircle.content.style.opacity = "1";

        SITE_MAIN_AREA.content.appendChild(this.progressCircle.content);
        let timerInterval = null;
        timerInterval = setInterval(() => {
            this.progressCircle.updateCurrentTime();
            if (this.progressCircle.currentTime <= 0) {
                clearInterval(timerInterval);
                this.progressCircle.content.style.opacity = "0";
                setTimeout(() => {
                    SITE_MAIN_AREA.content.removeChild(this.progressCircle.content);
                    this.progressCircle = null;
                }, 500);
            }
        }, 40);
    }
};

let KEY_TRIGGER_MANAGER = new KeyTriggerManager();