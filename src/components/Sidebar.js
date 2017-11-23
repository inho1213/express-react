import React from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-title">
                            Menu
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link" activeClassName="active"><i className="icon-screen-desktop"></i> HOME</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;