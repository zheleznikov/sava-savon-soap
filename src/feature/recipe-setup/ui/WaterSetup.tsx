import React, {FC, useState} from "react";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {clsx} from "clsx";
import {SmartNumberInput} from "../../../shared";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {
    setLyeConcentration,
    setWaterInputType,
    setWaterLyeRatio,
    setWaterPercent
} from "../../recipe-calculation/model/recipeSlice";
import {WaterInputType} from "../../../app/providers/SoapRecipeContext.types";
import {Hint} from "../../../shared/ui/Hint";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";
import {leySetupStyles} from "../styles/LyeSetup.styles";
import {InfoPopup} from "../../../shared/ui/InfoPopup";
import {WaterMethodDescriptions} from "../../../shared/ui/WaterMethodDescriptions";


const text = localization.ru.water_controls;
export const WaterSetup: FC = () => {

    const dispatch = useAppDispatch();

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleWaterPercentChange = (value: number) => dispatch(setWaterPercent(value));
    const handleWaterLyeRatioChange = (value: number) => dispatch(setWaterLyeRatio(value));
    const handleLyeConcentrationChange = (value: number) => dispatch(setLyeConcentration(value));
    const handleWaterInputTypeChange = (waterInputType: WaterInputType) => dispatch(setWaterInputType(waterInputType));

    const {appTheme} = useTheme();
    const {layout, theme} = leySetupStyles[appTheme];
    const {waterPercent, waterInputType, waterLyeRatio, lyeConcentration} = useAppSelector((state) => state.recipe);

    const isWaterAsPercentMode = waterInputType === WaterInputType.WaterAsPercent;
    const isWaterLyeRatioMode = waterInputType === WaterInputType.WaterLyeRatio;
    const isLyeConcentrationMode = waterInputType === WaterInputType.LyeConcentration;

    return (
        <InputBlockWrapper className={clsx(layout.wrapper, "wrap")}>
            <Hint
                className={layout.hint}
                onClick={() => setIsPopupOpen(true)}
            />

            <div className={layout.toggleTypeBlock}>
                <label className={clsx(theme.label, layout.label)}>
                    {text.label_water_type}
                </label>

                <ToggleButtonGroup
                    options={[
                        {label: text.water_as_percent, value: WaterInputType.WaterAsPercent},
                        {label: text.lye_concentration, value: WaterInputType.LyeConcentration},
                        {label: text.lye_ratio, value: WaterInputType.WaterLyeRatio},
                    ]}
                    onChange={handleWaterInputTypeChange}
                    isActive={(val) => val === waterInputType}
                />

            </div>

            <div className={layout.inputLyeBlock}>
                {
                    isWaterLyeRatioMode &&
                    <div className={layout.toggleTypeBlock}>
                        <label
                            className={clsx(theme.label, layout.label)}>{text.lye_ratio}
                        </label>
                        <div className={layout.fieldInner}>
                            <SmartNumberInput
                                decimalPlaces={1}
                                value={waterLyeRatio}
                                onChange={handleWaterLyeRatioChange}
                                placeholder="%"
                                min={1}
                                max={100}
                                className={`${layout.input} ${theme.input}`}
                            />
                            <span className={theme.unitText}>{" к 1"}</span>
                        </div>
                    </div>
                }

                {
                    isWaterAsPercentMode &&
                    <div className={layout.toggleTypeBlock}>
                        <label
                            className={clsx(theme.label, layout.label)}>{text.water_as_percent}
                        </label>
                        <div className={layout.fieldInner}>
                            <SmartNumberInput
                                decimalPlaces={0}
                                value={waterPercent}
                                onChange={handleWaterPercentChange}
                                placeholder="%"
                                min={1}
                                max={100}
                                className={`${layout.input} ${theme.input}`}
                            />
                            <span className={theme.unitText}>{"%"}</span>
                        </div>
                    </div>
                }

                {
                    isLyeConcentrationMode &&
                    <div className={layout.toggleTypeBlock}>
                        <label
                            className={clsx(theme.label, layout.label)}>{text.lye_concentration}
                        </label>
                        <div className={layout.fieldInner}>
                            <SmartNumberInput
                                decimalPlaces={0}
                                value={lyeConcentration}
                                onChange={handleLyeConcentrationChange}
                                placeholder="%"
                                min={1}
                                max={100}
                                className={`${layout.input} ${theme.input}`}
                            />
                            <span className={theme.unitText}>{"%"}</span>
                        </div>
                    </div>
                }
            </div>

            {
                <InfoPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <WaterMethodDescriptions/>
                </InfoPopup>

            }

        </InputBlockWrapper>


    );
};
