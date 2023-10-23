import iconNA from "../../public/na.svg";
import icon01d from "../../public/climatesFigures/01d.svg";
import icon02d from "../../public/climatesFigures/02d.svg";
import icon03d from "../../public/climatesFigures/03d.svg";
import icon04d from "../../public/climatesFigures/04d.svg";
import icon09d from "../../public/climatesFigures/09d.svg";
import icon10d from "../../public/climatesFigures/10d.svg";
import icon11d from "../../public/climatesFigures/11d.svg";
import icon13d from "../../public/climatesFigures/13d.svg";
import icon50d from "../../public/climatesFigures/50d.svg";
import icon01n from "../../public/climatesFigures/01n.svg";
import icon02n from "../../public/climatesFigures/02n.svg";
import icon03n from "../../public/climatesFigures/03n.svg";
import icon04n from "../../public/climatesFigures/04n.svg";
import icon09n from "../../public/climatesFigures/09n.svg";
import icon10n from "../../public/climatesFigures/10n.svg";
import icon11n from "../../public/climatesFigures/11n.svg";
import icon13n from "../../public/climatesFigures/13n.svg";
import icon50n from "../../public/climatesFigures/50n.svg";

export enum figuresWeather {
    "01d" = icon01d,
    "02d" = icon02d,
    "03d" = icon03d,
    "04d" = icon04d,
    "09d" = icon09d,
    "10d" = icon10d,
    "11d" = icon11d,
    "13d" = icon13d,
    "50d" = icon50d,
    "01n" = icon01n,
    "02n" = icon02n,
    "03n" = icon03n,
    "04n" = icon04n,
    "09n" = icon09n,
    "10n" = icon10n,
    "11n" = icon11n,
    "13n" = icon13n,
    "50n" = icon50n,
}

export const formatTemperature = (
    temp: number,
    unitMeasurement: string
): string => {
    return `${Math.floor(temp)}°${unitMeasurement}`;
};
export const variantColor = (
    temperature: number,
    unit: string
): IVariantColor => {
    const isMetric = unit === "metric";
    const isYellow = isMetric
        ? temperature >= 15 && temperature <= 35
        : temperature >= 19 && temperature <= 95;
    const isRed = isMetric ? temperature > 35 : temperature > 95;
    return isRed ? "Red" : isYellow ? "Yellow" : "Blue";
};
export const iconWeather = (iconCode: keyof typeof figuresWeather): string => {
    return figuresWeather[iconCode] || iconNA;
};
export const getWindDirection = (degree: number, language: string): string => {
    const englishCardinalPoints = [
        "Northerly",
        "North Easterly",
        "Easterly",
        "South Easterly",
        "Southerly",
        "South Westerly",
        "Westerly",
        "North Westerly",
    ];
    const portugueseCardinalPoints = [
        "Norte",
        "Nordeste",
        "Leste",
        "Sudeste",
        "Sul",
        "Sudoeste",
        "Oeste",
        "Noroeste",
    ];
    const sectors =
        language === "en" ? englishCardinalPoints : portugueseCardinalPoints;
    degree = (degree + 22.5 + 360) % 360;
    const which = Math.floor(degree / 45);
    return sectors[which];
};
