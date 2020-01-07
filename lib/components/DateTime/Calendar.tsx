import * as React from 'react';
import * as classNames from 'classnames/bind';
import { DivProps, ButtonProps, Elements as Attr } from '../../Attributes';
import { ActionTriggerButton, ActionTriggerButtonAttributes } from '../ActionTrigger/ActionTriggerButton';
import { getLocalMonths, getLocalWeekdays } from './helpers';
import { keyCode, MethodDate, weekLength } from '../../Common';
const css = classNames.bind(require('./Calendar.module.scss'));

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

export interface CalendarProps {
    /** Current selected date */
    value?: Date | string;
    /** i18n locale */
    locale?: string;

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
}

/**
 * Calendar control
 *
 * @param props Control properties (defined in `CalendarProps` interface)
 * @deprecated This is not fully localized/accessible. Use https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker instead.
 */
export const Calendar = React.memo((props: CalendarProps) => {
    const localTimezone = props.localTimezone ?? true;

    const { monthNames, dayNames } = React.useMemo(() => {
        return {
            monthNames: getLocalMonths(props.locale),
            dayNames: getLocalWeekdays(props.locale)
        };
    }, [props.locale]);

    const containerRef = React.useRef<HTMLDivElement>();
    const nextFocusCol = React.useRef<number | undefined>();
    const nextFocusRow = React.useRef<number | undefined>();

    const value = React.useMemo(() => {
        if (typeof (props.value) === 'string') {
            return MethodDate.fromString(localTimezone, props.value);
        } else if (props.value) {
            return MethodDate.fromDate(localTimezone, props.value);
        }
        return new MethodDate(localTimezone);
    }, [props.value, localTimezone]);

    // We use a date instead of just year and month to delegate the decrement and increment logic to the date object
    const [displayDate, setDisplayDate] = React.useState(() => getNewDate(value, props.year, props.month));
    React.useEffect(() => {
        setDisplayDate(currentDate => getNewDate(currentDate, props.year, props.month));
    }, [value, props.month, props.year]);

    const decrementMonth = React.useCallback(() => {
        setDisplayDate(currentDate => {
            /** Dates are mutable so we're going to copy it over */
            const newDate = currentDate.copy();
            const curDate = newDate.date;
            const targetMonth = newDate.month === 0 ? 11 : newDate.month - 1;
            newDate.month -= 1;

            if (newDate.month !== targetMonth || newDate.date !== curDate) {
                newDate.date = 1;
                newDate.month = targetMonth + 1;
                newDate.date = 0;
            }

            return newDate;
        });
    }, [setDisplayDate]);

    const incrementMonth = React.useCallback(() => {
        setDisplayDate(currentDate => {
            /** Dates are mutable so we're going to copy it over */
            const newDate = currentDate.copy();
            const curDate = newDate.date;
            const targetMonth = newDate.month === 11 ? 0 : newDate.month + 1;
            newDate.month += 1;

            if (newDate.month !== targetMonth || newDate.date !== curDate) {
                newDate.date = 1;
                newDate.month = targetMonth + 1;
            }

            return newDate;
        });
    }, [setDisplayDate]);

    const onPrevMonth = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();
        decrementMonth();
    }, [decrementMonth]);

    const onNextMonth = React.useCallback((event: React.SyntheticEvent) => {
        event.preventDefault();
        incrementMonth();
    }, [incrementMonth]);

    const onClick = React.useCallback((date: MethodDate) => {
        props.onChange && props.onChange(date.dateObject);
        setDisplayDate(MethodDate.fromDate(localTimezone, date.dateObject));
    }, [props.onChange, localTimezone, setDisplayDate]);

    const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        const element: HTMLElement = e.currentTarget;
        const row = parseInt(element.getAttribute('data-row'));
        const col = parseInt(element.getAttribute('data-col'));

        if (!isNaN(row) && !isNaN(col)) {
            let nextRow = row;
            let nextCol = col;
            let nextFocus: HTMLElement;
            switch (e.keyCode) {
                case keyCode.pagedown:
                    e.preventDefault();
                    e.stopPropagation();
                    nextFocusCol.current = nextCol;
                    nextFocusRow.current = nextRow;
                    incrementMonth();
                    break;
                case keyCode.pageup:
                    e.preventDefault();
                    e.stopPropagation();
                    nextFocusCol.current = nextCol;
                    nextFocusRow.current = nextRow;
                    decrementMonth();
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
            nextFocus = containerRef.current.querySelectorAll(`[data-row="${nextRow}"][data-col="${nextCol}"]`)[0] as HTMLElement;
            // if we found the next button to focus on, focus it
            if (nextFocus != null) {
                nextFocus.focus();
            }
        }
    }, [incrementMonth, decrementMonth]);

    const rowClassName = css('calendar-row');
    const colClassName = css('disabled');

    const weekdays = dayNames.map(day => {
        return (
            <Attr.div key={day} attr={props.attr?.weekDayHeader}>
                {day}
            </Attr.div>
        );
    });

    const curYear = displayDate.year;
    const curMonth = displayDate.month;

    const rows = React.useMemo<MethodDate[][]>(() => {
        // First day of `month`
        const start = displayDate.copy();
        start.date = 1;

        // Last day of `month`
        const end = displayDate.copy();
        end.date = 1;
        end.month += 1;
        end.date = 0;

        const rows: MethodDate[][] = [];
        let row: MethodDate[] = [];

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

        return rows;
    }, [displayDate, localTimezone]);

    React.useEffect(() => {
        if (nextFocusRow.current != null && nextFocusCol.current != null) {
            const nextFocus = containerRef.current.querySelectorAll(`[data-row="${nextFocusRow.current}"][data-col="${nextFocusCol.current}"]`)[0] as HTMLElement;
            if (nextFocus != null) {
                nextFocus.focus();
            }
            nextFocusRow.current = undefined;
            nextFocusCol.current = undefined;
        }
    });

    const content = rows.map((row, rowIndex) => {
        let inner = row.map((col, colIndex) => {
            const handleClick = (event: React.SyntheticEvent) => {
                onClick(col);
                event.preventDefault();
            };

            const date = col.date;
            const colMonth = col.month;
            const key = `${colMonth}-${date}`;
            const ariaLabel = new Date(`${curYear}-${colMonth + 1}-${date}`).toLocaleDateString(props.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            /** Grayed out day from another month */
            if (colMonth !== curMonth) {
                return (
                    <Attr.button
                        type='button'
                        aria-label={ariaLabel}
                        data-row={rowIndex}
                        data-col={colIndex}
                        onKeyDown={onKeyDown}
                        className={colClassName}
                        onClick={handleClick}
                        key={key}
                        attr={props.attr?.dateButton}
                    >
                        {date}
                    </Attr.button>
                );
            }

            /** Selected day */
            if (props.value) {
                const isSelected = (
                    date === value.date &&
                    col.month === value.month &&
                    col.year === value.year
                );
                if (isSelected) {
                    return (
                        <Attr.button
                            type='button'
                            aria-label={ariaLabel}
                            data-row={rowIndex}
                            data-col={colIndex}
                            onKeyDown={onKeyDown}
                            className={css('selected')}
                            onClick={handleClick}
                            key={key}
                            attr={props.attr?.dateButton}
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
                    aria-label={ariaLabel}
                    data-row={rowIndex}
                    data-col={colIndex}
                    onKeyDown={onKeyDown}
                    onClick={handleClick}
                    key={key}
                    attr={props.attr?.dateButton}
                >
                    {date}
                </Attr.button>
            );
        });

        return (
            <Attr.div
                className={rowClassName}
                key={rowIndex}
                attr={props.attr?.dateRow}
            >
                {inner}
            </Attr.div>
        );
    });

    return (
        <Attr.div
            methodRef={containerRef}
            className={css('calendar', props.className)}
            attr={props.attr?.container}
        >
            <Attr.div
                className={css('calendar-header')}
                attr={props.attr?.header}
            >
                <Attr.div
                    className={css('calendar-month')}
                    attr={props.attr?.monthHeader}
                >
                    {`${monthNames[curMonth]} ${curYear}`}
                </Attr.div>
                <div className={css('action-bar')}>
                    <ActionTriggerButton
                        className={css('calendar-chevron')}
                        onClick={onPrevMonth}
                        icon='chevronUp'
                        attr={props.attr?.prevMonthButton}
                    />
                    <ActionTriggerButton
                        icon='chevronDown'
                        className={css('calendar-chevron')}
                        onClick={onNextMonth}
                        attr={props.attr?.nextMonthButton}
                    />
                </div>
            </Attr.div>
            <Attr.div
                className={css('calendar-days')}
                attr={props.attr?.dateContainer}
            >
                {weekdays}
            </Attr.div>
            {content}
        </Attr.div>
    );
});

function getNewDate(currentDate: MethodDate, year?: number, month?: number) {
    const newDate = currentDate.copy();

    if (year && year > 0) {
        newDate.year = year;
    }

    if (month && month >= 0) {
        newDate.month = month;
    }

    newDate.date = 1;

    if (newDate.isValid()) {
        return newDate;
    }

    return currentDate;
}

export default Calendar;
