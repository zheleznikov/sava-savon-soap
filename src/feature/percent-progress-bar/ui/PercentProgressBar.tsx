import {FC} from "react";
import {useSoapRecipe} from "@/feature/recipe-calculation/model/useSoapRecipe";
import {formatNumber} from "@/shared/lib/utils";
import {InputType} from "@/app/providers/SoapRecipeContext.types";
import {
    calculatePercentSum,
    getProgressBarColor,
    isPercentInvalid,
} from "@/feature/percent-progress-bar";
import {percentProgressStyles} from "@/feature/percent-progress-bar";
import {useTheme} from "@/app/providers/ThemeContext";
import {localization} from "@/shared/config/localization";

export const PercentProgressBar: FC = () => {
    const {selectedOils, oilInputType} = useSoapRecipe();

    const percentSum = calculatePercentSum(selectedOils);
    const isPercentMode = oilInputType === InputType.Percent;
    const percentOutOfRange = isPercentMode && isPercentInvalid(percentSum);

    const {appTheme} = useTheme();
    const s = percentProgressStyles[appTheme];
    const t = localization.ru.percent_progress_bar;

    return (
        <div className={s.wrapper}>
            <div className={s.barOuterWrapper}>
                {isPercentMode && (
                    <div className={s.barWrapper}>
                        <div
                            className={`${s.bar} ${getProgressBarColor(percentSum)}`}
                            style={{width: `${Math.min(percentSum, 120)}%`}}
                        />
                        <div className={s.textWrapper}>
                            <span className={s.text}>
                              {t.summary.replace(
                                  "{{percent}}",
                                  formatNumber(percentSum, 0)
                              )}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className={s.hint}>
                {percentOutOfRange
                    ? (<p className={s.hintText}>
                        {t.hint_main}{" "}
                        {percentSum < 99 && (
                            <span className={s.hintStrong}>
                              {t.hint_add.replace(
                                  "{{amount}}",
                                  Math.round(99 - percentSum).toString()
                              )}
                            </span>
                        )}
                        {percentSum > 101 && (
                            <span className={s.hintStrong}>
                              {t.hint_remove.replace(
                                  "{{amount}}",
                                  Math.round(percentSum - 101).toString()
                              )}
                            </span>
                        )}
                    </p>)
                    : (<p className="invisible select-none">&nbsp;</p>)
                }
            </div>
        </div>
    );
}
