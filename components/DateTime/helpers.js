"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Common");
exports.placeholders = [
    'mm/dd/yyyy',
    'dd/mm/yyyy',
    'yyyy/mm/dd'
];
const formatters = [
    (year, month, day) => `${month}/${day}/${year}`,
    (year, month, day) => `${day}/${month}/${year}`,
    (year, month, day) => `${year}/${month}/${day}`,
];
exports.formatDate = (date, format, localTimezone) => {
    const month = (localTimezone ? date.getMonth() : date.getUTCMonth()) + 1;
    const monthString = month > 9 ? `${month}` : `0${month}`;
    const day = localTimezone ? date.getDate() : date.getUTCDate();
    const dayString = day > 9 ? `${day}` : `0${day}`;
    const year = localTimezone ? date.getFullYear() : date.getUTCFullYear();
    return formatters[format](`${year}`, monthString, dayString);
};
exports.replaceAt = (value, index, newValue) => {
    return value.substr(0, index) + newValue + value.substr(index, +value.length);
};
exports.getLocalWeekdays = (locale) => {
    const date = new Date();
    const dayNames = [];
    date.setDate(date.getDate() - date.getDay());
    for (let day = 0; day < Common_1.weekLength; day++) {
        dayNames.push(date.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase());
        date.setDate(date.getDate() + 1);
    }
    return dayNames;
};
exports.getLocalMonths = (locale) => {
    const date = new Date();
    const monthNames = [];
    for (let month = 0; month < 12; month++) {
        date.setMonth(month);
        monthNames.push(date.toLocaleDateString(locale, { month: 'long' }));
    }
    return monthNames;
};

//# sourceMappingURL=helpers.js.map
