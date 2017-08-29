import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {CardTest} from './pages/GalleryCard';
 
const HelloWorld = _ => <h1>Hello, world!</h1>;

ReactDOM.render(<CardTest />, document.getElementById('content'));

const rootEl = document.getElementById('content');

ReactDOM.render(
  <AppContainer>
    <CardTest />
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./pages/GalleryCard', () => {
    const NextApp = require<{CardTest: typeof CardTest}>('./pages/GalleryCard').CardTest;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    );
  });
}