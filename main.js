const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  // Create browser window
  mainWindow = new BrowserWindow();

  // Load index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
