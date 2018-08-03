import * as React from 'react';
import * as classNames from 'classnames/bind';
import { DivProps, SpanProps, ButtonProps, Elements as Attr } from '../../Attributes';
import { ActionTriggerButton, ActionTriggerButtonAttributes } from '../ActionTrigger/ActionTriggerButton';
import { getLocalMonths, getLocalWeekdays } from './helpers';
import { keyCode, MethodDate, weekLength } from '../../Common';
const css = classNames.bind(require('./Calendar.scss'));

export interface CalendarComponentType { }

export interface CalendarAttributes {
    container?: DivProps;
    header?: DivProps;
    monthHeader?: DivProps;
    prevMonthButton?: ActionTriggerButtonAttributes;
    nextMonthButton?: ActionTriggerButtonAttributes;
    weekDayHeader?: DivProps;
    dateContainer?: DivProps;
    dateButton?: ButtonProps;
    dateRow?: DivProps;
}

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

    /**
     * Callback for date change events
     * */
    onChange: (newValue: Date) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: CalendarAttributes;
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
export class Calendar extends React.Component<CalendarProps, Partial<CalendarState>> {
    static defaultProps = {
        localTimezone: true,
        attr: {
            container: {},
            header: {},
            monthHeader: {},
            prevMonthButton: {},
            nextMonthButton: {},
            weekDayHeader: {},
            dateContainer: {},
            dateButton: {},
            dateRow: {},
        }
    };

    private value: MethodDate;
    private monthNames: string[];
    private dayNames: string[];
    private _container: HTMLDivElement;
    private nextFocusRow?: number;
    private nextFocusCol?: number;


    constructor(props: CalendarProps) {
        const locale = navigator['userLanguage'] || (navigator.language || 'en-us');
        super(props);

        if (typeof (this.props.value) === 'string') {
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

        this.onPrevMonth = this.onPrevMonth.bind(this);
        this.onNextMonth = this.onNextMonth.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.setContainerRef = this.setContainerRef.bind(this);
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

    componentWillReceiveProps(newProps: CalendarProps) {
        const date = this.state.currentDate.copy();
        let update = false;
        if (newProps.year !== this.props.year && newProps.year > 0) {
            date.year = newProps.year;
            update = true;
        }
        if (
            typeof (newProps.month) === 'number' &&
            newProps.month !== this.props.month &&
            (newProps.month === 0 || newProps.month > 0)
        ) {
            date.month = newProps.month;
            update = true;
        }
        if (update && !this.state.detached && date.isValid()) {
            this.setState({ currentDate: date });
        }
        if (this.props.value !== newProps.value || this.props.localTimezone !== newProps.localTimezone) {
            if (typeof (newProps.value) === 'string') {
                this.value = MethodDate.fromString(newProps.localTimezone, newProps.value);
            } else if (newProps.value) {
                this.value = MethodDate.fromDate(newProps.localTimezone, newProps.value);
            } else {
                this.value = new MethodDate(newProps.localTimezone);
            }
        }
    }

    componentDidUpdate() {
        if (this.nextFocusRow != null && this.nextFocusCol != null) {
            const nextFocus = this._container.querySelectorAll(`[data-row="${this.nextFocusRow}"][data-col="${this.nextFocusCol}"]`)[0] as HTMLElement;
            nextFocus.focus();
            this.nextFocusRow = undefined;
            this.nextFocusCol = undefined;
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
            this.setState({ currentDate: newDate, accessibility: true });
        }
    }

    onPrevMonth(event) {
        event.preventDefault();

        this.decrementMonth();
    }

    onNextMonth(event) {
        event.preventDefault();

        this.incrementMonth();
    }

    decrementMonth() {
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
        this.setState({ currentDate: newDate, detached: true });
    }

    incrementMonth() {
        /** Dates are mutable so we're going to copy it over */
        const newDate = this.state.currentDate.copy();
        const curDate = newDate.date;
        const targetMonth = newDate.month === 11 ? 0 : newDate.month + 1;
        newDate.month += 1;

        if (newDate.month !== targetMonth || newDate.date !== curDate) {
            newDate.date = 1;
            newDate.month = targetMonth + 1;
        }
        this.setState({ currentDate: newDate, detached: true });
    }

    onKeyDown(e: React.KeyboardEvent<any>) {
        const element: HTMLElement = e.currentTarget;
        const row = parseInt(element.getAttribute('data-row'), 10);
        const col = parseInt(element.getAttribute('data-col'), 10);

        if (!isNaN(row) && !isNaN(col)) {
            let nextRow = row;
            let nextCol = col;
            let nextFocus: HTMLElement;
            switch (e.keyCode) {
                case keyCode.pagedown:
                    e.preventDefault();
                    e.stopPropagation();
                    this.nextFocusCol = nextCol;
                    this.nextFocusRow = nextRow;
                    this.incrementMonth();
                    break;
                case keyCode.pageup:
                    e.preventDefault();
                    e.stopPropagation();
                    this.nextFocusCol = nextCol;
                    this.nextFocusRow = nextRow;
                    this.decrementMonth();
                    break;
                case keyCode.up:
                    e.preventDefault();
                    e.stopPropagation();
                    nextRow -= 1;
                    break;
                case keyCode.down:
                    e.preventDefault();
                    e.stopPropagation();
                    nextRow += 1;
                    break;
                case keyCode.left:
                    e.preventDefault();
                    e.stopPropagation();
                    nextCol -= 1;
                    if (nextCol < 0) {
                        nextCol = 6;
                        nextRow -= 1;
                    }
                    break;
                case keyCode.right:
                    e.preventDefault();
                    e.stopPropagation();
                    nextCol += 1;
                    if (nextCol > 6) {
                        nextCol = 0;
                        nextRow += 1;
                    }
                    break;
            }
            nextFocus = this._container.querySelectorAll(`[data-row="${nextRow}"][data-col="${nextCol}"]`)[0] as HTMLElement;
            // if we found the next button to focus on, focus it
            if (!!nextFocus) {
                nextFocus.focus();
            }
        }
    }

    setContainerRef(element: HTMLDivElement) {
        this._container = element;
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');

        const curYear = this.state.currentDate.year;
        const curMonth = this.state.currentDate.month;

        const weekdays = this.dayNames.map(day => {
            return (
                <Attr.div key={day} attr={this.props.attr.weekDayHeader}>
                    {day}
                </Attr.div>
            );
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

                // TODO aria-label with date

                const date = col.date;
                const colMonth = col.month;
                const key = `${colMonth}-${date}`;
                /** Grayed out day from another month */
                if (colMonth !== curMonth) {
                    return (
                        <Attr.button
                            type='button'
                            data-row={rowIndex}
                            data-col={colIndex}
                            onKeyDown={this.onKeyDown}
                            className={colClassName}
                            onClick={onClick}
                            key={key}
                            attr={this.props.attr.dateButton}
                        >
                            {date}
                        </Attr.button>
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
                            <Attr.button
                                type='button'
                                data-row={rowIndex}
                                data-col={colIndex}
                                onKeyDown={this.onKeyDown}
                                className={css('selected')}
                                onClick={onClick}
                                key={key}
                                onFocus={this.onFocus.bind(this, date)}
                                attr={this.props.attr.dateButton}
                            >
                                {date}
                            </Attr.button>
                        );
                    }
                }

                /** Everything else */
                return (
                    <Attr.button
                        type='button'
                        data-row={rowIndex}
                        data-col={colIndex}
                        onKeyDown={this.onKeyDown}
                        onClick={onClick}
                        key={key}
                        onFocus={this.onFocus.bind(this, date)}
                        attr={this.props.attr.dateButton}
                    >
                        {date}
                    </Attr.button>
                );
            });

            return (
                <Attr.div
                    className={rowClassName}
                    key={rowIndex}
                    attr={this.props.attr.dateRow}
                >
                    {inner}
                </Attr.div>
            );
        });
        return (
            <Attr.div
                methodRef={this.setContainerRef}
                className={css('calendar', this.props.className)}
                attr={this.props.attr.container}
            >
                <Attr.div
                    className={css('calendar-header')}
                    attr={this.props.attr.header}
                >
                    <Attr.div
                        className={css('calendar-month')}
                        attr={this.props.attr.monthHeader}
                    >
                        {`${this.monthNames[curMonth]} ${curYear}`}
                    </Attr.div>
                    <ActionTriggerButton
                        className={css('calendar-chevron')}
                        onClick={this.onPrevMonth}
                        icon='chevronUp'
                        attr={this.props.attr.prevMonthButton}
                    />
                    <ActionTriggerButton
                        icon='chevronDown'
                        className={css('calendar-chevron')}
                        onClick={this.onNextMonth}
                        attr={this.props.attr.nextMonthButton}
                    />
                </Attr.div>
                <Attr.div
                    className={css('calendar-days')}
                    attr={this.props.attr.dateContainer}
                >
                    {weekdays}
                </Attr.div>
                {content}
            </Attr.div>
        );
    }
}

export default Calendar;
