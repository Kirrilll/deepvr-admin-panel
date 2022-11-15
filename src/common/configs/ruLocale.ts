import { PickerLocale } from "antd/lib/date-picker/generatePicker";
import locale from "antd/lib/date-picker/locale/ru_RU";

export const ruLocale: PickerLocale = {
    lang: {
        ...locale.lang,
        locale: 'ru-cstm',
        today: 'Сегодня',
        now: 'Сейчас',
        // timeSelect: string;
        // dateSelect: string;
        // weekSelect?: string;
        // clear: string;
        // month: string;
        // year: string;
        // previousMonth: string;
        // nextMonth: string;
        // monthSelect: string;
        // yearSelect: string;
        // decadeSelect: string;
        // dayFormat: string;
        // dateFormat: string;
        // dateTimeFormat: string;
        // previousYear: string;
        // nextYear: string;
        // previousDecade: string;
        // nextDecade: string;
        // previousCentury: string;
        // nextCentury: string;
        shortWeekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        shortMonths: ['Январь', 'Февраль', 'Mарт', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    },
    timePickerLocale: locale.timePickerLocale
}