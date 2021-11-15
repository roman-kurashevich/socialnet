import React from 'react';
import Navbar from './components/Navbar/Navbar';
import s from './App.module.css'
import { Route, withRouter } from 'react-router';

import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { initializedApp } from './redux/appReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

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
          <Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
          <Route path="/dialogs" render={() => <DialogsContainer/>} />
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

export default  compose(
  withRouter,
  connect(mapStateToProps, {initializedApp})
  )(App);
