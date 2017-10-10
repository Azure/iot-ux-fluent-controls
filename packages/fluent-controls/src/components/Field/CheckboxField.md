______________________________________________________________________________

### `CheckboxField.props.attr`

```html
<CheckboxField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <CheckboxInput>
                <div className='checkbox-container' {...props.attr.container}>
                    <label className='checkbox-label' {...props.attr.label}>
                        <input {...props.attr.input} />
                        <span className='checkbox-button' {...props.attr.checkbox} />
                        <span className='checkbox-text' {...props.attr.text}>
                            {props.label}
                        </span>
                        <span className='checkbox-fill' {...props.attr.indeterminateFill}} />
                        <Icon className='checkbox-checkmark' attr={props.attr.checkmarkIcon} />
                        <span className='checkbox-border' {...props.attr.border} />
                    </label>
                </div>
            </CheckboxInput>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</CheckboxField>
```

______________________________________________________________________________

### Examples

```jsx
const initialState = {
    field1: false,
    field2: true,
    field3: false,
    field4: true,
    field5: false,
    field6: true,
};

<div>
    <CheckboxField 
        name='checkbox_field1'
        value={state.field1}
        label='Field 1'
        onChange={(newValue) => setState({field1: newValue})}
    />
    <CheckboxField 
        name='checkbox_field2'
        value={state.field2}
        label='Field 2'
        error='This is an example error'
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <CheckboxField 
        name='checkbox_field3'
        value={state.field3}
        label='Field 3'
        onChange={(newValue) => setState({field3: newValue})}
        required loading
    />
    <CheckboxField 
        name='checkbox_field4'
        value={state.field4}
        label='Field 4'
        onChange={(newValue) => setState({field4: newValue})}
        required
    />
    <CheckboxField 
        name='checkbox_field5'
        value={state.field5}
        label='Field 5'
        error='This is an example error'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
    <CheckboxField 
        name='checkbox_field6'
        value={state.field6}
        label='Field 6'
        onChange={(newValue) => setState({field6: newValue})}
        disabled
    />
</div>
```