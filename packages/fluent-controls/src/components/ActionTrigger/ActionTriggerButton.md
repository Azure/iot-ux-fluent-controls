______________________________________________________________________________

### `ActionTriggerButton.props.attr`

```jsx static
attr.button = <button/>;
attr.container = <div/>;
attr.icon = <Icon/>;
attr.suffix = <Icon/>;
```



```html
<ActionTriggerButton attr={...}>
    <button className='action-trigger-button' {...props.attr.button}>
        <ActionTrigger>
            <div className='action-trigger' {...props.attr.container}>
                <Icon attr={props.attr.icon}>
                    {props.label}
                </Icon>
                <Icon className='suffix' attr={props.attr.suffix} />
            </div>
        </ActionTrigger>
    </button>
</ActionTriggerButton>
```

______________________________________________________________________________

### Examples

#### Action Trigger Button with Attr API Modifier

```jsx
<div>
    <ActionTriggerButton onClick={() => alert('clicked!')} icon='warning' attr={{
        container: {style: {backgroundColor: 'red'}}
    }}/>
</div>
```