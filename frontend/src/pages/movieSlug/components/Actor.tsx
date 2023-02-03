import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Actor.module.scss';

interface Props {
    base_url: string
    profile_path: string, 
    character_name?: string, 
    actor_name?: string
}

export function Actor({ base_url, profile_path, character_name, actor_name }: Props) {
    return (
        <Link to={'#'} className={styles.actor_container}>
            <div className={styles.img_container}>
                <img src={`${base_url}/w138_and_h175_face${profile_path}`} />
            </div>
            <div className={styles.names_container}>
                <p className={styles.actor_name}><strong> { actor_name } </strong></p>
                <p className={styles.character_name}> { character_name } </p>
            </div>
        </Link>
    );
}