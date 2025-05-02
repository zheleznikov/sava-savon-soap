import {FC} from "react";
import {Bookmark, Download} from "lucide-react";
import clsx from "clsx";
import {localization} from "../../shared/config/localization";
import {recipeBlockStyles} from "./styles/RecipeBlock.styles";
import {useTheme} from "../../app/providers/ThemeContext";

interface RecipeActionsProps {
    onSave: () => void;
    onDownloadJpg: () => void;
    onDownloadPdf: () => void;
    isSaveHidden?: boolean;
}

export const RecipeActions: FC<RecipeActionsProps> = (
    {
        onSave,
        onDownloadJpg,
        onDownloadPdf,
        isSaveHidden = false,
    }) => {
    const {appTheme} = useTheme();
    const styles = recipeBlockStyles[appTheme].actions;
    const t = localization.ru.actions;

    return (
        <div className={styles.wrapper}>
            <div className={clsx(isSaveHidden && "invisible pointer-events-none")}>
                <button
                    className={styles.saveWrapper}
                    onClick={onSave}
                    title={t.saveTitle}
                >
                    <Bookmark size={18}/>
                    {t.save}
                </button>
            </div>

            <div className={styles.buttonGroup}>
                <button
                    className={clsx(styles.iconButton, styles.jpgButton)}
                    onClick={onDownloadJpg}
                    title={t.downloadJpg}
                >
                    <Download size={22}/>
                    <span className={styles.iconLabel}>{t.jpgLabel}</span>
                </button>

                <button
                    className={clsx(styles.iconButton, styles.pdfButton)}
                    onClick={onDownloadPdf}
                    title={t.downloadPdf}
                >
                    <Download size={22}/>
                    <span className={styles.iconLabel}>{t.pdfLabel}</span>
                </button>
            </div>
        </div>
    );
};