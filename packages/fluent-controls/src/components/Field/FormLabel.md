______________________________________________________________________________

### `FormLabel.props.attr`

```html
<FormLabel attr={...}>
    <div className='field-error' {...props.attr.container}>
        {props.children}
    </div>
</FormLabel>
```

______________________________________________________________________________

### Examples

#### Default Label

```jsx
<FormLabel name='field1'>
    Form Label
</FormLabel>
```

#### Required Label

```jsx
<FormLabel name='field2' required>
    Form Label
</FormLabel>
```

#### Default Label with Help Balloon

```jsx
<FormLabel name='field1' balloon='This is a help balloon'>
    Form Label
</FormLabel>
```

#### Required Label with Help Balloon

```jsx
<FormLabel name='field1' required balloon='This is a help balloon'>
    Form Label
</FormLabel>
```

#### Required Label with Warning Balloon

```jsx
<FormLabel name='field1' icon='warning' balloon='This is a help balloon'>
    Form Label
</FormLabel>
```