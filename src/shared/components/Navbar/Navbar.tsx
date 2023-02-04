import React from "react";
import { NavLink } from "react-router-dom";
import style from './Navbar.module.scss';
import { Icon } from "semantic-ui-react";

export function Navbar() {
    const navbarLinks = [
        {
            name: 'Movies',
            url: 'movies'
        },
        {
            name: 'Series',
            url: 'series'
        },
        {
            name: 'People',
            url: 'people'
        },
    ];

    return (
        <nav className={style.navbar}>
            <div className={style.logo}>
                <NavLink to={'/'} role='application'></NavLink>
            </div>
            <ul className={style.list}>
                {navbarLinks.map((link, i) => (
                    <li key={i}>
                        <NavLink 
                            to={'/' + link.url} 
                            className={({ isActive }) => isActive ? style.activeLink : style.link}
                        > {link.name} 
                        </NavLink>
                    </li>
                ))}
                <li>
                    <Icon disabled name='bell outline' />

                    <Icon disabled name='search' />

                    <Icon disabled name='user' />
                </li>
            </ul>
        </nav>
    );
}