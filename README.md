# TwitchChatVLCMusicBot
A simple but useful bot that lets people in twitch chat queue up music for you.

The bot searches youtube for a match and then plays it through VLC.

Only works on Windows. (changing the vlc execute line should make it work on linux instead).

## Preview

![pic](https://i.imgur.com/gZg9CSN.gif)

## Use it yourself

#### Requirements

* VLC
* A second twitch account

#### Follow all these steps

1. Git clone the repo and cd into dir

2. `npm install` to install needed npm packages

3. Get your bot accounts oauth from here https://twitchapps.com/tmi/ (your second twitch account is your bot)

4. Create a youtube project and get an api_key for it here https://console.developers.google.com/apis/credentials?project=_

5. Rename `secret.js.example` to `secret.js`. Put in your bots username, oauth and youtube api key

6. Change the channel value in `config.js`

7. Open VLC > Tools > Preferences. Under Interface, check "Allow only one instance" and "Enqueue items into playlist.." to make sure vlc doesn't open a new window every time a song is queued.

8. Do this https://www.latecnosfera.com/2016/10/vlc-unable-to-open-mrl.html to fix VLC MRL load error (basically copy some text)

9. Should be it. Start the bot `node bot.js`

### Use on your own risk

Twitch chat 

![monkaS](https://img.fireden.net/v/image/1515/48/1515481692689.png)
