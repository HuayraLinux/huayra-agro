const fs = require('fs');
const path = require('path');
const {
  app,
  BrowserWindow,
  protocol,
  ipcMain,
  shell,
  Menu,
  globalShortcut,
} = require('electron');

const buildError = require('./error');

const checkIntegrity = (resources, fileName) => {
  const updatedResources = resources.reduce((acc, r, i) => {
    if (
      !r.ciclo ||
      !r.categoria ||
      !r.titulo ||
      !r.descripcion ||
      !r.descripcion
    ) return acc;

    return acc.concat({id: i + 1, ...r});
  }, []);

  if (!updatedResources.length) {
    throw buildError('NO_RESOURCES', `No se encontraron recursos en ${fileName}`);
  }

  return updatedResources;
};

const defaults = {
  CARPETA_RECURSOS: '/home/recursos',
  ANCHO: 1366,
  ALTO: 655,
};

const homeConfigPath = `${process.env.HOME}/.huayra-recursos-educativos-abiertos.json`;
let config = {};
try {
  const homeConfig = fs.readFileSync(homeConfigPath, 'utf8');
  config = { ...JSON.parse(homeConfig) };
} catch (e) {
  console.log(`No se encontró configuración en ${homeConfigPath}`);
  console.log('Aplicando configuración por defecto:');
  console.log(defaults);
  console.log(`Se crea ${homeConfigPath} con configuración previamente utilizada`);

  fs.writeFileSync(homeConfigPath, JSON.stringify(defaults, null, 4));
} finally {
  config = {
    baseDir: process.env.CARPETA_RECURSOS || config.CARPETA_RECURSOS || defaults.CARPETA_RECURSOS,
    width: process.env.ANCHO || config.ANCHO || defaults.ANCHO,
    height: process.env.ALTO || config.ALTO || defaults.ALTO,
  };
}

const reactDevServer = process.env.REACT_DEV_SERVER;

const createWindow = () => {
  let mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    minWidth: defaults.ANCHO,
    minHeight: defaults.ALTO,
    webPreferences: {
      nodeIntegration: true,
      devTools: reactDevServer && true,
    },
  });

  const startURL = reactDevServer || `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);
  mainWindow.setPosition(0, 0);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle('Recursos Educativos Abiertos');
  
  if (reactDevServer) {
    mainWindow.webContents.openDevTools();
  } else {
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  }

  ipcMain.on('load-index', () => {
    const indexPath = `${config.baseDir}/indice.json`;

    let response = {};
    try {
      const indexContents = fs.readFileSync(indexPath);
      response.resources = checkIntegrity(JSON.parse(indexContents), indexPath);
    } catch (e) {

      if (e instanceof SyntaxError) {
        response.error = `[ERROR]: ${indexPath} no parece ser un archivo JSON válido`;
      } else if (e.code === 'ENOENT') {
        response.error = `[ERROR]: ${indexPath} no encontrado`;
      } else if (e.name === 'NO_RESOURCES') {
        response.error = `[ERROR]: ${e.message}`;
      } else {
        response.error = `[ERROR]: Problema desconocido con indice ${indexPath}`;
        console.log(e)
      }

      console.log(response.error)
    } finally {
      mainWindow.webContents.send('load-index-result', response);
    }
  });

  ipcMain.on('build-filename', (e, file) => {
    const filePath = `${config.baseDir}/${file}`;
    const response = { filePath };

    try {
      fs.accessSync(filePath);
    } catch (e) {
      response.error = true;
    } finally {
      mainWindow.webContents.send('build-filename-result', response);
    }
  });

  ipcMain.on('open-in-folder', (e, file) => shell.showItemInFolder(file));
  ipcMain.on('open-file', (e, file) => shell.openPath(file));
  ipcMain.on('open-resource-folder', (e, file) => shell.openPath(config.baseDir));

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  if (!reactDevServer) {
    globalShortcut.register('CommandOrControl+R', () => null);
    globalShortcut.register('F5', () => null);
  }

  const protocolName = 'proto-propio';
  protocol.registerFileProtocol(protocolName, (request, callback) => {
    const url = request.url.replace(`${protocolName}://`, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error)
    }
  });

  createWindow();
});
