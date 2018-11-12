______________________________________________________________________________

### `DateTimeField.props.attr`

```html
<DateTimeField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <DatePicker className='date-picker' attr={props.attr.datePicker} />
            <TimeInput className='time-picker' attr={props.attr.timeInput} />
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</DateTimeField>
```

______________________________________________________________________________

### Examples


```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>Current Value: {new Date(state.value).toString()}</div>
    <DateTimeField
        name='date-picker-0'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Default example (Local)'
        localTimezone={true}
        onChange={(newValue) => setState({value: newValue})}
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>Current Value: {new Date(state.value).toString()}</div>
    <DateTimeField
        name='date-picker-0'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Default example (Local)'
        tooltip='example with tooltip'
        localTimezone={true}
        onChange={(newValue) => setState({value: newValue})}
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {state.value}</div>
    <DateTimeField
        name='date-picker-1'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Default example (GMT)'
        localTimezone={false}
        onChange={(newValue) => setState({value: newValue})}
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {new Date(state.value).toString()}</div>
    <DateTimeField
        name='date-picker-2'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Required example (Local)'
        localTimezone={true}
        onChange={(newValue) => setState({value: newValue})}
        required
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {state.value}</div>
    <DateTimeField
        name='date-picker-3'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Required example with errors (GMT)'
        error={state.value === 'invalid' ? 'This must be a valid date and time!' : ''}
        localTimezone={false}
        onChange={(newValue) => setState({value: newValue})}
        required
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {new Date(state.value).toString()}</div>
    <DateTimeField
        name='date-picker-4'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Military Time example (Local)'
        error={state.value === 'invalid' ? 'This must be a valid date and time!' : ''}
        localTimezone={true}
        onChange={(newValue) => setState({value: newValue})}
        militaryTime
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {state.value}</div>
    <DateTimeField
        name='date-picker-5'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Military Time example with Seconds (GMT)'
        error={state.value === 'invalid' ? 'This must be a valid date and time!' : ''}
        localTimezone={false}
        onChange={(newValue) => setState({value: newValue})}
        militaryTime showSeconds
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 05:00:00 GMT'};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {state.value}</div>
    <DateTimeField
        name='date-picker-disabled'
        initialValue={'Sep 20, 2010 05:00:00 GMT'}
        label='Disabled example (GMT)'
        error={state.value === 'invalid' ? 'This must be a valid date and time!' : ''}
        localTimezone={false}
        onChange={(newValue) => setState({value: newValue})}
        disabled
    />
</div>
```

```jsx
const initialState = {value: ''};

<div>
        <div style={{marginBottom: '20px'}}>Current Value: {state.value}</div>
    <DateTimeField
        name='date-picker-disabled'
        initialValue={''}
        label='Empty string example (GMT)'
        error={state.value === 'invalid' ? 'This must be a valid date and time!' : ''}
        localTimezone={false}
        onChange={(newValue) => setState({value: newValue})}
    />
</div>
```