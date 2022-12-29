import React from "react";
import styles from './Card.module.scss';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";

interface Props {
    src: string,
    date: Date | string,
    name: string,
    id: number
};

export function CardComponent({ src, date, name, id }: Props) {
    return (
        <Link to={'/' + id}>
            <Card className={styles.card_container}>
                <Image src={src} wrapped ui={false} className={styles.image} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{ date.toLocaleString().replaceAll('-', '/') }</Card.Meta>
                </Card.Content>
            </Card>
        </Link>
    );  

    // <div className={styles.card_container}>
    //     <div className="img-container">
    //         <img src={src} alt={alt} width={100} />
    //     </div>
    //     <div>{date.toLocaleDateString()}</div>
    // </div>
}