// Main App JS (That sends info the rendere process)
import './app.js';
('use strict')
const { app, BrowserWindow, ipcMain, session } = require('electron')
const settings = require('./settings.json')
const path = require('path')
const url = require('url')
let mainWindow

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1000,
    webPreferences: { webSecurity: false }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
  }
})

// https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-implicit-grant-flow
ipcMain.on('loginPrompt', (event, args) => {
  let authWindow = new BrowserWindow({
    alwaysOnTop: true, // keeps this window on top of others
    modal: false,
    autoHideMenuBar: true,
    parent: mainWindow,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false, // again, don't need to specify these if Electron v4+ but showing for demo
      contextIsolation: true // we can isolate this window
    }
  })

  authWindow.on('closed', () => {
    authWindow = null
  })

  authWindow.setMenu(null)

  let filter = { urls: [settings.redirectURL] }

  authWindow.webContents.on('did-finish-load', () => {
    authWindow.show()
  })

  authWindow.loadURL(
    'https://login.microsoftonline.com/' +
      settings.tenantID +
      `/oauth2/authorize?
    client_id=` +
      settings.ClientID +
      `
    &response_type=token
    &scope=openid
    &redirect_uri=` +
      settings.redirectURL +
      `
    &response_mode=fragment
    &nonce=678911
    &state=12345
    &resource=` +
      encodeURIComponent(settings.resource)
  )

  session.defaultSession.webRequest.onCompleted(filter, (details) => {
    var url = details.url
    let accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1]
    event.returnValue = accessToken
    authWindow.close()
  })
})

ipcMain.on('logOut', (event, args) => {
  let authWindow = new BrowserWindow({
    alwaysOnTop: true, // keeps this window on top of others
    modal: false,
    autoHideMenuBar: true,
    parent: mainWindow,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false, // again, don't need to specify these if Electron v4+ but showing for demo
      contextIsolation: true // we can isolate this window
    }
  })

  authWindow.on('closed', () => {
    authWindow = null
  })

  authWindow.setMenu(null)

  let filter = { urls: [settings.redirectURL] }

  authWindow.webContents.on('did-finish-load', () => {
    authWindow.show()
  })

  authWindow.loadURL(
    'https://login.microsoftonline.com/' +
      settings.tenantID +
      '/oauth2/v2.0/logout?post_logout_redirect_uri=' +
      settings.redirectURL
  )

  session.defaultSession.webRequest.onCompleted(filter, (details) => {
    event.returnValue = details
    authWindow.close()
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

console.log('running main Process index.js')
