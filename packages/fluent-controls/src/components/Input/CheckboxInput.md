______________________________________________________________________________

### `CheckboxInput.props.attr`

```html
<CheckboxInput attr={...}>
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
```

______________________________________________________________________________

### Examples

```jsx
const label = 'Checkbox label';
const initialState = {
    check1: false,
    check2: false,
    check3: false,
    check4: false,
};

<div>
    <CheckboxInput
        name='checkbox1'
        label={label}
        checked={state.check1}
        onChange={value => setState({check1: value})}
        attr={{input: {'data-test-hook': 'checkbox1-input'}}}
    />
    <CheckboxInput
        name='checkbox2'
        label={label}
        checked={state.check2}
        onChange={value => setState({check2: value})}
        attr={{input: {'data-test-hook': 'checkbox2-input'}}}
    />
    <CheckboxInput
        name='checkbox3'
        label={label}
        checked={state.check3}
        onChange={value => setState({check3: value})}
        attr={{input: {'data-test-hook': 'checkbox3-input'}}}
    />
    <CheckboxInput
        name='checkbox4'
        label={label}
        checked={state.check4}
        onChange={value => setState({check4: value})}
        attr={{input: {'data-test-hook': 'checkbox4-input'}}}
    />
    <CheckboxInput
        name='checkbox5'
        label={label}
        checked={state.check5}
        onChange={value => setState({check5: value})}
        indeterminate
        attr={{input: {'data-test-hook': 'checkbox5-input'}}}
    />
    <CheckboxInput
        name='checkbox6'
        label={label}
        onChange={() => {}}
        disabled
        attr={{input: {'data-test-hook': 'checkbox6-input'}}}
    />
    <CheckboxInput
        name='checkbox7'
        label={label}
        onChange={() => {}}
        disabled checked
        attr={{input: {'data-test-hook': 'checkbox7-input'}}}
    />
</div>
```
