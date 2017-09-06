
### Balloon with single line (default)

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="top" align="start">Start</Balloon> - 
    <Balloon tooltip={tooltip} position="top" align="center">Center</Balloon> - 
    <Balloon tooltip={tooltip} position="top" align="end">End</Balloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="bottom" align="start">Start</Balloon> - 
    <Balloon tooltip={tooltip} position="bottom" align="center">Center</Balloon> - 
    <Balloon tooltip={tooltip} position="bottom" align="end">End</Balloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="left" align="start">Start</Balloon> - 
    <Balloon tooltip={tooltip} position="left" align="center">Center</Balloon> - 
    <Balloon tooltip={tooltip} position="left" align="end">End</Balloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="right" align="start">Start</Balloon> - 
    <Balloon tooltip={tooltip} position="right" align="center">Center</Balloon> - 
    <Balloon tooltip={tooltip} position="right" align="end">End</Balloon>
</div>
```

### Balloon with multiple lines

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="top" align="start" multiline><span>Start</span></Balloon> - 
    <Balloon tooltip={tooltip} position="top" align="center" multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position="top" align="end" multiline>End</Balloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="bottom" align="start" multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position="bottom" align="center" multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position="bottom" align="end" multiline>End</Balloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="left" align="start" multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position="left" align="center" multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position="left" align="end" multiline>End</Balloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position="right" align="start" multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position="right" align="center" multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position="right" align="end" multiline>End</Balloon>
</div>
```

## Other examples

```js
let Icon = require('../Icon').Icon;
let tooltip = (
    <span>
        This is a simple balloon! This is a simple balloon! This is a simple balloon! This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} multiline balloonClassName='md-ballon-fixed-width'>
    <Icon icon='info'>This is a fixed width tooltip</Icon>
</Balloon>
```

```js
let Icon = require('../Icon').Icon;
let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<Balloon tooltip={tooltip} balloonClassName='md-ballon-fixed-width'>
    <Icon icon='info'>This is a single line fixed width tooltip</Icon>
</Balloon>
```