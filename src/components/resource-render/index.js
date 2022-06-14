import { Vaca } from 'components';
import * as Viewers from './components';

const ipc = window.require('electron').ipcRenderer;

const Img = ({ file }) => <img src={file} />

const ResourceNotSupported = ({ file, type }) => (
  <div className="flex flex-col items-center justify-center">
    <Vaca name="Panico" size="2x" />
    <h1 className="text-2xl font-bold">Formato <span className="underline">{type}</span> no soportado</h1>
    <h2
      className="mt-9 underline cursor-pointer text-sm"
      onClick={() => ipc.send('open-in-folder', file)}
    >
      Abrir archivo en carpeta de recursos
    </h2>
  </div>
);

const appendCustomProtocol = file => `proto-propio://${file}`;
export default ({ file, mimeType }) => {
  let component;

  switch (mimeType) {
    case 'video/mp4':
      component = <Viewers.Video key={file} file={appendCustomProtocol(file)} />;
      break;

    case 'image/jpeg':
      component = <Img file={appendCustomProtocol(file)} />;
      break;

    case 'application/pdf':
      component = <Viewers.PDF file={appendCustomProtocol(file)} />;
      break;

    case 'text/html':
      component = <Viewers.HTML file={file} />;
      break;

    case 'audio/mpeg':
      component = <Viewers.Audio file={appendCustomProtocol(file)} />
      break;

    default:
      console.log(`${file} (${mimeType}) no soportado`);
      component = <ResourceNotSupported file={file} type={mimeType && mimeType.split('/')[1]} />;
  }

  return (
    component
  );
};
