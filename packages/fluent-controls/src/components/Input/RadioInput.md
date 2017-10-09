### Radio button
```jsx
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