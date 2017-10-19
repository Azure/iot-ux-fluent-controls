
______________________________________________________________________________

### `Balloon.props.attr`

```html
<Balloon attr={...}>
    <span className='balloon-container' {...props.attr.container}>
        {props.children}
        <span className='balloon' {...props.attr.balloonContainer}>
            <div className='inner-container' {...props.attr.balloon}>
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

<div style={{
    overflow: 'hidden',
    paddingLeft: '100px',
    paddingTop: '100px',
    height: '400px',
    width: '400px'
}}>

    <Balloon tooltip={tooltip} position={1} align={3}>End</Balloon>
</div>
```
