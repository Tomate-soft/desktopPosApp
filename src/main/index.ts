import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { execFile } from 'child_process'
import path from 'path'
import { autoUpdater } from 'electron-updater'

// Configuración del autoUpdater para usar GitHub Releases
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function executeMPrinter(): void {
  const exePathInAsar = path.join(app.getAppPath(), 'resources', 'mprinter.exe')

  execFile(exePathInAsar, (error, stdout, stderr) => {
    if (error) {
      console.error('Error al ejecutar mprinter.exe:', error)
      return
    }
    console.log('Salida de mprinter.exe:', stdout)
    if (stderr) {
      console.error('Advertencias de mprinter.exe:', stderr)
    }
  })
}

app.whenReady().then(() => {
  executeMPrinter()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
