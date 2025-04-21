// Жирные кислоты, влияющие на свойства мыла
export type TFattyAcids = {
    lauric: number;     // Лауриновая кислота — пена и очищение
    myristine: number;  // Миристиновая кислота — пена и твердость
    palmitic: number;   // Пальмитиновая кислота — твёрдость
    stearin: number;    // Стеариновая кислота — стабильность пены
    ricin: number;      // Рицинолеиновая — ухаживающая, пенообразующая
    oleic: number;      // Олеиновая кислота — мягкость, уход
    linoleic: number;   // Линолевая кислота — питает, снижает срок хранения
    linolenic: number;  // Линоленовая кислота — полезна, но нестабильна
};

// Мыльные свойства масла
export type TOilProperties = {
    hardness: number;   // Твёрдость мыла
    cleansing: number;  // Моющая способность
    soften: number;     // Смягчающее свойство
    bubbling: number;   // Объём пены
    creaminess: number; // Кремовость пены
};

// Статичные данные о масле
export type TOilBase = {
    id: number;         // Уникальный идентификатор
    name_rus: string;
    name_eng: string;       // Название масла
    sap: {
        naoh: number;     // SAP для NaOH (твёрдое мыло)
        koh: number;      // SAP для KOH (жидкое мыло)
    };
    iodine: number;     // Йодное число
    ins: number;        // INS индекс стабильности
    fatty_acids: TFattyAcids;
    properties: TOilProperties;
    alias?: string[];   // Альтернативные названия, для поиска
    category?: string;  // Категория масла (растительное, животное и т.п.)
};

// Динамически рассчитываемые поля (пользовательский ввод)
export type TOilUserInput = {
    percent: number;    // Процент в рецепте
    gram: number;       // Масса в граммах
};

// Финальный тип масла
export type TOil = TOilBase & TOilUserInput;