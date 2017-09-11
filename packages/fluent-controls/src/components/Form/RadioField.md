### Radio field

```jsx
const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    options: [
        {label: 'Radio Button 1', value: 'option1'},
        {label: 'Radio Button 2', value: 'option2'},
        {label: 'Radio Button 3', value: 'option3'},
        {label: 'Radio Button 4', value: 'option4'},
        {label: 'Radio Button 5', value: 'option5'},
    ]
};

<div>
    <RadioField 
        name='radio_field1'
        value={state.field1}
        options={state.options}
        label='Field 1'
        onChange={(newValue) => setState({field1: newValue})}
    />
    <RadioField 
        name='radio_field2'
        value={state.field2}
        options={state.options}
        label='Field 2'
        error='This is an example error'
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <RadioField 
        name='radio_field3'
        value={state.field3}
        options={state.options}
        label='Field 3'
        onChange={(newValue) => setState({field3: newValue})}
        required loading
    />
    <RadioField 
        name='radio_field4'
        value={state.field4}
        options={state.options}
        label='Field 4'
        onChange={(newValue) => setState({field4: newValue})}
        required columns
    />
    <RadioField 
        name='radio_field5'
        value={state.field5}
        options={state.options}
        label='Field 5'
        error='This is an example error'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
</div>
```