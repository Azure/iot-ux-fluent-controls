### Checkbox
```jsx
<CheckboxInput
    name='checkbox1'
    label={label}
    checked={value===state}
    onChange={onChange}
/>
```


```jsx
let initialState = {value: ''};
const onChange = (value) => {
    setState({'value': value});
};
const radio = (value, state) => {
    const label = `This is radio button #${value}`;
    return (
        <CheckboxInput
            name='radio1'
            value={value}
            label={label}
            checked={value===state}
            onChange={onChange}
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
    return (
        <CheckboxInput
            name='radio2'
            value={value}
            label={label}
            checked={value===state}
            disabled
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