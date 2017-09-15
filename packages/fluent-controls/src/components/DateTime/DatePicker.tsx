import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Calendar} from './Calendar';
import {Icon, IconSize} from '../Icon';
import * as helpers from './helpers';
import {DateFormat} from './helpers';
const css = classNames.bind(require('./DatePicker.scss'));

export {DateFormat} from './helpers';

export interface DatePickerType {}

export interface DatePickerProps extends React.Props<DatePickerType> {
    /** HTML form element name */
    name: string;
    /** Initial value of date picker */
    initialValue?: Date | string;

    /** Tab index for calendar control */
    tabIndex?: number;
    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /**
     * Treat the Date object with the local timezone
     *
     * (UNIMPLEMENTED)
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

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Class to append to top level element */
    className?: string;
}

export interface DatePickerState {
    value: string;
    dateValue?: Date;

    visible: boolean;
    invalid: boolean;
    error: boolean;
}

/**
 * Low level date picker control
 *
 * (Use the `DateField` control instead when making a form with standard styling)
 */
export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    static defaultProps = {
        format: DateFormat.MMDDYYYY,
        tabIndex: -1,
        localTimezone: true,
    };

    inputElement?: any;
    cursorPos: number;
    paste: boolean;

    constructor(props: DatePickerProps) {
        super(props);

        let value = '';
        let invalid = false;
        if (props.initialValue) {
            if (typeof props.initialValue === 'string') {
                const date = new Date(props.initialValue);
                if (helpers.dateIsValid(date)) {
                    value = helpers.formatDate(date, props.format);
                } else {
                    value = props.initialValue;
                    invalid = true;
                }
            } else {
                value = helpers.formatDate(props.initialValue, props.format);
                if (!helpers.dateIsValid(props.initialValue)) {
                    invalid = true;
                }
            }
        }

        this.state = {
            value: value,
            visible: false,
            invalid: invalid,
            error: false
        };

        this.inputElement = null;
        this.cursorPos = null;
        this.paste = false;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDropdown.bind(this));
        window.addEventListener('focusin', this.handleDropdown.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDropdown.bind(this));
        window.removeEventListener('focusin', this.handleDropdown.bind(this));
    }

    componentDidUpdate(oldProps: DatePickerProps, oldState: DatePickerState) {
        if (this.cursorPos !== null) {
            this.inputElement.selectionStart = this.cursorPos;
            this.inputElement.selectionEnd = this.cursorPos;
            this.cursorPos = null;
        }
        if (oldState.value !== this.state.value) {
            if (this.state.dateValue) {
                const date = new Date(this.state.dateValue);
                this.props.onChange(date.toUTCString());
            } else {
                this.props.onChange('invalid');
            }
        }
    }

    handleMonth(newValue, position) {
        const lastNum = parseInt(newValue[newValue.length - 1]);
        const suffix = (position < 3 ? '/' : '');
        if (newValue.length === 1 || newValue[newValue.length - 2] === '/') {
            if (lastNum > 1) {
                if (position > 1) {
                    newValue = helpers.replaceAt(newValue, newValue.length - 1, '0');
                } else {
                    newValue = '0' + lastNum.toString();
                }
                newValue += suffix;
            }
        } else {
            const otherLastNum = parseInt(newValue[newValue.length - 2]);
            if (otherLastNum < 1) {
                newValue += suffix;
            } else {
                if (lastNum < 3) {
                    newValue += suffix;
                } else {
                    newValue = this.state.value;
                }
            }
        }
        return newValue;
    }

    handleDay(newValue, position) {
        const lastNum = parseInt(newValue[newValue.length - 1]);
        const suffix = (position < 3 ? '/' : '');
        if (newValue.length === 1 || newValue[newValue.length - 2] === '/') {
            if (lastNum > 3) {
                if (position > 1) {
                    newValue = helpers.replaceAt(newValue, newValue.length - 1, '0');
                } else {
                    newValue = '0' + lastNum.toString();
                }
                newValue += suffix;
            }
        } else {
            const otherLastNum = parseInt(newValue[newValue.length - 2]);
            if (otherLastNum < 3) {
                newValue += suffix;
            } else {
                if (lastNum < 2) {
                    newValue += suffix;
                } else {
                    newValue = this.state.value;
                }
            }
        }
        return newValue;
    }

    handleTyping(newValue: string) {
        if (this.props.format === DateFormat.YYYYMMDD) {
            if (newValue.length === 4) {
                newValue += '/';
            } else if (newValue.length === 6) {
                newValue = this.handleMonth(newValue, 2);
            } else if (newValue.length === 7) {
                newValue = this.handleMonth(newValue, 2);
            } else if (newValue.length === 9) {
                newValue = this.handleDay(newValue, 3);
            } else if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        else if (this.props.format === DateFormat.MMDDYYYY) {
            if (newValue.length === 1) {
                newValue = this.handleMonth(newValue, 1);
            } else if (newValue.length === 2) {
                newValue = this.handleMonth(newValue, 1);
            } else if (newValue.length === 4) {
                newValue = this.handleDay(newValue, 2);
            } else if (newValue.length === 5) {
                newValue = this.handleDay(newValue, 2);
            } else if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        else if (this.props.format === DateFormat.DDMMYYYY) {
            if (newValue.length === 1) {
                newValue = this.handleDay(newValue, 1);
            } else if (newValue.length === 2) {
                newValue = this.handleDay(newValue, 1);
            } else if (newValue.length === 4) {
                newValue = this.handleMonth(newValue, 2);
            } else if (newValue.length === 5) {
                newValue = this.handleMonth(newValue, 2);
            } else if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        return newValue;
    }

    handleDeletion(newValue: string) {
        if (this.state.value[this.state.value.length - 1] === '/') {
            return newValue.substr(0, newValue.length - 1);
        }
        return newValue;
    }

    parse(newValue: string) {
        let valid = true;
        if (newValue.length !== 10) {
            valid = false;
        }

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

        if (isNaN(year) || year < 1) {
            valid = false;
        }
        if (isNaN(month) || month < 1 || month > 12) {
            valid = false;
        }
        if (isNaN(date) || date < 1 || date > 31) {
            valid = false;
        }

        if (valid) {
            let parsed = new Date(year, month - 1, date);
            if (month !== parsed.getMonth() + 1 || date !== parsed.getDate()) {
                valid = false;
            }
        }
        return { year: year, month: month, date: date, valid: valid };
    }

    onInput(event) {
        let newValue = event.target.value;
        let invalid = this.state.invalid;
        if (this.paste) {
            const date = new Date(newValue);
            if (helpers.dateIsValid(date)) {
                invalid = false;
                newValue = helpers.formatDate(date, this.props.format);
            } else {
                invalid = true;
            }
            this.paste = false;
        }
        if (this.state.value.length >= newValue.length) {
            /** If the user starts deleting, stop smart input handling */
            if (this.state.value.length - newValue.length === 1) {
                let oldValue = this.state.value[this.state.value.length - 1];
                if (this.state.value.length > 0) {
                    if (newValue[newValue.length - 1] !== oldValue) {
                        newValue = this.handleDeletion(newValue);
                        invalid = false;
                    } else {
                        invalid = true;
                    }
                }
            } else {
                invalid = true;
            }
        } else if (this.state.value.length < newValue.length) {
            /** If the user is adding to newValue */
            if (newValue.length <= 10) {
                let oldSlice = this.state.value.substr(
                    0, this.state.value.length - 1
                );
                let newSlice = newValue.substr(0, newValue.length - 2);
                if (newValue.length > 1 && newSlice !== oldSlice) {
                    /**
                     * If the user types in the middle of the date, stop smart
                     * input handling
                     */
                    invalid = true;
                } else {
                    /**
                     * If the current value isn't invalid, handle the user
                     * typing (handleTyping handles formatting as you type)
                     */
                    if (!invalid) {
                        newValue = this.handleTyping(newValue);
                    }
                }
            } else {
                /**
                 * If the current value isn't invalid, prevent the user from
                 * typing more than 10 characters into the input
                 *
                 * (Do NOT do this if the user pastes in an invalid value)
                 */
                if (!invalid) {
                    newValue = this.state.value;
                }
            }
        }

        if (newValue.length === 0) {
            invalid = false;
        }

        let result = this.parse(newValue);
        if (result.valid) {
            this.setState({
                value: newValue,
                invalid: false,
                error: false,
                dateValue: new Date(result.year, result.month - 1, result.date)
            });
        } else {
            this.setState({ value: newValue, invalid: invalid, error: true });
        }
    }

    /**
     * Whenever focus changes or user clicks something, decide if the
     * calendar should stay open or close
     *
     * This handler needs to be added to the 'focus' and 'click' events for
     * the whole window
     *
     * @param event Focus or Click event
     */
    handleDropdown(event) {
        if (event.target === this.inputElement) {
            return;
        }

        let className = css('dropdown');
        let target = event.target;
        /**
         * Go back several levels to check whether the user is clicking in the
         * calendar (which causes the text input to lose focus)
        */
        for (let i = 0; i < 6; i++) {
            if (helpers.hasClassName(target, className)) {
                break;
            }

            if (target.parentElement) {
                target = i < 5 ? target.parentElement : null;
                continue;
            } else {
                target = null;
                break;
            }
        }

        if (!target) {
            this.setState({ visible: false });
        }
    }

    onFocus() {
        this.setState({visible: true});
    }

    onSelect(newValue: Date) {
        this.setState({
            value: helpers.formatDate(newValue, this.props.format),
            error: false,
            visible: false,
            dateValue: new Date(newValue)
        });
    }

    onKeyPress(event) {
        if (event.charCode >= helpers.char0 && event.charCode <= helpers.char9) {
            return;
        }

        if (event.charCode === helpers.charSlash) {
            if (this.state.value.split('/').length < 3) {
                return;
            }
        }

        event.preventDefault();
    }

    onPaste(event) {
        this.paste = true;
    }

    render() {
        const containerClassName = css('date-picker-container', this.props.className);
        const inputClassName = css('input', {'error': this.state.error || this.props.error});
        const dropdownClassName = css('dropdown', {
            'visible': this.state.visible,
            'above': this.props.showAbove
        });

        const icon = <Icon
            icon='calendar'
            size={IconSize.xsmall}
            className={css('calendar-icon')}
        />;

        const placeholder = helpers.placeholders[this.props.format];

        const parsed = this.parse(this.state.value);

        return (
            <div className={containerClassName}>
                <div className={css('input-container')}>
                    <input
                        type='text'
                        name={this.props.name}
                        value={this.state.value}
                        className={inputClassName}
                        onFocus={event => this.onFocus()}
                        placeholder={placeholder}
                        onInput={event => this.onInput(event)}
                        onPaste={event => this.onPaste(event)}
                        onKeyPress={event => this.onKeyPress(event)}
                        /** React warns about Input without onChange handler */
                        onChange={() => {}}
                        /**
                         * This is not the same as props.required
                         * (this gives us :valid css selector)
                         */
                        required
                        disabled={this.props.disabled}
                        ref={(element) => this.inputElement = element}
                    />
                    {icon}
                </div>
                <div className={dropdownClassName}>
                    <Calendar
                        value={this.state.dateValue}
                        onChange={newValue => this.onSelect(newValue)}
                        className={css('calendar')}
                        year={parsed.year || null}
                        month={parsed.month - 1 || null}
                        tabIndex={this.props.tabIndex}
                    />
                    <div className={css('dropdown-triangle')} />
                </div>
            </div>
        );
    }
}

export default DatePicker;
