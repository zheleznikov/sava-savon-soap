import React, {FC} from "react";
import {useTheme} from "@/app/providers/ThemeContext";
import {localization} from "@/shared/config/localization";
import {about} from "@/pages/about/config/about.styles";

export const AboutPage: FC = () => {
    const {appTheme} = useTheme();

    const s = about[appTheme];

    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>{localization.ru.about.title}</h1>
            <div className={s.paragraph}>
                {localization.ru.about.paragraphs.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    );
};
