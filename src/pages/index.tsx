import type { NextPage } from "next";
import * as React from "react";
import Home from "../components/templates/Home";
import { ClimateProvider } from "../context/provider.context";

const Principal: NextPage = () => {
    return (
        <ClimateProvider>
            <Home />
        </ClimateProvider>
    );
};

export default Principal;
