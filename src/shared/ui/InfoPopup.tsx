import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {infoPopupStyles} from "../styles/InfoPopup.styles";
import {useTheme} from "../../app/providers/ThemeContext";

interface InfoPopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const InfoPopup: FC<InfoPopupProps> = ({ isOpen, onClose, children }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const portalRoot = document.getElementById("popup-root");

    const { appTheme } = useTheme();
    const styles = infoPopupStyles[appTheme];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen || !portalRoot) return null;

    return createPortal(
        <div className={styles.overlay}>
            <div ref={popupRef} className={styles.popup}>
                <button onClick={onClose} className={styles.closeButton} aria-label="Закрыть">
                    <X className={styles.icon} />
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        portalRoot
    );
};
