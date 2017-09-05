import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import {FormTest} from './pages/Form';

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


// import {CardTest} from './pages/GalleryCard';
 
// const rootEl = document.getElementById('content');

// ReactDOM.render(
//   <AppContainer>
//     <CardTest />
//   </AppContainer>,
//   rootEl
// );

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./pages/GalleryCard', () => {
//     const NextApp = require<{CardTest: typeof CardTest}>('./pages/GalleryCard').CardTest;
//     ReactDOM.render(
//       <AppContainer>
//         <NextApp />
//       </AppContainer>
//       ,
//       rootEl
//     );
//   });
// }

// import {AlertTest} from './pages/Alert';

// const rootEl = document.getElementById('content');

// ReactDOM.render(
//  <AppContainer>
//    <AlertTest />
//  </AppContainer>,
//  rootEl
// );

// // Hot Module Replacement API
// if (module.hot) {
//  module.hot.accept('./pages/Alert', () => {
//    const NextApp = require<{AlertTest: typeof AlertTest}>('./pages/Alert').AlertTest;
//    ReactDOM.render(
//      <AppContainer>
//        <NextApp />
//      </AppContainer>
//      ,
//      rootEl
//    );
//  });
// }
