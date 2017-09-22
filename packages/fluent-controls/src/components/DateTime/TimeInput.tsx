import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode, FormOption} from '../../Common';
import {SelectInput} from '../Form/SelectInput';
const css = classNames.bind(require('./TimeInput.scss'));

export interface TimeInputType {}

export interface TimeInputProps extends React.Props<TimeInputType> {
    /** HTML element name for label accessibility */
    name: string;
    /** Value */
    value?: string | Date;

    /** Use 24 hour clock */
    militaryTime?: boolean;
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
    hours: number,
    minutes: number,
    seconds: number,
    period: 'AM' | 'PM' | '24H',   
}

/**
 * High level generic form field
 * 
 * @param props Control properties (defined in `TimeInputProps` interface)
 */
export class TimeInput extends React.Component<TimeInputProps, TimeInputState> {
    static defaultProps = {
        militaryTime: false,
        disabled: false,
    };

    hours: FormOption[];
    minutes: FormOption[];
    seconds: FormOption[];
    options: FormOption[];

    constructor(props: TimeInputProps) {
        super(props);
        let time;
        if (props.value) {
            time = typeof(props.value) === 'string' ? new Date(props.value) : props.value;
        } else {
            time = new Date();
            time = new Date(Date.UTC(
                time.getUTCFullYear(),
                time.getUTCMonth(),
                time.getUTCDate(),
                0, 0, 0, 0
            ));
        }

        const hours = !isNaN(time.getUTCHours()) ? time.getUTCHours() : 0;
        const minutes = time.getUTCMinutes();
        const seconds = time.getUTCSeconds();
        this.state = {
            hours: !props.militaryTime && hours > 11 ? hours - 12 : hours,
            minutes: !isNaN(minutes) ? minutes : 0,
            seconds: !isNaN(seconds) ? seconds : 0,
            period: props.militaryTime ? '24H' : (hours < 12 ? 'AM' : 'PM')
        };

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
            {label: 'AM', value: 'AM'},
            {label: 'PM', value: 'PM'}
        ]
    }

    componentWillReceiveProps(newProps) {
        if (this.props.militaryTime !== newProps.militaryTime) {
            const numHours = newProps.militaryTime ? 24 : 12;
            this.hours = [];
            for (let index = 0; index < numHours; index++) {
                const value = index < 10 ? `0${index}` : `${index}`;
                this.hours.push({label: value, value: value});
            }

            const hours = !newProps.militaryTime && this.state.hours > 11
                 ? this.state.hours - 12 : this.state.hours;
            const period = newProps.militaryTime ? '24H'
                : (this.state.hours > 11 ? 'PM' : 'AM');
            this.update('hours', hours, period);
        }
    }

    update(name: 'hours' | 'minutes' | 'seconds' | 'period', value: string | number, period?: 'AM' | 'PM' | '24H') {
        const date = new Date();
        const newState = {...this.state};
        if (name !== 'period') {
            newState[name] = typeof(value) === 'string' ? parseInt(value): value;
        } else if (value === 'AM' || value === 'PM') {
            newState.period = value;
        }
        if (period === 'AM' || period === 'PM' || period === '24H') {
            newState.period = period;
        }

        const hours = newState.hours;
        this.props.onChange(new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            !this.props.militaryTime && newState.period === 'PM' ? hours + 12 : hours,
            newState.minutes,
            newState.seconds
        )).toUTCString());
        this.setState(newState);
    }

    render() {
        const inputClassName = css('time-input', this.props.inputClassName);

        const period = this.props.militaryTime ? '' : <SelectInput
            name={this.props.name}
            value={this.state.period}
            options={this.options}
            onChange={value => this.update('period', value)}
            className={inputClassName}
        />;

        return (
            <div className={css('time-container', this.props.className)} >
                <SelectInput
                    name={this.props.name}
                    value={this.state.hours}
                    options={this.hours}
                    onChange={value => this.update('hours', value)}
                    className={inputClassName}
                />
                {period}        
            </div>
        );
    }
};

export default TimeInput;
