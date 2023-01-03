import React from "react";
import { NavLink } from "react-router-dom";
import style from './Navbar.module.scss';

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
                <NavLink to={'/'} role='application'><img src="/images/logo.svg" alt="logo image" width={150} /></NavLink>
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
            </ul>
        </nav>
    );
}