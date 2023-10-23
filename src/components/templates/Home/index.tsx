import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import Container from "../../atoms/Container";
import LoadContainer from "../../molecules/LoadContainer";
import Content, { IContentProps } from "../../organisms/Content";
import InternalHeader, {
    IInternalHeaderProps,
} from "../../organisms/InternalHeader";

interface IHomeProps extends IContentProps, IInternalHeaderProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeLanguage: () => void;
    isLoading: boolean;
}

const Home = componentFactory<IHomeProps>(
    "Home",
    (
        {
            dataCurrent,
            dataForecast,
            text,
            value,
            onClick,
            variant,
            onChange,
            onChangeLanguage,
            isLoading,
        },
        ref
    ) => {
        return (
            <Container ref={ref}>
                <InternalHeader
                    value={value}
                    onChange={onChange}
                    onChangeLanguage={onChangeLanguage}
                />
                {isLoading ? (
                    <LoadContainer />
                ) : (
                    <Content
                        text={text}
                        variant={variant}
                        onClick={onClick}
                        dataCurrent={dataCurrent}
                        dataForecast={dataForecast}
                    />
                )}
            </Container>
        );
    }
);

export default Home;
