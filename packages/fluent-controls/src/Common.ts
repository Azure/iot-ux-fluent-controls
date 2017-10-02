import * as React from 'react';
import {MethodDate as MDate} from './components/DateTime/helpers';

export type MethodNode = React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;

export interface LabelOption {
    /** Text label to show */
    label: MethodNode;
    /** Label be hidden */
    hidden?: boolean;
    /** Label be disabled */
    disabled?: boolean;
}

export interface FormOption extends LabelOption {
    /** Value of select box option */
    value: any;
}

export interface LinkOption extends LabelOption {
    /** Anchor href */
    href: string;
    /** Anchor onclick */
    onClick?: (event) => void;
    /** Accessibility title */
    title?: string;
}

export interface PivotOption extends LinkOption {
    /** Pivot item icon */
    icon?: string;
    /** Pivot key (used for selecting active Pivot) */
    key: string;
}

export const keyCode = {
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
    pageup:   33,
    pagedown: 34,
    end:      35,
    home:     36,
};

export const hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
};

export const dateIsValid = (date: Date, localTimezone: boolean) => {
    const year =  localTimezone ? date.getFullYear() : date.getUTCFullYear();
    const month = localTimezone ? date.getMonth()    : date.getUTCMonth();
    const day =   localTimezone ? date.getDate()     : date.getUTCDate();
    return (
        !isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year > 0 && month >= 0 && month < 12 &&
        day > 0 && day < 32
    );
};

export class MethodDate implements Date {
    public localTimezone: boolean;
    public dateObject: Date;

    constructor(localTimezone: boolean, year?: number, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number) {
        /** If localTimezone is null, new defaults to new Date()'s value with local timezone */
        localTimezone = localTimezone === null || typeof(localTimezone) === 'undefined'
            ? true : localTimezone;
        
        if (typeof(year) === 'number') {
            if (typeof(month) === 'number') {
                if (localTimezone) {
                    this.dateObject = new Date(year, month, date, hours, minutes, seconds);
                } else {
                    this.dateObject = new Date(Date.UTC(year, month, date, hours, minutes, seconds));
                }
            } else {
                this.dateObject = new Date(year);
            }
        } else {
            const today = new Date();
            year =    localTimezone ? today.getFullYear() : today.getUTCFullYear();
            month =   localTimezone ? today.getMonth()    : today.getUTCMonth();
            date =    localTimezone ? today.getDate()     : today.getUTCDate();
            hours =   localTimezone ? today.getHours()    : today.getUTCHours();
            minutes = localTimezone ? today.getMinutes()  : today.getUTCMinutes();
            seconds = localTimezone ? today.getSeconds()  : today.getUTCSeconds();

            if (localTimezone) {
                this.dateObject = new Date(year, month, date, hours, minutes, seconds);
            } else {
                this.dateObject = new Date(Date.UTC(year, month, date, hours, minutes, seconds));
            }
        }

        this.localTimezone = localTimezone;
    }

    static fromDate(localTimezone: boolean, date: Date): MethodDate {
        date = date || new Date();
        return new MethodDate(
            localTimezone,
            localTimezone ? date.getFullYear() : date.getUTCFullYear(),
            localTimezone ? date.getMonth()    : date.getUTCMonth(),
            localTimezone ? date.getDate()     : date.getUTCDate(),
            localTimezone ? date.getHours()    : date.getUTCHours(),
            localTimezone ? date.getMinutes()  : date.getUTCMinutes(),
            localTimezone ? date.getSeconds()  : date.getUTCSeconds(),
        );
    }

    static fromString(localTimezone: boolean, dateString: string) {
        const date = new Date(dateString);
        return new MethodDate(
            localTimezone,
            localTimezone ? date.getFullYear() : date.getUTCFullYear(),
            localTimezone ? date.getMonth()    : date.getUTCMonth(),
            localTimezone ? date.getDate()     : date.getUTCDate(),
            localTimezone ? date.getHours()    : date.getUTCHours(),
            localTimezone ? date.getMinutes()  : date.getUTCMinutes(),
            localTimezone ? date.getSeconds()  : date.getUTCSeconds(),
        );
    }

    isBefore(date: MethodDate) {
        return this.dateObject <= date.dateObject;
    }

    copy(): MethodDate {
        return MethodDate.fromString(
            this.localTimezone,
            this.toUTCString()
        );
    }

    toDate(localTimezone: boolean = null): Date {
        if (localTimezone === null) {
            localTimezone = true;   
        }

        if (localTimezone) {
            return new Date(
                this.year, this.month, this.date, this.hours, this.minutes, this.seconds
            );
        } else {
            return new Date(Date.UTC(
                this.year, this.month, this.date, this.hours, this.minutes, this.seconds
            ));
        }
    }

    isValid() {
        dateIsValid(this.dateObject, this.localTimezone);
    }

    get year(): number {
        return this.localTimezone
            ? this.dateObject.getFullYear()
            : this.dateObject.getUTCFullYear();
    }

    set year(value: number) {
        if (this.localTimezone) {
            this.dateObject.setFullYear(value);
        } else {
            this.dateObject.setUTCFullYear(value);
        }
    }

    get month(): number {
        return this.localTimezone
            ? this.dateObject.getMonth()
            : this.dateObject.getUTCMonth();
    }

    set month(value: number) {
        if (this.localTimezone) {
            this.dateObject.setMonth(value);
        } else {
            this.dateObject.setUTCMonth(value);
        }
    }

    get date(): number {
        return this.localTimezone
            ? this.dateObject.getDate()
            : this.dateObject.getUTCDate();
    }

    set date(value: number) {
        if (this.localTimezone) {
            this.dateObject.setDate(value);
        } else {
            this.dateObject.setUTCDate(value);
        }
    }

    get hours(): number {
        return this.localTimezone
            ? this.dateObject.getHours()
            : this.dateObject.getUTCHours();
    }

    set hours(value: number) {
        if (this.localTimezone) {
            this.dateObject.setHours(value);
        } else {
            this.dateObject.setUTCHours(value);
        }
    }

    get minutes(): number {
        return this.localTimezone
            ? this.dateObject.getMinutes()
            : this.dateObject.getUTCMinutes();
    }

    set minutes(value: number) {
        if (this.localTimezone) {
            this.dateObject.setMinutes(value);
        } else {
            this.dateObject.setUTCMinutes(value);
        }
    }

    get seconds(): number {
        return this.localTimezone
            ? this.dateObject.getSeconds()
            : this.dateObject.getUTCSeconds();
    }

    set seconds(value: number) {
        if (this.localTimezone) {
            this.dateObject.setSeconds(value);
        } else {
            this.dateObject.setUTCSeconds(value);
        }
    }

    get milliseconds(): number {
        return this.localTimezone
            ? this.dateObject.getMilliseconds()
            : this.dateObject.getUTCMilliseconds();
    }

    set milliseconds(value: number) {
        if (this.localTimezone) {
            this.dateObject.setMilliseconds(value);
        } else {
            this.dateObject.setUTCMilliseconds(value);
        }
    }

    /** Returns a string representation of a date. The format of the string depends on the locale. */
    toString(): string {
        return this.dateObject.toString();
    }

    /** Returns a date as a string value. */
    toDateString(): string {
        return this.dateObject.toDateString();
    }

    /** Returns a time as a string value. */
    toTimeString(): string {
        return this.dateObject.toTimeString();
    }

    /** Returns a value as a string value appropriate to the host environment's current locale. */
    toLocaleString(): string {
        return this.dateObject.toLocaleString();
    }

    /** Returns a date as a string value appropriate to the host environment's current locale. */
    toLocaleDateString(): string {
        return this.dateObject.toLocaleDateString();
    }

    /** Returns a time as a string value appropriate to the host environment's current locale. */
    toLocaleTimeString(): string {
        return this.dateObject.toLocaleTimeString();
    }

    /** Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. */
    valueOf(): number {
        return this.dateObject.valueOf();
    }

    /** Gets the time value in milliseconds. */
    getTime(): number {
        return this.dateObject.getTime();
    }

    /** Gets the year, using local time. */
    getFullYear(): number {
        return this.dateObject.getFullYear();
    }

    /** Gets the year using Universal Coordinated Time (UTC). */
    getUTCFullYear(): number {
        return this.dateObject.getUTCFullYear();
    }

    /** Gets the month, using local time. */
    getMonth(): number {
        return this.dateObject.getMonth();
    }

    /** Gets the month of a Date object using Universal Coordinated Time (UTC). */
    getUTCMonth(): number {
        return this.dateObject.getUTCMonth();
    }

    /** Gets the day-of-the-month, using local time. */
    getDate(): number {
        return this.dateObject.getDate();
    }

    /** Gets the day-of-the-month, using Universal Coordinated Time (UTC). */
    getUTCDate(): number {
        return this.dateObject.getUTCDate();
    }

    /** Gets the day of the week, using local time. */
    getDay(): number {
        return this.dateObject.getDay();
    }

    /** Gets the day of the week using Universal Coordinated Time (UTC). */
    getUTCDay(): number {
        return this.dateObject.getUTCDay();
    }

    /** Gets the hours in a date, using local time. */
    getHours(): number {
        return this.dateObject.getHours();
    }

    /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
    getUTCHours(): number {
        return this.dateObject.getUTCHours();
    }

    /** Gets the minutes of a Date object, using local time. */
    getMinutes(): number {
        return this.dateObject.getMinutes();
    }

    /** Gets the minutes of a Date object using Universal Coordinated Time (UTC). */
    getUTCMinutes(): number {
        return this.dateObject.getUTCMinutes();
    }

    /** Gets the seconds of a Date object, using local time. */
    getSeconds(): number {
        return this.dateObject.getSeconds();
    }

    /** Gets the seconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCSeconds(): number {
        return this.dateObject.getUTCSeconds();
    }

    /** Gets the milliseconds of a Date, using local time. */
    getMilliseconds(): number {
        return this.dateObject.getMilliseconds();
    }

    /** Gets the milliseconds of a Date object using Universal Coordinated Time (UTC). */
    getUTCMilliseconds(): number {
        return this.dateObject.getUTCMilliseconds();
    }

    /** Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). */
    getTimezoneOffset(): number {
        return this.dateObject.getTimezoneOffset();
    }

    /**
      * Sets the date and time value in the Date object.
      * @param time A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT.
      */
    setTime(time: number): number {
        return this.dateObject.setTime(time);
    }
    /**
      * Sets the milliseconds value in the Date object using local time.
      * @param ms A numeric value equal to the millisecond value.
      */
    setMilliseconds(ms: number): number {
        return this.dateObject.setMilliseconds(ms);
    }
    /**
      * Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).
      * @param ms A numeric value equal to the millisecond value.
      */
    setUTCMilliseconds(ms: number): number {
        return this.dateObject.setUTCMilliseconds(ms);
    }

    /**
      * Sets the seconds value in the Date object using local time.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setSeconds(sec: number, ms?: number): number {
        return this.dateObject.setSeconds(sec, ms);
    }
    /**
      * Sets the seconds value in the Date object using Universal Coordinated Time (UTC).
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCSeconds(sec: number, ms?: number): number {
        return this.dateObject.setUTCSeconds(sec, ms);
    }
    /**
      * Sets the minutes value in the Date object using local time.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setMinutes(min: number, sec?: number, ms?: number): number {
        return this.dateObject.setMinutes(min, sec, ms);
    }
    /**
      * Sets the minutes value in the Date object using Universal Coordinated Time (UTC).
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCMinutes(min: number, sec?: number, ms?: number): number {
        return this.dateObject.setUTCMinutes(min, sec, ms);
    }
    /**
      * Sets the hour value in the Date object using local time.
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setHours(hours: number, min?: number, sec?: number, ms?: number): number {
        return this.dateObject.setHours(hours, min, sec, ms);
    }
    /**
      * Sets the hours value in the Date object using Universal Coordinated Time (UTC).
      * @param hours A numeric value equal to the hours value.
      * @param min A numeric value equal to the minutes value.
      * @param sec A numeric value equal to the seconds value.
      * @param ms A numeric value equal to the milliseconds value.
      */
    setUTCHours(hours: number, min?: number, sec?: number, ms?: number): number {
        return this.dateObject.setUTCHours(hours, min, sec, ms);
    }
    /**
      * Sets the numeric day-of-the-month value of the Date object using local time.
      * @param date A numeric value equal to the day of the month.
      */
    setDate(date: number): number {
        return this.dateObject.setDate(date);
    }
    /**
      * Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).
      * @param date A numeric value equal to the day of the month.
      */
    setUTCDate(date: number): number {
        return this.dateObject.setUTCDate(date);
    }
    /**
      * Sets the month value in the Date object using local time.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used.
      */
    setMonth(month: number, date?: number): number {
        return this.dateObject.setMonth(month, date);
    }
    /**
      * Sets the month value in the Date object using Universal Coordinated Time (UTC).
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
      * @param date A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used.
      */
    setUTCMonth(month: number, date?: number): number {
        return this.dateObject.setUTCMonth(month, date);
    }
    /**
      * Sets the year of the Date object using local time.
      * @param year A numeric value for the year.
      * @param month A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified.
      * @param date A numeric value equal for the day of the month.
      */
    setFullYear(year: number, month?: number, date?: number): number {
        return this.dateObject.setFullYear(year, month, date);
    }
    /**
      * Sets the year value in the Date object using Universal Coordinated Time (UTC).
      * @param year A numeric value equal to the year.
      * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied.
      * @param date A numeric value equal to the day of the month.
      */
    setUTCFullYear(year: number, month?: number, date?: number): number {
        return this.dateObject.setUTCFullYear(year, month, date);
    }
    /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
    toUTCString(): string {
        return this.dateObject.toUTCString();
    }
    /** Returns a date as a string value in ISO format. */
    toISOString(): string {
        return this.dateObject.toISOString();
    }
    /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. */
    toJSON(key?: any): string {
        return this.dateObject.toJSON(key);
    }

    getVarDate(): VarDate {
        return this.dateObject.getVarDate();
    }
}
