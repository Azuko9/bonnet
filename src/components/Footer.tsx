"use client"; // 👈 Obligatoire pour utiliser useState

import React, { useState } from "react";
import styles from "../styles/components/footer.module.css";
import clsx from "clsx";

const Footer: React.FC = () => {
    const [active, setActive] = useState(false);

    return (
        <footer className={styles.footer}>
            <button
                className={clsx(
                    styles.footerButton,
                    active && styles.footerButtonActive
                )}
                onClick={() => setActive(!active)}
            />
            <div
                className={clsx(
                    styles.footerContent,
                    active && styles.footerContentVisible
                )}
            >
                <div className={styles.footerLogo}>
                    <img src="/img/LOGO_COLOR.png" className={styles.img} alt="" />
                    <div>
                        <a href="/contact">
                            <p>BONNET</p>
                        </a>
                        <a href="https://www.google.com/maps/place/BONNET+Magasin+TV+-+HIFI+-+VIDEO/@43.469408,-1.5426891,17z/data=!3m1!4b1!4m6!3m5!1s0xd511535d6b12d8d:0x531d06240053c307!8m2!3d43.469408!4d-1.5426891!16s%2Fg%2F1tdq7b9g?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">
                            <p>10 allée Marie Politzer 64200 Biarritz</p>
                        </a>
                        <a href="tel:+33559417777">
                            <p>05 59 41 77 77</p>
                        </a>
                    </div>
                </div>
                <div>
                    <a href="/contact">
                        <p>la société</p>
                    </a>
                    <a href="/contact">
                        <p>contact</p>
                    </a>
                    <a href="/login">
                        <p> 2025 Bonnet Magasin TV - HIFI - VIDEO</p>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;