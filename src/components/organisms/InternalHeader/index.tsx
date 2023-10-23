import * as React from "react";
import componentFactory from "../../../utils/componentFactory";
import Header from "../../atoms/Header";
import Image from "next/image";
import compass from "../../../../public/44.svg";
import styles from "./index.module.scss";
import Input from "../../atoms/Input";
import braFlag from "../../../../public/flags/braFlag.svg";
import euaFlag from "../../../../public/flags/euaFlag.svg";
import { validLocalStorage } from "../../../utils/helpers";

export interface IInternalHeaderProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeLanguage: () => void;
}

const InternalHeader = componentFactory<IInternalHeaderProps>(
    "InternalHeader",
    ({ value, onChange, onChangeLanguage }, ref) => {
        return (
            <Header>
                <span className={styles.iconLocation}>
                    <Image
                        src={compass}
                        alt={"compass"}
                        layout="responsive"
                        objectFit="cover"
                        width={50}
                        height={50}
                    />
                </span>
                <Input defaultValue={value} onChange={onChange} />
                {validLocalStorage() === '"en"' && (
                    <span
                        className={styles.iconLocation}
                        onClick={onChangeLanguage}
                    >
                        <Image
                            src={braFlag}
                            alt={"bra flag"}
                            layout="responsive"
                            objectFit="cover"
                            width={50}
                            height={50}
                        />
                    </span>
                )}
                {validLocalStorage() === '"pt_br"' && (
                    <span
                        className={styles.iconLocation}
                        onClick={onChangeLanguage}
                    >
                        <Image
                            src={euaFlag}
                            alt={"eua flag"}
                            layout="responsive"
                            objectFit="cover"
                            width={50}
                            height={50}
                        />
                    </span>
                )}
            </Header>
        );
    }
);

export default InternalHeader;
