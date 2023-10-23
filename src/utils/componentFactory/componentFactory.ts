import * as React from "react";
import { IComponentFactory } from "./interface";

const componentFactory: IComponentFactory = (componentName, ComponentBase) => {
    const Component = React.memo(React.forwardRef(ComponentBase));
    Component.displayName = componentName;
    return Component;
};

export default componentFactory;
