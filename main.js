const { app, BrowserWindow, ipcMain } = require("electron");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const path = require("path");

let mainWindow;
let port;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "public/browser/index.html"));

  mainWindow.on("closed", function () {
    if (port.isOpen) {
      port.close();
    }
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  // Establish Serial Port Connection
  port = new SerialPort("COM4", { baudRate: 115200 });

  // Use a promise to wait for the SerialPort to open before attaching the parser
  port
    .open()
    .then(() => {
      const parser = port.pipe(new Readline({ delimiter: "\n" }));

      // Read RFID data from Arduino and send it to the renderer process
      parser.on("data", (data) => {
        console.log("RFID Data from Arduino:", data);
        mainWindow.webContents.send("rfid-data", data);
      });
    })
    .catch((error) => {
      console.error("Error opening SerialPort:", error);
    });

  // IPC listener for additional communication between main and renderer processes
  ipcMain.on("request-rfid-data", (event) => {
    // You can send a response or perform additional actions here
    console.log("Request for RFID data received");
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Close the SerialPort before quitting the app
app.on("before-quit", () => {
  if (port.isOpen) {
    port.close();
  }
});
