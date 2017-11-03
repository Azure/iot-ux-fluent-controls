______________________________________________________________________________

### `Calendar.props.attr`

```html
<Calendar attr={...}>
    <div className='calendar' {...props.attr.container}>
        <div className='calendar-header' {...props.attr.header}>
            <div className='calendar-month' {...props.attr.monthHeader}>
                October 2017
            </div>
            <ActionTriggerButton className='calendar-chevron' attr={props.attr.prevMonthButton} />
            <ActionTriggerButton className='calendar-chevron' attr={props.attr.nextMonthButton} />
        </div>
        <div className='calendar-days' {...props.attr.dateContainer}>
            <div {...props.attr.weekDayHeader}>
                SUN
            </div>
            ...
            <div {...props.attr.weekDayHeader}>
                SAT
            </div>
        </div>
        <div className='calendar-row' {...props.attr.dateRow}>
            <button {...props.attr.dateButton}>1</button>
            ...
            <button {...props.attr.dateButton}>7</button>
        </div>
        ...
        <div className='calendar-row' {...props.attr.dateRow}>
            <button {...props.attr.dateButton}>29</button>
            ...
            <button className='disabled' {...props.attr.dateButton}>4</button>
        </div>
    </div>
</Calendar>
```

______________________________________________________________________________

### Examples

```jsx
<div style={{width: '320px', border: '1px solid #333'}}>
    <Calendar onChange={date => alert(date)} value={new Date(2017, 9, 12)} />
</div>
```