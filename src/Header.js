import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'redux-zero/react';
import { signOut } from './actions';
import './App.css';

const Header = ({ user }) => {
    return (
        <header className="main-header">
            <nav id="boards_nav">
                <ul>
                    <li>
                        <NavLink to={"/"}><i className="fa fa-columns"></i><span> Boards</span></NavLink>
                    </li>
                </ul>
            </nav>
            <a href="/"><span className="logo"></span></a>
            <nav className="right">
                <ul>
                    <li>
                        <a className="current-user">
                            <img alt="Gravatar" src="//www.gravatar.com/avatar/6a88cfcf7b76267b129b8dc477c4105e?d=retro&amp;r=g&amp;s=50" height="50" width="50" className="react-gravatar react-gravatar"/>
                            <span></span>
                            <span>{user.firstName + " " + user.lastName}</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={signOut}><i className="fa fa-sign-out"></i><span> Sign out</span></a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const mapToProps = ({ user }) => ({ user })
export default connect(mapToProps)(Header);