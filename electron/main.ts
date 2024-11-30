import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
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

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    await cleanup();
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
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

// app.whenReady().then(createWindow);
