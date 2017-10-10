______________________________________________________________________________

### `TextInput.props.attr`

```html
<TextInput attr={...}>
    <div className='text-input-container' {...props.attr.container}>
        <div className='prefix' {...props.attr.prefix}>
            {props.prefix}
        </div>
        <div className='input-container' {...props.attr.inputContainer}>
            <input type='text' className='input' {...props.attr.input} />
            <button className='cancel' {...props.attr.clearButton} />
        </div>
        <div className='postfix' {...props.attr.postfix}>
            {props.postfix}
        </div>
    </div>
</TextInput>
```

______________________________________________________________________________

### Examples

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});
let prefix = 'PREFIX';
let postfix = 'POSTFIX';

<TextInput
    name='textinput'
    value={state.value}
    onChange={onChange}
    prefix={prefix}
    postfix={postfix}
    attr={{input: {'data-test-hook': 'text-input-1'}}}
/>
```