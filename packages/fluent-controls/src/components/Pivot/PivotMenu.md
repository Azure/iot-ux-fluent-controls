Pivot Menu

```jsx
const initialState = {value: '1'};
const pivot = (num) => {
    return {
        label: `Pivot #${num}`,
        key: `${num}`,
        icon: 'info',
        href: `#/!Page${num}`,
        title: `Title for Pivot #${num}`,
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