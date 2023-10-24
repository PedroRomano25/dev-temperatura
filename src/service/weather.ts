import axios from "axios";

class weather {
    async GetCurrent(
        local: string,
        units: IUnitMeasure = "metric",
        language: ILanguage = "pt_br"
    ) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&APPID=${process.env.NEXT_PUBLIC_OPEN_WHEATHER_MAP_KEY}&units=${units}&lang=${language}`;
        const result = await axios.get(url).then((i) => {
            return i.data;
        });
        return result;
    }
    async GetForecast(
        local: string,
        units: IUnitMeasure = "metric",
        language: ILanguage = "pt_br"
    ) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${local}&appid=${process.env.NEXT_PUBLIC_OPEN_WHEATHER_MAP_KEY}&units=${units}&lang=${language}`;
        const result = await axios.get(url).then((i) => {
            return i.data;
        });
        return result;
    }
}
export default weather;
