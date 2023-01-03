import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { configSelector } from "../../../features/defaultConfig";
import styles from './Banner.module.scss';

interface Props {
    img: string,
    alt: string
}

export function Banner({ img, alt }: Props) {
    const configState = useAppSelector(configSelector);
    
    return (
        <div className={styles.background_img}>
            <img src={`${configState?.images.base_url}original${img}`} alt={alt} />
        </div>
    )
}