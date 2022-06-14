import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from 'provider';
import { Vaca, EmojiButton } from 'components';
import { MagnifyingGlass} from 'assets/emojis';

import Wrapper from './style';

export default () => {
  const {
    resources,
    resourceId,
    setResourceId,
    isSearching,
  } = useContext(Context);

  const [resourcesToExplore, setResourcesToExplore] = useState([]);

  useEffect(() => {
    setResourcesToExplore(resources);
  }, [resources]);

  return (
    <Wrapper.Main>
      {
        resourcesToExplore.length ?
        resourcesToExplore.map(c => (
          <Wrapper.Item
            onClick={() => setResourceId(c.id)}
            key={c.id}
            selected={c.id === resourceId}
          >
            { c.titulo }
          </Wrapper.Item>
        )):
        <div className="h-full flex flex-col items-center justify-center p-4">
          {
            isSearching ?
            <div className="flex flex-col items-center">
              <Vaca name="Panico" size="1.5x" />
              <h1 className="text-2xl text-center">
                No se encontraron recursos, probá con otra búsqueda.
              </h1>
            </div> :
            <div className="flex flex-col items-center">
              <EmojiButton src={MagnifyingGlass} title="Buscá" size="128px" />
              <h1 className="text-2xl text-center">
                Y acá van a aparecer los resultados
              </h1>
            </div>
          }
        </div>
      }
    </Wrapper.Main>
  );
};
