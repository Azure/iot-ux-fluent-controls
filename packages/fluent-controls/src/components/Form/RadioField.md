### Radio field

```jsx
let initialState = {value: ''};

const onChange = (newValue) => {
    setState({value: newValue});
};

const options = [
    {label: 'Radio Button 1', value: 'option1'},
    {label: 'Radio Button 2', value: 'option2'},
    {label: 'Radio Button 3', value: 'option3'},
    {label: 'Radio Button 4', value: 'option4'},
    {label: 'Radio Button 5', value: 'option5'},
];

const label = 'Radio Field Label';

<div>
    <RadioField 
        name='radio_field1'
        value={state.value}
        options={options}
        label={label}
        error='This is an example error'
        onChange={onChange}
        required
    />
</div>
```