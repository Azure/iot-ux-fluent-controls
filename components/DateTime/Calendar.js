"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const ActionTriggerButton_1 = require("../ActionTrigger/ActionTriggerButton");
const helpers_1 = require("./helpers");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./Calendar.scss'));
/**
 * Calendar control
 *
 * @param props Control properties (defined in `CalendarProps` interface)
 */
class Calendar extends React.Component {
    constructor(props) {
        const locale = navigator['userLanguage'] || (navigator.language || 'en-us');
        super(props);
        if (typeof (this.props.value) === 'string') {
            this.value = Common_1.MethodDate.fromString(this.props.localTimezone, this.props.value);
        }
        else if (this.props.value) {
            this.value = Common_1.MethodDate.fromDate(this.props.localTimezone, this.props.value);
        }
        else {
            this.value = new Common_1.MethodDate(this.props.localTimezone);
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
        this.monthNames = helpers_1.getLocalMonths(locale);
        this.dayNames = helpers_1.getLocalWeekdays(locale);
        this.buttons = {};
        this.buttonIndex = 0;
        this.dayRef = this.dayRef.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    get focusedButton() {
        return this.buttons[this.state.currentDate.date - 1];
    }
    startAccessibility() {
        const newDate = this.state.currentDate.copy();
        newDate.date = 1;
        this.setState({
            accessibility: true,
            currentDate: newDate
        });
    }
    stopAccessibility() {
        this.setState({
            accessibility: false
        });
    }
    dayRef(element) {
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
    componentDidUpdate(oldProps, oldState) {
        if (this.state.accessibility && this.state.currentDate !== oldState.currentDate) {
            this.focusedButton.focus();
        }
        this.buttonIndex = 0;
    }
    componentWillReceiveProps(newProps) {
        const date = this.state.currentDate.copy();
        let update = false;
        if (newProps.year !== this.props.year && newProps.year > 0) {
            date.year = newProps.year;
            update = true;
        }
        if (typeof (newProps.month) === 'number' &&
            newProps.month !== this.props.month &&
            (newProps.month === 0 || newProps.month > 0)) {
            date.month = newProps.month;
            update = true;
        }
        if (update && !this.state.detached && date.isValid()) {
            this.setState({ currentDate: date });
        }
        if (this.props.value !== newProps.value || this.props.localTimezone !== newProps.localTimezone) {
            if (typeof (newProps.value) === 'string') {
                this.value = Common_1.MethodDate.fromString(newProps.localTimezone, newProps.value);
            }
            else if (newProps.value) {
                this.value = Common_1.MethodDate.fromDate(newProps.localTimezone, newProps.value);
            }
            else {
                this.value = new Common_1.MethodDate(newProps.localTimezone);
            }
        }
    }
    onKeyDown(event) {
        if (!this.state.accessibility) {
            return;
        }
        /** So that we don't block any browser shortcuts */
        if (event.ctrlKey || event.altKey) {
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
                case Common_1.keyCode.left:
                    newDay -= 1;
                    break;
                case Common_1.keyCode.right:
                    newDay += 1;
                    break;
                case Common_1.keyCode.up:
                    weekMove = true;
                    newDay -= 7;
                    break;
                case Common_1.keyCode.down:
                    weekMove = true;
                    newDay += 7;
                    break;
                case Common_1.keyCode.pageup:
                    if (event.ctrlKey) {
                        newYear -= 1;
                    }
                    else {
                        newMonth -= 1;
                    }
                    break;
                case Common_1.keyCode.pagedown:
                    if (event.ctrlKey) {
                        newYear += 1;
                    }
                    else {
                        newMonth += 1;
                    }
                    break;
                case Common_1.keyCode.home:
                    newDay = 1;
                    break;
                case Common_1.keyCode.end:
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
    onClick(date) {
        if (this.props.onChange) {
            this.props.onChange(date.dateObject);
            this.setState({
                currentDate: Common_1.MethodDate.fromDate(this.props.localTimezone, date.dateObject),
                detached: false,
                accessibility: false
            });
        }
    }
    onFocus(date, event) {
        if (!this.state.accessibility) {
            const newDate = this.state.currentDate.copy();
            newDate.date = date;
            this.setState({ currentDate: newDate, accessibility: true });
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
        this.setState({ currentDate: newDate, detached: true });
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
        this.setState({ currentDate: newDate, detached: true });
    }
    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');
        const tabIndex = this.props.tabIndex;
        const curYear = this.state.currentDate.year;
        const curMonth = this.state.currentDate.month;
        const curDate = this.state.currentDate.date;
        const weekdays = this.dayNames.map(day => {
            return (React.createElement(Attributes_1.Elements.div, { key: day, attr: this.props.attr.weekDayHeader }, day));
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
            if (row.length >= Common_1.weekLength) {
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
                    return (React.createElement(Attributes_1.Elements.button, { type: 'button', className: colClassName, onClick: onClick, key: key, tabIndex: tabIndex, attr: this.props.attr.dateButton }, date));
                }
                /** Selected day */
                if (this.props.value) {
                    const isSelected = (this.props.value &&
                        date === this.value.date &&
                        col.month === this.value.month &&
                        col.year === this.value.year);
                    if (isSelected) {
                        return (React.createElement(Attributes_1.Elements.button, { type: 'button', className: css('selected'), onClick: onClick, key: key, tabIndex: tabIndex, methodRef: this.dayRef, onFocus: this.onFocus.bind(this, date), attr: this.props.attr.dateButton }, date));
                    }
                }
                /** Everything else */
                return (React.createElement(Attributes_1.Elements.button, { type: 'button', onClick: onClick, key: key, tabIndex: tabIndex, methodRef: this.dayRef, onFocus: this.onFocus.bind(this, date), attr: this.props.attr.dateButton }, date));
            });
            return (React.createElement(Attributes_1.Elements.div, { className: rowClassName, key: rowIndex, attr: this.props.attr.dateRow }, inner));
        });
        return (React.createElement(Attributes_1.Elements.div, { className: css('calendar', this.props.className), attr: this.props.attr.container },
            React.createElement(Attributes_1.Elements.div, { className: css('calendar-header'), attr: this.props.attr.header },
                React.createElement(Attributes_1.Elements.div, { className: css('calendar-month'), attr: this.props.attr.monthHeader }, `${this.monthNames[curMonth]} ${curYear}`),
                React.createElement(ActionTriggerButton_1.ActionTriggerButton, { className: css('calendar-chevron'), onClick: event => this.onPrevMonth(event), tabIndex: tabIndex, icon: 'chevronUp', attr: this.props.attr.prevMonthButton }),
                React.createElement(ActionTriggerButton_1.ActionTriggerButton, { icon: 'chevronDown', className: css('calendar-chevron'), onClick: event => this.onNextMonth(event), tabIndex: tabIndex, attr: this.props.attr.nextMonthButton })),
            React.createElement(Attributes_1.Elements.div, { className: css('calendar-days'), attr: this.props.attr.dateContainer }, weekdays),
            content));
    }
}
Calendar.defaultProps = {
    localTimezone: true,
    tabIndex: -1,
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
exports.Calendar = Calendar;
exports.default = Calendar;

//# sourceMappingURL=Calendar.js.map
