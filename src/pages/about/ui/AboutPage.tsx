import React, {FC} from "react";
import {useTheme} from "@/app/providers/ThemeContext";
import {localization} from "@/shared/config/localization";
import {about} from "@/pages/about/config/about.styles";

export const AboutPage: FC = () => {
    const { appTheme } = useTheme();
    const s = about[appTheme];

    return (
        <div className={s.wrapper}>
            <h1 className={s.title}>{localization.ru.about.title}</h1>
            <div className={`${s.paragraph} text-base [&_a]:text-blue-600 [&_a:hover]:text-blue-800`}>
                {localization.ru.about.paragraphs.map((html, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: html }} />
                ))}
            </div>

        </div>
    );
};

