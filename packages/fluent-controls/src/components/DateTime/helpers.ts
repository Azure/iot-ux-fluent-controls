export {hasClassName} from '../../Common';

export enum DateFormat {
    MMDDYYYY = 0,
    DDMMYYYY,
    YYYYMMDD
}

export const char0: number = 48;
export const char9: number = 57;
export const charSlash: number = 47;
export const weekLength = 7;

export const placeholders = [
    'mm/dd/yyyy',
    'dd/mm/yyyy',
    'yyyy/mm/dd'
];

const formatters = [
    (year: string, month: string, day: string) => `${month}/${day}/${year}`,
    (year: string, month: string, day: string) => `${day}/${month}/${year}`,
    (year: string, month: string, day: string) => `${year}/${month}/${day}`,
];

export const formatDate = (date: Date, format: DateFormat) => {
    let month = date.getMonth() + 1;
    let monthString = month > 9 ? `${month}` : `0${month}`;
    let day = date.getDate();
    let dayString = day > 9 ? `${day}` : `0${day}`;
    return formatters[format](`${date.getFullYear()}`, monthString, dayString);
};

export const replaceAt = (value: string, index: number, newValue: string) => {
    return value.substr(0, index) + newValue + value.substr(index, +value.length);
};

export const dateIsValid = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return (
        !isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year > 0 && month >= 0 && month < 12 &&
        day > 0 && day < 32
    );
};

export const getLocalWeekdays = (locale) => {
    const date = new Date();
    const dayNames = [];
    date.setDate(date.getDate() - date.getDay());
    for (let day = 0; day < weekLength; day++) {
        dayNames.push(
            date.toLocaleDateString(locale, {weekday: 'short'}).toUpperCase()
        );
        date.setDate(date.getDate() + 1);
    }

    return dayNames;
};

export const getLocalMonths = (locale) => {
    const date = new Date();
    const monthNames = [];
    for (let month = 0; month < 12; month++) {
        date.setMonth(month);
        monthNames.push(
            date.toLocaleDateString(locale, {month: 'long'})
        );
    }

    return monthNames;
};
