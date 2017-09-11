
### Balloon with single line (default)

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={1} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={3}>End</Balloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={2} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={3}>End</Balloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={3} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={3}>End</Balloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={4} align={1}>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={2}>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={3}>End</Balloon>
</div>
```

### Balloon with multiple lines

Balloon above:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={1} align={1} multiline><span>Start</span></Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={1} align={3} multiline>End</Balloon>
</div>
```

Balloon below:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={2} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={2} align={3} multiline>End</Balloon>
</div>
```

Balloon to the left:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={3} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={3} align={3} multiline>End</Balloon>
</div>
```

Balloon to the right:

```js
let tooltip = 'This is a simple balloon!';

<div>
    <Balloon tooltip={tooltip} position={4} align={1} multiline>Start</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={2} multiline>Center</Balloon> - 
    <Balloon tooltip={tooltip} position={4} align={3} multiline>End</Balloon>
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