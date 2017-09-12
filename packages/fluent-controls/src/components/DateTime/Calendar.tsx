import * as React from 'react';
import * as classNames from 'classnames/bind';
import {ActionTrigger} from '../ActionTrigger';
const css = classNames.bind(require('./Calendar.scss'));

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];


export interface CalendarComponentType {}

export interface CalendarProps extends React.Props<CalendarComponentType> {
    /** Current selected date */
    value?: Date;

    /**
     * Callback for date change events
     * */
    onChange: (newValue: Date) => void;

    /** Classname to append to top level element */
    className?: string;
}

export interface CalendarState {
    currentDate: Date;
}

/**
 * Calendar control
 * 
 * @param props Control properties (defined in `CalendarProps` interface)
 */
export class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);

        let currentDate;
        if (this.props.value) {
            currentDate = this.props.value;
        } else {
            currentDate = new Date();
        }

        this.state = {
            currentDate: currentDate
        };

        this.onClick = this.onClick.bind(this);
        this.onPrevMonth = this.onPrevMonth.bind(this);
        this.onNextMonth = this.onNextMonth.bind(this);
    }

    onClick(date: Date) {
        if (this.props.onChange) {
            this.props.onChange(date);
        }
    }

    onPrevMonth(event) {
        event.preventDefault();
        
        /** Dates are mutable so we're going to copy it over */
        const date = this.state.currentDate;
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);

        this.setState({currentDate: newDate});
    }

    onNextMonth(event) {
        event.preventDefault();
        
        /** Dates are mutable so we're going to copy it over */
        const date = this.state.currentDate;
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

        this.setState({currentDate: newDate});
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');

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
                        <a href='#' className={colClassName} onClick={onClick} key={date}>
                            {date}
                        </a>
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
                            <a href='#' className={css('selected')} onClick={onClick} key={date}>
                                {date}
                            </a>
                        );
                    }
                }

                /** Everything else */
                return (
                    <a href='#' onClick={onClick} key={date}>
                        {date}
                    </a>
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
                        {`${months[curMonth]} ${curYear}`}
                    </div>
                    <a href='#' className={css('calendar-chevron')} onClick={this.onPrevMonth}>
                        <ActionTrigger icon='chevronUp' />
                    </a>
                    <a href='#' className={css('calendar-chevron')} onClick={this.onNextMonth}>
                        <ActionTrigger icon='chevronDown' />
                    </a>
                </div>
                <div className={css('calendar-days')}>
                    <div>SUN</div>
                    <div>MON</div>
                    <div>TUE</div>
                    <div>WED</div>
                    <div>THU</div>
                    <div>FRI</div>
                    <div>SAT</div>
                </div>
                {content}
            </div>
        );
    }
}
export default Calendar;
