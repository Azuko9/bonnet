
import clsx from "clsx";
import styles from "../styles/components/header.module.css";

const Header: React.FC = () => {
    return (
        <header className={clsx(styles.header, "abso")}>
            <div className={clsx(styles.ongletA, "abso")}>
                <img className={clsx(styles.logo)} src="/img/logo-b.png" alt="" />
                <img
                    className={clsx(styles.logo, styles.logoCircleLittle)}
                    src="/img/logo-circle-little.png"
                    alt=""
                />
                <img
                    className={clsx(styles.logo, styles.logoCircleBig)}
                    src="/img/logo-circle-big.png"
                    alt=""
                />
                <p className={clsx(styles.textLogo, "abso")}>BONNET</p>
            </div>

            <div className={clsx(styles.ongletB, "abso")}>
                <a href="/image&son">IMAGE & SON</a>
            </div>
            <div className={clsx(styles.ongletC, "abso")}>
                <a className="abso" href="service">SERVICE</a>
            </div>
            <div className={clsx(styles.ongletD, "abso")}>
                <a href="/visioconference">VISIOCONFÉRENCE</a>
            </div>
            <div className={clsx(styles.ongletE, "abso")}>
                <a href="/cinema">CINEMA</a>
            </div>
        </header>
    );
};

export default Header;