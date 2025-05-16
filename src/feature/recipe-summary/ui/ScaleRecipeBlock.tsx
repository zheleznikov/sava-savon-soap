import {FC} from "react";
import {InputType} from "../../../app/providers/SoapRecipeContext.types";
import {InputBlockWrapper, SmartNumberInput} from "../../../shared";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {useTheme} from "../../../app/providers/ThemeContext";
import {TAcid} from "../../../entities/oil/model/acids.types";


interface ScaleRecipeBlockProps {
    oilInputType: InputType;
    setOilInputType: (val: InputType) => void;
    userDefinedTotalWeight: number;
    setUserDefinedTotalWeight: (val: number) => void;
    totalResultAmount: number;
    acidInputType: InputType;
    setAcidInputType: (val: InputType) => void;
    selectedAcids: TAcid []
}

export const ScaleRecipeBlock: FC<ScaleRecipeBlockProps> = ({
    oilInputType,
    setOilInputType,
    userDefinedTotalWeight,
    setUserDefinedTotalWeight,
    totalResultAmount,
    acidInputType,
    setAcidInputType,
    selectedAcids
}) => {
    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme];
    const t = localization.ru.scale;

    const isGramMode = oilInputType === InputType.Mass;
    const isAcidGramMode = acidInputType === InputType.Mass;

    const shouldUseTotal = () =>
        isGramMode || (isAcidGramMode && selectedAcids.length > 0);


    const inputValue = shouldUseTotal() ? totalResultAmount : userDefinedTotalWeight;

    const handleInputChange = (value: number) => {
        if (isGramMode && value !== totalResultAmount) {
            setOilInputType(InputType.Percent);
        }
        if (isAcidGramMode && value !== totalResultAmount) {
            setAcidInputType(InputType.Percent);
        }
        setUserDefinedTotalWeight(value);
    };

    return (
        <InputBlockWrapper className={""}>
            <div className={styles.blockHeader}>
                <h2 className={styles.blockTitle}>{t.title}</h2>
                <p className={styles.blockText}>{t.description}</p>
            </div>

            <div className={styles.blockInputRow}>
                <SmartNumberInput
                    decimalPlaces={0}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={t.placeholder}
                    min={10}
                    max={10000}
                    className={styles.inputSmart}
                />
            </div>
        </InputBlockWrapper>
    );
};
