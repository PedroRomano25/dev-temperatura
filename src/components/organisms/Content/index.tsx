import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import Segment from "../../atoms/Segment";
import styles from "./index.module.scss";
import Image from "next/image";
import TemperatureDay from "../../molecules/TemperatureDay";
import DetailsTemperature from "../../molecules/DetailsTemperature";
import { useMemo } from "react";

export interface IContentProps extends React.HTMLAttributes<HTMLElement> {
    text: {
        today: string;
        tomorrow: string;
        afterTomorrow: string;
    };
    dataCurrent: {
        climateFigure: string;
        dayDescription: string;
        temperature: string;
        maxTemperature: string;
        minTemperature: string;
        climate: string;
        humidity: string;
        pressure: string;
        wind: string;
    };
    dataForecast: {
        temperatureTomorrow: string;
        maxTemperatureTomorrow: string;
        minTemperatureTomorrow: string;
        temperatureAfterTomorrow: string;
        maxTemperatureAfterTomorrow: string;
        minTemperatureAfterTomorrow: string;
    };
    variant: "Yellow" | "Blue" | "Red" | "White";
    onClick: () => void;
}

const Content = componentFactory<IContentProps>(
    "Content",
    ({ dataCurrent, dataForecast, text, variant, onClick }, ref) => {
        const { afterTomorrow, tomorrow, today } = text;
        const {
            climate,
            climateFigure,
            humidity,
            maxTemperature,
            minTemperature,
            pressure,
            temperature,
            wind,
        } = dataCurrent;
        const {
            maxTemperatureAfterTomorrow,
            maxTemperatureTomorrow,
            minTemperatureAfterTomorrow,
            minTemperatureTomorrow,
            temperatureAfterTomorrow,
            temperatureTomorrow,
        } = dataForecast;
        const style = useMemo(
            () => (climate === "" ? styles["White"] : styles[variant]),
            [climate, variant]
        );
        return (
            <main ref={ref} className={style}>
                <Segment className={styles.todayContainer}>
                    <figure className={styles.FigureContainer}>
                        <span className={styles.WheatherFigure}>
                            <Image
                                src={climateFigure}
                                alt="currentyWheatherFigure"
                                layout="responsive"
                                objectFit="cover"
                                width={250}
                                height={250}
                            />
                        </span>
                    </figure>
                    <TemperatureDay
                        className={styles.detailsToday}
                        onClick={onClick}
                        dayDescription={today}
                        temperature={temperature}
                        maxTemperature={maxTemperature}
                        minTemperature={minTemperature}
                    >
                        <DetailsTemperature
                            climate={climate}
                            humidity={humidity}
                            pressure={pressure}
                            wind={wind}
                        />
                    </TemperatureDay>
                </Segment>
                <Segment className={styles.tomorrowContainer}>
                    <TemperatureDay
                        className={styles.TemperatureDay}
                        onClick={onClick}
                        dayDescription={tomorrow}
                        temperature={temperatureTomorrow}
                        minTemperature={minTemperatureTomorrow}
                        maxTemperature={maxTemperatureTomorrow}
                    />
                </Segment>
                <Segment className={styles.afterTomorrowContainer}>
                    <TemperatureDay
                        className={styles.TemperatureDay}
                        onClick={onClick}
                        dayDescription={afterTomorrow}
                        temperature={temperatureAfterTomorrow}
                        minTemperature={minTemperatureAfterTomorrow}
                        maxTemperature={maxTemperatureAfterTomorrow}
                    />
                </Segment>
            </main>
        );
    }
);

export default Content;
