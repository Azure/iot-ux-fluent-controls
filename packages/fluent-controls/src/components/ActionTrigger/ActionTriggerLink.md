## ActionTriggerLink Attribute API

```html
<ActionTriggerLink attr={...}>
    <a {...props.attr.anchor}>
        <div {...props.attr.container}>
            <Icon attr={props.attr.icon}>
                {props.label}
            </Icon>
            <Icon attr={props.attr.suffix} />
        </div>
    </a>
</ActionTriggerLink>
```

## Examples

### Action Trigger Link with Attr API Modifier

```jsx
<div>
    <ActionTriggerLink href='#' onClick={() => alert('clicked!')} icon='warning' attr={{
        container: {style: {backgroundColor: 'red'}}
    }}/>
</div>
```