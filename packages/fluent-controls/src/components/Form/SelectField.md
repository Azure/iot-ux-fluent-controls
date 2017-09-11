### Select field

```jsx
let initialState = {value: ''};

const onChange = (value) => {
    setState({'value': value});
    console.log(value);
};

const options = [
    {label: 'Select Option 1', value: {name: 'option1'}},
    {label: 'Select Option 2', value: {name: 'option2'}},
    {label: 'Select Option 3', value: {name: 'option3'}},
    {label: 'Select Option 4', value: {name: 'option4'}},
    {label: 'Select Option 5', value: {name: 'option5'}},
];

const label = 'Radio Field Label';

<div>
    <SelectField 
        name='radio1'
        value={state.value}
        options={options}
        label={label}
        onChange={onChange}
        required
    />
</div>
```