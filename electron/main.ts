import { app, BrowserWindow } from "electron";
import path from "node:path";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

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
let nestApp: any;
// Inicia tu API de NestJS
async function startNest() {
  try {
    nestApp = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
      cors: true, // Habilita CORS si es necesario
    });

    // Agrega cualquier configuración adicional de NestJS aquí
    // como middleware, controladores, servicios, etc.

    await nestApp.listen(3000);
    console.log("NestJS API is running on port 3000");
  } catch (error) {
    console.error("Error starting NestJS:", error);
    throw error;
  }
}

async function cleanup() {
  if (nestApp) {
    await nestApp.close();
  }
}

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    await cleanup();
    app.quit();
    win = null;
  }
});

app.whenReady().then(async () => {
  // startNest(); // Inicia la API de NestJS
  createWindow(); // Crea la ventana de Electron
  try {
    await startNest();
    // Crea la ventana de Electron y otras inicializaciones
  } catch (error) {
    console.error("Error starting the application:", error);
    app.quit();
  }
});

app.on("activate", () => {
  // En OS X es común recrear una ventana en la app cuando el icono del dock es clicado y no hay otras ventanas abiertas.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
