import * as PrinterApi from "../src/printer_api/dist/main";
import { app, BrowserWindow } from "electron";
import path from "node:path";
import { spawn } from "child_process";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    fullscreen: true,
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Inicia tu API de NestJS
function startNest() {
  const nestPath = path.join(__dirname, "../src/printer_api/dist/main.js"); // Cambia la ruta según sea necesario
  const nestProcess = spawn("node", [nestPath]);

  nestProcess.stdout.on("data", (data) => {
    console.log(`NestJS: ${data}`);
  });

  nestProcess.stderr.on("data", (data) => {
    console.error(`Error en NestJS: ${data}`);
  });

  nestProcess.on("close", (code) => {
    console.log(`NestJS terminó con código ${code}`);
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.whenReady().then(async () => {
  await PrinterApi.bootstrap(); // Inicializa tu API de Printer si es necesario
  startNest(); // Inicia la API de NestJS
  createWindow(); // Crea la ventana de Electron
});

app.on("activate", () => {
  // En OS X es común recrear una ventana en la app cuando el icono del dock es clicado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
