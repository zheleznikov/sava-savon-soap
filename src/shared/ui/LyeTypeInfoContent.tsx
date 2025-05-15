import React, {FC} from "react";
import {useTheme} from "../../app/providers/ThemeContext";

export const LyeTypeInfoContent: FC = () => {

    const {appTheme} = useTheme();

    const bg = appTheme === "light" ? "text-gray-800 bg-white" : "text-white bg-gray-900";
    return (
        <div className={`text-sm space-y-3 ${bg}`}>
            <ul className="list-disc list-inside space-y-2">
                <li>
                    <strong>NaOH</strong> - твёрдое кусковое мыло.
                </li>
                <li>
                    <strong>KOH</strong> - жидкое мыло, пасты, гели.
                </li>
                <li>
                    <strong>NaOH + KOH</strong> - мягкое, кремовое или полужидкое мыло.
                </li>
                <li>
                    <strong>Посмотреть чистоту щелочи</strong> можно на упаковке: она указывается в процентах
                    (например, NaOH — 99%, KOH — 90%). Также могут быть указаны ГОСТ или ТУ — они помогут
                    сориентироваться, если процент не указан.
                </li>
                <li>
                    Примеры:
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li><strong>ГОСТ 4328-77 (NaOH)</strong> — обычно чистота <strong>98–99%</strong></li>
                        <li><strong>ГОСТ 24363-80 (KOH)</strong> — чистота <strong>около 90%</strong></li>
                        <li><strong>ТУ 55064-2012</strong> — каустическая сода NaOH, <strong>до 99%</strong></li>
                        <li><strong>ТУ 2132-025-52257004-2015</strong> — технический KOH, <strong>около 90%</strong></li>
                    </ul>
                </li>

                <li>
                    <strong>Если на упаковке не указана чистота</strong>, безопаснее задать значение
                    с запасом — обычно 90–95%. Особенно это важно для KOH, потому что она часто
                    содержит больше влаги и имеет меньшую концентрацию по сравнению с NaOH.
                </li>

            </ul>
        </div>
    );
};
