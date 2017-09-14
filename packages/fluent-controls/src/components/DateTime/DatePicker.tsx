import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Calendar} from './Calendar';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./DatePicker.scss'));

export enum DateFormat {
    MMDDYYYY = 0,
    DDMMYYYY,
    YYYYMMDD
}

const _placeholders = [
    'dd/mm/yyyy',
    'mm/dd/yyyy',
    'yyyy/mm/dd'
];

const _formaters = [
    (year: string, month: string, day: string) => `${month}/${day}/${year}`,
    (year: string, month: string, day: string) => `${day}/${month}/${year}`,
    (year: string, month: string, day: string) => `${year}/${month}/${day}`,
];

const formatDate = (date: Date, format: DateFormat) => {
    let month = date.getMonth();
    let monthString = month > 9 ? `${month}` : `0${month}`;
    let day = date.getDate();
    let dayString = day > 9 ? `${day}` : `0${day}`;
    return _formaters[format](`${date.getFullYear()}`, monthString, dayString);
};

const hasClassName = (target, className) => {
    return ` ${target.className} `.indexOf(` ${className} `) > -1;
};

const replaceAt = (value: string, index: number, newValue: string) => {
    return value.substr(0, index) + newValue + value.substr(index, +value.length);
};

export interface DatePickerType {}

export interface DatePickerProps extends React.Props<DatePickerType> {
    /** HTML form element name */
    name: string;
    /** Initial value of date picker */
    initialValue?: Date | string;
    
    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;

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
    deletion: boolean;
    error: boolean;
}

/**
 * Low level date picker control
 * 
 * (Use the `DateField` control instead when making a form with standard styling)
 */
export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
    static defaultProps = {
        format: DateFormat.MMDDYYYY
    };

    inputElement?: any;
    cursorPos: number;

    constructor(props: DatePickerProps) {
        super(props);

        this.handleDropdown = this.handleDropdown.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        let value = '';
        if (props.initialValue) {
            if (typeof props.initialValue === 'string') {
                value = formatDate(new Date(props.initialValue), props.format);
            } else {
                value = formatDate(props.initialValue, props.format);
            }
        }
        
        this.state = {
            value: value,
            visible: false,
            deletion: false,
            error: false
        };

        this.inputElement = null;
        this.cursorPos = null;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDropdown);
        window.addEventListener('focusin', this.handleDropdown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDropdown);
        window.removeEventListener('focusin', this.handleDropdown);
    }

    componentDidUpdate() {
        if (this.cursorPos !== null) {
            this.inputElement.selectionStart = this.cursorPos;
            this.inputElement.selectionEnd = this.cursorPos;
            this.cursorPos = null;
        }
    }

    handleMonth(newValue, position) {
        const lastNum = parseInt(newValue[newValue.length - 1]);
        const suffix = (position < 3 ? '/' : '');
        if (newValue.length === 1 || newValue[newValue.length - 2] === '/') {
            if (lastNum > 1) {
                if (position > 1) {
                    newValue = replaceAt(newValue, newValue.length - 1, '0');
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
                    newValue = replaceAt(newValue, newValue.length - 1, '0');
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

    handleReformat(newValue: string) {
        let values;
        let value = newValue.split('/');
        if (this.state.value.length - 1 === newValue.length) {
            let state = this.state.value.split('/');
            if (state.length !== value.length) {
                if (state[0] !== value[0]) {
                    value[0] = state[0].substr(0, state[0].length - 1) + state[1];
                } else {
                    value[1] = state[1].substr(0, state[1].length - 1) + state[2];
                }
            }
        }
        values = value.join('');
        let year = '', month = '', date = '';
        if (this.props.format === DateFormat.YYYYMMDD) {
            year = values;
            if (values.length > 4) {
                year = values.substr(0, 4) + '/';
                month = values.substr(4, values.length);
                if (values.length > 6) {
                    month = values.substr(4, 2) + '/';
                    date = values.substr(7, values.length);
                }
            }
            newValue = '' + year + month + date;
        } else if (this.props.format === DateFormat.MMDDYYYY) {
            month = values;
            if (values.length > 2) {
                month = values.substr(0, 2) + '/';
                date = values.substr(2, values.length);
                if (values.length > 4) {
                    date = values.substr(2, 2) + '/';
                    year = values.substr(4, values.length);
                }
            }
            newValue = '' + month + date + year;
        } else if (this.props.format === DateFormat.DDMMYYYY) {
            date = values;
            if (values.length > 2) {
                date = values.substr(0, 2) + '/';
                month = values.substr(2, values.length);
                if (values.length > 4) {
                    month = values.substr(2, 2) + '/';
                    year = values.substr(4, values.length);
                }
            }
            newValue = '' + date + month + year;
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

        if (isNaN(year) || year < 0) {
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

    handleCursorPosition(newValue: string) {

    }

    onInput(event) {
        let newValue = event.target.value;
        let insertion = false;
        let deletion = this.state.deletion;
        if (this.state.value.length > newValue.length) {
            /** If the user starts deleting, stop smart input handling */
            let formatValue = this.handleReformat(newValue);
            if (formatValue === this.state.value) {
                const pos = this.inputElement.selectionStart;
                const diff = this.state.value.split('/').length - formatValue.split('/').length;
                this.cursorPos = pos - diff;
                newValue = formatValue;
            } else if (this.state.value.length - newValue.length === 1) {
                let oldValue = this.state.value[this.state.value.length - 1];
                if (this.state.value.length > 0) {
                    if (newValue[newValue.length - 1] !== oldValue) {
                        newValue = this.handleDeletion(newValue);
                        deletion = false;
                    }
                    else {
                        deletion = true;
                    }
                }
            }
            else {
                deletion = true;
            }
        }
        else if (this.state.value.length < newValue.length) {
            if (newValue.length <= 10) {
                /** If the user types in the middle of the date, stop smart input handling */
                let oldSlice = this.state.value.substr(0, this.state.value.length - 1);
                let newSlice = newValue.substr(0, newValue.length - 2);
                if (newValue.length > 1 && newSlice !== oldSlice) {
                    deletion = true;
                }
                else {
                    if (!deletion) {
                        newValue = this.handleTyping(newValue);
                    }
                }
            }
            else {
                newValue = this.state.value;
            }
        }

        if (newValue.length === 0) {
            deletion = false;
        }

        // if (deletion && this.state.value.length > newValue.length) {
        //     const pos = this.inputElement.selectionStart;
        //     let posMod = 0;
        //     let index = 0;
        //     let oldIndex = 0;
        //     let passing = false;
        //     for (index = 0; index < newValue.length; index++) {
        //         if (newValue[index] === this.state.value[oldIndex]) {
        //             oldIndex++;
        //             passing = false;
        //         } else {
        //             if (!passing) {
        //                 passing = true;
        //                 oldIndex++;
        //             }
        //             if (this.state.value[index] === '/') {
        //                 posMod -= 1;
        //             }
        //         }
        //     }
        //     this.cursorPos = pos + posMod;
        //     newValue = this.handleReformat(newValue);
        // }        

        let result = this.parse(newValue);
        if (result.valid) {
            this.setState({
                value: newValue,
                deletion: deletion,
                error: false,
                dateValue: new Date(result.year, result.month - 1, result.date)
            });
        }
        else {
            this.setState({ value: newValue, deletion: deletion, error: true });
        }
    }

    handleDropdown(event) {
        if (event.target === this.inputElement) {
            return;
        }

        let className = css('dropdown');
        let target = event.target;
        for (let i = 0; i < 6; i++) {
            if (hasClassName(target, className)) {
                break;
            }

            if (target.parentElement) {
                target = i < 5 ? target.parentElement : null;
                continue;
            }
            else {
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
            value: formatDate(newValue, this.props.format),
            visible: false,
            dateValue: new Date(newValue)
        });

        this.props.onChange(newValue.toUTCString());
    }

    onKeyPress(event) {
        if (event.charCode >= 48 && event.charCode <= 57) {
            return;
        }

        if (event.charCode === 47) {
            if (this.state.value.split('/').length < 3) {
                return;
            }
        }

        event.preventDefault();
    }

    render() {
        const containerClassName = css('date-picker-container', this.props.className);
        const inputClassName = css('input', {'error': this.state.error || this.props.error});
        const dropdownClassName = css('dropdown', {'visible': this.state.visible});

        const icon = <Icon
            icon='calendar' 
            size={IconSize.xsmall}
            className={css('calendar-icon')}
        />;

        const placeholder = _placeholders[this.props.format];

        return (
            <div className={containerClassName}>
                <div className={css('input-container')}>
                    <input 
                        type='text'
                        name={this.props.name}
                        value={this.state.value}
                        className={inputClassName}
                        onFocus={this.onFocus}
                        placeholder={placeholder}
                        onInput={this.onInput}
                        onKeyPress={this.onKeyPress}
                        // This is not the same as props.required
                        // (this gives us :valid css selector)
                        required
                        disabled={this.props.disabled}
                        ref={(element) => this.inputElement = element}
                    />
                    {icon}
                </div>
                <div className={dropdownClassName}>
                    <Calendar
                        value={this.state.dateValue}
                        onChange={this.onSelect}
                        className={css('calendar')}
                    />
                    <div className={css('dropdown-triangle')} />
                </div>
            </div>
        );
    }
}

export default DatePicker;
