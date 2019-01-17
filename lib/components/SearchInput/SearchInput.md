______________________________________________________________________________

### `TextInput.props.attr`

```html
<SearchInput
    label={...props.label}
    onClick={...props.onClick}
    value={...props.value}
    onChange={...props.onChange}
/>
<TextInput attr={...}>
    <div className='search-input-container' {...props.attr.container}>
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

<SearchInput
    label='search'
    onClick={()=>{alert('search')}}
    value={state.value}
    onChange={onChange}
/>
```