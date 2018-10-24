# TwitchChatVLCMusicBot
Let users in twitch chat play music on stream. 

The bot searches youtube for a match and then plays it through VLC.

Windows only.

![pic](https://i.imgur.com/gZg9CSN.gif)

### Requirements

* VLC
* A second twitch account

### Use for yourself

Git clone the repo

npm install

Get your second twitch account (your bot) oauth from here https://twitchapps.com/tmi/

Create a youtube project and get an api_key for it here https://console.developers.google.com/apis/credentials?project=_

Put your twitch bots account name, oauth and api key in `secret.js.example` and rename it to `secret.js` 

Do this https://www.latecnosfera.com/2016/10/vlc-unable-to-open-mrl.html to fix VLC MRL load error

brb fix this in 5 min
