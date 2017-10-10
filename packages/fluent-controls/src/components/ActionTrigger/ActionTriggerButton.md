## ActionTriggerButton Attribute API

```html
<ActionTriggerButton attr={...}>
    <button {...props.attr.button}>
        <div {...props.attr.container}>
            <Icon attr={props.attr.icon}>
                {props.label}
            </Icon>
            <Icon attr={props.attr.suffix} />
        </div>
    </button>
</ActionTriggerButton>
```

## Examples

### Action Trigger Button with Attr API Modifier

```jsx
<div>
    <ActionTriggerButton onClick={() => alert('clicked!')} icon='warning' attr={{
        container: {style: {backgroundColor: 'red'}}
    }}/>
</div>
```