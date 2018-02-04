"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateFormat;
(function (DateFormat) {
    DateFormat[DateFormat["MMDDYYYY"] = 0] = "MMDDYYYY";
    DateFormat[DateFormat["DDMMYYYY"] = 1] = "DDMMYYYY";
    DateFormat[DateFormat["YYYYMMDD"] = 2] = "YYYYMMDD";
})(DateFormat = exports.DateFormat || (exports.DateFormat = {}));
exports.keyCode = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    num0: 48,
    num9: 57,
    numpad0: 96,
    numpad9: 105,
    slash: 47,
    comma: 188,
    period: 190,
    dash: 189,
    /** Firefox uses a different keycode for dashes (-) than other browsers... */
    firefoxDash: 173
};
exports.weekLength = 7;
exports.hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
};
exports.dateIsValid = (date, localTimezone) => {
    if (!date || date.toUTCString() === 'Invalid Date') {
        return false;
    }
    const year = localTimezone ? date.getFullYear() : date.getUTCFullYear();
    const month = localTimezone ? date.getMonth() : date.getUTCMonth();
    const day = localTimezone ? date.getDate() : date.getUTCDate();
    return (!isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year > 0 && month >= 0 && month < 12 &&
        day > 0 && day < 32);
};
class MethodDate {
    constructor(localTimezone, year, month, date, hours = 0, minutes = 0, seconds = 0) {
        /** If localTimezone is null, new defaults to new Date()'s value with local timezone */
        localTimezone = localTimezone === null || typeof (localTimezone) === 'undefined'
            ? true : localTimezone;
        if (typeof (year) === 'number') {
            if (typeof (month) === 'number') {
                if (localTimezone) {
                    this.dateObject = new Date(year, month, date, hours, minutes, seconds);
                }
                else {
                    this.dateObject = new Date(Date.UTC(year, month, date, hours, minutes, seconds));
                }
            }
            else {
                this.dateObject = new Date(year);
            }
            this.dateObject.setFullYear(year); // Force 2 digit year to be set correctly
        }
        else {
            this.dateObject = new Date();
        }
        this.localTimezone = localTimezone;
    }
    static fromDate(localTimezone, date) {
        date = date || new Date();
        return new MethodDate(localTimezone, localTimezone ? date.getFullYear() : date.getUTCFullYear(), localTimezone ? date.getMonth() : date.getUTCMonth(), localTimezone ? date.getDate() : date.getUTCDate(), localTimezone ? date.getHours() : date.getUTCHours(), localTimezone ? date.getMinutes() : date.getUTCMinutes(), localTimezone ? date.getSeconds() : date.getUTCSeconds());
    }
    static fromString(localTimezone, dateString) {
        const date = new Date(dateString);
        if (date.toUTCString() === 'Invalid Date') {
            return null;
        }
        return new MethodDate(localTimezone, localTimezone ? date.getFullYear() : date.getUTCFullYear(), localTimezone ? date.getMonth() : date.getUTCMonth(), localTimezone ? date.getDate() : date.getUTCDate(), localTimezone ? date.getHours() : date.getUTCHours(), localTimezone ? date.getMinutes() : date.getUTCMinutes(), localTimezone ? date.getSeconds() : date.getUTCSeconds());
    }
    isBefore(date) {
        return this.dateObject <= date.dateObject;
    }
    copy() {
        return MethodDate.fromString(this.localTimezone, this.dateObject.toJSON());
    }
    toDate(localTimezone = null) {
        if (localTimezone === null) {
            localTimezone = true;
        }
        if (localTimezone) {
            return new Date(this.year, this.month, this.date, this.hours, this.minutes, this.seconds);
        }
        else {
            return new Date(Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds));
        }
    }
    isValid() {
        return exports.dateIsValid(this.dateObject, this.localTimezone);
    }
    get year() {
        return this.localTimezone
            ? this.dateObject.getFullYear()
            : this.dateObject.getUTCFullYear();
    }
    set year(value) {
        if (this.localTimezone) {
            this.dateObject.setFullYear(value);
        }
        else {
            this.dateObject.setUTCFullYear(value);
        }
    }
    get month() {
        return this.localTimezone
            ? this.dateObject.getMonth()
            : this.dateObject.getUTCMonth();
    }
    set month(value) {
        if (this.localTimezone) {
            this.dateObject.setMonth(value);
        }
        else {
            this.dateObject.setUTCMonth(value);
        }
    }
    get date() {
        return this.localTimezone
            ? this.dateObject.getDate()
            : this.dateObject.getUTCDate();
    }
    set date(value) {
        if (this.localTimezone) {
            this.dateObject.setDate(value);
        }
        else {
            this.dateObject.setUTCDate(value);
        }
    }
    get hours() {
        return this.localTimezone
            ? this.dateObject.getHours()
            : this.dateObject.getUTCHours();
    }
    set hours(value) {
        if (this.localTimezone) {
            this.dateObject.setHours(value);
        }
        else {
            this.dateObject.setUTCHours(value);
        }
    }
    get minutes() {
        return this.localTimezone
            ? this.dateObject.getMinutes()
            : this.dateObject.getUTCMinutes();
    }
    set minutes(value) {
        if (this.localTimezone) {
            this.dateObject.setMinutes(value);
        }
        else {
            this.dateObject.setUTCMinutes(value);
        }
    }
    get seconds() {
        return this.localTimezone
            ? this.dateObject.getSeconds()
            : this.dateObject.getUTCSeconds();
    }
    set seconds(value) {
        if (this.localTimezone) {
            this.dateObject.setSeconds(value);
        }
        else {
            this.dateObject.setUTCSeconds(value);
        }
    }
    get milliseconds() {
        return this.localTimezone
            ? this.dateObject.getMilliseconds()
            : this.dateObject.getUTCMilliseconds();
    }
    set milliseconds(value) {
        if (this.localTimezone) {
            this.dateObject.setMilliseconds(value);
        }
        else {
            this.dateObject.setUTCMilliseconds(value);
        }
    }
}
exports.MethodDate = MethodDate;
exports.autoFocusRef = (e) => {
    if (e) {
        e.focus();
    }
};

//# sourceMappingURL=Common.js.map
