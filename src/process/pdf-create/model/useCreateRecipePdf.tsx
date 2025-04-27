// src/hooks/useCreateRecipePdf.ts

import React, {useRef, useState} from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "@/assets/logo4.png";

export const useCreateRecipePdf = () => {
    const pdfRef = useRef<HTMLDivElement>(null);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

    const createPdf = async (name: string) => {
        if (!pdfRef.current) return;

        setIsDownloadingPdf(true);


        // 1. Делаем скриншот содержимого
        const canvas = await html2canvas(pdfRef.current, {
            scale: 1.5, // Высокое качество
            backgroundColor: "#ffffff",
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.7);

        // 2. Создаём PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // обычные поля
        const contentWidth = pageWidth - margin * 2;

        let currentY = margin;

        // 3. Вставляем логотип
        try {
            const logoImg = new Image();
            logoImg.src = logo;
            await new Promise((resolve) => (logoImg.onload = resolve));

            const logoWidth = 40; // ширина логотипа в мм
            const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
            const logoCenterX = (pageWidth - logoWidth) / 2;

            pdf.addImage(
                logoImg,
                'PNG',
                logoCenterX,
                currentY,
                logoWidth,
                logoHeight
            );

            currentY += logoHeight + 10; // отступ после логотипа
        } catch (error) {
            console.error("Ошибка загрузки логотипа:", error);
        }

        // 4. Рассчитываем размеры скриншота
        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.height / imgProps.width;

        const targetWidth = contentWidth * 0.9; // Меньше на 10%
        const targetHeight = targetWidth * imgRatio;

        const centerX = (pageWidth - targetWidth) / 2;

        // 5. Если не помещается — перенос на новую страницу
        if (currentY + targetHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
        }

        // 6. Вставляем скриншот рецепта
        pdf.addImage(
            imgData,
            'JPEG',
            centerX,
            currentY,
            targetWidth,
            targetHeight,
            undefined,
            'FAST'
        );

        // 7. Сохраняем PDF
        pdf.save(`${name}.pdf`);

        setIsDownloadingPdf(false);
    }

    const shareImageFile = async (name: string) => {
        if (!pdfRef.current) return;

        setIsDownloadingPdf(true);


        const canvas = await html2canvas(pdfRef.current, {
            scale: 1.5,
            backgroundColor: "#ffffff",
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8);

        try {
            const response = await fetch(imgData);
            const blob = await response.blob();
            const file = new File([blob], `${name}.jpg`, { type: "image/jpeg" });

            // if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Рецепт мыла",
                    text: "Посмотрите мой рецепт мыла!",
                });
            // } else {
            //     // fallback на скачивание
            //     const link = document.createElement('a');
            //     link.href = imgData;
            //     link.download = `${name}.jpg`;
            //     document.body.appendChild(link);
            //     link.click();
            //     document.body.removeChild(link);
            // }
        } catch (error) {
            console.error("Ошибка при попытке поделиться:", error);

            // fallback на скачивание
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${name}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        setIsDownloadingPdf(false);
    };


    return {
        pdfRef,
        createPdf,
        isDownloadingPdf,
        shareImageFile
    };
};