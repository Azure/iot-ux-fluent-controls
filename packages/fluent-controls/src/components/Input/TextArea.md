### Default Example

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea
    name='text-area-0'
    value={state.value}
    onChange={onChange}
    attr={{textarea: {'data-test-hook': 'textarea1'}}}
/>
```

### Error Example

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea
    name='text-area-1'
    value={state.value}
    onChange={onChange}
    error
    attr={{textarea: {'data-test-hook': 'textarea2'}}}
/>
```

### Default Example without Autogrow

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<TextArea
    name='text-area-2'
    value={state.value}
    onChange={onChange}
    autogrow={false}
    attr={{textarea: {'data-test-hook': 'textarea3'}}}
/>
```

### Disabled Example

```jsx
<TextArea
    name='text-area-3'
    value={''}
    onChange={() => {}}
    disabled 
    attr={{textarea: {'data-test-hook': 'textarea4'}}}
/>
```