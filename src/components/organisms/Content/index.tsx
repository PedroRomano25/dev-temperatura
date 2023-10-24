import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import Segment from "../../atoms/Segment";
import styles from "./index.module.scss";
import Image from "next/image";
import TemperatureDay from "../../molecules/TemperatureDay";
import DetailsTemperature from "../../molecules/DetailsTemperature";
import { useMemo } from "react";
import { useClimate } from "../../../context/provider.context";

const Content = componentFactory("Content", (_, ref) => {
    const { dataClimate, handleChangeUnitMeasurement } = useClimate();
    const { afterTomorrow, tomorrow, today } = dataClimate.text;
    const {
        climate,
        climateFigure,
        humidity,
        maxTemperature,
        minTemperature,
        pressure,
        temperature,
        wind,
    } = dataClimate.dataCurrent;
    const {
        maxTemperatureAfterTomorrow,
        maxTemperatureTomorrow,
        minTemperatureAfterTomorrow,
        minTemperatureTomorrow,
        temperatureAfterTomorrow,
        temperatureTomorrow,
    } = dataClimate.dataForecast;
    const style = useMemo(
        () => (climate === "" ? styles["White"] : styles[dataClimate.variant]),
        [climate, dataClimate.variant]
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
                    onClick={handleChangeUnitMeasurement}
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
                    onClick={handleChangeUnitMeasurement}
                    dayDescription={tomorrow}
                    temperature={temperatureTomorrow}
                    minTemperature={minTemperatureTomorrow}
                    maxTemperature={maxTemperatureTomorrow}
                />
            </Segment>
            <Segment className={styles.afterTomorrowContainer}>
                <TemperatureDay
                    className={styles.TemperatureDay}
                    onClick={handleChangeUnitMeasurement}
                    dayDescription={afterTomorrow}
                    temperature={temperatureAfterTomorrow}
                    minTemperature={minTemperatureAfterTomorrow}
                    maxTemperature={maxTemperatureAfterTomorrow}
                />
            </Segment>
        </main>
    );
});

export default Content;
