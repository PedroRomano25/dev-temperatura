import { noResultFound } from "../Data/currentClimate";
import {
    figuresWeather,
    formatTemperature,
    getWindDirection,
    iconWeather,
} from "../utils/string";
import weather from "./weather";

interface IWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface IMainWeather {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface ICurrentClimateResponse {
    main: IMainWeather;
    weather: IWeather[];
    wind: {
        deg: number;
        speed: number;
    };
}
interface IForecastClimateResponse {
    list: [
        {
            dt_txt: string;
            main: IMainWeather[];
        }
    ];
}
const handleCurrentClimate = (
    response: string,
    unit: any,
    language: any,
    unitSpeed: string,
    unitTemp: string,
    humidity: string,
    pressure: string,
    wind: string
) => {
    const climate = new weather();
    climate
        .GetCurrent(response, unit, language)
        .then((climateData: ICurrentClimateResponse) => {
            const windDirection = getWindDirection(
                climateData.wind.deg,
                language
            );
            const climateText = `${climateData.weather[0].description}`;
            const humidityText = `${humidity}: ${climateData.main.humidity}%`;
            const pressureText = `${pressure}: ${climateData.main.humidity} hPA`;
            const windText = `${wind}: ${windDirection} ${climateData.wind.speed.toFixed(
                1
            )} ${unitSpeed}`;
            const newData = {
                climateFigure: iconWeather(
                    climateData.weather[0].icon as keyof typeof figuresWeather
                ),
                dayDescription: climateData.weather[0].description,
                temperature: formatTemperature(climateData.main.temp, unitTemp),
                maxTemperature: formatTemperature(
                    climateData.main.temp_max,
                    unitTemp
                ),
                minTemperature: formatTemperature(
                    climateData.main.temp_min,
                    unitTemp
                ),
                climate: climateText,
                humidity: humidityText,
                pressure: pressureText,
                wind: windText,
                temperatureNumber: Math.floor(climateData.main.temp),
            };
            return newData;
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
            return noResultFound;
        });
};

const handleForecastClimate = (
    response: string,
    unit: any,
    language: any,
    unitTemp: string
) => {
    const climate = new weather();
    climate
        .GetForecast(response, unit, language)
        .then((i: IForecastClimateResponse) => {
            const dados: IForecastClimateResponse = i;
            const dataTomorrow = dados.list
                .filter(
                    (i) =>
                        new Date(i.dt_txt).getDate() ===
                        new Date().getDate() + 1
                )
                .map((i) => i.main);
            const minTomorrow = Math.min(
                ...dataTomorrow.map((i: any) => i?.temp_min)
            );
            const maxTomorrow = Math.max(
                ...dataTomorrow.map((i: any) => i?.temp_max)
            );
            const sumTomorrow = dataTomorrow.reduce(function (
                accumulator,
                curValue: any
            ) {
                return accumulator + curValue?.temp;
            },
            0);
            const avgTomorrow = sumTomorrow / dataTomorrow.length;
            const dataAfterTomorrow = dados.list
                .filter(
                    (i) =>
                        new Date(i.dt_txt).getDate() ===
                        new Date().getDate() + 2
                )
                .map((i) => i.main);
            const sumAfterTomorrow = dataAfterTomorrow.reduce(function (
                accumulator,
                curValue: any
            ) {
                return accumulator + curValue?.temp;
            },
            0);
            const avgAfterTomorrow =
                sumAfterTomorrow / dataAfterTomorrow.length;
            const minAfterTomorrow = Math.min(
                ...dataAfterTomorrow.map((i: any) => i?.temp_min)
            );
            const maxAfterTomorrow = Math.max(
                ...dataAfterTomorrow.map((i: any) => i?.temp_max)
            );
            const newData = {
                temperatureTomorrow: formatTemperature(avgTomorrow, unitTemp),
                maxTemperatureTomorrow: formatTemperature(
                    maxTomorrow,
                    unitTemp
                ),
                minTemperatureTomorrow: formatTemperature(
                    minTomorrow,
                    unitTemp
                ),
                temperatureAfterTomorrow: formatTemperature(
                    avgAfterTomorrow,
                    unitTemp
                ),
                maxTemperatureAfterTomorrow: formatTemperature(
                    maxAfterTomorrow,
                    unitTemp
                ),
                minTemperatureAfterTomorrow: formatTemperature(
                    minAfterTomorrow,
                    unitTemp
                ),
            };
            return newData;
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
            return noResultFound;
        });
};

export const updateData = (
    response: string,
    unit: any,
    language: any,
    unitSpeed: string,
    unitTemp: string,
    humidity: string,
    pressure: string,
    wind: string
) => {
    if (response.length > 3) {
        const current = handleCurrentClimate(
            response,
            unit,
            language,
            unitSpeed,
            unitTemp,
            humidity,
            pressure,
            wind
        );
        const forecast = handleForecastClimate(
            response,
            unit,
            language,
            unitTemp
        );
        return { current, forecast };
    }
};
