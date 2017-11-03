
______________________________________________________________________________

### `Dropdown.props.attr`

```html
<Dropdown attr={...}>
    <span className='balloon-container' {...props.attr.container}>
        {props.children}
        <span className='balloon' {...props.attr.balloonContainer}>
            <div className='inner-container' {...props.attr.balloon}>
                {props.tooltip}
            </div>
        </span>
    </span>
</Dropdown>
```

______________________________________________________________________________

### Single Line Dropdown Examples

#### Dropdown Always Visible

```jsx
const initialState = {
    visible: false
};

<div style={{
    overflow: 'hidden',
    paddingLeft: '100px',
    paddingTop: '100px',
    height: '400px',
    width: '400px'
}}>
    <Dropdown
        dropdown={<div style={{
            backgroundColor: 'red',
            width: '300px',
            height: '300px',
        }}>Hello World</div>}
        position={1}
        align={3}
        visible={state.visible}
    >
        <div
            onMouseEnter={e => setState({visible: true})}
            onMouseLeave={e => setState({visible: false})}
        >
            SHOW DROPDOWN
        </div>
    </Dropdown>
</div>
```

#### Always Visible fixed to container width

```jsx
<div style={{
    overflow: 'hidden',
    paddingLeft: '100px',
    paddingTop: '100px',
    height: '400px',
    width: '400px'
}}>

    <Dropdown
        dropdown={<div style={{
            backgroundColor: 'red',
            width: '300px',
            height: '300px',
        }}>Hello World</div>}
        position={1}
        align={3}
        visible={true}
        containerWidth={true}
    >
        <div>
            THIS HAS A DROPDOWN!
        </div>
    </Dropdown>
</div>
```
