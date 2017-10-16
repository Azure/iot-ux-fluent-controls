______________________________________________________________________________

### `Link.props.attr`

```html
<Link attr={...}>
    <a className='button-container' {...props.attr.container}>
        <span classname='button-icon' {...props.attr.icon}/>
        <span className='button-text' {...props.attr.text}>
            {props.children}
        </span>
    </a>
</Link>
```

______________________________________________________________________________

### Examples

#### CSS Only Link

```jsx
const classnames = require('classnames/bind');
const css = classnames.bind(require('../../Link.scss'));

<a
    href='#!/Link'
    className={css('md-link')}
>
    Default Link
</a>
```


#### CSS Only Disabled Link

```jsx
const classnames = require('classnames/bind');
const css = classnames.bind(require('../../Link.scss'));

<a
    href='#!/Link'
    className={css('md-link', 'disabled')}
>
    Disabled Link
</a>
```

#### React Default Link

```jsx
<Link
    href='#!/Link'
    attr={{container: {'data-test-hook': 'link1'}}}
>
    Default Link
</Link>
```

#### React Disabled Link

```jsx
<Link
    href='#!/Link'
    disabled
    attr={{container: {'data-test-hook': 'link2'}}}
>
    Disabled Link
</Link>
```
