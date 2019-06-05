______________________________________________________________________________

### `ContextPanel.props.attr`

```html
<ContextPanelPortal
    header={...props.header: React.ReactNode}
    footer={...props.footer: React.ReactNode}
    onClose={...props.onClose: React.EventHandler<any>}
>
    Hello, World!
</ContextPanelPortal>
```
______________________________________________________________________________

### Examples

```jsx
const Btn = require('../Button').Button;
<ContextPanelPortal 
    header='Hello'
    children={<div>This is context panel 1</div>}
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
/>
```

```jsx
const Btn = require('../Button').Button;
<ContextPanelPortal 
    header={<><div>Hello</div><div>world!</div></>}
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
>
    This is context panel 1          
</ContextPanelPortal>
```
