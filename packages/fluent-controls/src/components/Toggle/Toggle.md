______________________________________________________________________________

### `Toggle.props.attr`

```jsx static
container = <div/>;
button = <Button/>;
border = <div/>;
switch = <div/>;
text = <div/>;
```

```html
<Toggle attr={...}>
    <div {...props.attr.container}>
        <button {...props.attr.button}/>
        <div {...props.attr.border}/>
        <div {...props.attr.switch}/>
        <div {...props.attr.text}>
            {props.on ? props.onLabel : props.offLabel}
        </div>
    </div>
</Toggle>
```

______________________________________________________________________________

### Examples

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