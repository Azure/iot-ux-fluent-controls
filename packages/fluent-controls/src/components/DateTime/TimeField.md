______________________________________________________________________________

### `TimeField.props.attr`

```html
<TimeField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <TimeInput>
                <div className='time-container' {...props.attr.container}>
                    <select className='time-input' {...props.attr.hourSelect}>
                        <option {...props.attr.hourOption}>00</option>
                        ...
                        <option {...props.attr.hourOption}>11</option>
                    </select>
                    <select className='time-input' {...props.attr.minuteSelect}>
                        <option {...props.attr.minuteOption}>00</option>
                        ...
                        <option {...props.attr.minuteOption}>59</option>
                    </select>
                    <select className='time-input' {...props.attr.secondSelect}>
                        <option {...props.attr.secondOption}>00</option>
                        ...
                        <option {...props.attr.secondOption}>59</option>
                    </select>
                    <select className='time-input' {...props.attr.periodSelect}>
                        <option {...props.attr.periodOption}>AM</option>
                        <option {...props.attr.periodOption}>PM</option>
                    </select>
                </div>
            </TimeInput>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</TimeField>
```

______________________________________________________________________________

### Examples

#### Default with Local Timezone

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-0"
        label='Default (Local)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
    />
</div>
```

#### Default with GMT Timezone

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-1"
        label='Default (GMT)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        localTimezone={false}
    />
</div>
```

#### Military Time with Local Timezone

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-2"
        label='Military Time (Local)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        militaryTime={true}
    />
</div>
```

#### Military Time with GMT Timezone
```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-3"
        value={state.value}
        label='Military Time (GMT)'
        onChange={newValue => setState({value: newValue})}
        militaryTime={true}
        localTimezone={false}
    />
</div>
```

#### with Seconds Field

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-4"
        value={state.value}
        label='Seconds (Local)'
        onChange={newValue => setState({value: newValue})}
        showSeconds={true}
    />
</div>
```

#### Military Time with Seconds Field

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeField
        name="time-input-5"
        value={state.value}
        label='Military Time with Seconds (Local)'
        onChange={newValue => setState({value: newValue})}
        showSeconds={true}
        militaryTime={true}
    />
</div>
```