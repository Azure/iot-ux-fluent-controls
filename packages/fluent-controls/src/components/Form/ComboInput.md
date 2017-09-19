```jsx
let initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: {str: 'Option 1'}},
        {label: 'Label 2', value: {str: 'Option 2'}},
        {label: 'Label 3', value: {str: 'Option 3'}},
        {label: 'Label 4', value: {str: 'Option 4'}},
        {label: 'Label 5', value: {str: 'Option 5'}},
    ]
};
let onChange = (newValue) => setState({value: newValue});

<ComboInput name="combo-input" options={state.options} value={state.value} onChange={onChange} optionsMap={opt => opt.str}/>
```