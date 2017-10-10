______________________________________________________________________________

### `Icon.props.attr`

```jsx static
attr.container = <span/>;
attr.label = <span/>;
```

```html
<Icon attr={...}>
    <span {...props.attr.container}>
        <span {...props.attr.label}>
            {props.children}
        </span>
    </span>
</Icon>
```
