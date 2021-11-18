import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import store from './redux/reduxStore';
import SamuraiJSApp from './App';

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <SamuraiJSApp/>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState());

// store.subscribe(() => {
//   rerenderEntireTree(store.getState());
// });
// store.subscribe(rerenderEntireTree); // так было, когда использовали самодельный стор вместо редакса

reportWebVitals();
