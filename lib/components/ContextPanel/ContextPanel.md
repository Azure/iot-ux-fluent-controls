______________________________________________________________________________

### `ContextPanel.props.attr`

```html
<ContextPanel
    header={...props.header: React.ReactNode}
    footer={...props.footer: React.ReactNode}
    onClose={...props.onClose: React.EventHandler<any>}
>
    Hello, World!
</ContextPanel>
```
______________________________________________________________________________

### Examples

```jsx
const Btn = require('../Button').Button;
<ContextPanel 
    header='Hello'
    children={<div>This is context panel with a portal</div>}
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
/>
```

```jsx
const Btn = require('../Button').Button;
<ContextPanel 
    header={<><div>Hello</div><div>world!</div></>}
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
    omitPortal={true}
>
    This is context panel without a portal          
</ContextPanel>
```
