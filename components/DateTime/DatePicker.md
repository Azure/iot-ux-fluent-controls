______________________________________________________________________________

### `DatePicker.props.attr`

```html
<DatePicker attr={...}>
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
```

______________________________________________________________________________

### Examples

```jsx
const initialValue = 'Sep 20, 2010 07:00:00 GMT';
const initialState = {value: ''};

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker
        name='date-picker'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={initialValue}
    />
</div>
```

```jsx
const initialValue = 'Sep 20, 2010 07:00:00 GMT';
const initialState = {value: ''};

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker
        name='date-picker'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={initialValue}
        localTimezone={false}
    />
</div>
```

```jsx
const initialValue = null;
const initialState = {value: ''};

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker
        name='date-picker'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={initialValue}
        localTimezone={false}
    />
</div>
```

```jsx
const initialValue = 'Sep 20, 2010 00:00:00 GMT';
const initialState = {value: ''};

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker
        name='date-picker'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={initialValue}
        disabled 
    />
</div>
```

```jsx
const initialValue = 'Sep 20, 2010 00:00:00 GMT';
const initialState = {value: ''};

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker
        name='date-picker'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={initialValue}
        showAbove error 
    />
</div>
```