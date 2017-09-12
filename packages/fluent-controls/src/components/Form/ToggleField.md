```jsx
const initialState = {
    field1: true,
    field2: false,
    field3: true,
    field4: false,
    field5: false,
    field6: true
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
</div>
```