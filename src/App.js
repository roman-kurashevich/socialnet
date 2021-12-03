import React from "react";
import Navbar from "./components/Navbar/Navbar";
import s from "./App.module.css";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { HashRouter } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {
  initializedApp,
  setGlobalError,
  clearGlobalError,
} from "./redux/appReducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/reduxStore";
import withSuspense from "./hoc/withSuspense";
import Popup from "./components/common/Popup/Popup";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

const DialogsContainerWithSusoense = withSuspense(DialogsContainer);

class App extends React.Component {
  catchAllUnhandledErrors = (error) => {
    this.props.setGlobalError(error);
    // console.error(promiseRejectionEvent)
  };

  componentDidMount() {
    this.props.initializedApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    //можно вывести ошибку
    // if (this.props.globalError) {
    //   return <div>Somethins go wrong {this.props.globalError}</div>
    // }

    return (
      <div className={s.app_wrapper}>
        {this.props.globalError && (
          <Popup
            message={this.props.globalError}
            closePopup={this.props.clearGlobalError}
          />
        )}
        <HeaderContainer />
        <Navbar />
        <div className={s.app_wrapper_content}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            />
            <Route
              path="/dialogs"
              render={() => <DialogsContainerWithSusoense />}
            />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    globalError: state.app.globalError,
  };
};

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializedApp, setGlobalError, clearGlobalError })
)(App);

let SamuraiJSApp = (props) => {
  return (
    //использую HashRouter вместо BrowserRouter, чтобы работал деплой на gitHub
    // basename={process.env.PUBLIC_URL}
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
