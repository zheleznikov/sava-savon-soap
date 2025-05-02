import {useRef, useState} from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {ExportRecipe, ExportRecipeProps} from "../../ui/ExportRecipe";

export const useExportRecipe = () => {
    const exportRef = useRef<HTMLDivElement>(null);
    const [currentData, setCurrentData] = useState<ExportRecipeProps | null>(null);
    const [isCreatingImg, setIsCreatingImg] = useState(false);

    const waitRender = () => new Promise((r) => setTimeout(r, 100));

    const exportPdfStable = async (data: ExportRecipeProps) => {
        setCurrentData(data);
        setIsCreatingImg(true);

        // ⏳ ждём отрисовки компонента
        await new Promise((r) => setTimeout(r, 100));

        const element = exportRef.current;
        if (!element) {
            console.error("❌ exportRef пустой");
            return;
        }

        const canvas = await html2canvas(element, {
            backgroundColor: "#fff",
            useCORS: true,
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (!imgData.startsWith("data:image")) {
            console.error("❌ Невалидное изображение:", imgData.slice(0, 30));
            return;
        }

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const contentWidth = pageWidth - margin * 2;

        const imgRatio = canvas.width > 0 ? canvas.height / canvas.width : 1;
        const targetWidth = contentWidth;
        const targetHeight = targetWidth * imgRatio;
        const offsetX = (pageWidth - targetWidth) / 2;

        pdf.addImage(imgData, "JPEG", offsetX, margin, targetWidth, targetHeight);

        // if (!isApp()) {
        //     const linkText = "https://sava-savon.net";
        //     const pageWidth = pdf.internal.pageSize.getWidth();
        //     const y = pdf.internal.pageSize.getHeight() - 10; // отступ снизу
        //     const x = (pageWidth - pdf.getTextWidth(linkText)) / 2;
        //
        //     pdf.textWithLink(linkText, x, y, { url: linkText });
        // }
        pdf.save(`${data.recipeName}.pdf`);
        setIsCreatingImg(false);
    };

    const exportPdf = async (data: ExportRecipeProps) => {
        setCurrentData(data);
        setIsCreatingImg(true);

        await new Promise((r) => setTimeout(r, 100));

        const element = exportRef.current;
        if (!element) {
            console.error("❌ exportRef пустой");
            return;
        }

        const canvas = await html2canvas(element, {
            backgroundColor: "#fff",
            useCORS: true,
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (!imgData.startsWith("data:image")) {
            console.error("❌ Невалидное изображение:", imgData.slice(0, 30));
            return;
        }

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;

        const contentWidth = pageWidth - margin * 2;
        const ratio = canvas.height / canvas.width;
        const imgHeightMm = contentWidth * ratio;

        const offsetX = (pageWidth - contentWidth) / 2;

        if (imgHeightMm <= pageHeight - margin * 2) {
            // Влезает на одну страницу
            pdf.addImage(imgData, "JPEG", offsetX, margin, contentWidth, imgHeightMm);
        } else {
            // Надо разбивать по высоте
            const pxPerMm = canvas.height / imgHeightMm;
            const pageHeightPx = (pageHeight - margin * 2) * pxPerMm;

            let remainingHeight = canvas.height;
            let position = 0;

            while (remainingHeight > 0) {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = canvas.width;
                tempCanvas.height = Math.min(pageHeightPx, remainingHeight);

                const ctx = tempCanvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(
                        canvas,
                        0,
                        position,
                        canvas.width,
                        tempCanvas.height,
                        0,
                        0,
                        canvas.width,
                        tempCanvas.height
                    );
                }

                const img = tempCanvas.toDataURL("image/jpeg", 0.92);
                const heightMm = (tempCanvas.height / pxPerMm);

                if (position > 0) pdf.addPage();
                pdf.addImage(img, "JPEG", offsetX, margin, contentWidth, heightMm);

                position += tempCanvas.height;
                remainingHeight -= tempCanvas.height;
            }
        }

        pdf.save(`${data.recipeName}.pdf`);
        setIsCreatingImg(false);
    };


    const exportImageOrShare = async (data: ExportRecipeProps) => {
        setCurrentData(data);
        setIsCreatingImg(true);

        await waitRender();

        const element = exportRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { backgroundColor: "#fff", useCORS: true, scale: 2 });
        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((b) => resolve(b), "image/jpeg", 0.92)
        );
        if (!blob) return;

        const file = new File([blob], `${data.recipeName}.jpg`, { type: "image/jpeg" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: data.recipeName,
                    text: "Рецепт мыла от Sava Savon",
                });
            } catch (e) {
                console.warn("Пользователь отменил шаринг", e);
            }
        } else {
            // Fallback: download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            link.click();
            URL.revokeObjectURL(link.href);
        }

        setIsCreatingImg(false);

    };

    const ExportContainer = () => {
        if (!currentData) return null;
        return (
            <div
                ref={exportRef}
                style={{ position: "absolute", top: 0, left: "-9999px" }}
            >
                <ExportRecipe {...currentData} />
            </div>
        );
    };

    return {
        exportPdf,
        exportImageOrShare,
        ExportContainer,
        isCreatingImg
    };
};
