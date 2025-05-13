import React, {FC, useState} from "react";
import {LyeType} from "@/app/providers/SoapRecipeContext.types";
import {InputBlockWrapper} from "@/shared/ui/InputBlockWrapper";
import {localization} from "@/shared/config/localization";
import {useTheme} from "@/app/providers/ThemeContext";
import {clsx} from "clsx";
import {useAppSelector} from "../../../shared/useAppSelector";
import {useAppDispatch} from "../../../shared/model/useAppDispatch";
import {
    setKOHPercentageInMixed,
    setKOHPurity,
    setLyeType,
    setNaOHPercentageInMixed,
    setNaOHPurity
} from "../../recipe-calculation/model/recipeSlice";
import {SmartNumberInput} from "../../../shared";
import {ToggleButtonGroup} from "../../../shared/ui/ToggleButtonGroup";
import {leySetupStyles} from "../styles/LyeSetup.styles";
import {InfoPopup} from "../../../shared/ui/InfoPopup";
import {LyeTypeInfoContent} from "../../../shared/ui/LyeTypeInfoContent";
import {Hint} from "../../../shared/ui/Hint";


export const LyeSetup: FC = () => {
    const dispatch = useAppDispatch();

    const text = localization.ru.soap_controls;

    const handleSetLyeType = (leyType: LyeType) => dispatch(setLyeType(leyType));
    const handleNaOHPurityChange = (value: number) => dispatch(setNaOHPurity(value));
    const handleKOHPurityChange = (value: number) => dispatch(setKOHPurity(value));
    const handleNaOHPercentageInMixedChange = (value: number) => dispatch(setNaOHPercentageInMixed(value));
    const handleKOHPercentageInMixedChange = (value: number) => dispatch(setKOHPercentageInMixed(value));

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const {appTheme} = useTheme();
    const {layout, theme} = leySetupStyles[appTheme];

    const {
        lyeType,
        NaOHPurity,
        KOHPurity,
        NaOHPercentageInMixed,
        KOHPercentageInMixed
    } = useAppSelector((state) => state.recipe);

    const isNaOHMode = lyeType === LyeType.NaOH;
    const isKOHMode = lyeType === LyeType.KOH;
    const isMixedMode = lyeType === LyeType.Mixed;


    return (
        <InputBlockWrapper className={clsx(layout.wrapper, isMixedMode ? "" : "xs:flex-row")}>

            <Hint
                className={layout.hint}
                onClick={() => setIsPopupOpen(true)}
            />


            <div className={layout.lyeTypeBlock}>
                <label className={clsx(theme.label, layout.label)}>
                    {text.label_lye_type}
                </label>

                <ToggleButtonGroup
                    options={[
                        {label: LyeType.NaOH, value: LyeType.NaOH},
                        {label: LyeType.KOH, value: LyeType.KOH},
                        {label: LyeType.Mixed, value: LyeType.Mixed},
                    ]}
                    onChange={handleSetLyeType}
                    isActive={(val) => val === lyeType}
                />

            </div>

            <div className={layout.inputLyeBlock}>

                <div className={clsx(layout.inputLyeBlock)}>

                    {
                        (isNaOHMode || isMixedMode) &&

                        <div className={layout.lyeTypeBlock}>
                            <label className={clsx(theme.label, layout.label)}>
                                {text.naoh_purity}
                            </label>
                            <div className={layout.fieldInner}>
                                <SmartNumberInput
                                    decimalPlaces={0}
                                    value={NaOHPurity}
                                    onChange={handleNaOHPurityChange}
                                    placeholder={text.placeholder_percent}
                                    min={1}
                                    max={100}
                                    className={`${layout.input} ${theme.input}`}
                                />
                                <span className={theme.unitText}>{text.placeholder_percent}</span>
                            </div>
                        </div>
                    }

                    {
                        (isKOHMode || isMixedMode) &&

                        <div className={layout.lyeTypeBlock}>
                            <label className={clsx(theme.label, layout.label)}>
                                {text.koh_purity}
                            </label>
                            <div className={layout.fieldInner}>
                                <SmartNumberInput
                                    decimalPlaces={0}
                                    value={KOHPurity}
                                    onChange={handleKOHPurityChange}
                                    placeholder={text.placeholder_percent}
                                    min={1}
                                    max={100}
                                    className={`${layout.input} ${theme.input}`}
                                />
                                <span className={theme.unitText}>{text.placeholder_percent}</span>
                            </div>
                        </div>
                    }

                </div>

                {
                    isMixedMode &&
                    <div className={layout.inputLyeBlock}>
                        <div className={layout.lyeTypeBlock}>
                            <label className={clsx(theme.label, layout.label)}>
                                {text.naoh_percent}
                            </label>
                            <div className={layout.fieldInner}>
                                <SmartNumberInput
                                    decimalPlaces={0}
                                    value={NaOHPercentageInMixed || 0}
                                    onChange={handleNaOHPercentageInMixedChange}
                                    placeholder={text.placeholder_percent}
                                    min={1}
                                    max={100}
                                    className={`${layout.input} ${theme.input}`}
                                />
                                <span className={theme.unitText}>{text.placeholder_percent}</span>
                            </div>
                        </div>
                        <div className={layout.lyeTypeBlock}>
                            <label className={clsx(theme.label, layout.label)}>
                                {text.koh_percent}
                            </label>
                            <div className={layout.fieldInner}>
                                <SmartNumberInput
                                    decimalPlaces={0}
                                    value={KOHPercentageInMixed || 0}
                                    onChange={handleKOHPercentageInMixedChange}
                                    placeholder={text.placeholder_percent}
                                    min={1}
                                    max={100}
                                    className={`${layout.input} ${theme.input}`}
                                />
                                <span className={theme.unitText}>{text.placeholder_percent}</span>
                            </div>
                        </div>
                    </div>
                }

            </div>

            {
                <InfoPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                    <LyeTypeInfoContent/>
                </InfoPopup>

            }

        </InputBlockWrapper>
    );
};
