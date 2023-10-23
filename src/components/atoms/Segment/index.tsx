import * as React from "react";
import componentFactory from "../../../utils/componentFactory/componentFactory";
import styles from "./index.module.scss";

const Segment = componentFactory<ISegmentProps>(
    "Segment",
    ({ children, className = "", ...rest }, ref) => {
        const style = `${className} ${styles.Segment}`;
        return (
            <div ref={ref} className={style} {...rest}>
                {children}
            </div>
        );
    }
);

export default Segment;
