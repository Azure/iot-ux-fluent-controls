______________________________________________________________________________

### `NumberField.props.attr`

```html
<NumberField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <TextInput>
                <div className='text-input-container' {...props.attr.container}>
                    <div className='prefix' {...props.attr.prefix}>
                        {props.prefix}
                    </div>
                    <div className='input-container' {...props.attr.inputContainer}>
                        <input type='text' className='input' {...props.attr.input} />
                        <button className='cancel' {...props.attr.clearButton} />
                    </div>
                    <div className='postfix' {...props.attr.postfix}>
                        {props.postfix}
                    </div>
                </div>
            </TextInput>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</NumberField>
```

______________________________________________________________________________

### Examples

```jsx
const initialState = {
    field1: 0,
    field2: 0,
    field3: 0,
    field4: 0,
};

<div>
    <NumberField
        name='form-field1'
        label='Label 1'
        placeholder='Field 1'
        value={state.field1}
        onChange={(newValue) => setState({field1: newValue})}
    />
    <NumberField
        name='form-field2'
        label='Label 2'
        placeholder='Field 2'
        value={state.field2}
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <NumberField
        name='form-field3'
        label='Label 3'
        error='This field is required'
        placeholder='Field 3'
        value={state.field3}
        onChange={(newValue) => setState({field3: newValue})}
        required
    />
    <NumberField
        name='form-field4'
        label='Label 4'
        placeholder='Field 4'
        value={state.field4}
        onChange={(newValue) => setState({field4: newValue})}
        required loading
    />
    <NumberField
        name='form-field5'
        label='Label 5'
        placeholder='Field 5'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
</div>
```