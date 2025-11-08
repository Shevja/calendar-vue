import {WEEKS_PER_MONTH, DAYS_PER_WEEK, MONTHS_PER_YEAR} from "@/constants/date.js";
import {capitalize} from "@/utils/string.js";

/*
* Функция для исправления индекса дня недели.
* в js getDay для воскресенья равен 0
* */
export const fixWeekIndex = (getDayIndex) => getDayIndex === 0 ? DAYS_PER_WEEK - 1 : getDayIndex - 1;

export function getDaysLayout(year, month) {
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Если первый день - воскресенье, то отступ даты ставиться в конец недели
    const dateOffset = fixWeekIndex(firstDate.getDay())

    const days = []

    // Получаем недостающие даты с начала недели из прошлого месяца
    for (let i = dateOffset - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        days.push(new Date(year, month - 1, day));
    }

    for (let i = 1; i <= lastDate.getDate(); i++) days.push(new Date(year, month, i));

    // Получаем недостающие даты для последней недели из следующего месяца
    let i = 1;
    while (days.length < WEEKS_PER_MONTH) {
        days.push(new Date(year, month + 1, i));
        i++;
    }

    return days;
}

/*
* Функция вовзращает массив годов:
* [<currentYear - rangeBefore>, ..., <currentYear>, <currentYear + rangeAfter>]
* */
export function getYearsList(currentYear = new Date().getFullYear(), rangeBefore = 10, rangeAfter = 10) {
    const years = [];

    const startYear = currentYear - rangeBefore;
    const endYear = currentYear + rangeAfter;

    for (let i = startYear; i <= endYear; i++) {
        years.push(i)
    }

    return years;
}

/*
* Возвращает массив вида
* {
*   label: <название месяца>,
*   value: <index месяца>
* }
* */
export function getMonthNames(locale = 'ru-RU') {
    return Array.from(
        {
            length: MONTHS_PER_YEAR,
        },
        (_, i) => {
            const name = new Date(0, i).toLocaleString(locale, {month: 'long'})
            return capitalize(name);
        }
    );
}

/*
* Возвращает список названий дней недели
* */
export function getWeekDayNames(locale = 'ru-RU') {
    return Array.from(
        {
            length: DAYS_PER_WEEK,
        },
        (_, i) => {
            const name = new Date(1970, 0, 5 + i).toLocaleString(locale, {weekday: 'short'})
            return capitalize(name);
        }
    )
}

// Возвращает строку вида "yyyy-mm-dd"
export function createDateString(dateObject) {
    const year = dateObject.getFullYear()
    let month = dateObject.getMonth() + 1
    let date = dateObject.getDate();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    return `${year}-${month}-${date}`;
}

// Парсит дату типа "yyyy-mm-dd" с проверкой на корректно переданную дату
export function parseDateString(dateString) {
    if (!dateString) return new Date();

    const [year, month, day] = dateString.split("-").map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return new Date();

    return new Date(year, month - 1, day);
}
