______________________________________________________________________________

### `Button.props.attr`

```html
<Button attr={...}>
    <button className='button-container' {...props.attr.container}>
        <span classname='button-icon' {...props.attr.icon}/>
        <span className='button-text' {...props.attr.text}>
            {props.children}
        </span>
    </button>
</Button>
```

______________________________________________________________________________

### Examples

#### Default Button (Primary)

```jsx
<Button
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Primary Button
</Button>
```

#### Default Button (Secondary)

```jsx
<Button
    style='secondary'
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Secondary Button
</Button>
```

#### Disabled Button

```jsx
<Button
    style='secondary'
    attr={{container: {'data-test-hook': 'button1'}}}
    disabled
>
    Disabled Button
</Button>
```

#### Default Button with Icon (Primary)

```jsx
<Button
    icon='info'
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Primary Button
</Button>
```

#### Default Button with Icon (Secondary)

```jsx
<Button
    icon='info'
    style='secondary'
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Secondary Button
</Button>
```

#### Disabled Button with Icon

```jsx
<Button
    icon='info'
    style='secondary'
    attr={{container: {'data-test-hook': 'button1'}}}
    disabled
>
    Disabled Button
</Button>
```