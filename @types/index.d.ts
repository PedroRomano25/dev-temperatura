import React from "react";

declare global {
    type IUnit = "metric" | "imperial";
    type ILanguage = "pt_br" | "en";
    type IVariantColor = "Yellow" | "Blue" | "Red" | "White";
    interface ICurrentClimate {
        climateFigure: any;
        dayDescription: string;
        temperature: string;
        maxTemperature: string;
        minTemperature: string;
        climate: string;
        humidity: string;
        pressure: string;
        wind: string;
        temperatureNumber: number;
    }
    interface IForecastClimate {
        temperatureTomorrow: string;
        maxTemperatureTomorrow: string;
        minTemperatureTomorrow: string;
        temperatureAfterTomorrow: string;
        maxTemperatureAfterTomorrow: string;
        minTemperatureAfterTomorrow: string;
    }
    interface ICoordinates {
        lat?: number | string;
        lng?: number | string;
    }
}

export {};
