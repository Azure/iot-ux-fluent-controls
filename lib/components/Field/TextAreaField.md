______________________________________________________________________________

### `TextAreaField.props.attr`

```html
<TextAreaField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <TextArea>
                <div className='textarea-container' {...props.attr.container}>
                    <textarea className='textarea' {...props.attr.textarea} />
                    <pre className='textarea textarea-ghost' {...props.attr.pre}>
                        {props.value}
                    </pre>
                </div>
            </TextArea>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</TextAreaField>
```

______________________________________________________________________________

### Examples

```jsx
const initialState = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: ''
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
    <TextAreaField
        name='form-field6'
        label='Label 6'
        placeholder='Field 6'
        tooltip='tooltip 6'
        onChange={(newValue) => setState({field6: newValue})}
    />
</div>
```