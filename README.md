# TwitchChatVLCMusicBot
A simple but useful bot that lets people in twitch chat queue up music for you.

The bot searches youtube for a match and then plays it through VLC.

Only tested on Windows. Should work on Linux aswell.

## Preview

![pic](https://i.imgur.com/jKOKXuB.gif)

## Use it yourself

### [Beta GUI version, (easy to use), might be buggy](https://github.com/MonsterMannen/TwitchChatVLCMusicBot/tree/electron-pkg)

#### Requirements

* node.js
* VLC
* A second twitch account

#### Follow all these steps

###### Setup bot

1. Git clone or download all files
2. Your second twitch account will be your bot. Get its oauth from here: [twitchapps](https://twitchapps.com/tmi/)
3. Create a youtube project and get an api_key for it here: [google devs](https://console.developers.google.com/apis/credentials?project=_)
4. Rename `secret.js.example` to `secret.js`. Put in your bots username, oauth and youtube api key
5. Change the channel value in `config.js`

###### VLC

6. Add VLC to your systems path variable. [how to guide](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)
7. Open VLC > Tools > Preferences. Under Interface, check "Allow only one instance" and "Enqueue items into playlist..".
8. Follow this [short guide](https://www.latecnosfera.com/2016/10/vlc-unable-to-open-mrl.html) to fix VLC MRL load error

###### Install and run

9. `npm install` to install needed node modules
10. Should be it. Start the bot `node bot.js`

###### Test
11. Test if it works by going to your twitch channel and type  
`!play despacito` or  
`!song despacito`  
(your favourite song :^))

## Use at your own risk

Twitch chat

![monkaS](https://img.fireden.net/v/image/1515/48/1515481692689.png)
