const TwitchBot = require('twitch-bot')
const youtube = require('youtube-finder');
const child_process = require('child_process');

class Bot {
    constructor(channel, botName, botPw, ytKey){
        this.channel = channel;
        this.ytclient = youtube.createClient({ key: ytKey });

        this.TwitchBot = new TwitchBot({
            username: botName,
            oauth: botPw,
            channels: ["#"+channel]
        });

        this.TwitchBot.on('join', channel => {
            console.log("--> joined channel: " + channel);
        });

        this.TwitchBot.on('error', err => {
            console.log("--> error: Couldn't join channel. Maybe wrong settings");
            throw new Error("Wrong username or password");
        });

        this.TwitchBot.on('message', chatter => {
            console.log(chatter.display_name + ": " + chatter.message);

            if(chatter.message == "hoho") {
                this.say("hoho");
            }
            else if(chatter.message.startsWith("!song")
                                    || chatter.message.startsWith("!play")) {
                if(chatter.message.split(" ").length < 2){
                    this.say("No song mentioned. try !play songnamehere");
                    return;
                }
                if(chatter.message.indexOf("rape") > -1){
                    this.say("No ear rape songs :(");
                    this.TwitchBot.timeout(chatter.username, 10, "ear rape song");
                    return;
                }

                var search = chatter.message.split(" ");
                search.shift();
                this.playSong(search.join(" "), this);
            }
        });

        this.TwitchBot.join(channel);
    }

    dc(){
        this.TwitchBot.part(this.channel);
        console.log("disconnected from twitch");
    }

    say(msg){
        this.TwitchBot.say(msg, "#"+this.channel);
    }

    // need to pass self ref for some reason
    playSong(searchString, ref){
        // get video id from search string
        this.ytclient.search({
            part: "snippet",
            q: searchString,
            maxResults: 1,
            type: "video"
        }, function(err, data){
            // check for error
            if(err){
                ref.say("Fail FeelsBadMan " + err + " (Probably wrong youtube api key)");
                return;
            }
            // check if we got any results at all
            if(data.pageInfo.totalResults < 1){
                //this.say("Song not found");
                ref.say("Song not found");
                return;
            }

            // get video id and title
            var title = data.items[0].snippet.title;
            var id = data.items[0].id.videoId;
            var url = "https://www.youtube.com/watch?v=" + id;
            var cmd = "vlc --no-video " + url;

            // launch vlc
            child_process.exec(cmd, function(err, stdout, stderr){
                if(err){
                    console.log(err.stack);
                    ref.say(err.stack.substring(0, 499));
                    return;
                }
                ref.say(`Song added: ${title}`);
            });
        });
    }
}

module.exports = Bot;
