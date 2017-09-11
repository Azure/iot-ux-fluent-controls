Action Trigger

```jsx
let initialState = {value: false};
<div>
    <Toggle on={state.value} onChange={(newValue) => setState({value: newValue})} /><br/>
    <Toggle on onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle disabled onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle disabled on onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle on onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle disabled onChange={(newValue) => alert(newValue)}/><br/>
    <Toggle on onChange={(newValue) => alert(newValue)}/><br/>
</div>
```