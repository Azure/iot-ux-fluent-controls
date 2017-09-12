```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});
let prefix = 'PREFIX';
let postfix = 'POSTFIX';

<TextInput name="textinput" value={state.value} onChange={onChange} prefix={prefix} postfix={postfix} />
```