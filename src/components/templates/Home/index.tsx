import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import Container from "../../atoms/Container";
import LoadContainer from "../../molecules/LoadContainer";
import Content from "../../organisms/Content";
import InternalHeader from "../../organisms/InternalHeader";
import { useClimate } from "../../../context/provider.context";

const Home = componentFactory("Home", (_, ref) => {
    const { isLoading, handleChangeLanguage, handleChangeSearch, response } =
        useClimate();
    return (
        <Container ref={ref}>
            <InternalHeader
                value={response}
                onChange={handleChangeSearch}
                onChangeLanguage={handleChangeLanguage}
            />
            {isLoading ? <LoadContainer /> : <Content />}
        </Container>
    );
});

export default Home;
