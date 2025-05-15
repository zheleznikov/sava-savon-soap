export const localization = {
    ru: {
        logo: "sava savon",
        autocomplete_oil: {
            placeholder: "Введите название масла"
        },
        autocomplete_acid: {
            placeholder: "Введите название кислоты"
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
            button_ounces: "Унции",
            label_total_weight: "Общий вес мыла",
            placeholder_grams: "граммы",
            hint_automatic: "Рассчитывается автоматически по сумме масел",
            unit_grams: "г"
        },
        soap_controls: {
            label_lye_type: "Тип щёлочи",
            label_water_percent: "Процент воды",
            naoh_purity: "Чистота NaOH",
            koh_purity: "Чистота KOH",
            naoh_percent: "Процент NaOH",
            koh_percent: "Процент KOH",
            label_superfat_percent: "Процент пережира",
            placeholder_percent: "%"
        },
        water_controls: {
            label_water_type: "Расчет жидкости",
            water_as_percent: "% жидкости от масел",
            lye_ratio: "Жидкость к щёлочи",
            lye_concentration: "Концентрация щёлочи",

            label_superfat_percent: "Процент пережира",
            placeholder_percent: "%"
        },
        water_methods: {
            water_as_percent: {
                title: "% жидкости от масел",
                description: "Вода рассчитывается как процент от общего веса масел (например, 38%).",
                usage: "Обычно используется в классических рецептах с холодным способом. Подходит для новичков."
            },
            lye_concentration: {
                title: "Концентрация щёлочи",
                description: "Указывается, какой процент раствора составляет щёлочь, например 33%.",
                usage: "Применяется при точном контроле за свойствами, в горячем способе или для уменьшения лишней влаги в мыле."
            },
            lye_ratio: {
                title: "Жидкость к щёлочи",
                description: "Указывается соотношение воды к щёлочи, например 2:1 означает, что воды в 2 раза больше, чем щёлочи.",
                usage: "Подходит для ускоренного затвердевания, горячего способа и рецептов с высоким содержанием твёрдых жиров."
            },
        },

        navbar: {
            menu: "Меню"
        },
        about: {
            title: "О проекте",
            paragraphs: [
                "<strong>Привет!</strong>",
                "Мы — Настя и Серёжа, создатели <strong>sava savon</strong>. Идея проекта родилась из простой истории: Насте было неудобно пользоваться другими мыльными калькуляторами — многие из них выглядели устаревшими и не адаптированы под современные устройства. Мы решили, что инструмент должен быть простым, современным и удобным на любом экране.",
                "Так появился <strong>sava savon</strong> — мыльный калькулятор, который помогает сосредоточиться на рецепте, а не на расчётах. Здесь можно быстро пересчитать формулу под любой вес и, при желании, понять, как именно устроены расчёты.",
                "У Насти есть канал о мыловарении — <a href=\"https://t.me/sava_savon\" target=\"_blank\" rel=\"noopener noreferrer\">t.me/sava_savon</a>, где она делится рецептами, советами и опытом.",
                "А у проекта есть канал о разработке — <a href=\"https://t.me/savasavon_develop\" target=\"_blank\" rel=\"noopener noreferrer\">t.me/savasavon_develop</a>, где мы рассказываем о сервисе: какие функции уже добавлены, над чем работаем сейчас и что планируем реализовать в будущем. Если хотите следить за развитием проекта, делиться идеями и первыми попробовать сервис — присоединяйтесь.",
                "Рады, что вы с нами!"
            ]
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
            section_lye: "Коэффициент омыления",
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
        acid_list: {
            title: "Кислоты",
            summary_label: "Масса кислот",
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
            title: "Масштабирование",
            description: "Измените общий вес мыла",
            placeholder: "Вес мыла",
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
        },
        lye_info: {
            explanation: "Щёлочь рассчитывается по SAP-значениям каждого масла с учётом выбранного типа щёлочи и пережира:",
            formula_code: "масса масла × SAP × (1 − пережир / 100)",
            total_label: "Всего {lyeType}:"
        }

    }
};
