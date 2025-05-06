export const localization = {
    ru: {
        logo: "sava savon",
        autocomplete: {
            placeholder: "Введите название масла"
        },
        calculator: {
            header: "Калькулятор мыла",
            edit_notice: "Вы редактируете сохранённый рецепт: "
        },
        recipe_input: {
            placeholder: "Введите название рецепта"
        },
        input_type_toggle: {
            label_input_type: "Режим ввода",
            button_grams: "Граммы",
            button_percent: "Проценты",
            label_total_weight: "Общий вес мыла",
            placeholder_grams: "граммы",
            hint_automatic: "Рассчитывается автоматически по сумме масел",
            unit_grams: "г"
        },
        soap_controls: {
            label_lye_type: "Тип щёлочи",
            label_water_percent: "Процент воды",
            label_superfat_percent: "Процент пережира",
            placeholder_percent: "%"
        },
        navbar: {
            menu: "Меню"
        },
        about: {
            title: "О нас",
            paragraphs: [
                "Привет!",
                "Мы — Настя и Серёжа, создатели sava savon. Идея проекта родилась из простой истории: Насте было неудобно пользоваться существующими калькуляторами мыла — где-то всё было сложно, где-то запутанно, а где-то просто неудобно. Серёжа решил сделать для неё свой — понятный и удобный.",
                "Потом мы подумали: если это помогло Насте, значит, поможет и другим. Так появился sava savon — сервис для тех, кто варит мыло и хочет сосредоточиться на творчестве, а не на расчётах.",
                "Мы продолжаем развивать проект, добавляя новые функции, рецепты и идеи, чтобы сделать всё ещё удобнее и приятнее.",
                "Рады, что вы с нами!",
            ],
        },
        oil_line: {
            delete_button_title: "Удалить масло",
            placeholder_grams: "Граммы",
            placeholder_percent: "Проценты",
            unit_grams: "г",
            unit_percent: "%",
            expand_more: "О масле",
            expand_less: "Скрыть",
            expand_title_open: "Скрыть подробности",
            expand_title_closed: "Показать подробности",
            section_properties: "Свойства",
            section_fatty_acids: "Жирные кислоты",
            section_lye: "Щелочь",
            property_hardness: "Твёрдость",
            property_cleansing: "Очищение",
            property_soften: "Смягчение",
            property_bubbling: "Пузыристость",
            property_creaminess: "Кремовость",
            property_iodine: "Йодное число",
            fatty_acid_lauric: "Лауриновая",
            fatty_acid_myristine: "Миристиновая",
            fatty_acid_palmitic: "Пальмитиновая",
            fatty_acid_stearin: "Стеариновая",
            fatty_acid_ricin: "Рицинолеиновая",
            fatty_acid_oleic: "Олеиновая",
            fatty_acid_linoleic: "Линолевая",
            fatty_acid_linolenic: "Линоленовая",
            lye_naoh: "NaOH",
            lye_koh: "KOH",
        },

        percent_progress_bar: {
            summary: "Общий процент — {{percent}}%",
            hint_main: "Для правильного расчёта общий процент масел должен быть от 99% до 101%.",
            hint_add: "Добавьте {{amount}}%.",
            hint_remove: "Убавьте {{amount}}%.",
        },
        oils_list: {
            title: "Масла",
            summary_label: "Масса масел",
            percent_unit: "%",
            gram_unit: "г"
        },
        parameters: {
            title: "Параметры ввода",
            superfat: "Пережир",
            water: "Вода",
            percentUnit: "%",
            gramUnit: "г"
        },
        recipe_title_default: {
            placeholder: "Мой рецепт"
        },
        result_summary: {
            title: "Итог",
            label: "Общий вес",
            unit: "г"
        },
        scale: {
            title: "Масштабирование рецепта",
            description: "Измените общий вес готового мыла — рецепт пересчитается автоматически.",
            placeholder: "Вес мыла, г",
            unit: "г"
        },
        parameters_table: {
            title: "Параметры",
            param: "Параметр",
            value: "Значение",
            range: "Диапазон",
            hardness: "Твёрдость",
            cleansing: "Очищающие качества",
            softening: "Смягчающие качества",
            creaminess: "Кремовость пены",
            bubbling: "Пузыристость пены",
            iodine: "Йодное число"
        },
        actions: {
            save: "Сохранить",
            saveTitle: "Сохранить рецепт",
            downloadJpg: "Скачать JPG",
            downloadPdf: "Скачать PDF",
            jpgLabel: "JPG",
            pdfLabel: "PDF"
        },
        recipe_reminder: {
            main: "Вы создали этот рецепт в калькуляторе мыла sava savon — ",
            via: "через приложение.",
            above: "выше нормы",
            below: "ниже нормы",
        },
        explanation: {
            lye: {
                title: "Как считаем щёлочь",
                blocks: [
                    "Чтобы мыло получилось, щёлочь должна реагировать с маслами. Но не с каждым маслом одинаково.",
                    "У каждого масла есть своё <strong>SAP-значение</strong> — это число показывает, сколько грамм щёлочи нужно на 1 грамм этого масла.",
                    "<strong>Пример расчёта щёлочи:</strong>",
                    "Допустим, у нас есть рецепт:",
                ],
                listExample1: [
                    "200 г оливкового масла (SAP ≈ 0.134)",
                    "100 г кокосового масла (SAP ≈ 0.183)",
                ],
                blockAfterList1: "Считаем щёлочь для каждого масла:",
                listExample2: [
                    "Оливковое: 200 × 0.134 = <strong>26.8 г NaOH</strong>",
                    "Кокосовое: 100 × 0.183 = <strong>18.3 г NaOH</strong>",
                ],
                totalWithoutSuperfat: "Всего: 26.8 + 18.3 = <strong>45.1 г NaOH</strong> — без пережира.",
                blocksAfterTotal: [
                    "Затем учитываем <strong>пережир</strong> — это «страховка», чтобы не вся щёлочь среагировала, и в мыле остались неомылившиеся масла.",
                    "Например, если пережир указан 5%, то щёлочь уменьшится на 5%.<br />В нашем примере 45.1 г NaOH без пережира, значит:",
                ],
                final: "<strong>Общее количество щёлочи = 45.1 × 95% = 42.8 г NaOH.</strong>",
            },
            properties: {
                title: "Как считаем свойства мыла",
                intro: "Для каждого масла известно, какие жирные кислоты в нём содержатся и в каком количестве. Мы используем эти данные, чтобы рассчитать вклад каждого масла в свойства мыла.",
                process: {
                    title: "Когда вы составляете рецепт, мы:",
                    steps: [
                        "определяем долю каждого масла,",
                        "считаем, какие жирные кислоты оно вносит в рецепт,",
                        "вычисляем <strong>взвешенное среднее содержание кислот</strong>,",
                        "на основе этого рассчитываем свойства мыла.",
                    ],
                },
                exampleTitle: "Пример:",
                exampleText: "Если в рецепте 70% оливкового масла (~10% пальмитиновой кислоты) и 30% кокосового масла (~9%), то среднее содержание пальмитиновой:",
                exampleFormula: "70 × 10% + 30 × 9% = 9.7%",
                traitsTitle: "Что означают свойства и как они считаются:",
                traitsList: [
                    "<strong>Hardness:</strong> пальмитиновая + стеариновая",
                    "<strong>Cleansing:</strong> лауриновая + миристиновая",
                    "<strong>Conditioning:</strong> олеиновая, линолевая, линоленовая",
                    "<strong>Bubbling:</strong> лауриновая, миристиновая, рицинолевая",
                    "<strong>Creaminess:</strong> стеариновая, пальмитиновая, рицинолевая",
                    "<strong>Iodine:</strong> ненасыщенные жирные кислоты",
                ],
                rangesTitle: "Рекомендуемые диапазоны",
                rangesSubtitle: "Ниже — ориентировочные значения, которые считаются сбалансированными.",
                table: [
                    {
                        name: "Hardness",
                        range: "29–54",
                        description: "Низкое — мыло мягкое, высокое — крошится",
                    },
                    {
                        name: "Cleansing",
                        range: "12–22",
                        description: "Выше — сушит кожу, ниже — плохо отмывает",
                    },
                    {
                        name: "Conditioning",
                        range: "44–69",
                        description: "Смягчение и уход за кожей",
                    },
                    {
                        name: "Bubbling",
                        range: "14–46",
                        description: "Воздушная пена",
                    },
                    {
                        name: "Creaminess",
                        range: "16–48",
                        description: "Плотная кремовая пена",
                    },
                    {
                        name: "Iodine",
                        range: "41–70",
                        description: "Высокое — мягкость, но короче срок хранения",
                    },
                ],
            }

        }

    }
};
