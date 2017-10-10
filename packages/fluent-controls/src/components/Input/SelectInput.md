______________________________________________________________________________

### `SelectInput.props.attr`

```jsx static
container = <div/>;
select = <select/>;
option = <option/>;
chevron = <span/>;
```

```html
<SelectInput attr={...}>
    <div className='combo-container' {...props.attr.container}>
        <select className='combo' {...props.attr.select}>
            <option {...props.attr.option}>
                {props.options[0].label}
            </option>
            ...
            <option {...props.attr.option}>
                {props.options[n].label}
            </option>
        </div>
        <span className='arrow' {...props.attr.chevron} />
    </div>
</SelectInput>
```

______________________________________________________________________________

### Examples
