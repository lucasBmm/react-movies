import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { configSelector } from "../../../features/defaultConfig";
import styles from './Banner.module.scss';

interface Props {
    img: string,
    alt: string,
    filter?: boolean
}

export function Banner({ img, alt, filter }: Props) {
    const configState = useAppSelector(configSelector);
    
    return (
        <div className={styles.background_img} style={filter ? {filter: 'brightness(0.5)'} : {}}>
            <img src={`${configState?.images.base_url}original${img}`} alt={alt} />
        </div>
    )
}