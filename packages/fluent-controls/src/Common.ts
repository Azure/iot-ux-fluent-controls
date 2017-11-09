import * as React from 'react';

export type MethodNode = React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;

export enum DateFormat {
    MMDDYYYY = 0,
    DDMMYYYY,
    YYYYMMDD
}

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

export const keyCode: KeyCode = {
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
    slash: 47,
    comma: 188,
    period: 190,
    dash: 189,
    /** Firefox uses a different keycode for dashes (-) than other browsers... */
    firefoxDash: 173
};

export interface KeyCode {
    backspace: number;
    tab: number;
    enter: number;
    shift: number;
    ctrl: number;
    alt: number;
    escape: number;
    space: number;
    left: number;
    up: number;
    right: number;
    down: number;
    pageup: number;
    pagedown: number;
    end: number;
    home: number;
    num0: number;
    num9: number;
    slash: number;
    period: number;
    comma: number;
    dash: number;
    firefoxDash: number;
}

export const weekLength: number = 7;

export const hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
};

export const dateIsValid = (date: Date, localTimezone: boolean) => {
    if (!date || date.toUTCString() === 'Invalid Date') {
        return false;
    }
    const year =  localTimezone ? date.getFullYear() : date.getUTCFullYear();
    const month = localTimezone ? date.getMonth()    : date.getUTCMonth();
    const day =   localTimezone ? date.getDate()     : date.getUTCDate();
    return (
        !isNaN(year) && !isNaN(month) && !isNaN(day) &&
        year > 0 && month >= 0 && month < 12 &&
        day > 0 && day < 32
    );
};

export class MethodDate {
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
            this.dateObject = new Date();
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

    static fromString(localTimezone: boolean, dateString: string): MethodDate {
        const date = new Date(dateString);
        if (date.toUTCString() === 'Invalid Date') {
            return null;
        }
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
            this.dateObject.toUTCString()
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
}

export type SortDirection = null | 'ascending' | 'descending';

export interface GridColumn<T> {
    /** Label for this column */
    label: MethodNode;
    /** Function mapping the row type T to a value to display for this column */
    mapColumn: ((row: T) => MethodNode) | keyof T;
    /** Callback for when the column is sorted in ascending order */
    onAscending?: () => void;
    /** Callback for when the column is sorted in descending order */
    onDescending?: () => void;
    /** Direction to sort when the column is first clicked */
    defaultDirection?: SortDirection;
    /**
     * Width style to set on column div
     * 
     * If a number is provided, it is used as a pixel value for 'flex-basis'
     * 
     * If a string is provided, it is used as the value for 'flex'
     */
    width?: number;
}

export const autoFocusRef = (e: HTMLElement) => {
    if (e) {
        e.focus();
    }
};
