import {FC} from "react";
import {Trash2} from "lucide-react";
import {useTheme} from "../../../app/providers/ThemeContext";
import {oilAddedLineStyles} from "../styles/OilAddedLine.styes";
import {localization} from "@/shared/config/localization";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {
    setCustomInputType,
    toggleCustom,
    updateCustomMassWithRecalculatedPercents,
    updateCustomPercentWithMassRecalculation
} from "../../recipe-calculation/model/recipeSlice";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";
import {InputType, measureInputTypeMeta} from "../../../app/providers/SoapRecipeContext.types";
import {TCustom} from "../../../entities/oil/model/custom.types";
import {useAppSelector} from "../../../shared/useAppSelector";


interface Props {
    customIngredient: TCustom
}
export const CustomAddedLine: FC<Props> = ({customIngredient}) => {

    const dispatch = useAppDispatch();

    const {measureInput} = useAppSelector((state) => state.recipe);

    const handleToggleAdd = (add: TCustom) => dispatch(toggleCustom(add));

    const {appTheme} = useTheme();

    const {layout, theme} = oilAddedLineStyles[appTheme];
    const t = localization.ru.oil_line;

    const handleUpdateCustomMass = (newGram: number) =>
        dispatch(updateCustomMassWithRecalculatedPercents({customId: customIngredient.id, newGram}));

    const handleUpdateCustomPercent = (newPercent: number) =>
        dispatch(updateCustomPercentWithMassRecalculation({customId: customIngredient.id, newPercent}));


    const handleChangeInputType = (inputType: InputType) => {
        dispatch(setCustomInputType({customId: customIngredient.id, inputType}));
    };

    const isGramMode = customIngredient.inputType === InputType.Mass;
    const isPercentMode = customIngredient.inputType === InputType.Percent;

    return (
        <div className={theme.block}>
            <div className={layout.blockInner}>
                <div className={layout.topRow}>
                    <div className={theme.name}>{customIngredient.name_rus}</div>
                    <button onClick={() =>handleToggleAdd(customIngredient)} className={theme.deleteButton}
                            title={t.delete_button_title}>
                        <Trash2 size={24}/>
                    </button>
                </div>

                <div className={layout.bottomRow}>
                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            placeholder={ measureInputTypeMeta[measureInput].ru.full}
                            value={customIngredient.mass || 0}
                            onChange={newGram => handleUpdateCustomMass(newGram)}
                            disabled={isPercentMode}
                            className={clsx(layout.input, isPercentMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{ measureInputTypeMeta[measureInput].ru.short}</span>
                    </div>

                    <div className={layout.inputWrapper}>
                        <SmartNumberInput
                            min={1} max={5}
                            placeholder={t.placeholder_percent}
                            value={customIngredient.percent || 0}
                            onChange={newPercent => handleUpdateCustomPercent(newPercent)}
                            disabled={isGramMode}
                            className={clsx(layout.input, isGramMode ? theme.inputDisabled : theme.input)}
                        />
                        <span className={theme.unitText}>{t.unit_percent}</span>
                    </div>

                    <ToggleButtonGroup
                        options={[
                            {
                                label: measureInputTypeMeta[measureInput].ru.short,
                                value: InputType.Mass
                            },
                            {label: "%", value: InputType.Percent}

                        ]}
                        onChange={handleChangeInputType}
                        isActive={(val) => val === customIngredient.inputType}
                    />

                </div>

            </div>



        </div>
    )
};
