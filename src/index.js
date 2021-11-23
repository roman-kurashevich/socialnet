import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import SamuraiJSApp from './App';


ReactDOM.render(
  <SamuraiJSApp/>,
  document.getElementById('root')
);

// так было, когда использовали самодельный стор вместо редакса
// let rerenderEntireTree = (state) => {
//   ReactDOM.render(
//     <SamuraiJSApp/>,
//     document.getElementById('root')
//   );
// }

// rerenderEntireTree(store.getState());

// store.subscribe(() => {
//   rerenderEntireTree(store.getState());
// });
// store.subscribe(rerenderEntireTree);

reportWebVitals();