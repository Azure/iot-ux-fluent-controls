### Combo Field

`ComboField` is a hybrid of the SelectField and TextField controls. It functions as a 'new or existing' text field where the user can type in a custom value or pick from a list of values provided by the control.

`ComboField` consumes the property `options: FormOption[]` which specify each option's `value` and `label`. The former can be any object while the latter can be any React node (or a string). `ComboField` also consumes a `value: string | FormOption` property that sets the current value of the `ComboField` text field. If `value` is a `string`, the user is typing in a custom value and if it is an object, the user has either typed in a value equal to one of the options or has selected an option from the dropdown list.

In this example of a default `ComboField`, `FormOption.value` must be a string, which allows you to use `ComboField` with only the properties `name`, `value`, `onChange`, and `options`. When the user types in 'Option 1', that option will be considered selected instead of a custom object.

*Reffer to the other examples on how to use `ComboField`'s callbacks to further modify what options display in the dropdown.*


### Default Example

```jsx
const initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: 'Option 1'},
        {label: 'Label 2', value: 'Option 2'},
        {label: 'Label 3', value: 'Option 3'},
        {label: 'Label 4', value: 'Option 4', hidden: true},
        {label: 'Label 5', value: 'Option 5', disabled: true},
    ]
};

<div>
    <div style={{marginBottom: '20px'}}>
        Current value:  {
            typeof(state.value) === 'string' ? `'${state.value}'`
                : <pre>{JSON.stringify(state.value, null, 2)}</pre>
        }
    </div>
    <ComboField
        name='combo-field1'
        label='Combo Field 1'
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        options={state.options}
        placeholder='Example placeholder'
    />
</div>
```

### Using an optionMap callback

`ComboField` uses four callback properties in order to filter through this list of options and decide how to display in the dropdown. If you have a list of objects and all you need is default behavior, you just have to provide the property `optionMap`, which maps a `FormOption` to a string that is then used by the other callbacks.

In this example, all of the `FormOption.value` value are Javascript objects so `optionMap` will instead return the label string value. Regardless of how `optionMap` transforms the options, the `onChange` callback will be called with `FormOption.value` when possible (if `optionSelect` recognizes the text field value as a FormOption or the user clicks in the dropdown).

```jsx
const optionMap = option => option.label;

const initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: {str: 'Option 1'}},
        {label: 'Label 2', value: {str: 'Option 2'}},
        {label: 'Label 3', value: {str: 'Option 3'}},
        {label: 'Label 4', value: {str: 'Option 4'}},
        {label: 'Label 5', value: {str: 'Option 5'}},
    ]
};

<div>
    <div style={{marginBottom: '20px', height: '64px', overflowY: 'scroll'}}>
        Current value:  {
            typeof(state.value) === 'string' ? `'${state.value}'`
                : <pre>{JSON.stringify(state.value, null, 2)}</pre>
        }
    </div>
    <ComboField
        name='combo-field2'
        label='Combo Field 2'
        options={state.options}
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        optionMap={optionMap}
        required
    />
</div>
```

### Using optionFilter and optionLabel callbacks

By default, `optionFilter` returns true as long as `FormOption.hidden` is false so all visible options will be displayed in the dropdown with `FormOption.label` as the contents of the dropdown items (returned by the default `optionLabel` callback).

In this example, a custom `optionFilter` hides any `FormOption`s that don't contain the value typed into the text input (except when the value is empty) and a custom `optionLabel` creates HTML text with the value string bolded.

**Note: that `ComboField` will ignore `optionFilter` if an option from the dropdown has been selected, at least until the user starts to type into the text box again.**

```jsx
const optionFilter = (newValue, option) => {
    return (
        option.label.toLowerCase().indexOf(newValue.toLowerCase()) > -1 ||
        newValue.length === 0
    );
};

const optionLabel = (newValue, option) => {
    const str = option.label;
    const index = str.toLowerCase().indexOf(newValue.toLowerCase());
    if (index > -1) {
        const prefix = str.substr(0, index);
        const body = str.substr(index, newValue.length);
        const suffix = str.substr(index + newValue.length);
        return (
            <span>
                {prefix}
                <span style={{fontWeight: 'bold'}}>{body}</span>
                {suffix}
            </span>
        )
    }
    return option.label;
};

const initialState = {
    value: '',
    options: [
        {label: 'Alaska', value: {str: 'AK'}},
        {label: 'California', value: {str: 'CA'}},
        {label: 'Florida', value: {str: 'FL'}},
        {label: 'New York', value: {str: 'NY'}},
        {label: 'Washington', value: {str: 'WA'}},
    ]
};

<div>
    <div style={{marginBottom: '20px', height: '64px', overflowY: 'scroll'}}>
        Current value:  {
            typeof(state.value) === 'string' ? `'${state.value}'`
                : <pre>{JSON.stringify(state.value, null, 2)}</pre>
        }
    </div>
    <ComboField
        name='combo-field3'
        label='Combo Field 3'
        options={state.options}
        value={state.value}
        onChange={newValue => setState({value: newValue})}
        optionMap={opt => opt.label}
        optionFilter={optionFilter}
        optionLabel={optionLabel}
        loading
    />
</div>
```

### Error Combo Field Example

```jsx
const initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: 'Option 1'},
        {label: 'Label 2', value: 'Option 2'},
        {label: 'Label 3', value: 'Option 3'},
        {label: 'Label 4', value: 'Option 4', hidden: true},
        {label: 'Label 5', value: 'Option 5', disabled: true},
    ]
};

<div>
    <ComboField
        name='combo-field4'
        label='Combo Field 4'
        value={state.options[0].value}
        onChange={newValue => setState({value: newValue})}
        options={state.options}
        error='This is an error!'
    />
</div>
```

### Disabled Combo Field Example

```jsx
const initialState = {
    value: '',
    options: [
        {label: 'Label 1', value: 'Option 1'},
        {label: 'Label 2', value: 'Option 2'},
        {label: 'Label 3', value: 'Option 3'},
        {label: 'Label 4', value: 'Option 4', hidden: true},
        {label: 'Label 5', value: 'Option 5', disabled: true},
    ]
};

<div>
    <ComboField
        name='combo-field5'
        label='Combo Field 5'
        value={state.options[0].value}
        onChange={newValue => setState({value: newValue})}
        options={state.options}
        disabled
    />
</div>
```