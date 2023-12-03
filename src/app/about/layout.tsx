import React from "react";
import styles from './styles.module.css';

export default function Layout({
    children,}: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>About nav bar</nav>
            <hr/>
            <main className={styles.Main}>{children}</main>
        </>
    )
}