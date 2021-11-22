import React from 'react';
import Navbar from './components/Navbar/Navbar';
import s from './App.module.css'
import { Route, withRouter } from 'react-router';

import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { initializedApp } from './redux/appReducer'
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import withSuspense from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const DialogsContainerWithSusoense = withSuspense(DialogsContainer);

class  App extends React.Component {

  componentDidMount() {
    this.props.initializedApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className={s.app_wrapper}>
        <HeaderContainer />
        <Navbar 
          // store={props.store}
          // sideBar={props.state.sideBar} 
        />
        <div className={s.app_wrapper_content}>
          <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
          <Route path="/dialogs" render={() => <DialogsContainerWithSusoense/>} />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
          <Route path="/users" render={() => <UsersContainer/>} />
          <Route path="/login" render={() => <LoginPage/>} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializedApp})
)(App);

let SamuraiJSApp = (props) => {
  return (
    <HashRouter 
    // basename={process.env.PUBLIC_URL}
    >
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    </HashRouter>
  )
}
export default SamuraiJSApp;