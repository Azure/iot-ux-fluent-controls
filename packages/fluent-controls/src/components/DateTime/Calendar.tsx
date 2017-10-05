import * as React from 'react';
import * as classNames from 'classnames/bind';
import {ActionTrigger} from '../ActionTrigger';
import {getLocalMonths, getLocalWeekdays} from './helpers';
import {keyCode, MethodDate, weekLength} from '../../Common';
const css = classNames.bind(require('./Calendar.scss'));

export interface CalendarComponentType {}

export interface CalendarProps extends React.Props<CalendarComponentType> {
    /** Current selected date */
    value?: Date | string;

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
    currentDate: MethodDate;
    /** Whether or not props.year/month updates update the view */
    detached: boolean;
    /** Whether accessibility is activated */
    accessibility: boolean;
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
    
    private value: MethodDate;
    private monthNames: string[];
    private dayNames: string[];
    private buttons: {[date: string]: HTMLButtonElement};
    private buttonIndex: number;

    constructor(props: CalendarProps) {
        const locale = navigator['userLanguage'] || (navigator.language || 'en-us');
        super(props);
        
        if (typeof(this.props.value) === 'string') {
            this.value = MethodDate.fromString(this.props.localTimezone, this.props.value);
        } else if (this.props.value) {
            this.value = MethodDate.fromDate(this.props.localTimezone, this.props.value);
        } else {
            this.value = new MethodDate(this.props.localTimezone);
        }
        
        let currentDate = this.value.copy();
        if (props.year > 0) {
            currentDate.year = props.year;
        }
        if (props.month === 0 || props.month > 0) {
            currentDate.month = props.month;
        }
        currentDate.date = 1;
        this.state = {
            currentDate: currentDate,
            detached: false,
            accessibility: false
        };

        this.monthNames = getLocalMonths(locale);

        this.dayNames = getLocalWeekdays(locale);

        this.buttons = {};
        this.buttonIndex = 0;
        this.dayRef = this.dayRef.bind(this);

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    get focusedButton(): HTMLButtonElement {
        return this.buttons[this.state.currentDate.date - 1];
    }

    public startAccessibility() {
        const newDate = this.state.currentDate.copy();
        newDate.date = 1;

        this.setState({
            accessibility: true,
            currentDate: newDate
        });
    }

    public stopAccessibility() {
        this.setState({
            accessibility: false
        });
    }

    dayRef(element: HTMLButtonElement) {
        if (element) {
            this.buttons[this.buttonIndex] = element;
            this.buttonIndex++;
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    componentDidUpdate(oldProps: CalendarProps, oldState: CalendarState) {
        if (this.state.accessibility && this.state.currentDate !== oldState.currentDate) {
            this.focusedButton.focus();
        }
        this.buttonIndex = 0;        
    }

    componentWillReceiveProps(newProps: CalendarProps) {
        const date = this.state.currentDate.copy();
        let update = false;
        if (newProps.year !== this.props.year && newProps.year > 0) {
            date.year = newProps.year;
            update = true;
        }
        if (
            newProps.month !== this.props.month &&
            (newProps.month === 0 || newProps.month > 0)
        ) {
            date.month = newProps.month;
            update = true;
        }
        if (update && !this.state.detached && date.isValid()) {
            this.setState({currentDate: date});
        }
        if (this.props.value !== newProps.value) {
            if (typeof(newProps.value) === 'string') {
                this.value = MethodDate.fromString(newProps.localTimezone, newProps.value);
            } else if (newProps.value) {
                this.value = MethodDate.fromDate(newProps.localTimezone, newProps.value);
            } else {
                this.value = new MethodDate(newProps.localTimezone);
            }
        }
    }

    onKeyDown(event) {
        if (!this.state.accessibility) {
            return;
        }
        if (document.activeElement === this.focusedButton) {
            const date = this.state.currentDate.copy();
            let detached = this.state.detached;
            let newDay = date.date;
            let newMonth = date.month;
            let newYear = date.year;
            let weekMove = false;
            switch (event.keyCode) {
                case keyCode.left:
                    newDay -= 1;
                    break;
                case keyCode.right:
                    newDay += 1;
                    break;
                case keyCode.up:
                    weekMove = true;
                    newDay -= 7;
                    break;
                case keyCode.down:
                    weekMove = true;
                    newDay += 7;
                    break;
                case keyCode.pageup:
                    if (event.ctrlKey) {
                        newYear -= 1;
                    } else {
                        newMonth -= 1;
                    }
                    break;
                case keyCode.pagedown:
                    if (event.ctrlKey) {
                        newYear += 1;
                    } else {
                        newMonth += 1;
                    }
                    break;
                case keyCode.home:
                    newDay = 1;
                    break;
                case keyCode.end:
                    newDay = 0;
                    newMonth += 1;
                    break;
                default:
                    return;
            }
            date.year = newYear;
            date.month = newMonth;
            date.date = newDay;

            if (newDay > 0 && date.date !== newDay && !weekMove) {
                date.month += 1;
                date.date = 0;
            }
            
            event.stopPropagation();
            event.preventDefault();
            this.setState({
                currentDate: date,
                detached: detached
            });
        }
    }

    onClick(date: MethodDate) {
        if (this.props.onChange) {
            this.props.onChange(date.dateObject);
            this.setState({
                currentDate: MethodDate.fromDate(this.props.localTimezone, date.dateObject),
                detached: false,
                accessibility: false
            });
        }
    }

    onFocus(date: number, event) {
        if (!this.state.accessibility) {
            const newDate = this.state.currentDate.copy();
            newDate.date = date;
            this.setState({currentDate: newDate, accessibility: true});
        }
    }

    onPrevMonth(event) {
        event.preventDefault();

        /** Dates are mutable so we're going to copy it over */
        const newDate = this.state.currentDate.copy();
        const curDate = newDate.date;
        const targetMonth = newDate.month === 0 ? 11 : newDate.month - 1;
        newDate.month -= 1;

        if (newDate.month !== targetMonth || newDate.date !== curDate) {
            newDate.date = 1;
            newDate.month = targetMonth + 1;
            newDate.date = 0;
        }
        this.setState({currentDate: newDate, detached: true});
    }

    onNextMonth(event) {
        event.preventDefault();

        /** Dates are mutable so we're going to copy it over */
        const newDate = this.state.currentDate.copy();
        const curDate = newDate.date;
        const targetMonth = newDate.month === 11 ? 0 : newDate.month + 1;
        newDate.month += 1;

        if (newDate.month !== targetMonth || newDate.date !== curDate) {
            newDate.date = 1;
            newDate.month = targetMonth + 1;
        }
        this.setState({currentDate: newDate, detached: true});
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');
        const tabIndex = this.props.tabIndex;

        const curYear = this.state.currentDate.year;
        const curMonth = this.state.currentDate.month;
        const curDate = this.state.currentDate.date;

        const weekdays = this.dayNames.map(day => {
            return <div key={day}>{day}</div>;
        });

        // First day of `month`
        let start = this.state.currentDate.copy();
        start.date = 1;
        
        // Last day of `month`
        let end = this.state.currentDate.copy();
        end.date = 1;
        end.month += 1;
        end.date = 0;

        let rows = [], row = [];

        start.date = start.date - start.dateObject.getDay();
        end.date = end.date + (6 - end.dateObject.getDay());

        while (start.isBefore(end)) {
            // We have to copy the date, otherwise it will get modified in place
            row.push(start.copy());
            if (row.length >= weekLength) {
                rows.push(row);
                row = [];
            }
            start.date += 1;
        }
        
        const content = rows.map((row, rowIndex) => {
            let inner = row.map((col, colIndex) => {
                const onClick = (event) => {
                    this.onClick(col);
                    event.preventDefault();
                };

                const date = col.date;
                const colMonth = col.month;
                const key = `${colMonth}-${date}`;
                /** Grayed out day from another month */
                if (colMonth !== curMonth) {
                    return (
                        <button
                            className={colClassName}
                            onClick={onClick}
                            key={key}
                            tabIndex={tabIndex}
                        >
                            {date}
                        </button>
                    );
                }

                /** Selected day */
                if (this.props.value) {
                    const isSelected = (
                        this.props.value &&
                        date === this.value.date &&
                        col.month === this.value.month &&
                        col.year === this.value.year
                    );
                    if (isSelected) {
                        return (
                            <button
                                className={css('selected')}
                                onClick={onClick}
                                key={key}
                                tabIndex={tabIndex}
                                ref={this.dayRef}
                                onFocus={this.onFocus.bind(this, date)}
                            >
                                {date}
                            </button>
                        );
                    }
                }

                /** Everything else */
                return (
                    <button
                        onClick={onClick}
                        key={key}
                        tabIndex={tabIndex}
                        ref={this.dayRef}
                        onFocus={this.onFocus.bind(this, date)}
                    >
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
