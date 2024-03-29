import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import styles from "./index.module.scss";

interface ITemperatureDayProps extends React.HTMLAttributes<HTMLDivElement> {
    dayDescription: string;
    temperature: string;
    maxTemperature?: string;
    minTemperature?: string;
    children?: React.ReactNode;
    onClick: () => void;
}

const TemperatureDay = componentFactory<ITemperatureDayProps>(
    "TemperatureDay",
    (
        {
            dayDescription = "",
            temperature = "0",
            className = "",
            children,
            minTemperature = undefined,
            maxTemperature = undefined,
            onClick,
            ...rest
        },
        ref
    ) => {
        const style = `${className} ${styles.TemperatureDay}`;
        return (
            <div ref={ref} className={style} {...rest}>
                <section className={styles.Section}>
                    <h2>{dayDescription}</h2>
                    <span onClick={onClick}>{`${temperature}`}</span>
                    <div className={styles.MinMaxTemperature}>
                        <span onClick={onClick}>{`${minTemperature}`}</span>
                        <span onClick={onClick}>{`${maxTemperature}`}</span>
                    </div>
                </section>
                {children}
            </div>
        );
    }
);

export default TemperatureDay;
