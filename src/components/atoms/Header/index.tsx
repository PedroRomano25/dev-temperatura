import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import styles from "./index.module.scss";

interface IHeaderProps {
    children: React.ReactNode;
}

const Header = componentFactory<IHeaderProps>("Header", ({ children }, ref) => {
    return (
        <header ref={ref} className={styles.Header}>
            {children}
        </header>
    );
});

export default Header;
