______________________________________________________________________________

### `FormField.props.attr`

```html
<FormField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            {props.children}
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</FormField>
```

______________________________________________________________________________

### Examples


```jsx
const TextInput = require('../Input/TextInput').TextInput;

const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
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
    <FormField name='form-field6' error='This field is required!'>
        <TextInput
            name='form-field6'
            value={state.field6}
            placeholder='Field 6'
            onChange={(newValue) => setState({field6: newValue})}
        />
    </FormField>
    <FormField name='form-field7' error='This field is required!'>
        <TextInput
            name='form-field7'
            value={state.field7}
            placeholder='Field 7'
            onChange={(newValue) => setState({field7: newValue})}
        />
    </FormField>
    <FormField name='form-field8' error='This field is required!' hideField>
        <TextInput
            name='form-field8'
            value={state.field8}
            placeholder='Field 8'
            onChange={(newValue) => setState({field8: newValue})}
        />
    </FormField>
    <FormField name='form-field9' label='Label 9' required error='This field is required' hideField>
        <TextInput
            name='form-field9'
            value={state.field9}
            placeholder='Field 9'
            onChange={(newValue) => setState({field9: newValue})}
            error
        />
    </FormField>
    <FormField name='form-field8' label='Label 8' tooltip='tooltip-8'>
        <TextInput
            name='form-field8'
            value={state.field1}
            placeholder='Field 8'
            onChange={(newValue) => setState({field1: newValue})}
        />
    </FormField>
</div>
```