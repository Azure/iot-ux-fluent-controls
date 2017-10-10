______________________________________________________________________________

### `PivotMenu.props.attr`

```html
<PivotMenu attr={...}>
    <div {...props.attr.container}>
        <a {...props.attr.anchor}>
            <div {...props.attr.pivot.pivot.container}>
                <span {...props.attr.pivot.pivot.content}>
                    {props.links[0].label}
                </span>
                <div {...props.attr.pivot.pivot.bottomBorder}/>
                <div {...props.attr.pivot.pivot.focusBorder}/>
                <div {...props.attr.pivot.pivot.innerContent}/>
            </div>
        </a>
        ...
        <a {...props.attr.anchor}>
            <div {...props.attr.pivot.pivot.container}>
                <span {...props.attr.pivot.pivot.content}>
                    {props.links[props.links.index - 1].label}
                </span>
                <div {...props.attr.pivot.pivot.bottomBorder}/>
                <div {...props.attr.pivot.pivot.focusBorder}/>
                <div {...props.attr.pivot.pivot.innerContent}/>
            </div>
        </a>
    </div>
</PivotMenu>
```

______________________________________________________________________________

### Examples
```jsx
const initialState = {value: '1'};
const pivot = (num) => {
    return {
        label: `PivotMenu #${num}`,
        key: `${num}`,
        icon: 'info',
        href: `#/!Page${num}`,
        title: `Title for PivotMenu #${num}`,
        onClick: (event) => {
            setState({value: `${num}`});
            event.preventDefault();
        }
    };
};

<PivotMenu
    links={[
        pivot(0),
        pivot(1),
        pivot(2),
        pivot(3),
        pivot(4)
    ]}
    active={state.value}
/>
```