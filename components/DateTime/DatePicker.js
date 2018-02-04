"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Calendar_1 = require("./Calendar");
const Icon_1 = require("../Icon");
const Dropdown_1 = require("../Dropdown");
const helpers_1 = require("./helpers");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./DatePicker.scss'));
/**
 * Low level date picker control
 *
 * (Use the `DateField` control instead when making a form with standard styling)
 */
class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = (element) => this.input = element;
        this.onChange = (event) => {
            let newValue = event.target.value;
            if (newValue === '') {
                this.paste = false;
            }
            if (this.paste) {
                const date = Common_1.MethodDate.fromString(this.props.localTimezone, newValue);
                if (date) {
                    newValue = helpers_1.formatDate(date.dateObject, this.props.format, this.props.localTimezone);
                    this.paste = false;
                    if (this.props.onPaste) {
                        this.props.onPaste(date.dateObject.toJSON());
                    }
                    else {
                        this.props.onChange(date.dateObject.toJSON());
                    }
                }
                else {
                    this.props.onChange('invalid');
                    this.setState({ value: newValue });
                }
            }
            else {
                let result = this.parse(newValue);
                if (result.valid) {
                    const isLocal = !!this.props.localTimezone;
                    const initialValue = this.state.initialValue;
                    const dateValue = new Common_1.MethodDate(this.props.localTimezone, result.year, result.month - 1, result.date, initialValue.hours, initialValue.minutes, initialValue.seconds);
                    /**
                     * Using the MethodDate/Date constructor forces years to be
                     * at least 100 but we have to support any year > 0
                     */
                    if (result.year < 100) {
                        if (this.props.localTimezone) {
                            dateValue.dateObject.setFullYear(result.year, result.month - 1, result.date);
                        }
                        else {
                            dateValue.dateObject.setUTCFullYear(result.year, result.month - 1, result.date);
                        }
                    }
                    this.props.onChange(dateValue.dateObject.toJSON());
                }
                else {
                    this.props.onChange('invalid');
                    this.setState({ value: newValue });
                }
            }
            if (newValue.length === 0) {
                this.paste = false;
            }
        };
        this.onFocus = () => {
            this.setState({ visible: true });
        };
        this.onSelect = (newValue) => {
            this.setState({ visible: false });
            this.props.onChange(newValue.toJSON());
        };
        this.onKeyUp = (event) => {
            if (event.keyCode === Common_1.keyCode.enter) {
                this.calendar.startAccessibility();
                event.preventDefault();
            }
        };
        this.onPaste = (event) => {
            this.paste = true;
        };
        this.calendarRef = (element) => {
            this.calendar = element;
        };
        const newState = this.getInitialState(props, '');
        this.state = Object.assign({}, newState, { visible: false });
        this.paste = false;
    }
    /**
     * Use props.initialValue to generate a new state
     *
     * props.initialValue is used to set the hours/minutes/seconds on internal Date
     *
     * @param props DatePickerProps
     */
    getInitialState(props, currentValue) {
        const local = props.localTimezone;
        let value = currentValue;
        let initialValue = null;
        if (props.initialValue) {
            if (props.initialValue === 'invalid') {
                if (this.state && this.state.initialValue) {
                    initialValue = Common_1.MethodDate.fromString(props.localTimezone, this.state.initialValue.dateObject.toJSON());
                }
            }
            else if (typeof (props.initialValue) === 'string') {
                const date = Common_1.MethodDate.fromString(local, props.initialValue);
                if (date && Common_1.dateIsValid(date.dateObject, local)) {
                    initialValue = date;
                    const parsed = this.parse(currentValue);
                    if (date.year !== parsed.year ||
                        date.month !== (parsed.month - 1) ||
                        date.date !== parsed.date ||
                        !parsed.valid) {
                        /**
                         * Here we use props.initialValue to set the value of the text box
                         *
                         * This happens if state.value is different from the new initialValue
                         * or if the text input (state.value) is in an invalid state such as
                         * empty values or invalid dates like febuary 30th (2/30/2017)
                         */
                        value = helpers_1.formatDate(date.dateObject, props.format, local);
                    }
                }
                else {
                    value = props.initialValue;
                }
            }
            else {
                if (props.initialValue) {
                    value = helpers_1.formatDate(props.initialValue, props.format, local);
                    if (Common_1.dateIsValid(props.initialValue, local)) {
                        initialValue = Common_1.MethodDate.fromDate(local, props.initialValue);
                    }
                }
                else {
                    initialValue = new Common_1.MethodDate(local);
                }
            }
        }
        if (!initialValue || initialValue.dateObject.toString() === 'Invalid Date') {
            const today = new Common_1.MethodDate(local);
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
    componentWillReceiveProps(newProps) {
        if ((this.props.initialValue !== newProps.initialValue || this.props.localTimezone !== newProps.localTimezone) && newProps.initialValue !== 'invalid') {
            const newState = this.getInitialState(newProps, this.input.value);
            this.setState(Object.assign({}, newState));
        }
    }
    /**
     * Fire props.onChange handler when state.value changes
     *
     * Fires props.onChange('invalid') if input is invalid
     */
    componentDidUpdate(oldProps, oldState) {
        if (this.state.visible !== oldState.visible && !this.state.visible) {
            this.calendar.stopAccessibility();
        }
    }
    parse(newValue) {
        let valid = true;
        let split = newValue.split('/');
        if (split.length !== 3) {
            valid = false;
            while (split.length < 3) {
                split.push('-1');
            }
        }
        let year, month, date;
        if (this.props.format === Common_1.DateFormat.DDMMYYYY) {
            year = parseInt(split[2]);
            month = parseInt(split[1]);
            date = parseInt(split[0]);
        }
        else if (this.props.format === Common_1.DateFormat.MMDDYYYY) {
            year = parseInt(split[2]);
            month = parseInt(split[0]);
            date = parseInt(split[1]);
        }
        else if (this.props.format === Common_1.DateFormat.YYYYMMDD) {
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
            let parsed = new Common_1.MethodDate(this.props.localTimezone, year, month - 1, date, hasVal ? this.state.initialValue.hours : 0, hasVal ? this.state.initialValue.minutes : 0, hasVal ? this.state.initialValue.seconds : 0);
            if (month !== parsed.month + 1 || date !== parsed.date) {
                valid = false;
            }
        }
        return { year, month, date, valid };
    }
    render() {
        const containerClassName = css('date-picker-container', this.props.className);
        const dropdownClassName = css('date-picker-dropdown', {
            'date-picker-above': this.props.showAbove
        });
        const icon = React.createElement(Icon_1.Icon, { icon: 'calendar', size: Icon_1.IconSize.xsmall, className: css('date-picker-calendar-icon'), attr: this.props.attr.inputIcon });
        const placeholder = helpers_1.placeholders[this.props.format];
        const parsed = this.parse(this.state.value);
        const inputClassName = css('date-picker-input', {
            'error': this.props.error || (!parsed.valid && this.props.initialValue)
        });
        const value = parsed.valid
            ? new Common_1.MethodDate(this.props.localTimezone, parsed.year, parsed.month - 1, parsed.date).dateObject.toJSON() : null;
        const calendar = [
            React.createElement(Calendar_1.Calendar, { value: value, onChange: newValue => this.onSelect(newValue), className: css('date-picker-calendar'), year: parsed.year || null, month: parsed.month - 1, tabIndex: this.props.tabIndex, ref: this.calendarRef, key: '1', attr: this.props.attr.calendar }),
            React.createElement(Attributes_1.Elements.div, { className: css('date-picker-dropdown-triangle'), key: '2', attr: this.props.attr.dropdownTriangle })
        ];
        return (React.createElement(Dropdown_1.Dropdown, { dropdown: calendar, visible: this.state.visible, className: containerClassName, positionClassNames: [
                css('date-picker-dropdown'),
                css('date-picker-dropdown', 'date-picker-above')
            ], 
            /**
             * This is empty on purpose. When onMouseEnter/Leave is set,
             * the dropdown starts to accept pointer events needed for
             * interactive dropdowns
             */
            onMouseEnter: () => { }, outerEvents: ['click', 'focusin'], onOuterEvent: (event) => this.setState({ visible: false }), attr: Attributes_1.mergeAttributeObjects(this.props.attr, {
                dropdown: {
                    className: css('date-picker-dropdown'),
                },
            }, ['container', 'dropdownContainer', 'dropdown']) },
            React.createElement(Attributes_1.Elements.div, { className: css('date-picker-input-container'), attr: this.props.attr.inputContainer },
                React.createElement(Attributes_1.Elements.input, { type: 'text', name: this.props.name, value: this.state.value, className: inputClassName, placeholder: placeholder, onFocus: this.onFocus, onChange: this.onChange, onPaste: this.onPaste, onKeyUp: this.onKeyUp, required: this.props.required, disabled: this.props.disabled, methodRef: this.inputRef, attr: this.props.attr.input }),
                icon)));
    }
}
DatePicker.defaultProps = {
    format: Common_1.DateFormat.MMDDYYYY,
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
exports.DatePicker = DatePicker;
exports.default = DatePicker;

//# sourceMappingURL=DatePicker.js.map
