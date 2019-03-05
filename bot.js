const TwitchBot = require('twitch-bot')
const youtube = require('youtube-finder');
const child_process = require('child_process');

// channel to monitor
var channel = "";

var ytclient;
var Bot;

module.exports = {

    setConfigAndCreateBot: function (c, botName, botPw, ytKey){
        channel = c;

        // twitch bot client
        Bot = new TwitchBot({
            username: botName,
            oauth: botPw,
            channels: ["#" + c]
        })

        // youtube search client
        ytclient = youtube.createClient({ key: ytKey });

        Bot.on('join', channel => {
            console.log("--> joined channel: " + channel);
        });

        Bot.on('error', err => {
            console.log("--> error: Couldn't join that channel. Maybe wrong settings");
        });

        Bot.on('message', chatter => {
            console.log(chatter.display_name + ": " + chatter.message);

            if(chatter.message == "hoho") {
                say("hehe");
            }
            else if(chatter.message.startsWith("!song")
                                    || chatter.message.startsWith("!play")) {
                if(chatter.message.length <= 6){
                    say("No song mentioned. try !play songnamehere");
                    return;
                }
                if(chatter.message.indexOf("rape") > -1){
                    say("No ear rape songs :(");
                    Bot.timeout(chatter.username, 10, "ear rape song");
                    return;
                }
                playSong(chatter.message.substring(6));
            }
        });

        Bot.join(channel);
    },

    dc: function (){
        Bot.part(channel);
        console.log("disconnected bot");
    }

}

// ##################################################################

// send bot message in chat
function say(msg){
    Bot.say(msg, "#"+channel);
}

function playSong(searchString){
    // get video id from search string
    ytclient.search({
        part: "snippet",
        q: searchString,
        maxResults: 1,
        type: "video"
    }, function(err, data){
        // check for error
        if(err){
            say("Fail FeelsBadMan " + err);
            return;
        }
        // check if we got any results at all
        if(data.pageInfo.totalResults < 1){
            say("Song not found");
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
                say(err.stack.substring(0, 499));
                return;
            }
            say(`Song added: ${title}`);
        });
    });
}
