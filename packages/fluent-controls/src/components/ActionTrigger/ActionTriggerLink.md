______________________________________________________________________________

### `ActionTriggerLink.props.attr`

```jsx static
attr.anchor = <a/>;
attr.container = <div/>;
attr.icon = <Icon/>;
attr.suffix = <Icon/>;
```

```html
<ActionTriggerLink attr={...}>
    <a {...props.attr.anchor}>
        <ActionTrigger>
            <div {...props.attr.container}>
                <Icon attr={props.attr.icon}>
                    {props.label}
                </Icon>
                <Icon attr={props.attr.suffix} />
            </div>
        </ActionTrigger>
    </a>
</ActionTriggerLink>
```

______________________________________________________________________________

### Examples

#### Action Trigger Link with Attr API Modifier

```jsx
<div>
    <ActionTriggerLink href='#' onClick={() => alert('clicked!')} icon='warning' attr={{
        container: {style: {backgroundColor: 'red'}}
    }}/>
</div>
```