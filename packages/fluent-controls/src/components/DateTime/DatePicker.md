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