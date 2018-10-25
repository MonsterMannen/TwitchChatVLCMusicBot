const TwitchBot = require('twitch-bot')
const youtube = require('youtube-finder');
const child_process = require('child_process');
const secret = require('./secret.js');
const config = require('./config.js');

// channel to monitor
var channel = config.channel;

// twitch bot client
const Bot = new TwitchBot({
    username: secret.username,
    oauth: secret.oauth,
    channels: ["#"+channel]
})

// youtube search client
const ytclient = youtube.createClient({ key: secret.yt_key });

// ##################################################################

Bot.on('join', channel => {
    console.log("--> joined channel: " + channel);
});

Bot.on('error', err => {
    console.log("--> error: " + err);
});

Bot.on('message', chatter => {
    console.log(chatter.display_name + ": " + chatter.message);

    if(chatter.message == "hoho") {
        say("hehe");
    }
    else if(chatter.message.startsWith("!song")
                            || chatter.message.startsWith("!play")) {
        if(chatter.message.length <= 6){
            say(config.no_song_mentioned);
            return;
        }
        if(chatter.message.indexOf("rape") > -1){
            say(config.ear_rape_song_requested);
            Bot.timeout(chatter.username, 10, "ear rape song");
            return;
        }
        playSong(chatter.message.substring(6));
    }
});

Bot.join(channel);

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
            say(config.no_song_found);
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
