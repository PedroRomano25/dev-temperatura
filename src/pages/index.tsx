import type { NextPage } from "next";
import { useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import * as React from "react";
import Home from "../components/templates/Home";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultValueCurrent } from "../Data/currentClimate";
import { defaultValueForecast } from "../Data/foreCastClimate";
import i18n from "../translate/i18n";
import { useTranslation } from "react-i18next";
import { updateData } from "../service/updateData";
import {
    IUnitOfMeasurement,
    changeUnitMeasurement,
} from "../utils/changeUnitMeasurement";
import { getLocalByCoordinate } from "../utils/getLocalByCoordinate";
import { GetCurrentCityState } from "../service/localeCoordinates";
import { debounce } from "../utils/helpers";
import { variantColor } from "../utils/string";
import { ClimateProvider } from "../context/provider.context";

const Principal: NextPage = () => {
    const { t } = useTranslation();
    const [response, setResponse] = React.useState<string>("Brasil");
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentClimate, setCurrentClimate] =
        React.useState<ICurrentClimate>(defaultValueCurrent);
    const [foreCastClimate, setForeCastClimate] =
        React.useState<IForecastClimate>(defaultValueForecast);
    const [language, setLanguage] = useLocalStorage("language", "pt_br");
    const [unit, setUnit] = useLocalStorage("unit", "metric");
    const [unitMeasurement, setUnitMeasurement] =
        React.useState<IUnitOfMeasurement>({
            temperature: "C",
            speed: "Km/h",
        });
    const local = useGeoLocation();
    const getCurrentCity = GetCurrentCityState();
    const unitTemp = unitMeasurement.temperature;
    const unitSpeed = unitMeasurement.speed;

    useEffect(() => {
        if (unit === "metric") {
            setUnitMeasurement({
                temperature: "C",
                speed: "Km/h",
            });
        } else if (unit === "imperial") {
            setUnitMeasurement({
                temperature: "F",
                speed: "Mph",
            });
        }
        if (language === '"pt_br"') {
            setLanguage("pt_br");
        } else if (language === "en") {
            setLanguage("en");
        }
    }, []);

    useEffect(() => {
        updateData(
            response,
            unit,
            language,
            unitSpeed,
            unitTemp,
            t("humidade"),
            t("pressão"),
            t("vento")
        );
    }, [response, unit, language]);

    useEffect(() => {
        getLocalByCoordinate(getCurrentCity, setIsLoading, local, setResponse);
    }, [local.loaded]);

    const getColorVariant = React.useCallback(
        (temperature: number, unit: string): string => {
            return variantColor(temperature, unit);
        },
        [currentClimate.temperatureNumber, unit]
    );

    const variantMemo: string = React.useMemo(
        () =>
            getColorVariant(Math.round(currentClimate.temperatureNumber), unit),
        [currentClimate.temperatureNumber, unit]
    );

    const responseMemo = React.useMemo(() => response, [response]);
    const foreCastClimateMemo = React.useMemo(
        () => foreCastClimate,
        [foreCastClimate]
    );
    const currentClimateMemo = React.useMemo(
        () => currentClimate,
        [currentClimate]
    );

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setResponse(event.target.value);
        },
        [response]
    );

    const handleChangeUnitMeasurement = React.useCallback(() => {
        changeUnitMeasurement(unit, setUnit, setUnitMeasurement);
    }, [unit]);

    const handleChangeLanguage = React.useCallback(() => {
        if (language === "pt_br") {
            i18n.changeLanguage("en");
            setLanguage("en");
        } else if (language === "en") {
            i18n.changeLanguage("pt");
            setLanguage("pt_br");
        }
    }, [language]);

    const textTranslate = {
        today: t("Hoje"),
        tomorrow: t("Amanhã"),
        afterTomorrow: t("Depois de amanhã"),
    };
    return (
        <ClimateProvider>
            <Home
                variant={variantMemo}
                value={responseMemo}
                onClick={handleChangeUnitMeasurement}
                text={textTranslate}
                dataCurrent={currentClimateMemo}
                dataForecast={foreCastClimateMemo}
                onChange={debounce(handleChange, 1000)}
                onChangeLanguage={handleChangeLanguage}
                isLoading={isLoading}
            />
        </ClimateProvider>
    );
};

export default Principal;
