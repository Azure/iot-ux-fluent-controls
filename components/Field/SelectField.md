______________________________________________________________________________

### `SelectField.props.attr`

```html
<SelectField attr={...}>
    <div className='input-container' {...props.attr.fieldContainer}>
        <label className='label' {...props.attr.fieldLabel}>
            {props.label}
        </label>
        <div className='content' {...props.attr.fieldContent}>
            <SelectInput>
                <div className='combo-container' {...props.attr.container}>
                    <select className='combo' {...props.attr.select}>
                        <option {...props.attr.option}>
                            {props.options[0].label}
                        </option>
                        ...
                        <option {...props.attr.option}>
                            {props.options[n].label}
                        </option>
                    </div>
                    <span className='arrow' {...props.attr.chevron} />
                </div>
            </SelectInput>
        </div>
        <div className='field-error' attr={props.attr.fieldError}>
            {props.error}
        </div>
    </div>
</SelectField>
```

______________________________________________________________________________

### Examples

```jsx
class SelectFieldDemo extends React.Component {
    constructor(props) {
        super(props);

        const obj = {label: 'Select an option', value: {name: 'option6'}, hidden: true};
        this.state = {
            field1: obj.value,
            field2: '',
            field3: '',
            field4: '',
            options: [
                {label: 'Option 0', value: {name: 'option0'}},
                {label: 'Option 1', value: {name: 'option1'}},
                {label: 'Option 2', value: {name: 'option2'}},
                {label: 'Option 3', value: {name: 'option3'}},
                {label: 'Option 4', value: {name: 'option4'}},
                {label: 'Option 5', value: {name: 'option5'}, disabled: true},
                obj
            ]
        };
    }

    render() {
        return (
            <div>
                <SelectField 
                    name='radio1'
                    value={this.state.field1}
                    options={this.state.options}
                    label='Field 1'
                    onChange={(newValue) => this.setState({field1: newValue})}
                />
                <SelectField 
                    name='radio2'
                    value={this.state.field2}
                    options={this.state.options}
                    label='Field 2'
                    onChange={(newValue) => this.setState({field2: newValue})}
                    required
                    error='This field is required!'
                />
                <SelectField 
                    name='radio3'
                    value={this.state.field3}
                    options={this.state.options}
                    label='Field 3'
                    onChange={(newValue) => this.setState({field3: newValue})}
                    required
                    loading
                />
                <SelectField 
                    name='radio4'
                    value={this.state.field4}
                    options={this.state.options}
                    label='Field 4'
                    onChange={(newValue) => this.setState({field4: newValue})}
                    required
                    disabled
                />
            </div>
        );
    }
}

<SelectFieldDemo />
```