import {FC} from "react";
import {Download, Share2} from "lucide-react";
import clsx from "clsx";
import {localization} from "../../../shared/config/localization";
import {recipeBlockStyles} from "../styles/RecipeBlock.styles";
import {useTheme} from "../../../app/providers/ThemeContext";
import { isMobile } from "react-device-detect";
import {Capacitor} from "@capacitor/core";


interface RecipeActionsProps {
    onSave: () => void;
    onDownloadJpg: () => void;
    onDownloadPdf: () => void;
    onSharePdf: () => void;
    onShareJpg: () => void;
    isSaveHidden?: boolean;
}

export const RecipeActions: FC<RecipeActionsProps> = (
    {
        onSave,
        onDownloadJpg,
        onDownloadPdf,
        onSharePdf,
        onShareJpg,
        isSaveHidden = false,
    }) => {
    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme].actions;
    const t = localization.ru.actions;


    const isSharingAvailable = (isMobile || Capacitor.isNativePlatform());

    return (
        <div className={styles.wrapper}>

            <div className={styles.buttonGroup}>

                <button
                    className={clsx(styles.iconButton, styles.jpgButton)}
                    onClick={onDownloadJpg}
                    title={t.downloadJpg}
                >
                    <Download size={22}/>
                    <span className={styles.iconLabel}>{t.jpgLabel}</span>
                </button>

                {isSharingAvailable && (
                    <button
                        className={clsx(styles.iconButton, styles.jpgShareButton)}
                        onClick={onShareJpg}
                        title={t.downloadJpg}
                    >
                        <Share2 size={22}/>
                        <span className={styles.iconLabel}>{t.jpgLabel}</span>
                    </button>

                )}

                <button
                    className={clsx(styles.iconButton, styles.pdfButton)}
                    onClick={onDownloadPdf}
                    title={t.downloadPdf}
                >
                    <Download size={22}/>
                    <span className={styles.iconLabel}>{t.pdfLabel}</span>
                </button>

                {isSharingAvailable && (
                    <button
                        className={clsx(styles.iconButton, styles.pdfShareButton)}
                        onClick={onSharePdf}
                        title={t.downloadJpg}
                    >
                        <Share2 size={22}/>
                        <span className={styles.iconLabel}>{t.pdfLabel}</span>
                    </button>
                )}
            </div>
        </div>
    );
};
