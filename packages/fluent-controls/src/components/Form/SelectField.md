### Select field

```jsx
const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    options: [
        {label: 'Select Option 1', value: {name: 'option1'}},
        {label: 'Select Option 2', value: {name: 'option2'}},
        {label: 'Select Option 3', value: {name: 'option3'}},
        {label: 'Select Option 4', value: {name: 'option4'}},
        {label: 'Select Option 5', value: {name: 'option5'}}
    ]
};

<div>
    <SelectField 
        name='radio1'
        value={state.field1}
        options={state.options}
        label='Field '
        onChange={(newValue) => setState({field1: newValue})}
    />
    <SelectField 
        name='radio2'
        value={state.field2}
        options={state.options}
        label='Field '
        onChange={(newValue) => setState({field2: newValue})}
        required
        error='This field is required!'
    />
    <SelectField 
        name='radio3'
        value={state.field3}
        options={state.options}
        label='Field '
        onChange={(newValue) => setState({field3: newValue})}
        required
        loading
    />
    <SelectField 
        name='radio4'
        value={state.field4}
        options={state.options}
        label='Field '
        onChange={(newValue) => setState({field4: newValue})}
        required
        disabled
    />
</div>
```