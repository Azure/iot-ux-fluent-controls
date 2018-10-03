______________________________________________________________________________

### `ToggleField.props.attr`

```html
<ToggleField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <Toggle>
                <div className='toggle' {...props.attr.container}>
                    <button className='toggle-button' {...props.attr.button}/>
                    <div className='toggle-border' {...props.attr.border}/>
                    <div className='toggle-switch' {...props.attr.switch}/>
                    <div className='toggle-label' {...props.attr.text}>
                        {props.on ? props.onLabel : props.offLabel}
                    </div>
                </div>
            </Toggle>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</ToggleField>
```

______________________________________________________________________________

### Examples

```jsx
const initialState = {
    field1: true,
    field2: false,
    field3: true,
    field4: false,
    field5: false,
    field6: true,
    field7: true
};

<div>
    <ToggleField
        name='form-field1'
        value={state.field1}
        label='Label 1'
        onChange={(newValue) => setState({field1: newValue})}
    />
    <ToggleField
        name='form-field2'
        value={state.field2}
        label='Label 2'
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <ToggleField
        name='form-field3'
        value={state.field3}
        label='Label 3'
        error='This field is required'
        onChange={(newValue) => setState({field3: newValue})}
        required
    />
    <ToggleField
        name='form-field4'
        value={state.field4}
        label='Label 4'
        onChange={(newValue) => setState({field4: newValue})}
        required loading
    />
    <ToggleField
        name='form-field5'
        value={state.field5}
        label='Label 5'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
    <ToggleField
        name='form-field6'
        value={state.field6}
        label='Label 6'
        onChange={(newValue) => setState({field6: newValue})}
        disabled
    />
    <ToggleField
        name='form-field7'
        value={state.field7}
        tooltip='form field 7'
        label='Label 7'
        onChange={(newValue) => setState({field7: newValue})}
    />
</div>
```