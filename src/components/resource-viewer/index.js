import {
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import mime from 'mime-types';

import { Context } from 'provider';
import {
  Vaca,
  EmojiButton,
  ResourceRender,
  SplashScreen,
} from 'components';
import { FileFolder } from 'assets/jm';
import { Memo } from 'assets/emojis';

import Wrapper from './style';

const ipc = window.require('electron').ipcRenderer;

export default () => {
  const { resourceId, allResources, isSearching, isSelected } = useContext(Context);

  const [showSplash, setShowSplash] = useState(true);
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceTitle, setResourceTitle] = useState(null);
  const [resourceDescription, setResourceDescription] = useState(null);
  const [resourceType, setResourceType] = useState(null);
  const [resourceNotFound, setResourceNotFound] = useState(null);

  useEffect(() => {
    if (!isSearching && !isSelected) {
      setShowSplash(true);
      return;
    }

    if (!resourceId) return;
    setShowSplash(false);

    const resourceFound = allResources.find(r => r.id === resourceId);
    setResourceTitle(resourceFound.titulo);
    setResourceDescription(resourceFound.descripcion);
    setResourceType(mime.lookup(resourceFound.nombre_archivo));

    ipc.send('build-filename', resourceFound.nombre_archivo);
  }, [resourceId, isSearching, isSelected]);

  useEffect(() => {
    ipc.on('build-filename-result', (e, result) => {

      if (result.error) {
        setResourceNotFound(true);
      } else {
        setResourceNotFound(false);
      }

      setResourceFile(result.filePath);
    });
  }, []);

  if (showSplash) {
    return ( 
      <Wrapper.Main>
        <SplashScreen />
      </Wrapper.Main>
    );
  }

  return (
    <Wrapper.Main>
      <Wrapper.ResourcePlaceholder>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl truncate">{ resourceTitle }</h1>
          <div className="flex">
            {
              !resourceNotFound &&
                <>
                  <EmojiButton src={FileFolder}
                    title="Abrir en carpeta"
                    onClick={() => ipc.send('open-in-folder', resourceFile)}
                  />
                  <EmojiButton src={Memo}
                    title="Abrir recurso"
                    onClick={() => ipc.send('open-file', resourceFile)}
                  />
                </>
            }
          </div>
        </div>
        <h2 className="text-lg">{ resourceDescription }</h2>
        {
          resourceNotFound ?
            <div className="flex flex-col items-center justify-center rounded">
              <Vaca name="Panico" size="2x" />
              <h1 className="mt-8 text-2xl font-bold">Recurso no encontrado</h1>
              <h2
                className="mt-9 underline cursor-pointer text-sm"
                onClick={() => ipc.send('open-resource-folder')}
              >
                Abrir carpeta de recursos
              </h2>
            </div>:
            <ResourceRender file={resourceFile} mimeType={resourceType} />
        }
      </Wrapper.ResourcePlaceholder>
    </Wrapper.Main>
  );
};
