import * as React from "react";
import componentFactory from "../../../utils/componentFactory/componentFactory";
import styles from "./index.module.scss";
import { useClimate } from "../../../context/provider.context";

const Container = componentFactory<IContainerProps>(
    "Container",
    ({ children }, ref) => {
        const { image } = useClimate();
        const style = { backgroundImage: `url(${image})` };
        return (
            <div ref={ref} className={styles.Container} style={style}>
                <div className={styles.ContainerColor}>{children}</div>
            </div>
        );
    }
);

export default Container;
