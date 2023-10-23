import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import styles from "./index.module.scss";

interface IDetailsTemperatureProps
    extends React.HTMLAttributes<HTMLDivElement> {
    climate: string;
    humidity: string;
    pressure: string;
    wind: string;
}

const DetailsTemperature = componentFactory<IDetailsTemperatureProps>(
    "DetailsTemperature",
    (
        {
            climate = "Carregando",
            humidity = "Carregando",
            pressure = "Carregando",
            wind = "Carregando",
            className = "",
            ...rest
        },
        ref
    ) => {
        const style = `${className} ${styles.DetailsTemperature}`;
        return (
            <div ref={ref} className={style} {...rest}>
                <h2>{climate}</h2>
                <section>
                    <span>{`${wind}`}</span>
                    <span>{`${humidity}`}</span>
                    <span>{`${pressure}`}</span>
                </section>
            </div>
        );
    }
);

export default DetailsTemperature;
