import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, InputProps, Elements as Attr} from '../../Attributes';
import {Calendar, CalendarAttributes} from './Calendar';
import {formatDate, placeholders} from './helpers';
import {MethodDate, dateIsValid, DateFormat, keyCode} from '../../Common';
import { ActionTriggerButton, ActionTriggerButtonAttributes } from '../ActionTrigger';
const css = classNames.bind(require('./DatePicker.module.scss'));

export interface DatePickerType {}

export interface DatePickerAttributes {
    inputContainer?: DivProps;
    input?: InputProps;
    inputIcon?: ActionTriggerButtonAttributes;
    calendar?: CalendarAttributes;
    container?: DivProps;
}

export interface DatePickerProps extends React.Props<DatePickerType> {
    /** HTML form element name */
    name: string;
    /**
     * Initial value of date picker
     *
     * The onChange callback API does not receives invalid Date UTC ISO strings
     * so we can only provide an initialValue to the DatePicker
     */
    initialValue?: Date | string;

    /** Tab index for calendar control */
    tabIndex?: number;
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

export interface DatePickerState {
    value: string;
    initialValue?: MethodDate;

    expanded?: boolean;
}

/**
 * Low level date picker control
 *
 * (Use the `DateField` control instead when making a form with standard styling)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export class DatePicker extends React.Component<DatePickerProps, Partial<DatePickerState>> {
    static defaultProps = {
        format: DateFormat.MMDDYYYY,
        tabIndex: -1,
        localTimezone: true,
        showAbove: false,
        attr: {
            container: {},
            inputContainer: {},
            input: {},
            inputIcon: {},
            calendar: {},
        }
    };

    /**
     * This variable tracks whether the user has copy pasted a value into the
     * text input. If a value is pasted into the DatePicker half of a DateTimeField,
     * tracking whether something was pasted allows the DateTimeField to set the
     * TimeInput to the pasted value. This also allows turning off regular parsing
     * if the pasted string is malformed to give the user a chance to correct it
     */
    private paste: boolean;
    private _containerRef: HTMLElement;

    oldSetState: any;

    constructor(props: DatePickerProps) {
        super(props);

        const newState = DatePicker.getInitialState(props, '');
        this.state = {
            ...newState,
            expanded: false,
        };

        this.paste = false;
    }

    /**
     * Use props.initialValue to generate a new state
     *
     * props.initialValue is used to set the hours/minutes/seconds on internal Date
     *
     * @param props DatePickerProps
     */
    static getInitialState(props: DatePickerProps, currentValue: string, currentInitialValue?: MethodDate): DatePickerState {
        const local = props.localTimezone;
        let value = currentValue;
        let initialValue: MethodDate = null;
        if (props.initialValue) {
            if (props.initialValue === 'invalid') {
                if (currentInitialValue) {
                    initialValue = MethodDate.fromString(
                        props.localTimezone,
                        currentInitialValue.dateObject.toJSON()
                    );
                }
            } else if (typeof(props.initialValue) === 'string') {
                const date = MethodDate.fromString(local, props.initialValue);
                if (date && dateIsValid(date.dateObject, local)) {
                    initialValue = date;
                    const parsed = DatePicker.parse(currentValue, props.format, props.localTimezone);
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
                        value = formatDate(date.dateObject, props.format, local);
                    }
                } else {
                    value = props.initialValue;
                }

            } else {
                if (props.initialValue) {
                    value = formatDate(
                        props.initialValue,
                        props.format,
                        local
                    );
                    if (dateIsValid(props.initialValue, local)) {
                        initialValue = MethodDate.fromDate(local, props.initialValue);
                    }
                } else {
                    initialValue = new MethodDate(local);
                }
            }
        }

        if (!initialValue || initialValue.dateObject.toString() === 'Invalid Date') {
            const today = new MethodDate(local);
            initialValue = today;
        }

        return {
            value: value,
            initialValue: initialValue,
        };
    }

    componentDidUpdate(previousProps: DatePickerProps) {
        if ((this.props.initialValue !== previousProps.initialValue 
            || this.props.localTimezone !== previousProps.localTimezone) && this.props.initialValue !== 'invalid') {
            this.setState(DatePicker.getInitialState(this.props, this.state.value, this.state.initialValue));
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.onOuterMouseEvent);
        window.addEventListener('keydown', this.onKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onOuterMouseEvent);
        window.removeEventListener('keydown', this.onKeydown);
    }

    static parse(newValue: string, format: DateFormat, localTimezone: boolean) {
        let valid = true;

        let split = newValue.split('/');
        if (split.length !== 3) {
            valid = false;
            while (split.length < 3) {
                split.push('-1');
            }
        }

        let year, month, date;
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

    onChange = (event) => {
        let newValue: string = event.target.value;
        if (newValue === '') {
            this.paste = false;
        }
        if (this.paste) {
            const date = MethodDate.fromString(this.props.localTimezone, newValue);
            if (date) {
                newValue = formatDate(date.dateObject, this.props.format, this.props.localTimezone);
                this.paste = false;
                if (this.props.onPaste) {
                    this.props.onPaste(date.dateObject.toJSON());
                } else {
                    this.props.onChange(date.dateObject.toJSON());
                }
            } else {
                this.props.onChange('invalid');
                this.setState({value: newValue});
            }
        } else {
            let result = DatePicker.parse(newValue, this.props.format, this.props.localTimezone);
            if (result.valid) {
                const initialValue = this.state.initialValue;
                const dateValue = new MethodDate(
                    this.props.localTimezone,
                    result.year,
                    result.month - 1,
                    result.date,
                    initialValue.hours,
                    initialValue.minutes,
                    initialValue.seconds
                );
                /**
                 * Using the MethodDate/Date constructor forces years to be
                 * at least 100 but we have to support any year > 0
                 */
                if (result.year < 100) {
                    if (this.props.localTimezone) {
                        dateValue.dateObject.setFullYear(result.year, result.month - 1, result.date);
                    } else {
                        dateValue.dateObject.setUTCFullYear(result.year, result.month - 1, result.date);
                    }
                }

                this.props.onChange(dateValue.dateObject.toJSON());
            } else {
                this.props.onChange(newValue === '' ? newValue : 'invalid');
                this.setState({value: newValue});
            }
        }
        if (newValue.length === 0) {
            this.paste = false;
        }
    }

    onExpand = () => {
        const nextExpanded = !this.state.expanded;

        this.setState({expanded: nextExpanded});

        if (typeof this.props.onExpand === 'function') {
            this.props.onExpand(nextExpanded);
        }
    }

    onSelect = (newValue: Date) => {
        this.setState({expanded: false});
        this.props.onChange(newValue.toJSON());
    }

    onPaste = () => {
        this.paste = true;
    }

    onOuterMouseEvent = (e: MouseEvent) => {
        if (this.state.expanded && !this._containerRef.contains(e.target as HTMLElement)) {
            this.setState({expanded: false});
        }
    }

    onKeydown = (e: KeyboardEvent) => {
        if (this.state.expanded && e.keyCode === keyCode.escape) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({expanded: false});
        }
    }

    onBlur = (e: React.FocusEvent<any>) => {
        if (e.relatedTarget && !this._containerRef.contains(e.relatedTarget as HTMLElement)) {
            this.setState({expanded: false});
        }
    }

    setContainerRef = (element: HTMLElement) => {
        this._containerRef = element;
    }

    render() {

        const placeholder = placeholders[this.props.format];

        const parsed = DatePicker.parse(this.state.value, this.props.format, this.props.localTimezone);
        const inputClassName = css('date-picker-input', {
            'error': !!this.props.error || (
                !parsed.valid && !!this.props.initialValue
            )
        });
        const value = parsed.valid
            ? new MethodDate(
                this.props.localTimezone,
                parsed.year,
                parsed.month - 1,
                parsed.date
            ).dateObject.toJSON() : null;

        return (
            <Attr.div
                methodRef={this.setContainerRef}
                className={css('date-picker-container', this.props.className)}
                attr={this.props.attr?.container}
                onBlur={this.onBlur}
            >
                <Attr.div
                    className={css('date-picker-input-container')}
                    attr={this.props.attr?.inputContainer}
                >
                    <Attr.input
                        type='text'
                        name={this.props.name}
                        value={this.state.value}
                        className={inputClassName}
                        placeholder={placeholder}
                        onChange={this.onChange}
                        onPaste={this.onPaste}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        attr={this.props.attr?.input}
                    />
                    <ActionTriggerButton
                        icon='calendar'
                        className={css('date-picker-calendar-icon')}
                        onClick={this.onExpand}
                        disabled={this.props.disabled}
                        attr={this.props.attr?.inputIcon}
                        aria-haspopup={true}
                        aria-expanded={this.state.expanded}
                    />
                </Attr.div>
                {this.state.expanded &&
                    <Attr.div
                        className={css('date-picker-dropdown', {
                            'above': this.props.showAbove
                        })}
                    >
                        <Calendar
                            value={value}
                            onChange={this.onSelect}
                            className={css('date-picker-calendar')}
                            year={parsed.year || null}
                            month={parsed.month - 1}
                            localTimezone={this.props.localTimezone}
                            locale={this.props.locale}
                            attr={this.props.attr?.calendar}
                        />
                        <div className={css('date-picker-dropdown-triangle')}></div>
                    </Attr.div>
                }
            </Attr.div>
        );
    }
}

export default DatePicker;
