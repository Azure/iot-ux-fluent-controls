import * as React from 'react';
import * as classNames from 'classnames/bind';
import {ActionTrigger} from '../ActionTrigger';
import * as helpers from './helpers';
const css = classNames.bind(require('./Calendar.scss'));

export interface CalendarComponentType {}

export interface CalendarProps extends React.Props<CalendarComponentType> {
    /** Current selected date */
    value?: Date;

    /** Year to display (otherwise shows the year from value) */
    year?: number;
    /** Month to display (otherwise shows the month from value) */
    month?: number;

    /**
     * Treat the Date object with the local timezone
     *
     * Default: true
     */
    localTimezone?: boolean;

    /** Tab index of calendar buttons */
    tabIndex?: number;

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
        localTimezone: true,
        tabIndex: -1
    };

    private monthNames: string[];
    private dayNames: string[];

    constructor(props: CalendarProps) {
        const locale = navigator['userLanguage'] || (navigator.language || 'en-us');
        let currentDate = new Date();

        super(props);

        if (this.props.value) {
            currentDate = this.props.value;
        }
        if (props.month === 0 || props.month > 0) {
            if (props.localTimezone) {
                currentDate.setMonth(props.month);
            } else {
                currentDate.setUTCMonth(props.month);
            }
        }
        if (props.year > 0) {
            if (props.localTimezone) {
                currentDate.setFullYear(props.year);
            } else {
                currentDate.setUTCFullYear(props.year);
            }
        }

        this.state = {
            currentDate: currentDate,
            detached: false
        };

        this.monthNames = helpers.getLocalMonths(locale);

        this.dayNames = helpers.getLocalWeekdays(locale);
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        const date = new Date(this.state.currentDate);
        let update = false;
        if (newProps.year !== this.props.year && newProps.year > 0) {
            if (this.props.localTimezone) {
                date.setFullYear(newProps.year);
            } else {
                date.setUTCFullYear(newProps.year);
            }
            update = true;
        }
        if (
            newProps.month !== this.props.month &&
            (newProps.month === 0 || newProps.month > 0)
        ) {
            if (this.props.localTimezone) {
                date.setMonth(newProps.month);
            } else {
                date.setUTCMonth(newProps.month);
            }
            update = true;
        }
        if (update && !this.state.detached && helpers.dateIsValid(date)) {
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
        const newDate = this.props.localTimezone
            ? new Date(date.getFullYear(), date.getMonth() - 1, 1)
            : new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));

        this.setState({currentDate: newDate, detached: true});
    }

    onNextMonth(event) {
        event.preventDefault();

        /** Dates are mutable so we're going to copy it over */
        const date = this.state.currentDate;
        const newDate = this.props.localTimezone
            ? new Date(date.getFullYear(), date.getMonth() + 1, 1)
            : new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));

        this.setState({currentDate: newDate, detached: true});
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');
        const tabIndex = this.props.tabIndex;

        const curYear = this.props.localTimezone
            ? this.state.currentDate.getFullYear()
            : this.state.currentDate.getUTCFullYear();
        const curMonth = this.props.localTimezone
            ? this.state.currentDate.getMonth()
            : this.state.currentDate.getUTCMonth();
        const curDate = this.props.localTimezone
            ? this.state.currentDate.getDate()
            : this.state.currentDate.getUTCDate();
        const curDay = this.state.currentDate.getDay();

        const weekdays = this.dayNames.map(day => {
            return <div key={day}>{day}</div>;
        });

        // First day of `month`
        let start = new Date(curYear, curMonth, 1);
        // Last day of `month`
        let end = new Date(curYear, curMonth + 1, 0);
        let rows = [], row = [];

        if (this.props.localTimezone) {
            start.setDate(start.getDate() - start.getDay());
            end.setDate(end.getDate() + (6 - end.getDay()));
        } else {
            start.setUTCDate(start.getUTCDate() - start.getDay());
            end.setUTCDate(end.getUTCDate() + (6 - end.getDay()));
        }

        while (start <= end) {
            // We have to copy the date, otherwise it will get modified in place
            row.push(new Date(start));
            if (row.length >= helpers.weekLength) {
                rows.push(row);
                row = [];
            }
            if (this.props.localTimezone) {
                start.setDate(start.getDate() + 1);
            } else {
                start.setUTCDate(start.getUTCDate() + 1);
            }
        }

        const content = rows.map((row, rowIndex) => {
            let inner = row.map((col, colIndex) => {
                const onClick = (event) => {
                    this.onClick(col);
                    event.preventDefault();
                };
                const date = this.props.localTimezone ? col.getDate() : col.getUTCDate();

                const colMonth = this.props.localTimezone ? col.getMonth() : col.getUTCMonth();
                /** Grayed out day from another month */
                if (colMonth !== curMonth) {
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
                    const isSelected = this.props.localTimezone ? (
                        date === this.props.value.getDate() &&
                        col.getMonth() === this.props.value.getMonth() &&
                        col.getFullYear() === this.props.value.getFullYear()
                    ) : (
                        date === this.props.value.getUTCDate() &&
                        col.getUTCMonth() === this.props.value.getUTCMonth() &&
                        col.getUTCFullYear() === this.props.value.getUTCFullYear()
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

        return (
            <div className={css('calendar', this.props.className)}>
                <div className={css('calendar-header')}>
                    <div className={css('calendar-month')}>
                        {`${this.monthNames[curMonth]} ${curYear}`}
                    </div>
                    <button
                        className={css('calendar-chevron')}
                        onClick={event => this.onPrevMonth(event)}
                        tabIndex={tabIndex}
                    >
                        <ActionTrigger icon='chevronUp' />
                    </button>
                    <button
                        className={css('calendar-chevron')}
                        onClick={event => this.onNextMonth(event)}
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
