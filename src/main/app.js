const { ipcMain } = require('electron')
const shell = require('shelljs')

// Sends the protection status string to renderer
ipcMain.on('bitlockerProtectionStatus', (event) => {
  shell
    .exec('manage-bde -status C:| findstr.exe /r /c:"Protection Status"', {
      async: true
    })
    .stdout.on('data', function (data) {
      event.returnValue = data
    })
})

ipcMain.on('fileVaultStatus', (event) => {
  shell
    .exec('sudo fdesetup status', {
      async: true
    })
    .stdout.on('data', function (data) {
      event.returnValue = data
    })
})
