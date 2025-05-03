import {FC} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "../../../shared/ui/InputBlockWrapper";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {useTheme} from "../../../app/providers/ThemeContext";
import {SmartNumberInput} from "../../../shared";


interface ScaleRecipeBlockProps {
    inputType: InputType;
    setInputType: (val: InputType) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;
    totalResultAmount: number;
}

export const ScaleRecipeBlock: FC<ScaleRecipeBlockProps> = ({
                                                                inputType,
                                                                setInputType,
                                                                userDefinedTotalWeight,
                                                                setUserDefinedTotalWeight,
                                                                totalResultAmount,
                                                            }) => {
    const { appTheme } = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const t = localization.ru.scale;

    const isGramMode = inputType === InputType.Gram;

    const handleInputChange = (value: number) => {
        if (isGramMode && value !== totalResultAmount) {
            setInputType(InputType.Percent);
        }
        setUserDefinedTotalWeight(value);
    };

    return (
        <InputBlockWrapper>
            <div className={styles.blockHeader}>
                <h2 className={styles.blockTitle}>{t.title}</h2>
                <p className={styles.blockText}>{t.description}</p>
            </div>

            <div className={styles.blockInputRow}>
                <SmartNumberInput
                    decimalPlaces={0}
                    value={isGramMode ? totalResultAmount : userDefinedTotalWeight}
                    onChange={handleInputChange}
                    placeholder={t.placeholder}
                    min={10}
                    max={10000}
                    className={styles.inputSmart}
                />
                <span className={styles.inputUnit}>{t.unit}</span>
            </div>
        </InputBlockWrapper>
    );
};