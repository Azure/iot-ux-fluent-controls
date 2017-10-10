______________________________________________________________________________

### `TextArea.props.attr`

```jsx static
container = <div/>;
textarea = <textarea/>;
pre = <pre/>;
```

```html
<TextArea attr={...}>
    <div className='textarea-container' {...props.attr.container}>
        <textarea className='textarea' {...props.attr.textarea} />
        <pre className='textarea textarea-ghost' {...props.attr.pre}>
            {props.value}
        </pre>
    </div>
</TextArea>
```

______________________________________________________________________________

### Examples

#### Default

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

#### Error

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

#### Default without Autogrow

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

#### Disabled

```jsx
<TextArea
    name='text-area-3'
    value={''}
    onChange={() => {}}
    disabled
    attr={{textarea: {'data-test-hook': 'textarea4'}}}
/>
```