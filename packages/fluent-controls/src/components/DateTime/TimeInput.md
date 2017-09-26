### Default Example with Local Timezone

```jsx
const initialState = {
    value: 'Mon, 25 Sep 2017 03:07:00 GMT'
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {state.value}
    </div>
    <TimeInput
        name="time-input-0"
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
    <TimeInput
        name="time-input-1"
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
    <TimeInput
        name="time-input-1"
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
    <TimeInput
        name="time-input-1"
        value={state.value}
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
    <TimeInput
        name="time-input-1"
        value={state.value}
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
    <TimeInput
        name="time-input-1"
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        showSeconds={true}
        militaryTime={true}
    />
</div>
```