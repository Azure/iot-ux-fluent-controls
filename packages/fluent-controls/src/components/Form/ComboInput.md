```jsx
const initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: {str: 'Option 1'}},
        {label: 'Label 2', value: {str: 'Option 2'}},
        {label: 'Label 3', value: {str: 'Option 3'}},
        {label: 'Label 4', value: {str: 'Option 4'}},
        {label: 'Label 5', value: {str: 'Option 5'}},
    ]
};

const onChange = (newValue) => {
    console.log(`Current Value: ${state.value}`);
    setState({value: newValue});
    console.log(`    New Value: ${newValue}`);
};

<ComboInput
    name="combo-input"
    options={state.options}
    value={state.value}
    onChange={onChange}
    optionMap={opt => opt.value.str}
/>
```

```jsx
const initialState = {
    value: '',
    options: [
        {label: 'Alaska', value: {str: 'AK'}},
        {label: 'California', value: {str: 'CA'}},
        {label: 'Florida', value: {str: 'FL'}},
        {label: 'New York', value: {str: 'NY'}},
        {label: 'Washington', value: {str: 'WA'}},
    ]
};

const onChange = (newValue) => {
    setState({value: newValue});
    console.log(newValue);
};

const optionLabel = (newValue, option) => {
    const str = option.value.str;
    const index = str.indexOf(newValue);
    if (index > -1) {
        const prefix = str.substr(0, index);
        const body = newValue;
        const suffix = str.substr(index + newValue.length);
        return (
            <span>
                {prefix}
                <span style={{fontWeight: 'bold'}}>{body}</span>
                {suffix}
            </span>
        )
    }
    return option.label;
}

<ComboInput
    name="combo-input"
    options={state.options}
    value={state.value}
    onChange={onChange}
    optionMap={opt => opt.str}
/>
```