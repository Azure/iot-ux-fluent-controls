## ActionTrigger Attribute API

```html
<ActionTrigger attr={...}>
    <div className={props.className} {...props.attr.container}>
        <Icon icon={props.icon} attr={props.attr.icon}>
            {props.label}
        </Icon>
        <Icon icon={props.suffix} attr={props.attr.suffix} />
    </div>
</ActionTrigger>
```

## Examples

### Action Trigger

```jsx
<div>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' /></a>
    <a href='#'><ActionTrigger icon='info' label='Button Label' rightIcon='chevronDown4Legacy'/></a>
    <a href='#'><ActionTrigger icon='warning' label='Button Label' disabled /></a>
    <a href='#'><ActionTrigger icon='warning' label='This is a very long action trigger with too much text. This is a very long action trigger with too much text. This is a very long action trigger with too much text.'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
    <a href='#'><ActionTrigger icon='warning'/></a>
</div>
```