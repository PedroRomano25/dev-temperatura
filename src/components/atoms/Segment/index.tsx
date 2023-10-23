import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import styles from "./index.module.scss";

interface ISegmentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

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
