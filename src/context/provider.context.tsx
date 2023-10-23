import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import imageBing from "../service/imageBing";

type ContextType = {
    image: string;
};
type ClimateProviderProps = {
    children: ReactNode;
};
const FormContext = createContext<ContextType | undefined>(undefined);

export const ClimateProvider = ({ children }: ClimateProviderProps) => {
    const [image, setImage] = useState<string>("");
    useEffect(() => {
        const imageBackground = new imageBing();
        imageBackground.Get().then((imageUrl) => {
            setImage(imageUrl);
        });
    }, []);
    const value = { image };
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
