import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./Calendar.scss'));

export interface CalendarComponentType {}

export interface CalendarProps extends React.Props<CalendarComponentType> {
    /** Current selected date */
    value?: Date;

    /** Do not allow the user to switch to a different month */
    fixedMonth?: boolean;

    /**
     * Callback for date change events
     * 
     * If no callback is provided, the user will not be able to click on
     * a new day
     * */
    onSelect?: (newValue: Date) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Calendar control
 * 
 * @param props Control properties (defined in `CalendarProps` interface)
 */
export class Calendar extends React.Component<CalendarProps> {
    constructor() {
        super();
    }

    componentWillReceiveProps(props: CalendarProps) {
        let currentMonth;
        if (this.props.value) {
            currentMonth = this.props.value.getMonth();
        } else {
            currentMonth = new Date().getMonth();
        }

        this.state = {
            currentMonth: null
        };
    }

    render() {
        const rowClassName = css('calendar-row');
        const colClassName = css('disabled');

        return (
            <div className={css('calendar')}>
                <div className={css('calendar-header')}>
                    <div className={css('calendar-month')}>
                        April 2017
                    </div>
                    <div className={css('calendar-chevron')}>
                        <Icon icon='chevronUp' size={IconSize.xsmall} />
                    </div>
                    <div className={css('calendar-chevron')}>
                        <Icon icon='chevronDown' size={IconSize.xsmall} />
                    </div>
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
                <div className={rowClassName}>
                    <div className={colClassName}>31</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                </div>
                <div className={rowClassName}>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div className={css('selected')}>12</div>
                    <div>13</div>
                </div>
                <div className={rowClassName}>
                    <div>14</div>
                    <div>15</div>
                    <div>16</div>
                    <div>17</div>
                    <div>18</div>
                    <div>19</div>
                    <div>20</div>
                </div>
                <div className={rowClassName}>
                    <div>21</div>
                    <div>22</div>
                    <div>23</div>
                    <div>24</div>
                    <div>25</div>
                    <div>26</div>
                    <div>27</div>
                </div>
                <div className={rowClassName}>
                    <div>28</div>
                    <div>29</div>
                    <div>30</div>
                    <div className={colClassName}>1</div>
                    <div className={colClassName}>2</div>
                    <div className={colClassName}>3</div>
                    <div className={colClassName}>4</div>
                </div>
            </div>
        );
    }
}

export default Calendar;
