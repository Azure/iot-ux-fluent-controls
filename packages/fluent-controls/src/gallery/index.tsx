import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {FormTest} from './pages/Form';
 
const HelloWorld = _ => <h1>Hello, world!</h1>;

ReactDOM.render(<FormTest />, document.getElementById('content'));

const rootEl = document.getElementById('content');

ReactDOM.render(
  <AppContainer>
    <FormTest />
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./pages/Form', () => {
    const NextApp = require<{FormTest: typeof FormTest}>('./pages/Form').FormTest;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    );
  });
}