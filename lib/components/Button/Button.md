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

#### CSS Only Default Button

```jsx
const css = require('./Button.module.scss');
const classnames = require('classnames');

<button
    className={classnames('btn')}
>
    Default Button
</button>
```

#### CSS Only Primary Button

```jsx
const classnames = require('classnames');

<button
    className={classnames('btn-primary')}
>
    Primary Button
</button>
```

#### CSS Only Disabled Button

```jsx
const classnames = require('classnames');

<button
    className={classnames('btn')}
    disabled
>
    Disabled Button
</button>
```

#### CSS Only Default Button with CSS Only Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames');

<button
    className={classnames('btn')}
>
    <span className='icon icon-info' />
    Default Button with Icon
</button>
```

#### CSS Only Primary Button with CSS Only Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames');

<button
    className={classnames('btn-primary')}
>
    <span className='icon icon-info' />
    Default Button with Icon
</button>
```

#### CSS Only Disabled Button with CSS Only Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames');

<button
    className={classnames('btn')}
    disabled
>
    <span className='icon icon-info' />
    Default Button with Icon
</button>
```

#### React Default Button

```jsx
<Button
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Button
</Button>
```

#### React Primary Button

```jsx
<Button
    primary
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Primary Button
</Button>
```

#### React Danger Button

```jsx
<Button
    className='btn-danger'
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Danger Button
</Button>
```

#### React Disabled Button

```jsx
<Button
    disabled
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Disabled Button
</Button>
```

#### React Default Button with Icon

```jsx
<Button
    icon='info'
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Default Button
</Button>
```

#### React Primary Button with Icon

```jsx
<Button
    icon='info'
    primary
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Primary Button
</Button>
```

#### React Disabled Button with Icon

```jsx
<Button
    icon='info'
    primary
    disabled
    attr={{container: {'data-test-hook': 'button1'}}}
>
    Disabled Button
</Button>
```