import * as React from 'react';
import * as classNames from 'classnames/bind';
import {ActionTrigger} from '../ActionTrigger';
import {dateIsValid} from './helpers';
const css = classNames.bind(require('./Calendar.scss'));

export interface CalendarComponentType {}

export interface CalendarProps extends React.Props<CalendarComponentType> {
    /** Current selected date */
    value?: Date;

    /** Year to display (otherwise shows the year from value) */
    year?: number;
    /** Month to display (otherwise shows the month from value) */
    month?: number;

    /** Whether Calendar buttons are in tab order */
    tabAccessible?: boolean;

    /**
     * Callback for date change events
     * */
    onChange: (newValue: Date) => void;

    /** Classname to append to top level element */
    className?: string;
}

export interface CalendarState {
    /** Date of the current month open in view */
    currentDate: Date;
    /** Whether or not props.year/month updates update the view */
    detached: boolean;
}

/**
 * Calendar control
 * 
 * @param props Control properties (defined in `CalendarProps` interface)
 */
export class Calendar extends React.Component<CalendarProps, CalendarState> {
    static defaultProps = {
        tabAccessible: false
    };

    monthNames: string[];
    dayNames: string[];

    constructor(props: CalendarProps) {
        super(props);

        let currentDate;
        if (this.props.value) {
            currentDate = this.props.value;
        } else {
            currentDate = new Date();
        }

        if (props.month === 0 || props.month > 0) {
            currentDate.setMonth(props.month);
        }
        if (props.year > 1000) {
            currentDate.setFullYear(props.year);
        }

        this.state = {
            currentDate: currentDate,
            detached: false
        };

        this.onClick = this.onClick.bind(this);
        this.onPrevMonth = this.onPrevMonth.bind(this);
        this.onNextMonth = this.onNextMonth.bind(this);

        const locale = navigator['userLanguage'] || (navigator.language || 'en-us');
        this.monthNames = [];
        const date = new Date();
        this.monthNames = [];
        for (let month = 0; month < 12; month++) {
            date.setMonth(month);
            this.monthNames.push(
                date.toLocaleDateString(locale, {month: 'long'})
            );
        }

        this.dayNames = [];
        date.setDate(date.getDate() - date.getDay());
        for (let day = 0; day < 7; day++) {
            this.dayNames.push(
                date.toLocaleDateString(locale, {weekday: 'short'}).toUpperCase()
            );
            date.setDate(date.getDate() + 1);
        }
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        const date = new Date(this.state.currentDate);
        let update = false;
        if (newProps.year !== this.props.year && newProps.year >= 1000) {
            date.setFullYear(newProps.year);
            update = true;
        }
        if (
            newProps.month !== this.props.month && 
            (newProps.month === 0 || newProps.month > 0)
        ) {
            date.setMonth(newProps.month);
            update = true;
        }
        if (update && !this.state.detached && dateIsValid(date)) {
            this.setState({currentDate: date});
        }
    }

    onClick(date: Date) {
        if (this.props.onChange) {
            this.props.onChange(date);
            this.setState({
                currentDate: date,
                detached: false
            });
        }
    }

    onPrevMonth(event) {
        event.preventDefault();
        
        /** Dates are mutable so we're going to copy it over */
        const date = this.state.currentDate;
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);

        this.setState({currentDate: newDate, detached: true});
    }

    onNextMonth(event) {
        event.preventDefault();
        
        /** Dates are mutable so we're going to copy it over */
        const date = this.state.currentDate;
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

        this.setState({currentDate: newDate, detached: true});
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');
        const tabIndex = this.props.tabAccessible ? 0 : -1;        

        const curYear = this.state.currentDate.getFullYear();
        const curMonth = this.state.currentDate.getMonth();
        const curDate = this.state.currentDate.getDate();
        const curDay = this.state.currentDate.getDay();

        // First day of `month`
        let start = new Date(curYear, curMonth, 1);
        // Last day of `month`
        let end = new Date(curYear, curMonth + 1, 0);

        start.setDate(start.getDate() - start.getDay());
        end.setDate(end.getDate() + (6 - end.getDay()));

        let rows = [], row = [];
        while (start <= end) {
            // We have to copy the date, otherwise it will get modified in place
            row.push(new Date(start));
            if (row.length >= 7) {
                rows.push(row);
                row = [];
            }
            start.setDate(start.getDate() + 1);
        }

        const content = rows.map((row, rowIndex) => {
            let inner = row.map((col, colIndex) => {
                const onClick = (event) => {
                    this.onClick(col);
                    event.preventDefault();
                };
                const date = col.getDate();
                
                /** Grayed out day from another month */
                if (col.getMonth() !== curMonth) {
                    return (
                        <button
                            className={colClassName}
                            onClick={onClick}
                            key={date}
                            tabIndex={tabIndex}
                        >
                            {date}
                        </button>
                    );
                }
                
                /** Selected day */
                if (this.props.value) {
                    const isSelected = (
                        date === this.props.value.getDate() &&
                        col.getMonth() === this.props.value.getMonth() &&
                        col.getFullYear() === this.props.value.getFullYear()
                    );
                    if (isSelected) {
                        return (
                            <button
                                className={css('selected')}
                                onClick={onClick}
                                key={date}
                                tabIndex={tabIndex}
                            >
                                {date}
                            </button>
                        );
                    }
                }

                /** Everything else */
                return (
                    <button onClick={onClick} key={date} tabIndex={tabIndex}>
                        {date}
                    </button>
                );
            });

            return (
                <div className={rowClassName} key={rowIndex}>
                    {inner}
                </div>
            );
        });

        const weekdays = this.dayNames.map(day => {
            return <div key={day}>{day}</div>;
        });

        return (
            <div className={css('calendar', this.props.className)}>
                <div className={css('calendar-header')}>
                    <div className={css('calendar-month')}>
                        {`${this.monthNames[curMonth]} ${curYear}`}
                    </div>
                    <button
                        className={css('calendar-chevron')}
                        onClick={this.onPrevMonth}
                        tabIndex={tabIndex}
                    >
                        <ActionTrigger icon='chevronUp' />
                    </button>
                    <button
                        className={css('calendar-chevron')}
                        onClick={this.onNextMonth}
                        tabIndex={tabIndex}
                    >
                        <ActionTrigger icon='chevronDown' />
                    </button>
                </div>
                <div className={css('calendar-days')}>
                    {weekdays}
                </div>
                {content}
            </div>
        );
    }
}
export default Calendar;
