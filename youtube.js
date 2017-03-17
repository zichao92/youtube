Module.register("youtube",{

    start: function() {
        Log.info("Starting module: " + this.name);
    },

    getStyles: function() {
        return ['script.css'];
    },

    sendCommand: function(cmd){
        var myPlayer = document.getElementById('my-video');
        if(myPlayer){
            myPlayer.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": cmd
            }), "*");
        }
    },

    notificationReceived: function(notification, payload) {
        if (notification === "PAUSE_VIDEO"){
            this.sendCommand("pauseVideo");
        }
        if (notification === "PLAY_VIDEO"){
            this.sendCommand("playVideo");
        }
    },
    
    getDom: function() {

        var wrapper = document.createElement("div");

        var background = document.createElement("div");
        background.classList.add("video-background");

        var foreground = document.createElement("div");
        foreground.classList.add("video-foreground");

        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "my-video");
        iframe.setAttribute("src", "https://www.youtube.com/embed/10ljZUY-E_A?enablejsapi=1&autoplay=1"); // change here for other youtube Videos! 
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("type", "text/html");

        foreground.appendChild(iframe);
        background.appendChild(foreground);
        wrapper.appendChild(background);

        return wrapper;
    }
});