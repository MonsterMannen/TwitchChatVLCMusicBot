# TwitchChatVLCMusicBot
Let users in twitch chat play music on stream with this simple twitch chat bot

The bot searches youtube for a match and then plays it through VLC

Only works on Windows. (changing the vlc execute line should make it work on linux instead)

## Preview

![pic](https://i.imgur.com/gZg9CSN.gif)

## Use it yourself

#### Requirements

* VLC
* A second twitch account

#### Follow all these steps

1. Git clone the repo and cd into dir

2. `npm install` to install needed npm packages

3. Create a second twitch account (your bot) and get its oauth from here https://twitchapps.com/tmi/

4. Create a youtube project and get an api_key for it here https://console.developers.google.com/apis/credentials?project=_

5. Rename `secret.js.example` to `secret.js`. Put in your bot accounts username, oauth and youtube api key

6. Do this https://www.latecnosfera.com/2016/10/vlc-unable-to-open-mrl.html to fix VLC MRL load error (basically copy some text)

7. Change the channel in `config.js`

8. Should be it. Start the bot `node bot.js`

