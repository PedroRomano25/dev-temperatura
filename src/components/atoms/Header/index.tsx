import * as React from "react";
import componentFactory from "../../../utils/componentFactory/componentFactory";
import styles from "./index.module.scss";

const Header = componentFactory<IHeaderProps>("Header", ({ children }, ref) => {
    return (
        <header ref={ref} className={styles.Header}>
            {children}
        </header>
    );
});

export default Header;
