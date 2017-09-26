### Default Example

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea name='text-area-0' value={state.value} onChange={onChange} />
```

### Error Example

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea name='text-area-0' value={state.value} onChange={onChange} error />
```

### Disabled Example

```jsx
<TextArea name='text-area-0' value={''} onChange={() => {}} disabled />
```