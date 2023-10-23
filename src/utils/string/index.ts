import iconNA from "../../../public/na.svg";
import { figuresWeather } from "./enum";
import { IVariantColor } from "./interface";

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
