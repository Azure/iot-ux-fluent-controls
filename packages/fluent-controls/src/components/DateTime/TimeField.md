### Default Example with Local Timezone

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
        label='Default Example (Local)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
    />
</div>
```

### Default Example with GMT Timezone

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
        label='Default Example (GMT)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        localTimezone={false}
    />
</div>
```

### Military Time Example with Local Timezone

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
        label='Military Time Example (Local)'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        militaryTime={true}
    />
</div>
```

### Military Time Example with GMT Timezone
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
        label='Military Time Example (GMT)'
        onChange={newValue => setState({value: newValue})}
        militaryTime={true}
        localTimezone={false}
    />
</div>
```

### Example with Seconds Field

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
        label='Seconds Example (Local)'
        onChange={newValue => setState({value: newValue})}
        showSeconds={true}
    />
</div>
```

### Military Time Example with Seconds Field

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
        label='Military Time Example with Seconds (Local)'
        onChange={newValue => setState({value: newValue})}
        showSeconds={true}
        militaryTime={true}
    />
</div>
```