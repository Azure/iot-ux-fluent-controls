______________________________________________________________________________

### `DateField.props.attr`

```html
<DateField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <DatePicker>
                <div className='date-picker-container' {...props.attr.container}>
                    <div className='input-container' {...props.attr.inputContainer}>
                        <input className='input' {...props.attr.input} />
                        <Icon className='calendar-icon' attr={props.attr.inputIcon} />
                    </div>
                    <div className='dropdown' {...props.attr.dropdownContainer}>
                        <Calendar className='calendar' attr={props.attr.calendar} />
                        <div className='dropdown-triangle' {...props.attr.dropdownTriangle} />
                    </div>
                </div>
            </DatePicker>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</DateField>
```

______________________________________________________________________________

### Examples


```jsx
const initialState = {value: 'Sep 20, 2010 07:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>
        Current Value: {state.value}
    </div>
    <DateField
        name='date-picker'
        label='Default Example (Local)'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={state.value}
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 07:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>
        Current Value: {state.value}
    </div>
    <DateField
        name='date-picker'
        label='Default Example (GMT)'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={state.value}
        localTimezone={false}
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>
        Current Value: {state.value}
    </div>
    <DateField
        name='date-picker'
        label='Disabled Example'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={state.value}
        disabled 
    />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>
        Current Value: {state.value}
    </div>
    <DateField
        name='date-picker'
        label='Show Calendar Above with Error'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={state.value}
        showAbove error='This field is required!'
    />
</div>
```