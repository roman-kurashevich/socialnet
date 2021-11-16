import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

// setInterval(() => {
//   store.dispatch({type: "FAKE"})
// }, 1000)

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
          <App 
            // store={store} // весь стор
            // state={state} // весь state
            // dispatch={store.dispatch.bind(store)}
            // addPost={store.addPost.bind(store)}  // добавление поста
            // updateNewPostText={store.updateNewPostText.bind(store)} // запись каждого символа при вводе в state.profilePage.newPostText
            // sendMessage={store.sendMessage.bind(store)} // отправка сообщения
            // updateNewMessageText={store.updateNewMessageText.bind(store)} //запись символов сообщения в стэйт при вводе
          />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState());

// store.subscribe(() => {
//   rerenderEntireTree(store.getState());
// });
// store.subscribe(rerenderEntireTree); // так было, когда использовали самодельный стор вместо редакса



reportWebVitals();
