const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let settingsWin;
var settings = {};

function createWindow(){
    // Create the browser window.
    win = new BrowserWindow({ width: 500, height: 300 });

    // and load the index.html of the app.
    win.loadFile('index.html');
    //win.setMenu(null);
    loadSettings();

    // Emitted when the window is closed.
    win.on('closed', () => {
        //bot.disconnect(); // TODO fix later
        app.quit(); // close all windows
    })
}

app.on('ready', createWindow);

// listen for commands from html file
ipc.on('open-settings', (event) => {
    openSettingsWindow();
});

ipc.on('save-click', (event, arg1, arg2, arg3, arg4) => {
    saveSettings(arg1, arg2, arg3, arg4);
});

ipc.on('start-click', (event) => {
    console.log("start");
});

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
    //settingsWin.setMenu(null);    // TODO enable
    // make links open in browser instead of electron window
    settingsWin.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
    //settingsWin.webContents.send('settingValues', "test123");
}

settingsWin.once('ready-to-show', () => {
    settingsWin.webContents.send('settingValues', "test123");
});

function saveSettings(channel, botName, botPw, ytKey){
    var data = {
        channel: channel,
        botName: botName,
        botPw: botPw,
        ytKey: ytKey
    }
    fs.writeFile("settings.json", JSON.stringify(data), (err) => {
        if(err) throw err;
    })
}

function loadSettings(){
    var obj;
    fs.readFile('settings.json', 'utf8', (err, data) => {
    if(err) throw err;
        obj = JSON.parse(data);
        settings = {
            channel: obj.channel,
            botName: obj.botName,
            botPw: obj.botPw,
            ytKey: obj.ytKey
        }
    });
}
