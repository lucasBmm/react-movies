import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

interface Props {
    children?: React.ReactNode
}

export function Layout({ children }: Props) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}