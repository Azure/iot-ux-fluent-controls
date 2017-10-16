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
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn')}
>
    Default Button
</button>
```

#### CSS Only Primary Button

```jsx
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn-primary')}
>
    Primary Button
</button>
```

#### CSS Only Disabled Button

```jsx
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn')}
    disabled
>
    Disabled Button
</button>
```

#### CSS Only Default Button with Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn')}
>
    <Icon icon='info' iconSize={0}>
        Default Button with Icon
    </Icon>
</button>
```

#### CSS Only Primary Button with Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn-primary')}
>
    <Icon icon='info' iconSize={0}>
        Default Button with Icon
    </Icon>
</button>
```


#### CSS Only Disabled Button with Icon

```jsx
const Icon = require('../Icon').Icon;
const classnames = require('classnames').classnames;
const css = classnames.bind(require('../../Button.scss'));

<button
    className={css('btn')}
    disabled
>
    <Icon icon='info' iconSize={0}>
        Default Button with Icon
    </Icon>
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