import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, OptionProps, SelectProps, Elements as Attr} from '../../Attributes';
import {MethodNode, FormOption, keyCode} from '../../Common';
import {SelectInput} from '../Input/SelectInput';
const css = classNames.bind(require('./TimeInput.scss'));

export interface TimeInputType {}

export interface TimeInputAttributes {
    container?: DivProps;
    hourSelect?: SelectProps;
    hourOption?: OptionProps;
    minuteSelect?: SelectProps;
    minuteOption?: OptionProps;
    secondSelect?: SelectProps;
    secondOption?: OptionProps;
    periodSelect?: SelectProps;
    periodOption?: OptionProps;
}

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

    attr?: TimeInputAttributes;
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
        amLabel: 'AM',
        pmLabel: 'PM',
        attr: {
            container: {},
            hourSelect: {},
            hourOption: {},
            minuteSelect: {},
            minuteOption: {},
            secondSelect: {},
            secondOption: {},
            periodSelect: {},
            periodOption: {},
        }
    };

    private hours: FormOption[];
    private minutes: FormOption[];
    private seconds: FormOption[];

    private hourInput: HTMLSelectElement;
    private minuteInput: HTMLSelectElement;
    private secondInput: HTMLSelectElement;
    private periodInput: HTMLSelectElement;

    constructor(props: TimeInputProps) {
        super(props);
        this.state = this.handleState(props);

        const numHours = props.militaryTime ? 24 : 12;
        this.hours = [];
        for (let index = 1; index < numHours; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            this.hours.push({label: value, value: value});
        }
        this.hours.push({label: '12', value: '00'});

        this.minutes = [];
        this.seconds = [];
        for (let index = 0; index < 60; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            this.minutes.push({label: value, value: value});
            this.seconds.push({label: value, value: value});
        }
    }

    handleState(props: TimeInputProps): TimeInputState {
        const time = this.handleTimezone(props.value);
        
        const hoursTz = props.localTimezone ? time.getHours() : time.getUTCHours();
        const hours = !isNaN(hoursTz) ? hoursTz : 0;
        const minutesTz = props.localTimezone ? time.getMinutes() : time.getUTCMinutes();
        const minutes = !isNaN(minutesTz) ? minutesTz : 0;
        const secondsTz = props.localTimezone ? time.getSeconds() : time.getUTCSeconds();
        const seconds = !isNaN(secondsTz) ? secondsTz : 0;
        return {
            hours: !props.militaryTime && hours > 11 ? hours - 12 : hours,
            minutes: !isNaN(minutes) ? minutes : 0,
            seconds: !isNaN(seconds) ? seconds : 0,
            period: props.militaryTime ? '24H' : (hours < 12 ? 'AM' : 'PM')
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
        if (newProps.value !== this.props.value || this.props.localTimezone !== newProps.localTimezone) {
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
            ).toJSON());
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
            )).toJSON());
        }
        this.setState(newState);
    }

    render() {
        const hours = this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours;
        const minutes = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes;
        const seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;
        const inputClassName = css('time-input', {'error': this.props.error}, this.props.inputClassName);

        const optionMap = (option, attr) => {
            return <Attr.option
                value={option.value}
                key={option.value}
                disabled={option.disabled}
                hidden={option.hidden}
                attr={attr}
            >
                {option.label}
            </Attr.option>;
        };

        const period = this.props.militaryTime ? '' : <Attr.select 
            name={this.props.name}
            value={this.state.period}
            disabled={this.props.disabled}
            onChange={event => this.update('period', this.periodInput.value)}
            methodRef={element => this.periodInput = element}
            className={css(inputClassName, 'time-input-period')}
            attr={this.props.attr.periodSelect}
        >
            <Attr.option
                value='AM'
                attr={this.props.attr.periodOption}
            >
                {this.props.amLabel}
            </Attr.option>
            <Attr.option
                value='PM'
                attr={this.props.attr.periodOption}
            >
                {this.props.pmLabel}
            </Attr.option>
        </Attr.select>;

        const secondsInput = this.props.showSeconds !== true ? '' : <Attr.select 
            name={this.props.name}
            value={seconds}
            disabled={this.props.disabled}
            onChange={event => this.update('seconds', this.secondInput.value)}
            methodRef={element => this.secondInput = element}
            className={inputClassName}
            attr={this.props.attr.secondSelect}
        >
            {this.seconds.map(option => 
                optionMap(option, this.props.attr.secondOption)
            )}
        </Attr.select>;

        return (
            <Attr.div
            className={css('time-input-container', this.props.className)} 
            attr={this.props.attr.container}
            >
                <Attr.select 
                    name={this.props.name}
                    value={hours}
                    disabled={this.props.disabled}
                    onChange={event => this.update('hours', this.hourInput.value)}
                    methodRef={element => this.hourInput = element}
                    className={inputClassName}
                    attr={this.props.attr.hourSelect}
                >
                    {this.hours.map(option =>
                        optionMap(option, this.props.attr.hourOption)
                    )}
                </Attr.select>
                <Attr.select 
                    name={this.props.name}
                    value={minutes}
                    disabled={this.props.disabled}
                    onChange={event => this.update('minutes', this.minuteInput.value)}
                    methodRef={element => this.minuteInput = element}
                    className={inputClassName}
                    attr={this.props.attr.minuteSelect}
                >
                    {this.minutes.map(option =>
                        optionMap(option, this.props.attr.minuteOption)
                    )}          
                </Attr.select>
                {secondsInput}
                {period}        
            </Attr.div>
        );
    }
}

export default TimeInput;
