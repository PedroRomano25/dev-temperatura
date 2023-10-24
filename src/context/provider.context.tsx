import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import imageBing from "../service/imageBing";
import { t } from "i18next";
import { defaultValueCurrent } from "../Data/currentClimate";
import { defaultValueForecast } from "../Data/foreCastClimate";
import { updateDataClimate } from "../service/updateData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from "react";
import {
    changeUnitMeasurement,
    IUnitOfMeasurement,
} from "../utils/changeUnitMeasurement";
import { GetCurrentCityState } from "../service/localeCoordinates";
import useGeoLocation from "../hooks/useGeoLocation";
import { getLocalByCoordinate } from "../utils/getLocalByCoordinate";
import i18n from "../translate/i18n";
import { variantColor } from "../utils/string";
import { useTranslation } from "react-i18next";

interface ContextType {
    image: string;
    response: string;
    handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeLanguage: () => void;
    handleChangeUnitMeasurement: () => void;
    isLoading: boolean;
    dataClimate: IContentProps;
}
interface ClimateProviderProps {
    children: ReactNode;
}

interface IContentProps {
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
    variant: IVariantColor;
}

const textTranslate = {
    today: t("Hoje"),
    tomorrow: t("Amanhã"),
    afterTomorrow: t("Depois de amanhã"),
};

const dataClimateDefault: IContentProps = {
    text: textTranslate,
    dataCurrent: defaultValueCurrent,
    dataForecast: defaultValueForecast,
    variant: "White",
};
const FormContext = createContext<ContextType | undefined>(undefined);

export const ClimateProvider = ({ children }: ClimateProviderProps) => {
    const { t } = useTranslation();
    const [image, setImage] = useState<string>("");
    const [dataClimate, setDataClimate] =
        useState<IContentProps>(dataClimateDefault);
    const [response, setResponse] = useState<string>("Brasil");
    const [isLoading, setIsLoading] = useState(false);
    const [currentClimate, setCurrentClimate] =
        useState<ICurrentClimate>(defaultValueCurrent);
    const [foreCastClimate, setForeCastClimate] =
        useState<IForecastClimate>(defaultValueForecast);
    const [language, setLanguage] = useLocalStorage("language", "pt_br");
    const [unit, setUnit] = useLocalStorage("unit", "metric");
    const [unitMeasurement, setUnitMeasurement] = useState<IUnitOfMeasurement>({
        temperature: "C",
        speed: "Km/h",
    });
    const local = useGeoLocation();
    const getCurrentCity = GetCurrentCityState();
    const unitTemp = unitMeasurement.temperature as IUnitTemperature;
    const unitSpeed = unitMeasurement.speed as IUnitSpeed;
    const configureUnitAndLanguageSettings = useCallback(() => {
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
        if (language === "en") {
            setLanguage("en");
        } else {
            setLanguage("pt_br");
        }
    }, [language, setLanguage, unit]);
    useEffect(() => {
        const imageBackGround = new imageBing();
        imageBackGround.Get().then((img) => setImage(img));
        configureUnitAndLanguageSettings();
    }, [configureUnitAndLanguageSettings]);
    useEffect(() => {
        updateDataClimate(
            response,
            unit,
            language,
            unitSpeed,
            unitTemp,
            t("humidade"),
            t("pressão"),
            t("vento")
        );
    }, [response, unit, language, t, unitSpeed, unitTemp]);
    useEffect(() => {
        getLocalByCoordinate(getCurrentCity, setIsLoading, local, setResponse);
    }, [local.loaded, getCurrentCity, local]);
    const getColorVariant = React.useCallback(
        (temperature: number, unit: string): string => {
            return variantColor(temperature, unit);
        },
        []
    );
    const variantMemo: string = React.useMemo(
        () =>
            getColorVariant(Math.round(currentClimate.temperatureNumber), unit),
        [currentClimate.temperatureNumber, unit, getColorVariant]
    );
    const handleChangeSearch = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setResponse(event.target.value);
        },
        []
    );
    const handleChangeUnitMeasurement = React.useCallback(() => {
        changeUnitMeasurement(unit, setUnit, setUnitMeasurement);
    }, [unit, setUnit]);
    const handleChangeLanguage = React.useCallback(() => {
        if (language === "pt_br") {
            i18n.changeLanguage("en");
            setLanguage("en");
        } else if (language === "en") {
            i18n.changeLanguage("pt");
            setLanguage("pt_br");
        }
    }, [language, setLanguage]);

    const value: ContextType = {
        image,
        handleChangeSearch,
        handleChangeLanguage,
        handleChangeUnitMeasurement,
        response,
        isLoading,
        dataClimate,
    };
    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
};
export const useClimate = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error(
            "useClimate must be used inside ClimateProvider || useClimate deve ser usado dentro de ClimateProvider"
        );
    }
    return context;
};
