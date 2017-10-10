______________________________________________________________________________

### `Pivot.props.attr`

```html
<Pivot attr={...}>
    <div className='pivot-container' {...props.attr.container}>
        <Icon className='pivot-icon' attr={props.attr.icon}>
            {props.text}
        </Icon>
        <div className='pivot-border' {...props.attr.bottomBorder}/>
        <div className='focus-border' {...props.attr.focusBorder}/>
        <div className='pivot-contents' {...props.attr.innerContent}/>
    </div>
</Pivot>
```

##### or

```html
<Pivot attr={...}>
    <div className='pivot-container' {...props.attr.container}>
        <span className='pivot-label' {...props.attr.content}>
            {props.text}
        </span>
        <div className='pivot-border' {...props.attr.bottomBorder}/>
        <div className='focus-border' {...props.attr.focusBorder}/>
        <div className='pivot-contents' {...props.attr.innerContent}/>
    </div>
</Pivot>
```

______________________________________________________________________________

### Examples

```jsx
const menuClassName = require('./Pivot').menuClassName;
const pivotClassName = require('./Pivot').pivotClassName;
<div className={ menuClassName }>
    <a href='#' className={ pivotClassName }><Pivot icon='info' text='Pivot 1' selected/></a>
    <a href='#' className={ pivotClassName }><Pivot icon='warning' text='Pivot 2'/></a>
    <a href='#' className={ pivotClassName }><Pivot icon='error' text='Pivot 3' disabled/></a>
    <a href='#' className={ pivotClassName }><Pivot text='Pivot 4'/></a>
    <a href='#' className={ pivotClassName }><Pivot text='Pivot 4' selected disabled/></a>
    <a href='#' className={ pivotClassName }><Pivot text='View Connection Information Information' selected /></a>
</div>
```