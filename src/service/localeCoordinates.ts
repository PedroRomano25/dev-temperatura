import axios from "axios";
import { useMemo } from "react";

interface IOpenCageDataResponse {
    data: {
        results: [
            {
                formatted: string;
                components: {
                    city_district: string;
                    continent: string;
                    country: string;
                    country_code: string;
                    county: string;
                    municipality: string;
                    postcode: string;
                    region: string;
                    road: string;
                    road_type: string;
                    state: string;
                    state_code: string;
                    state_district: string;
                    suburb: string;
                };
            }
        ];
    };
}
class currentCityState {
    async Get(lat: number, long: number) {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.NEXT_PUBLIC_OPEN_CAGE_DATA_KEY}&language=en`;
        const result = await axios.get(url).then((i: IOpenCageDataResponse) => {
            const descriptions = i.data.results[0].components;
            return `${descriptions.state}`;
        });
        return result;
    }
}

export default currentCityState;

export const GetCurrentCityState = () => {
    return useMemo(() => new currentCityState(), []);
};
