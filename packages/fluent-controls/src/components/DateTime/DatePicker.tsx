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
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'YYYY/MM/DD'
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
    visible: boolean;
    dateValue?: Date;
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

    constructor(props: DatePickerProps) {
        super(props);

        this.handleDropdown = this.handleDropdown.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSelect = this.onSelect.bind(this);

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
        };

        this.inputElement = null;
    }

    componentDidMount() {
        window.addEventListener('click', this.handleDropdown);
        window.addEventListener('focusin', this.handleDropdown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleDropdown);
        window.removeEventListener('focusin', this.handleDropdown);
    }

    handleDropdown(event) {
        if (event.target === this.inputElement) {
            return;
        }

        const className = css('dropdown');

        let target = event.target;
        for (let i = 0; i < 6; i++) {
            if (hasClassName(target, className)) {
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
            this.setState({visible: false});            
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
        this.props.onChange(newValue.toISOString());
    }

    render() {
        const containerClassName = css('date-picker-container', this.props.className);
        const inputClassName = css('input', {'error': this.props.error});
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
