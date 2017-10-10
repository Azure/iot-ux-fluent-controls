______________________________________________________________________________

### `Pivot.props.attr`

```html
<Pivot attr={...}>
    <div {...props.attr.container}>
        <Icon attr={props.attr.icon}>
            {props.text}
        </Icon>
        <div {...props.attr.bottomBorder}/>
        <div {...props.attr.focusBorder}/>
        <div {...props.attr.innerContent}/>
    </div>
</Pivot>
```

##### or

```html
<Pivot attr={...}>
    <div {...props.attr.container}>
        <span {...props.attr.content}>
            {props.text}
        </span>
        <div {...props.attr.bottomBorder}/>
        <div {...props.attr.focusBorder}/>
        <div {...props.attr.innerContent}/>
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