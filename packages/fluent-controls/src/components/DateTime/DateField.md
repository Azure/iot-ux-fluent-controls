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