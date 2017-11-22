______________________________________________________________________________

### `FormError.props.attr`

```html
<FormError attr={...}>
    <div className='field-error' {...props.attr.container}>
        {props.children}
    </div>
</FormError>
```

______________________________________________________________________________

### Examples

```jsx
<FormError>
    This field is required!
</FormError>
```

```jsx
<FormError>
    This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long! This field error is much too long!
</FormError>
```

```jsx
<FormError hidden>
    This field is required but the error is hidden!
</FormError>
```
