import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MethodNode, dateIsValid, DateFormat } from '../../Common';
import { FormField, FormFieldAttributes } from '../Field/FormField';
/** This import solves an error with exports of FormFieldAttributes defaults */
import { TimeInput, TimeInputAttributes } from './TimeInput';
import { DatePicker, DatePickerAttributes } from './DatePicker';
import { DivProps, SpanProps, Elements as Attr } from '../../Attributes';
const css = classNames.bind(require('./DateTimeField.module.scss'));

export interface DateTimeFieldAttributes {
    datePicker?: DatePickerAttributes;
    timeInput?: TimeInputAttributes;
    flexContainer?: DivProps;
    dateColumn?: SpanProps;
    timeColumn?: SpanProps;
}

export interface DateTimeFieldProps {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue: string | Date;

    /** Label to display above input element */
    label?: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;
    /** Date format in text input */
    format?: DateFormat;
    /** Label for "AM" select option */
    amLabel?: string;
    /** Label for "PM" select option */
    pmLabel?: string;

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
    /** Display the seconds dropdown */
    showSeconds?: boolean;
    /** Use 24 hour clock */
    militaryTime?: boolean;
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    /** Set error field to display: none */
    hideError?: boolean;
    /** Tooltip text to display in info icon bubble */
    tooltip?: MethodNode;
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;
    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of DatePicker and TimeInput */
    inputClassName?: string;

    /**
     * callback for clicking calendar icon
     */
    onExpand?: (expanded: boolean) => void;

    /** React node to render at the far side of the label. */
    labelFarSide?: React.ReactNode;

    attr?: DateTimeFieldAttributes & FormFieldAttributes;
}

/**
 * High level date time field
 *
 * @param props Control properties (defined in `DateTimeFieldProps` interface)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export const DateTimeField = React.memo((props: DateTimeFieldProps) => {
    const localTimezone = props.localTimezone ?? true;

    const lastValidDateRef = React.useRef<Date>();
    const currentDate = React.useMemo(() => {
        let invalid = false;
        let initialDate = null;

        if (props.initialValue || props.initialValue === '') {
            const date = props.initialValue 
                ? new Date(props.initialValue)
                : new Date();

            let hours: number, minutes: number, seconds: number;
            if (props.initialValue) {
                if (localTimezone) {
                    hours = date.getHours();
                    minutes = date.getMinutes();
                    seconds = date.getSeconds();
                } else {
                    hours = date.getUTCHours();
                    minutes = date.getUTCMinutes();
                    seconds = date.getUTCSeconds();
                }
            } else {
                hours = minutes = seconds = 0;
            }

            if (dateIsValid(date, localTimezone)) {
                /**
                 * This is where DateTimeField receives an initial Date value
                 * so this is where localTimezone/GMT have to be handled.
                 *
                 * Calling new Date(Date.UTC(year, month, date, ...)) creates
                 * a Date object that looks like the local timezone but actually
                 * represents a time in GMT
                 */
                initialDate = localTimezone
                    ? new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        hours,
                        minutes,
                        seconds)
                    : new Date(Date.UTC(
                        date.getUTCFullYear(),
                        date.getUTCMonth(),
                        date.getUTCDate(),
                        hours,
                        minutes,
                        seconds
                    ));
            } else {
                invalid = true;
            }
        }

        return invalid ? props.initialValue : initialDate.toJSON();
    }, [props.initialValue, localTimezone]);

    if (currentDate !== 'invalid') {
        lastValidDateRef.current = currentDate;
    }

    const onDatePaste = React.useCallback((newDate: string): boolean => {
        const date = new Date(newDate);
        if (dateIsValid(date, localTimezone)) {
            const utcDate = date.toJSON();
            props.onChange(utcDate);
            return false;
        }

        props.onChange('invalid');
        return true;
    }, [localTimezone, props.onChange]);

    const onChange = React.useCallback((newDate: string | Date): Date => {
        if (newDate === '') {
            props.onChange(newDate);
            return null;
        }

        if (newDate === 'invalid' || !newDate) {
            props.onChange('invalid');
            return null;
        }

        const date = new Date(newDate);
        const newValue = localTimezone
            ? date
            : new Date(Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds()
            ));

        const utcValue = newValue.toJSON();
        if (utcValue === 'Invalid Date') {
            props.onChange('invalid');
        } else {
            props.onChange(utcValue);
        }
    }, [props.onChange]);

    const tooltipId = (!!props.tooltip) ? `${props.name}-tt` : undefined;
    const errorId = `${props.name}-error`;
    let describedby = errorId;
    if (tooltipId) {
        describedby += ' ' + tooltipId;
    }
    const dateAttr: DatePickerAttributes = {
        input: Object.assign({
            'aria-describedby': describedby
        }, props.attr?.datePicker?.input),
        inputContainer: props.attr?.datePicker?.inputContainer,
        inputIcon: props.attr?.datePicker?.inputIcon,
        calendar: props.attr?.datePicker?.calendar
    };
    const timeAttr: TimeInputAttributes = {
        hourSelect: {
            'aria-describedby': describedby,
            ...(props.attr?.timeInput?.hourSelect || {})
        },
        minuteSelect: {
            'aria-describedby': describedby,
            ...(props.attr?.timeInput?.minuteSelect || {})
        },
        secondSelect: {
            'aria-describedby': describedby,
            ...(props.attr?.timeInput?.secondSelect || {})
        },
        periodSelect: {
            'aria-describedby': describedby,
            ...(props.attr?.timeInput?.periodSelect || {})
        },
        ...(props.attr?.timeInput || {})
    };
    const fieldAttr: FormFieldAttributes = {
        fieldLabel: Object.assign({
            balloon: {
                balloon: {
                    id: tooltipId
                }
            }
        }, props.attr?.fieldLabel),
        fieldError: Object.assign({
            id: errorId
        }, props.attr?.fieldError),
        fieldContent: props.attr?.fieldContent,
        fieldContainer: props.attr?.fieldContainer
    };

    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            hideError={props.hideError}
            className={css('datetime-field', props.className)}
            attr={fieldAttr}
            tooltip={props.tooltip}
            labelFarSide={props.labelFarSide}
            disabled={props.disabled}
        >
            <Attr.div
                className={css('field-content')}
                attr={props.attr?.flexContainer}
            >
                <Attr.span
                    className={css('field-date')}
                    attr={props.attr?.dateColumn}
                >
                    <DatePicker
                        name={props.name}
                        initialValue={currentDate}
                        error={!!props.error}
                        disabled={props.disabled}
                        locale={props.locale}
                        localTimezone={props.localTimezone}
                        showAbove={props.showAbove}
                        format={props.format ?? DateFormat.MMDDYYYY}
                        required={props.required}
                        onPaste={onDatePaste}
                        onChange={onChange}
                        onExpand={props.onExpand}
                        className={css('date-picker', props.inputClassName)}
                        attr={dateAttr}
                    />
                </Attr.span>
                <Attr.span
                    className={css('field-time')}
                    attr={props.attr?.timeColumn}
                >
                    <TimeInput
                        name={props.name}
                        value={lastValidDateRef.current}
                        amLabel={props.amLabel}
                        pmLabel={props.pmLabel}
                        localTimezone={props.localTimezone}
                        showSeconds={props.showSeconds}
                        militaryTime={props.militaryTime}
                        error={!!props.error}
                        disabled={props.disabled}
                        onChange={onChange}
                        className={css('time-picker', props.inputClassName)}
                        attr={timeAttr}
                    />
                </Attr.span>
            </Attr.div>
        </FormField>
    );
});

export default DateTimeField;
