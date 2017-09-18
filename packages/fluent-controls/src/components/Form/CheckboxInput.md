### Checkbox
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
    />
    <CheckboxInput
        name='checkbox2'
        label={label}
        checked={state.check2}
        onChange={value => setState({check2: value})}
    />
    <CheckboxInput
        name='checkbox3'
        label={label}
        checked={state.check3}
        onChange={value => setState({check3: value})}
    />
    <CheckboxInput
        name='checkbox4'
        label={label}
        checked={state.check4}
        onChange={value => setState({check4: value})}
    />
    <CheckboxInput
        name='checkbox5'
        label={label}
        checked={state.check5}
        onChange={value => setState({check5: value})}
        indeterminate
    />
    <CheckboxInput
        name='checkbox6'
        label={label}
        onChange={() => {}}
        disabled
    />
    <CheckboxInput
        name='checkbox7'
        label={label}
        onChange={() => {}}
        disabled checked
    />
</div>
```
