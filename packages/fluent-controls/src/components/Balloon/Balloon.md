
______________________________________________________________________________

### `Balloon.props.attr`

```jsx static
attr.container = <span/>;
attr.balloonContainer = <div/>;
attr.balloon = <span/>;
```

```html
<Balloon attr={...}>
    <span {...props.attr.container}>
        {props.children}
        <span {...props.attr.balloonContainer}>
            <div {...props.attr.balloon}>
                {props.tooltip}
            </div>
        </span>
    </span>
</Balloon>
```

______________________________________________________________________________

### Single Line Balloon Examples

#### Balloon above:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={1} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={3}>End</Balloon>
</div>
```

#### Balloon below:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={2} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={3}>End</Balloon>
</div>
```

#### Balloon to the left:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={3} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={3}>End</Balloon>
</div>
```

#### Balloon to the right:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={4} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={3}>End</Balloon>
</div>
```

### Balloon with multiple lines

#### Balloon above:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={1} align={1} multiline><span>Start</span></Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={3} multiline>End</Balloon>
</div>
```

#### Balloon below:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={2} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={3} multiline>End</Balloon>
</div>
```

#### Balloon to the left:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={3} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={3} multiline>End</Balloon>
</div>
```

#### Balloon to the right:

```jsx
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={4} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={3} multiline>End</Balloon>
</div>
```

### Other examples

#### Fixed Width balloon

```jsx
let Icon = require('../Icon').Icon;
const classnames = require('classnames/bind');
const css = classnames.bind(require('../Examples/Balloon.scss'));

let tooltip = (
    <span>
        This is a simple balloon! This is a simple balloon! This is a simple balloon! This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} multiline balloonClassName={css('ballon-fixed-width')}>
    <Icon icon='info'>This is a fixed width tooltip</Icon>
</Balloon>
```

#### Single Line Fixed Width Balloon

```jsx
let Icon = require('../Icon').Icon;
const classnames = require('classnames/bind');
const css = classnames.bind(require('../Examples/Balloon.scss'));

let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} balloonClassName={css('ballon-fixed-width')}>
    <Icon icon='info'>This is a single line fixed width tooltip</Icon>
</Balloon>
```

#### Changing Balloon Background color

```jsx
let Icon = require('../Icon').Icon;
const classnames = require('classnames/bind');
const css = classnames.bind(require('../Examples/Balloon.scss'));

let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} balloonClassName={css('balloon-yellow')}>
    <Icon icon='info'>This is a styled balloon</Icon>
</Balloon>
``` 

#### Show Balloon using Property

```jsx
let Icon = require('../Icon').Icon;
const classnames = require('classnames/bind');
const css = classnames.bind(require('../Examples/Balloon.scss'));
let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} position={4} balloonClassName={css('ballon-fixed-width')} expanded>
    <Icon icon='info'>This is a single line fixed width tooltip</Icon>
</Balloon>
```

#### Changing Balloon Background color using Attribute Override

```jsx
let Icon = require('../Icon').Icon;
const classnames = require('classnames/bind');
const css = classnames.bind(require('../Examples/Balloon.scss'));

let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} attr={{balloonContainer: {className: css('balloon-yellow')}}}>
    <Icon icon='info'>This is a styled balloon</Icon>
</Balloon>
``` 