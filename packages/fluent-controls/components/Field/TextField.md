______________________________________________________________________________

### `TextField.props.attr`

```html
<TextField attr={...}>
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
</TextField>
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
};

<div>
    <TextField
        name='form-field1'
        label='Label 1'
        placeholder='Field 1'
        onChange={(newValue) => setState({field1: newValue})}
    />
    <TextField
        name='form-field2'
        label='Label 2'
        placeholder='Field 2'
        onChange={(newValue) => setState({field2: newValue})}
        required
    />
    <TextField
        name='form-field3'
        label='Label 3'
        error='This field is required'
        placeholder='Field 3'
        onChange={(newValue) => setState({field3: newValue})}
        required
    />
    <TextField
        name='form-field4'
        label='Label 4'
        placeholder='Field 4'
        onChange={(newValue) => setState({field4: newValue})}
        required loading
    />
    <TextField
        name='form-field5'
        label=''
        placeholder='Field 5'
        onChange={(newValue) => setState({field4: newValue})}
    />
    <TextField
        name='form-field6'
        label=''
        placeholder='Field 6'
        onChange={(newValue) => setState({field4: newValue})}
        error='This is an error'
    />
    <TextField
        name='form-field7'
        label=''
        placeholder='Field 7'
        onChange={(newValue) => setState({field4: newValue})}
        error='This is an error'
        hideError
    />
    <TextField
        name='form-field8'
        label='Label 5'
        placeholder='Field 8'
        onChange={(newValue) => setState({field5: newValue})}
        disabled
    />
</div>
```