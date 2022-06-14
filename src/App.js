import { useContext } from 'react';
import GlobalStyle from 'global-style';

import Provider, { Context } from './provider';
import { MainLayout } from 'layouts';
import {
  SearchBar,
  CategorySelector,
  ResourceViewer,
  ResourceExplorer,
  LoadingScreen,
} from 'components';

const AppDispatcher = () => {
  const { appReady } = useContext(Context);

  if (!appReady) return <LoadingScreen />;

  return (
    <>
      <SearchBar />
      <ResourceViewer />
      <div className="text-white text-center text-lg">o también podés</div>
      <CategorySelector />
      <ResourceExplorer />
    </>
  );
};

const App = () => (
  <>
    <GlobalStyle />
    <MainLayout>
      <Provider>
        <AppDispatcher />
      </Provider>
    </MainLayout>
  </>
);

export default App;
