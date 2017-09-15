export enum DateFormat {
    MMDDYYYY = 0,
    DDMMYYYY,
    YYYYMMDD
}

export const _placeholders = [
    'dd/mm/yyyy',
    'mm/dd/yyyy',
    'yyyy/mm/dd'
];

export const _formaters = [
    (year: string, month: string, day: string) => `${month}/${day}/${year}`,
    (year: string, month: string, day: string) => `${day}/${month}/${year}`,
    (year: string, month: string, day: string) => `${year}/${month}/${day}`,
];

export const formatDate = (date: Date, format: DateFormat) => {
    let month = date.getMonth() + 1;
    let monthString = month > 9 ? `${month}` : `0${month}`;
    let day = date.getDate();
    let dayString = day > 9 ? `${day}` : `0${day}`;
    return _formaters[format](`${date.getFullYear()}`, monthString, dayString);
};

export const hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
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
        year > 1000 && month >= 0 && month < 12 &&
        day > 0 && day < 32
    );
};
