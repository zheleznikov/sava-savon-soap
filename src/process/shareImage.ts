export const shareImage = async (base64Image: string, fileName: string) => {
    try {
        if (navigator.canShare && navigator.canShare({ files: [] })) {
            const response = await fetch(base64Image);
            const blob = await response.blob();
            const file = new File([blob], `${fileName}.jpg`, { type: "image/jpeg" });

            await navigator.share({
                files: [file],
                title: "Рецепт мыла",
                text: "Посмотрите мой рецепт мыла!",
            });
        } else {
            // Если Web Share API не поддерживается — просто скачать
            const link = document.createElement('a');
            link.href = base64Image;
            link.download = `${fileName}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error("Ошибка при попытке поделиться изображением:", error);

        // Если ошибка — просто скачать картинку
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = `${fileName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
