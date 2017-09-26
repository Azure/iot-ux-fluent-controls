```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};
let onChange = (newValue) => state.value = newValue;

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker name='date-picker' onChange={onChange} initialValue={state.value}/>
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};
let onChange = (newValue) => state.value = newValue;

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker name='date-picker' onChange={onChange} initialValue={state.value} localTimezone={false}/>
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};
let onChange = (newValue) => state.value = newValue;

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker name='date-picker' onChange={onChange} initialValue={state.value} disabled />
</div>
```

```jsx
const initialState = {value: 'Sep 20, 2010 00:00:00 GMT'};
let onChange = (newValue) => state.value = newValue;

<div>
    <div>Current Value: {state.value}</div>
    <DatePicker name='date-picker' onChange={onChange} initialValue={state.value} showAbove error />
</div>
```