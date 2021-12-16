import React from "react";
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}> 
      <div className={`${s.item}`}>
        <NavLink to="/profile" className={s.link} activeClassName={s.active}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={s.link} activeClassName={s.active}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" className={s.link} activeClassName={s.active}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" className={s.link} activeClassName={s.active}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" className={s.link} activeClassName={s.active}>Settings</NavLink>
      </div>
      <div className={s.item + ' ' + s.itemFriends}>
        <NavLink to="/friends" className={s.link} activeClassName={s.active}>Friends</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" className={s.link} activeClassName={s.active}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/login" className={s.link} activeClassName={s.active}>Login</NavLink>
      </div>
    </nav>
  )
}

export default Navbar;