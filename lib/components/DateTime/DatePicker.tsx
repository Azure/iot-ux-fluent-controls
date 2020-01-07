import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, InputProps, Elements as Attr} from '../../Attributes';
import {Calendar, CalendarAttributes} from './Calendar';
import {formatDate, placeholders} from './helpers';
import {MethodDate, dateIsValid, DateFormat, keyCode} from '../../Common';
import { ActionTriggerButton, ActionTriggerButtonAttributes } from '../ActionTrigger';
const css = classNames.bind(require('./DatePicker.module.scss'));

export interface DatePickerAttributes {
    inputContainer?: DivProps;
    input?: InputProps;
    inputIcon?: ActionTriggerButtonAttributes;
    calendar?: CalendarAttributes;
    container?: DivProps;
}

export interface DatePickerProps {
    /** HTML form element name */
    name: string;
    /**
     * Initial value of date picker
     *
     * The onChange callback API does not receives invalid Date UTC ISO strings
     * so we can only provide an initialValue to the DatePicker
     */
    initialValue?: Date | string;

    /** Apply error styling to input element */
    error?: boolean;
    /** Add required attribute to HTML input element */
    required?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /**
     * Display the date in local timezone instead of GMT
     *
     * Default: true
     */
    localTimezone?: boolean;

    /** i18n locale */
    locale?: string;
    /**
     * Show Calendar below date picker input
     */
    showAbove?: boolean;

    /** Date format in text input */
    format?: DateFormat;

    /**
     * Callback for HTML input element `onChange` events
     *
     * When the user enters a valid date, onChange receives a UTC ISO string.
     *
     * When the string value in the text input is not a valid date, onChange
     * receives the string "invalid"
     */
    onChange: (newValue: string) => void;
    /**
     * Callback for paste events
     *
     * When the user pastes a valid date, onPaste receives a UTC ISO string.
     */
    onPaste?: (newValue: string) => void;

    /**
     * callback for clicking the calendar icon.
     */
    onExpand?: (expanded: boolean) => void;

    /** Class to append to top level element */
    className?: string;

    attr?: DatePickerAttributes;
}

/**
 * Low level date picker control
 *
 * (Use the `DateField` control instead when making a form with standard styling)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export const DatePicker = React.memo((props: DatePickerProps) => {
    const format = props.format ?? DateFormat.MMDDYYYY;
    const localTimezone = props.localTimezone ?? true;
    const [inputValue, setInputValue] = React.useState();

    const lastValidDate = React.useRef<Date>();
    const currentValue = React.useMemo<string>(() => {
        let currentValue = inputValue ?? '';

        if (props.initialValue && props.initialValue !== 'invalid') {
            if (typeof(props.initialValue) === 'string') {
                const date = MethodDate.fromString(localTimezone, props.initialValue);
                if (date && dateIsValid(date.dateObject, localTimezone)) {
                    const parsed = parse(currentValue, format, localTimezone);
                    if (
                        date.year !== parsed.year ||
                        date.month !== (parsed.month - 1) ||
                        date.date !== parsed.date ||
                        !parsed.valid
                    ) {
                        /**
                         * Here we use props.initialValue to set the value of the text box
                         *
                         * This happens if state.value is different from the new initialValue
                         * or if the text input (state.value) is in an invalid state such as
                         * empty values or invalid dates like febuary 30th (2/30/2017)
                         */
                        currentValue = formatDate(date.dateObject, props.format, localTimezone);
                    }
                } else {
                    currentValue = props.initialValue;
                }
            } else {
                currentValue = formatDate(
                    props.initialValue,
                    props.format,
                    localTimezone
                );
            } 
        }

        return currentValue;
    }, [inputValue, localTimezone, props.initialValue, format]);

    if (props.initialValue !== 'invalid') {
        lastValidDate.current = new Date(props.initialValue);
    }

    /**
     * This variable tracks whether the user has copy pasted a value into the
     * text input. If a value is pasted into the DatePicker half of a DateTimeField,
     * tracking whether something was pasted allows the DateTimeField to set the
     * TimeInput to the pasted value. This also allows turning off regular parsing
     * if the pasted string is malformed to give the user a chance to correct it
     */
    const pasteRef = React.useRef<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>();
    const inputRef = React.useRef<HTMLInputElement>();
    const [expanded, setExpanded] = React.useState(false);
    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue: string = event.target.value;
        if (newValue === '') {
            pasteRef.current = false;
        }
        if (pasteRef.current) {
            const date = MethodDate.fromString(localTimezone, newValue);
            if (date) {
                newValue = formatDate(date.dateObject, format, localTimezone);
                pasteRef.current = false;
                if (props.onPaste) {
                    props.onPaste(date.dateObject.toJSON());
                } else {
                    props.onChange(date.dateObject.toJSON());
                }
            } else {
                props.onChange('invalid');
                setInputValue(newValue);
            }
        } else {
            const result = parse(newValue, format, localTimezone);
            if (result.valid) {
                const dateValue = new MethodDate(
                    localTimezone,
                    result.year,
                    result.month - 1,
                    result.date,
                    lastValidDate.current.getHours(),
                    lastValidDate.current.getMinutes(),
                    lastValidDate.current.getSeconds()
                );
                /**
                 * Using the MethodDate/Date constructor forces years to be
                 * at least 100 but we have to support any year > 0
                 */
                if (result.year < 100) {
                    if (localTimezone) {
                        dateValue.dateObject.setFullYear(result.year, result.month - 1, result.date);
                    } else {
                        dateValue.dateObject.setUTCFullYear(result.year, result.month - 1, result.date);
                    }
                }

                props.onChange(dateValue.dateObject.toJSON());
            } else {
                props.onChange(newValue === '' ? newValue : 'invalid');
                setInputValue(newValue);
            }
        }
        if (newValue.length === 0) {
            pasteRef.current = false;
        }
    }, [format, localTimezone, props.onChange, props.onPaste, currentValue]);

    const onBlur = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget && !containerRef.current.contains(e.relatedTarget as HTMLElement)) {
            setExpanded(false);
        }
    }, [setExpanded]);

    const onExpand = React.useCallback(() => {
        let nextExpanded: boolean;

        setExpanded(exp => {
            nextExpanded = !exp;
            return nextExpanded;
        });

        if (typeof props.onExpand === 'function') {
            props.onExpand(nextExpanded);
        }
    }, [props.onExpand, setExpanded]);

    const onSelect = React.useCallback((newValue: Date) => {
        setExpanded(false);
        props.onChange(newValue.toJSON());
    }, [props.onChange, setExpanded]);

    const onOuterMouseEvent = React.useCallback((e: MouseEvent) => {
        setExpanded(exp => {
            if (exp && !containerRef.current.contains(e.target as HTMLElement)) {
                return false;
            }
            return exp;
        });
    }, [setExpanded]);

    const onKeydown = React.useCallback((e: KeyboardEvent) => {
        if (expanded && e.keyCode === keyCode.escape) {
            e.preventDefault();
            e.stopPropagation();
            setExpanded(false);
        }
    }, [expanded, setExpanded]);

    const onPaste = React.useCallback(() => {
        pasteRef.current = true;
    }, []);

    React.useEffect(() => {
        window.addEventListener('click', onOuterMouseEvent);
        window.addEventListener('keydown', onKeydown);

        return () => {
            window.removeEventListener('click', onOuterMouseEvent);
            window.removeEventListener('keydown', onKeydown);
        };
    }, []);

    const placeholder = placeholders[format];
    const parsed = parse(currentValue, format, localTimezone);
    const inputClassName = css('date-picker-input', {
        'error': !!props.error || (!parsed.valid && !!currentValue)
    });

    const value = parsed.valid
        ? new MethodDate(
            localTimezone,
            parsed.year,
            parsed.month - 1,
            parsed.date
        ).dateObject.toJSON() : null;

    return (
        <Attr.div
            methodRef={containerRef}
            className={css('date-picker-container', props.className)}
            attr={props.attr?.container}
            onBlur={onBlur}>
            <Attr.div
                className={css('date-picker-input-container')}
                attr={props.attr?.inputContainer}>
                <Attr.input
                    type='text'
                    name={props.name}
                    value={currentValue}
                    className={inputClassName}
                    placeholder={placeholder}
                    onChange={onChange}
                    onPaste={onPaste}
                    required={props.required}
                    disabled={props.disabled}
                    methodRef={inputRef}
                    attr={props.attr?.input} />
                <ActionTriggerButton
                    icon='calendar'
                    className={css('date-picker-calendar-icon')}
                    onClick={onExpand}
                    disabled={props.disabled}
                    attr={props.attr?.inputIcon}
                    aria-haspopup={true}
                    aria-expanded={expanded} />
            </Attr.div>
            {expanded &&
                <Attr.div
                    className={css('date-picker-dropdown', {
                        'above': props.showAbove
                    })}>
                    <Calendar
                        value={value}
                        onChange={onSelect}
                        className={css('date-picker-calendar')}
                        year={parsed.year || null}
                        month={parsed.month - 1}
                        localTimezone={localTimezone}
                        locale={props.locale}
                        attr={props.attr?.calendar}
                    />
                    <div className={css('date-picker-dropdown-triangle')}></div>
                </Attr.div>
            }
        </Attr.div>
    );
});

function parse(newValue: string, format: DateFormat, localTimezone) {
    let valid = true;

    let split = newValue.split('/');
    if (split.length !== 3) {
        valid = false;
        while (split.length < 3) {
            split.push('-1');
        }
    }

    let year: number, month: number, date: number;
    if (format === DateFormat.DDMMYYYY) {
        year = parseInt(split[2]);
        month = parseInt(split[1]);
        date = parseInt(split[0]);
    }
    else if (format === DateFormat.MMDDYYYY) {
        year = parseInt(split[2]);
        month = parseInt(split[0]);
        date = parseInt(split[1]);
    }
    else if (format === DateFormat.YYYYMMDD) {
        year = parseInt(split[0]);
        month = parseInt(split[1]);
        date = parseInt(split[2]);
    }

    /**
     * If you set Date.year to a number below 100, it assumes that you're
     * supplying a 2 digit year instead of 4 digits, turning 20 into 2020 etc
     */
    if (isNaN(year) || year < 100) {
        valid = false;
    }
    if (isNaN(month) || month < 1 || month > 12) {
        valid = false;
    }
    if (isNaN(date) || date < 1 || date > 31) {
        valid = false;
    }

    if (valid) {
        let parsed = new MethodDate(
            localTimezone,
            year,
            month - 1,
            date
        );
        if (month !== parsed.month + 1 || date !== parsed.date) {
            valid = false;
        }
    }
    return { year, month, date, valid };
}

export default DatePicker;
