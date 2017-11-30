import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, InputProps, Elements as Attr, mergeAttributeObjects} from '../../Attributes';
import {Calendar, CalendarAttributes} from './Calendar';
import {Icon, IconSize, IconAttributes} from '../Icon';
import {Dropdown, DropdownAttributes} from '../Dropdown';
import {replaceAt, formatDate, placeholders} from './helpers';
import {keyCode, MethodDate, dateIsValid, DateFormat} from '../../Common';
const css = classNames.bind(require('./DatePicker.scss'));

export interface DatePickerType {}

export interface DatePickerAttributes extends DropdownAttributes {
    inputContainer?: DivProps;
    input?: InputProps;
    inputIcon?: IconAttributes;
    dropdownTriangle?: DivProps;
    calendar?: CalendarAttributes;
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

    /** Class to append to top level element */
    className?: string;

    attr?: DatePickerAttributes;
}

export interface DatePickerState {
    value: string;
    initialValue?: MethodDate;

    visible?: boolean;
}

/**
 * Low level date picker control
 *
 * (Use the `DateField` control instead when making a form with standard styling)
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
            dropdownContainer: {},
            dropdown: {},
            dropdownTriangle: {},
            calendar: {},
        }
    };

    private paste: boolean;
    private calendar: Calendar;

    oldSetState: any;

    constructor(props: DatePickerProps) {
        super(props);

        const newState = this.getInitialState(props);
        this.state = {
            ...newState,
            visible: false,
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
    getInitialState(props: DatePickerProps): DatePickerState {
        const local = props.localTimezone;
        let value = '';
        let initialValue: MethodDate = null;
        if (props.initialValue) {
            if (props.initialValue === 'invalid') {
                value = '';
                if (this.state && this.state.initialValue) {
                    initialValue = MethodDate.fromString(
                        props.localTimezone,
                        this.state.initialValue.dateObject.toJSON()
                    );
                }
            } else if (typeof(props.initialValue) === 'string') {
                const date = MethodDate.fromString(local, props.initialValue);
                if (date && dateIsValid(date.dateObject, local)) {
                    initialValue = date;
                    value = formatDate(date.dateObject, props.format, local);
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

    /**
     * Update the Date/Time object used internally with a new initialValue
     *
     * @param newProps new DatePickerProps
     */
    componentWillReceiveProps(newProps: DatePickerProps) {
        if ((this.props.initialValue !== newProps.initialValue || this.props.localTimezone !== newProps.localTimezone) && newProps.initialValue !== 'invalid') {
            const newState = this.getInitialState(newProps);
            this.setState({
                ...newState,
                visible: this.state.visible,
            });
        }
    }

    /**
     * Fire props.onChange handler when state.value changes
     *
     * Fires props.onChange('invalid') if input is invalid
     */
    componentDidUpdate(oldProps: DatePickerProps, oldState: DatePickerState) {
        if (this.state.visible !== oldState.visible && !this.state.visible) {
            this.calendar.stopAccessibility();
        }
    }

    parse(newValue: string) {
        let valid = true;

        let split = newValue.split('/');
        if (split.length !== 3) {
            valid = false;
            while (split.length < 3) {
                split.push('-1');
            }
        }

        let year, month, date;
        if (this.props.format === DateFormat.DDMMYYYY) {
            year = parseInt(split[2]);
            month = parseInt(split[1]);
            date = parseInt(split[0]);
        }
        else if (this.props.format === DateFormat.MMDDYYYY) {
            year = parseInt(split[2]);
            month = parseInt(split[0]);
            date = parseInt(split[1]);
        }
        else if (this.props.format === DateFormat.YYYYMMDD) {
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
            const hasVal = !!this.state.initialValue;
            let parsed = new MethodDate(
                this.props.localTimezone,
                year, month - 1, date,
                hasVal ? this.state.initialValue.hours : 0,
                hasVal ? this.state.initialValue.minutes : 0,
                hasVal ? this.state.initialValue.seconds : 0,
            );
            if (month !== parsed.month + 1 || date !== parsed.date) {
                valid = false;
            }
        }
        return { year, month, date, valid };
    }

    onChange = (event) => {
        let newValue: string = event.target.value;
        if (this.paste) {
            const date = MethodDate.fromString(this.props.localTimezone, newValue);
            if (date) {
                newValue = formatDate(date.dateObject, this.props.format, this.props.localTimezone);
                this.paste = null;
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
            let result = this.parse(newValue);
            if (result.valid) {
                const isLocal = !!this.props.localTimezone;
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
                this.props.onChange('invalid');
                this.setState({value: newValue});
            }
        }
        if (newValue.length === 0) {
            this.paste = false;
        }
    }

    onFocus = () => {
        this.setState({visible: true});
    }

    onSelect = (newValue: Date) => {
        this.props.onChange(newValue.toJSON());
    }

    onKeyUp = (event) => {
        if (event.keyCode === keyCode.enter) {
            this.calendar.startAccessibility();
            event.preventDefault();
        }
    }

    onPaste = (event) => {
        this.paste = true;
    }

    calendarRef = (element: Calendar) => {
        this.calendar = element;
    }

    render() { 
        const containerClassName = css('date-picker-container', this.props.className);
        const inputClassName = css('date-picker-input', {'error': this.props.error});
        const dropdownClassName = css('date-picker-dropdown', {
            'date-picker-above': this.props.showAbove
        });

        const icon = <Icon
            icon='calendar'
            size={IconSize.xsmall}
            className={css('date-picker-calendar-icon')}
            attr={this.props.attr.inputIcon}
        />;

        const placeholder = placeholders[this.props.format];

        const parsed = this.parse(this.state.value);

        const calendar = [
            <Calendar
                value={
                    parsed.valid
                        ? new MethodDate(
                            this.props.localTimezone,
                            parsed.year,
                            parsed.month,
                            parsed.date
                        ).dateObject.toJSON() : null
                }
                onChange={newValue => this.onSelect(newValue)}
                className={css('date-picker-calendar')}
                year={parsed.year || null}
                month={parsed.month - 1}
                tabIndex={this.props.tabIndex}
                ref={this.calendarRef}
                key='1'
                attr={this.props.attr.calendar}
            />,
            <Attr.div
                className={css('date-picker-dropdown-triangle')}
                key='2'
                attr={this.props.attr.dropdownTriangle}
            />
        ];

        return (
            <Dropdown
                dropdown={calendar}
                visible={this.state.visible}
                className={containerClassName}
                positionClassNames={[
                    css('date-picker-dropdown'),
                    css('date-picker-dropdown', 'date-picker-above')
                ]}
                /**
                 * This is empty on purpose. When onMouseEnter/Leave is set,
                 * the dropdown starts to accept pointer events needed for
                 * interactive dropdowns
                 */
                onMouseEnter={() => {}}
                outerEvents={['click', 'focusin']}
                onOuterEvent={(event) => this.setState({visible: false})}
                attr={mergeAttributeObjects(
                    this.props.attr,
                    {
                        dropdown: {
                            className: css('date-picker-dropdown'),
                        },
                    },
                    ['container', 'dropdownContainer', 'dropdown']
                )}
            >
                <Attr.div
                    className={css('date-picker-input-container')}
                    attr={this.props.attr.inputContainer}
                >
                    <Attr.input
                        type='text'
                        name={this.props.name}
                        value={this.state.value}
                        className={inputClassName}
                        placeholder={placeholder}
                        onFocus={this.onFocus}
                        onChange={this.onChange}
                        onPaste={this.onPaste}
                        onKeyUp={this.onKeyUp}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        attr={this.props.attr.input}
                    />
                    {icon}
                </Attr.div>
            </Dropdown>
        );
    }
}

export default DatePicker;
