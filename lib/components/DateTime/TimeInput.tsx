import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, OptionProps, SelectProps, Elements as Attr} from '../../Attributes';
import {FormOption} from '../../Common';
const css = classNames.bind(require('./TimeInput.module.scss'));

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

export interface TimeInputProps {
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
export const TimeInput = React.memo((props: TimeInputProps) => {
    const localTimezone = props.localTimezone ?? true;

    const secondInputRef = React.useRef<HTMLSelectElement>();
    const minuteInputRef = React.useRef<HTMLSelectElement>();
    const hourInputRef = React.useRef<HTMLSelectElement>();
    const periodInputRef = React.useRef<HTMLSelectElement>();

    const handleTimezone = React.useCallback(() => {
        const date = props.value 
            ? new Date(props.value)
            : new Date();

        let hours: number, minutes: number, seconds: number;
        if (props.value) {
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

        return localTimezone
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
    }, [localTimezone, props.value]);

    const { periodHours, hours, minutes, seconds } = React.useMemo(() => {
       const time = handleTimezone();

        const hoursTz = localTimezone ? time.getHours() : time.getUTCHours();
        const hours = !isNaN(hoursTz) ? hoursTz : 0;
        const displayHours = !props.militaryTime && hours > 11 ? hours - 12 : hours;

        const minutesTz = localTimezone ? time.getMinutes() : time.getUTCMinutes();
        const minutes = !isNaN(minutesTz) ? minutesTz : 0;

        const secondsTz = localTimezone ? time.getSeconds() : time.getUTCSeconds();
        const seconds = !isNaN(secondsTz) ? secondsTz : 0;

        return {
            periodHours: hours,
            hours: displayHours < 10 ? `0${displayHours}` : displayHours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds: seconds < 10 ? `0${seconds}` : seconds
        };
    }, [props.militaryTime, props.value, handleTimezone]);

    const [currentPeriod, setCurrentPeriod] = React.useState<'AM' | 'PM'>(periodHours < 12 ? 'AM' : 'PM');
    const update = React.useCallback((name: 'hours' | 'minutes' | 'seconds' | 'period', value: string) => {
        const newDate = handleTimezone(); 

        if (localTimezone) {
            if (name !== 'period') {
                const val = parseInt(value);
                switch (name) {
                    case 'hours':
                        newDate.setHours(val);
                        break;
                    case 'minutes':
                        newDate.setMinutes(val);
                        break;
                    case 'seconds':
                        newDate.setSeconds(val);
                        break;
                }
            // if period is updated we know it's not military time
            } else {
                if (value === 'AM') {
                    newDate.setHours(newDate.getHours() - 12);
                }
                if (value === 'PM') {
                    newDate.setHours(newDate.getHours() + 12);
                }
                setCurrentPeriod(value as 'AM' | 'PM');
            }
        } else {
            if (name !== 'period') {
                const val = parseInt(value);
                switch (name) {
                    case 'hours':
                        newDate.setUTCHours(val);
                        break;
                    case 'minutes':
                        newDate.setUTCMinutes(val);
                        break;
                    case 'seconds':
                        newDate.setUTCSeconds(val);
                        break;
                }
            // if period is updated we know it's not military time
            } else {
                if (value === 'AM') {
                    newDate.setUTCHours(newDate.getUTCHours() - 12);
                }
                if (value === 'PM') {
                    newDate.setUTCHours(newDate.getUTCHours() + 12);
                }
                setCurrentPeriod(value as 'AM' | 'PM');
            }
        }

        props.onChange && props.onChange(newDate.toJSON());
    }, [handleTimezone, props.onChange, localTimezone]);

    const hourList = React.useMemo(() => {
        const numHours = props.militaryTime ? 24 : 12;
        const hourList = [];
        for (let index = 1; index < numHours; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            hourList.push({label: value, value: value});
        }
        hourList.push({label: '12', value: '00'});

        return hourList;
    }, [props.militaryTime]);

    const { minuteList, secondList } = React.useMemo(() => {
        const minuteList = [];
        const secondList = [];

        for (let index = 0; index < 60; index++) {
            const value = index < 10 ? `0${index}` : `${index}`;
            minuteList.push({label: value, value: value});
            secondList.push({label: value, value: value});
        }

        return { minuteList, secondList };
    }, []);

    const inputClassName = css('time-input', {'error': props.error}, props.inputClassName);

    const optionMap = React.useCallback((option, attr) => {
        return <Attr.option
            value={option.value}
            key={option.value}
            disabled={option.disabled}
            hidden={option.hidden}
            attr={attr}
        >
            {option.label}
        </Attr.option>;
    }, []);

    const period = props.militaryTime 
        ? '' 
        : <Attr.select
            name={props.name}
            value={currentPeriod}
            disabled={props.disabled}
            onChange={() => update('period', periodInputRef.current.value)}
            methodRef={periodInputRef}
            className={css(inputClassName, 'time-input-period')}
            attr={props.attr?.periodSelect}
        >
            <Attr.option
                value='AM'
                attr={props.attr?.periodOption}
            >
                {props.amLabel ?? 'AM'}
            </Attr.option>
            <Attr.option
                value='PM'
                attr={props.attr?.periodOption}
            >
                {props.pmLabel ?? 'PM'}
            </Attr.option>
        </Attr.select>;

    const secondsInput = props.showSeconds !== true 
        ? ''
        : <Attr.select
            name={props.name}
            value={seconds}
            disabled={props.disabled}
            onChange={() => update('seconds', secondInputRef.current.value)}
            methodRef={secondInputRef}
            className={inputClassName}
            attr={props.attr?.secondSelect}
        >
            {secondList.map(option => optionMap(option, props.attr?.secondOption))}
        </Attr.select>;

    return (
        <Attr.div
        className={css('time-input-container', props.className)}
        attr={props.attr?.container}
        >
            <Attr.select
                name={props.name}
                value={hours}
                disabled={props.disabled}
                onChange={() => update('hours', hourInputRef.current.value)}
                methodRef={hourInputRef}
                className={inputClassName}
                attr={props.attr?.hourSelect}
            >
                {hourList.map(option => optionMap(option, props.attr?.hourOption))}
            </Attr.select>
            <Attr.select
                name={props.name}
                value={minutes}
                disabled={props.disabled}
                onChange={() => update('minutes', minuteInputRef.current.value)}
                methodRef={minuteInputRef}
                className={inputClassName}
                attr={props.attr?.minuteSelect}
            >
                {minuteList.map(option => optionMap(option, props.attr?.minuteOption))}
            </Attr.select>
            {secondsInput}
            {period}
        </Attr.div>
    );
});

export default TimeInput;
