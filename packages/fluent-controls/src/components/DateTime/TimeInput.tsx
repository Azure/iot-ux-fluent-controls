import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption, keyCode} from '../../Common';
import {SelectInput} from '../Form/SelectInput';
const css = classNames.bind(require('./TimeInput.scss'));

export interface TimeInputType {}

export interface TimeInputProps extends React.Props<TimeInputType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Value */
    value?: string | Date;

    /** Label for "AM" select option */
    amLabel?: string;
    /** Label for "PM" select option */
    pmLabel?: string;

    /**
     * Show the time in the local timezone instead of GMT
     *
     * Default: true
     */
    localTimezone?: boolean;
    /** Display the seconds dropdown */
    showSeconds?: boolean;
    /** Use 24 hour clock */
    militaryTime?: boolean;
    /** Apply error styling */
    error?: boolean;
    /** Disable input */
    disabled?: boolean;

    /** Callback for new time input values */
    onChange: (time: string) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to HTML input elements */
    inputClassName?: string;
}

export interface TimeInputState {
    hours: number;
    minutes: number;
    seconds: number;
    period: 'AM' | 'PM' | '24H';
}

/**
 * High level generic form field
 * 
 * @param props Control properties (defined in `TimeInputProps` interface)
 */
export class TimeInput extends React.Component<TimeInputProps, TimeInputState> {
    static defaultProps = {
        showSeconds: false,
        militaryTime: false,
        disabled: false,
        localTimezone: true,
        periodOptions: null
    };

    hours: FormOption[];
    minutes: FormOption[];
    seconds: FormOption[];
    options: FormOption[];

    constructor(props: TimeInputProps) {
        super(props);
        this.state = this.handleState(props);

        const numHours = props.militaryTime ? 24 : 12;
        this.hours = [];
        for (let index = 0; index < numHours; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            this.hours.push({label: value, value: value});
        }

        this.minutes = [];
        this.seconds = [];
        for (let index = 0; index < 60; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            this.minutes.push({label: value, value: value});
            this.seconds.push({label: value, value: value});
        }

        this.options = [
            {label: props.amLabel || 'AM', value: 'AM'},
            {label: props.pmLabel || 'PM', value: 'PM'}
        ];
    }

    handleState(props: TimeInputProps): TimeInputState {
        const time = this.handleTimezone(props.value);
        
        const hoursTz = this.props.localTimezone ? time.getHours() : time.getUTCHours();
        const hours = !isNaN(hoursTz) ? hoursTz : 0;
        const minutesTz = this.props.localTimezone ? time.getMinutes() : time.getUTCMinutes();
        const minutes = !isNaN(minutesTz) ? minutesTz : 0;
        const secondsTz = this.props.localTimezone ? time.getSeconds() : time.getUTCSeconds();
        const seconds = !isNaN(secondsTz) ? secondsTz : 0;
        return {
            hours: !this.props.militaryTime && hours > 11 ? hours - 12 : hours,
            minutes: !isNaN(minutes) ? minutes : 0,
            seconds: !isNaN(seconds) ? seconds : 0,
            period: this.props.militaryTime ? '24H' : (hours < 12 ? 'AM' : 'PM')
        };
    }

    handleTimezone(value: string | Date): Date {
        let time;
        if (value) {
            time = typeof(value) === 'string' ? new Date(value) : value;
            time = this.props.localTimezone
                ? time
                : new Date(Date.UTC(
                    time.getUTCFullYear(),
                    time.getUTCMonth(),
                    time.getUTCDate(),
                    time.getUTCHours(),
                    time.getUTCMinutes(),
                    time.getUTCSeconds()
                ));
        } else {
            time = new Date();
            if (this.props.localTimezone) {
                time = new Date(
                    time.getFullYear(),
                    time.getMonth(),
                    time.getDate(),
                    0, 0, 0, 0
                );
            } else {
                time = new Date(Date.UTC(
                    time.getUTCFullYear(),
                    time.getUTCMonth(),
                    time.getUTCDate(),
                    0, 0, 0, 0
                ));
            }
        }
        return time;
    }

    componentWillReceiveProps(newProps) {
        let newState: any = {};
        let update = false;
        let newHours = this.state.hours;
        if (newProps.value !== this.props.value) {
            newState = this.handleState(newProps);
            newHours = newState.hours;
            update = true;
        }

        if (this.props.militaryTime !== newProps.militaryTime) {
            const numHours = newProps.militaryTime ? 24 : 12;
            this.hours = [];
            for (let index = 0; index < numHours; index++) {
                const value = index < 10 ? `0${index}` : `${index}`;
                this.hours.push({label: value, value: value});
            }

            const hours = !newProps.militaryTime && newHours > 11
                 ? newHours - 12 : newHours;
            const period = newProps.militaryTime ? '24H'
                : (newHours > 11 ? 'PM' : 'AM');
            
            newState.hours = hours;
            newState.period = period;
            update = true;
        }
        
        if (update) {
            this.setState(newState);
        }
    }

    update(name: 'hours' | 'minutes' | 'seconds' | 'period', value: string | number, period?: 'AM' | 'PM' | '24H') {
        const date = this.handleTimezone(this.props.value);
        const newState = {...this.state};
        if (name !== 'period') {
            newState[name] = typeof(value) === 'string' ? parseInt(value) : value;
        } else if (value === 'AM' || value === 'PM') {
            newState.period = value;
        }
        if (period === 'AM' || period === 'PM' || period === '24H') {
            newState.period = period;
        }

        const hours = !this.props.militaryTime && newState.period === 'PM' 
            ? newState.hours + 12 : newState.hours;
        
        if (this.props.localTimezone) {
            /** This is required incase the component consumer wants to track the date */
            date.setHours(hours);
            date.setMinutes(newState.minutes);
            date.setSeconds(newState.seconds);
            this.props.onChange(new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            ).toUTCString());
        } else {
            /** This is required incase the component consumer wants to track the date */
            date.setUTCHours(hours);
            date.setUTCMinutes(newState.minutes);
            date.setUTCSeconds(newState.seconds);
            this.props.onChange(new Date(Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds()
            )).toUTCString());
        }
        this.setState(newState);
    }

    render() {
        const hours = this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours;
        const minutes = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
        const seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;
        const inputClassName = css('time-input', {'error': this.props.error}, this.props.inputClassName);

        const optionMap = (option) => {
            return <option
                value={option.value}
                key={option.value}
                disabled={option.disabled}
                hidden={option.hidden}
            >
                {option.label}
            </option>;
        };

        const period = this.props.militaryTime ? '' : <select 
            name={this.props.name}
            value={this.state.period}
            disabled={this.props.disabled}
            onChange={event => this.update('period', event.target.value)}
            className={css(inputClassName, 'time-period')}
        >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
        </select>;

        const secondsInput = this.props.showSeconds !== true ? '' : <select 
            name={this.props.name}
            value={seconds}
            disabled={this.props.disabled}
            onChange={event => this.update('seconds', event.target.value)}
            className={inputClassName}
        >
            {this.seconds.map(option => optionMap(option))}
        </select>;

        return (
            <div className={css('time-container', this.props.className)} >
                <select 
                    name={this.props.name}
                    value={hours}
                    disabled={this.props.disabled}
                    onChange={event => this.update('hours', event.target.value)}
                    className={inputClassName}
                >
                    {this.hours.map(option => optionMap(option))}                    
                </select>
                <select 
                    name={this.props.name}
                    value={minutes}
                    disabled={this.props.disabled}
                    onChange={event => this.update('minutes', event.target.value)}
                    className={inputClassName}
                >
                    {this.minutes.map(option => optionMap(option))}                
                </select>
                {secondsInput}
                {period}        
            </div>
        );
    }
}

export default TimeInput;
