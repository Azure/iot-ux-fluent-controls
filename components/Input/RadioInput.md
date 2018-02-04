______________________________________________________________________________

### `RadioInput.props.attr`

```html
<RadioInput attr={...}>
    <div className='radio-container' {...props.attr.container}>
        <label className='radio-label' {...props.attr.label}>
            <input type='radio' {...props.attr.input} />
            <span className='radio-button' {...props.attr.radio} />
            <span className='radio-text' {...props.attr.text}>
                {props.label}
            </span>
            <span className='radio-fill' {...props.attr.fill} />
            <span className='radio-border' {...props.attr.border} />
        </label>
    </div>
</RadioInput>
```

______________________________________________________________________________

### Examples

```jsx
let radioIndex = 0;
let initialState = {value: ''};
const onChange = (value) => {
    setState({'value': value});
};
const radio = (value, state) => {
    const label = `This is radio button #${value}`;
    radioIndex++;
    return (
        <RadioInput
            name='radio1'
            value={value}
            label={label}
            checked={value===state}
            onChange={onChange}
            attr={{input: {'data-test-hook': `radio1-input-${value}`}}}
        />
    )
};
<div>
    {radio('1', state.value)}
    {radio('2', state.value)}
    {radio('3', state.value)}
    {radio('4', state.value)}
    {radio('5', state.value)}
</div>
```

### Disabled radio button
```jsx
let radioIndex = 0;
const radio = (value, state) => {
    const label = `This is radio button #${value}`;
    radioIndex++;
    return (
        <RadioInput
            name='radio2'
            value={value}
            label={label}
            checked={value===state}
            disabled
            attr={{input: {'data-test-hook': `radio2-input-${value}`}}}
        />
    )
};
<div>
    {radio('1', '3')}
    {radio('2', '3')}
    {radio('3', '3')}
    {radio('4', '3')}
    {radio('5', '3')}
</div>
```