import en from "../language/en.json";
import pt from "../language/pt.json";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { validLocalStorage } from "../utils/helpers";

const resources = {
    en: {
        translation: en,
    },
    pt: {
        translation: pt,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: JSON.parse(validLocalStorage() as string),
    fallbackLng: "pt",
    react: { useSuspense: false },
});

export default i18n;
