import React from "react";
import {localization} from "../config/localization";

const waterMethodKeys = ["water_as_percent", "lye_ratio", "lye_concentration"] as const;

export const WaterMethodDescriptions = () => {

    const t = localization.ru.water_methods;

    return (
        <div className="text-sm space-y-3">
            {waterMethodKeys.map((key) => (
                <div key={key}>
                    <strong>{t[key].title}:</strong><br/>
                    {t[key].description}<br/>
                    <em>{t[key].usage}</em>
                </div>
            ))}
        </div>
    );
};
