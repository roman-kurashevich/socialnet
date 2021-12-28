import React, { ComponentType } from "react";
import { Layout, Menu, Breadcrumb, Col, Row } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import Navbar from "./components/Navbar/Navbar";
import s from "./App.module.css";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { HashRouter, Link, NavLink } from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import { UsersPage } from "./components/Users/UsersContainer";
import {LoginPage} from "./components/Login/Login";
import {
  initializedApp,
  setGlobalError,
  clearGlobalError,
} from "./redux/appReducer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";
import Popup from "./components/common/Popup/Popup";
import { QueryParamProvider } from "use-query-params";
import { Button } from "antd/lib/radio";
import Avatar from "antd/lib/avatar/avatar";
import { AppHeader } from "./components/Header/Header";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer") // экспорт должен быть дефолтный
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer") // экспорт должен быть дефолтный
);
const ChatPage = React.lazy(
  () => import("./pages/Chat/ChatPage") // экспорт должен быть дефолтный
);

const DialogsContainerWithSusoense = withSuspense(DialogsContainer);
const ProfileContainerWithSusoense = withSuspense(ProfileContainer);
const ChatPageWithSusoense = withSuspense(ChatPage);

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializedApp: () => void
  setGlobalError: (error: any) => void
  clearGlobalError: () => void
}


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;


class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (error: PromiseRejectionEvent) => {
    this.props.setGlobalError(error);
    // console.error(promiseRejectionEvent)
  };
  // catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
  //   alert("Some error");
  // };

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
      <Layout>
    <AppHeader />
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={['2']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
              <Menu.Item key="1">
                <Link to="/profile" className={s.link} >Profile</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/dialogs" className={s.link} >Messages</Link>
              </Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5">
                <Link to="/developers" className={s.link} >Users</Link>
              </Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Messages">
              <Menu.Item key="9">
                <Link to="/chat" className={s.link} >Chat</Link>
              </Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainerWithSusoense />}
            />
            <Route
              path="/dialogs"
              render={() => <DialogsContainerWithSusoense />}
            />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route
              path="/developers"
              render={() => <UsersPage />}
            />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/chat" render={() => <ChatPageWithSusoense />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Social Network 2021 Created by Roman Kurashevich</Footer>
  </Layout>

      // <div className={s.app_wrapper}>
      //   {this.props.globalError && (
      //     <Popup
      //       message={this.props.globalError}
      //       closePopup={this.props.clearGlobalError}
      //     />
      //   )}
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className={s.app_wrapper_content}>
      //     <Switch>
      //       <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
      //       <Route
      //         path="/profile/:userId?"
      //         render={() => <ProfileContainerWithSusoense />}
      //       />
      //       <Route
      //         path="/dialogs"
      //         render={() => <DialogsContainerWithSusoense />}
      //       />
      //       <Route path="/news" component={News} />
      //       <Route path="/music" component={Music} />
      //       <Route path="/settings" component={Settings} />
      //       <Route
      //         path="/users"
      //         render={() => <UsersPage />}
      //       />
      //       <Route path="/login" render={() => <LoginPage />} />
      //       <Route path="*" render={() => <div>404 NOT FOUND</div>} />
      //     </Switch>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
    globalError: state.app.globalError,
  };
};

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializedApp, setGlobalError, clearGlobalError })
)(App);

let SamuraiJSApp: React.FC = () => {
  return (
    //использую HashRouter вместо BrowserRouter, чтобы работал деплой на gitHub
    // basename={process.env.PUBLIC_URL}
    <HashRouter>
      <Provider store={store}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AppContainer />
        </QueryParamProvider>
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
