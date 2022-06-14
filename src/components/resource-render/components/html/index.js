import Wrapper from './style';
import { Vaca } from 'components';

const ipc = window.require('electron').ipcRenderer;

export default ({ file }) => (
  <Wrapper.Main>
    <h1 className="text-2xl font-bold text-center">
      Este recurso se ve mejor si usás<br />
      <span
        className="underline cursor-pointer primary-color-text"
        onClick={() => ipc.send('open-file', file)}
      >
        esta herramienta
      </span>{' '}
      de Huayra
    </h1>
    <div className="mt-8">
      <Vaca name="Indica" size="1.5x" mirror />
    </div>
  </Wrapper.Main>
);
