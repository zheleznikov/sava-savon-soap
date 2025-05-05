import {FC} from "react";
import {Trash2} from "lucide-react";
import {TOil} from "../../../entities/oil/model/oil.types";
import {useSoapRecipe} from "../../recipe-calculation";
import {useSoapCalculations} from "../../recipe-calculation";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {useTheme} from "../../../app/providers/ThemeContext";
import {oilAddedLineStyles} from "../styles/OilAddedLine.styes";
import {localization} from "@/shared/config/localization";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";


interface Props {
    oil: TOil;
}

export const OilAddedLine: FC<Props> = ({oil}) => {
    const {
        handleToggleOil,
        inputType,
        updateOilPercentWithGramRecalculation,
        updateOilGramWithRecalculatedPercents
    } = useSoapRecipe();

    const {totalOilAmount} = useSoapCalculations();

    const isGramMode = inputType === InputType.Gram;
    const isPercentMode = inputType === InputType.Percent;

    const {appTheme} = useTheme();

    const {layout, theme} = oilAddedLineStyles[appTheme];
    const t = localization.ru.oil_line;

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const toggleDetails = () => setIsDetailsOpen(prev => !prev);


    return (
        <div className={theme.block}>
            <div className={layout.topRow}>
                <div className={theme.name}>{oil.name_rus}</div>

                <button
                    onClick={() => handleToggleOil(oil)}
                    className={theme.deleteButton}
                    title={t.delete_button_title}
                >
                    <Trash2 size={20}/>
                </button>
            </div>

            <div className={layout.bottomRow}>
                <div className={layout.inputWrapper}>
                    <SmartNumberInput
                        placeholder={t.placeholder_grams}
                        value={oil.gram || 0}
                        onChange={newGram =>
                            updateOilGramWithRecalculatedPercents(oil, newGram)
                        }
                        disabled={isPercentMode}
                        className={clsx(layout.input,
                            isPercentMode ? theme.inputDisabled : theme.input
                        )}                    />
                    <span className={theme.unitText}>{t.unit_grams}</span>
                </div>

                <div className={layout.inputWrapper}>
                    <SmartNumberInput
                        placeholder={t.placeholder_percent}
                        value={oil.percent || 0}
                        onChange={newPercent =>
                            updateOilPercentWithGramRecalculation(oil, newPercent, totalOilAmount)
                        }
                        disabled={isGramMode}
                        className={clsx(layout.input,
                            isGramMode ? theme.inputDisabled : theme.input
                        )}
                    />
                    <span className={theme.unitText}>{t.unit_percent}</span>
                </div>

            </div>
            <button
                onClick={toggleDetails}
                className={theme.expandButton}
                title="Подробнее"
            >
                {isDetailsOpen ? <ChevronUp size={32}/> : <ChevronDown size={32}/>}
            </button>

            {isDetailsOpen && (
                <div
                    className={clsx(
                        layout.details,
                        theme.details,
                    )}
                >
                    <hr className="my-2 border-t border-gray-200" />
                    <div className="mb-2">
                        <div className="font-semibold text-[13px] mb-1 text-center">Свойства:</div>
                        <ul className="list-disc pl-4 text-xs grid grid-cols-2 gap-x-4 gap-y-1">
                            <li>
                                Твёрдость: <span className={theme.valueNumber}>{oil.properties?.hardness}</span>
                            </li>
                            <li>
                                Очищение: <span className={theme.valueNumber}>{oil.properties?.cleansing}</span>
                            </li>
                            <li>
                                Смягчение: <span className={theme.valueNumber}>{oil.properties?.soften}</span>
                            </li>
                            <li>
                                Пузыристость: <span className={theme.valueNumber}>{oil.properties?.bubbling}</span>
                            </li>
                            <li>
                                Кремовость: <span className={theme.valueNumber}>{oil.properties?.creaminess}</span>
                            </li>
                            <li>
                                Йодное число: <span className={theme.valueNumber}>{oil.iodine}</span>
                            </li>
                        </ul>
                    </div>

                    <hr className="my-2 border-t border-gray-200" />

                    <div>
                        <div className="font-semibold text-[13px] mb-1 text-center">Жирные кислоты:</div>
                        <ul className="list-disc pl-4 text-xs grid grid-cols-2 gap-x-4 gap-y-1 mb-6">
                            <li>
                                Лауриновая: <span className={theme.valueNumber}>{oil.fatty_acids?.lauric}%</span>
                            </li>
                            <li>
                                Миристиновая: <span className={theme.valueNumber}>{oil.fatty_acids?.myristine}%</span>
                            </li>
                            <li>
                                Пальмитиновая: <span className={theme.valueNumber}>{oil.fatty_acids?.palmitic}%</span>
                            </li>
                            <li>
                                Стеариновая: <span className={theme.valueNumber}>{oil.fatty_acids?.stearin}%</span>
                            </li>
                            <li>
                                Рицинолеиновая: <span className={theme.valueNumber}>{oil.fatty_acids?.ricin}%</span>
                            </li>
                            <li>
                                Олеиновая: <span className={theme.valueNumber}>{oil.fatty_acids?.oleic}%</span>
                            </li>
                            <li>
                                Линолевая: <span className={theme.valueNumber}>{oil.fatty_acids?.linoleic}%</span>
                            </li>
                            <li>
                                Линоленовая: <span className={theme.valueNumber}>{oil.fatty_acids?.linolenic}%</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}


        </div>
    );
};
