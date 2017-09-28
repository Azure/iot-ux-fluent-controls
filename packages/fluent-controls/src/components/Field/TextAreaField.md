```jsx
const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
};

<div>
    <TextAreaField
        name='form-field1'
        label='Default Example'
        placeholder='Field 1'
        value={state.field1}
        onChange={(newValue) => setState({field1: newValue})}
    />
    <TextAreaField
        name='form-field2'
        label='Required Example'
        placeholder='Field 2'
        value={state.field2}
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <TextAreaField
        name='form-field3'
        label='Required with an error'
        error='This field is required'
        placeholder='Field 3'
        value={state.field3}
        onChange={(newValue) => setState({field3: newValue})}
        required
    />
    <TextAreaField
        name='form-field4'
        label='Required with loading animation'
        placeholder='Field 4'
        value={state.field4}
        onChange={(newValue) => setState({field4: newValue})}
        required loading
    />
    <TextAreaField
        name='form-field1'
        label='No Auto Grow'
        placeholder='Field 1'
        value={state.field5}
        onChange={(newValue) => setState({field1: newValue})}
        autogrow={false}
    />
    <TextAreaField
        name='form-field5'
        label='Label 5'
        placeholder='Field 5'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
</div>
```