const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const fs = require('fs');
const Bot = require('./bot.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let settingsWin;
var bot;
var settings = {
    channel: "",
    botName: "",
    botPw: "",
    ytKey: ""
};

function createWindow(){
    // Create the browser window.
    win = new BrowserWindow({ width: 500, height: 300 });
    win.loadFile('index.html');
    win.setMenu(null);

    win.on('closed', () => {
        bot.dc();
        app.quit(); // close all windows
    })

    // check if all settings are set when window is loaded
    win.webContents.on('did-finish-load', () => {
        if(settings.channel == "" || settings.botName == "" || settings.botPw == "" || settings.ytKey == ""){
            win.webContents.send('disable-start-btn');
        }
    });
}

app.on('ready', () => {
    loadSettings();
    createWindow();
});

// listen for commands from html file ##############################
ipc.on('open-settings', (event) => {
    openSettingsWindow();
});

ipc.on('save-click', (event, c, bname, bpw, ytk) => {
    saveSettings(c, bname, bpw, ytk);
    settings.channel = c;
    settings.botName = bname;
    settings.botPw = bpw;
    settings.ytKey = ytk;

    if(settings.channel != "" && settings.botName != "" && settings.botPw != "" && settings.ytKey != ""){
        win.webContents.send('enable-start-btn');
    }else{
        win.webContents.send('disable-start-btn');
    }
});

ipc.on('start-click', (event) => {
    console.log("starting");
    try{
        bot = new Bot(settings.channel, settings.botName, settings.botPw, settings.ytKey);
    }catch(e){
        console.log(e);
    }
});

ipc.on('stop-click', (event) => {
    console.log("stopping");
    bot.dc();
});
// #################################################################

function openSettingsWindow(){
    settingsWin = new BrowserWindow({
        height: 500,
        resizable: false,
        width: 500,
        title: 'Settings',
        minimizable: false,
        fullscreenable: false
    });
    settingsWin.loadFile('settings.html');
    settingsWin.setMenu(null);

    // make links open in browser instead of electron window
    settingsWin.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    // send settings data to window
    settingsWin.webContents.on('did-finish-load', () => {
        settingsWin.webContents.send('loadedData', settings);
    });
}

// save settings to file
function saveSettings(channel, botName, botPw, ytKey){
    var data = {
        channel: channel,
        botName: botName,
        botPw: botPw,
        ytKey: ytKey
    }
    fs.writeFile("settings.json", JSON.stringify(data), (err) => {
        if(err) throw err;
        console.log("saved settings: " + data.channel);
    })
}

// load settings from file
function loadSettings(){
    var obj;
    fs.readFile('settings.json', 'utf8', (err, data) => {
        if(err){
            console.log("settings file doesnt exist");  // we create one later
            return;
        }
        obj = JSON.parse(data);
        settings = {
            channel: obj.channel,
            botName: obj.botName,
            botPw: obj.botPw,
            ytKey: obj.ytKey
        }
        console.log("loaded settings: " + settings.channel);
    });
}

process.on('uncaughtException', (err) => {
    if(err.message == "Wrong username or password"){
        win.webContents.send('show-error');
    }
});
