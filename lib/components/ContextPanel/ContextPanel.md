______________________________________________________________________________

### `ContentPanel.props.attr`

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
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
>
    This is context panel 1          
</ContextPanel>
```

```jsx
const Btn = require('../Button').Button;
<ContextPanel 
    header={<div>Hello</div>}
    children={<div>This is context panel 1</div>}
    footer={<Btn icon='cancel' onClick={()=> alert('cancel triggered')} attr={{ container: { autoFocus: true }}}>Cancel</Btn>}
    onClose={()=> alert('cancel triggered')}
/>
```
