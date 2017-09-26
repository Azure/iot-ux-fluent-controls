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

<TextArea name='text-area-1' value={state.value} onChange={onChange} error />
```

### Default Example without Autogrow

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea name='text-area-2' value={state.value} onChange={onChange} autogrow={false} />
```

### Disabled Example

```jsx
<TextArea name='text-area-3' value={''} onChange={() => {}} disabled />
```