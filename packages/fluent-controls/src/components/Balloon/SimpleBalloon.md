
### Balloon with single line (default)

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="top" align="start">Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="top" align="center">Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="top" align="end">End</SimpleBalloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="bottom" align="start">Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="bottom" align="center">Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="bottom" align="end">End</SimpleBalloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="left" align="start">Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="left" align="center">Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="left" align="end">End</SimpleBalloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="right" align="start">Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="right" align="center">Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="right" align="end">End</SimpleBalloon>
</div>
```

### Balloon with multiple lines

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="top" align="start" multiline><span>Start</span></SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="top" align="center" multiline>Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="top" align="end" multiline>End</SimpleBalloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="bottom" align="start" multiline>Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="bottom" align="center" multiline>Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="bottom" align="end" multiline>End</SimpleBalloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="left" align="start" multiline>Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="left" align="center" multiline>Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="left" align="end" multiline>End</SimpleBalloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <SimpleBalloon tooltip={tooltip} position="right" align="start" multiline>Start</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="right" align="center" multiline>Center</SimpleBalloon> - 
    <SimpleBalloon tooltip={tooltip} position="right" align="end" multiline>End</SimpleBalloon>
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

<SimpleBalloon tooltip={tooltip} multiline balloonClassName='md-ballon-fixed-width'>
    <Icon icon='info'>This is a fixed width tooltip</Icon>
</SimpleBalloon>
```

```js
let Icon = require('../Icon').Icon;
let tooltip = (
    <span>
        This is a simple balloon!
    </span>
);

<SimpleBalloon tooltip={tooltip} balloonClassName='md-ballon-fixed-width'>
    <Icon icon='info'>This is a single line fixed width tooltip</Icon>
</SimpleBalloon>
```