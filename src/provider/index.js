import {
  useEffect,
  useState,
  createContext,
} from 'react';

// import allResources from '../indice.json';
const ipc = window.require('electron').ipcRenderer;

export const Context = createContext(null);

export default ({ children }) => {
  const [allResources, setAllResources] = useState([]);
  const [resources, setResources] = useState([]);
  const [resourceId, setResourceId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [appReady, setAppAsReady] = useState(false);
  const [appFailed, setAppFailed] = useState(null);

  const providerValue = {
    resources,
    resourceId,
    isSearching,
    setResources,
    setResourceId,
    allResources,
    setIsSearching,
    appReady,
    appFailed
  };

  useEffect(() => {
    if (!appReady) return;

  }, [appReady]);

  useEffect(() => {
    setTimeout(() => ipc.send('load-index'), 1000);

    ipc.on('load-index-result', (e, result) => {
      if (result.error) {
        setAppFailed(result.error);
        return;
      }

      setAllResources(result.resources);
      setAppAsReady(true);
    });
  }, []);


  return (
    <Context.Provider value={providerValue}>
      { children }
    </Context.Provider>
  );
};
