______________________________________________________________________________

### `Toggle.props.attr`

```html
<Toggle attr={...}>
    <div className='toggle' {...props.attr.container}>
        <button className='toggle-button' {...props.attr.button}/>
        <div className='toggle-border' {...props.attr.border}/>
        <div className='toggle-switch' {...props.attr.switch}/>
        <div className='toggle-label' {...props.attr.text}>
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