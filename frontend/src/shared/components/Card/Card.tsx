import React from "react";
import styles from './Card.module.scss';
import { Card, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

interface Props {
    src:  string,
    date?: Date | string,
    name: string,
    id:   number
};

export function CardComponent({ src, date, name, id }: Props) {

    const formatDate = ( date: Date | string ) => {
        return date.toLocaleString().split("-").reverse().join("/");
    }

    return (
        <Link to={'movies/' + id}>
            <div className={styles.card_container}>
                <Image src={src} wrapped ui={false} className={styles.image} />
                <Card.Content className={styles.content}>
                    {date && <Card.Meta>{ formatDate(date) }</Card.Meta>}
                    <Card.Header>{name}</Card.Header>
                </Card.Content>
            </div>
        </Link>
    );
}