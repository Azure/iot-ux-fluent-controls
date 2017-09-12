```jsx
const TextInput = require('./TextInput').TextInput;

const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
};

<div>
    <FormField name='form-field1' label='Label 1'>
        <TextInput
            name='form-field1'
            value={state.field1}
            placeholder='Field 1'
            onChange={(newValue) => setState({field1: newValue})}
        />
    </FormField>
    <FormField name='form-field2' label='Label 2' required>
        <TextInput
            name='form-field2'
            value={state.field2}
            placeholder='Field 2'
            onChange={(newValue) => setState({field2: newValue})}
        />
    </FormField>
    <FormField name='form-field3' label='Label 3' required error='This field is required'>
        <TextInput
            name='form-field3'
            value={state.field3}
            placeholder='Field 3'
            onChange={(newValue) => setState({field3: newValue})}
            error
        />
    </FormField>
    <FormField name='form-field4' label='Label 4' required loading>
        <TextInput
            name='form-field4'
            value={state.field4}
            placeholder='Field 4'
            onChange={(newValue) => setState({field4: newValue})}
        />
    </FormField>
    <FormField name='form-field5' label='Label 5' >
        <TextInput
            name='form-field5'
            value={state.field5}
            placeholder='Field 5'
            onChange={(newValue) => setState({field5: newValue})}
            disabled
        />
    </FormField>
</div>
```