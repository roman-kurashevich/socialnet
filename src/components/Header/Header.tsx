import { Avatar, Col, Layout, Menu, Row } from "antd";
import { UserOutlined } from '@ant-design/icons';
import React from "react";
import {Link } from "react-router-dom";
import s from './Header.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { logout } from "../../redux/authReducer";
import { selectIsAuth, selectCurrentUserLogin } from "../../redux/authSelector";
import { Button } from "antd/lib/radio";


export const AppHeader: React.FC = (props) => {

  const login = useSelector(selectIsAuth)
  const isAuth =  useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCalback = () => {
    dispatch(logout())
  }

  const { Header } = Layout; // ant-design

  return (

    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/developers" className={s.link} >Developers</Link></Menu.Item>
          </Menu>
        </Col>

         { isAuth ? 
            <>
              <Col span={2}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Col>
              <Col span={4}>
                <Button onClick={logoutCalback}>Logout</Button>
              </Col>
            </>  
            : <Col span={6}>
              <Button>
                <Link to={'/login'}>Login</Link>
              </Button>
              </Col>
         }
      </Row>
    </Header>

    // <header className={s.header}>
    //     <img src='https://pbs.twimg.com/profile_images/1063925348205821958/DlGcxdOl.jpg'/>

    //     <div className={s.loginBlock}>

    //       { props.isAuth ? 
    //         <div>
    //           {props.login}
    //           <button onClick={props.logout}>Logout</button>
    //         </div>  
    //         : <NavLink to={'/login'}>Login</NavLink>}
          
    //     </div>

    // </header>
  )
}