import React from "react";
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <footer>
            <img src="/images/footer-img.svg" alt="footer logo image" width={200}/>
            <small>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
        </footer>
    );
}