______________________________________________________________________________

### `ContentPanel.props.attr`

```html
<ContentPanel
    header={...props.header: React.ReactNode}
    footer={...props.footer: React.ReactNode}
    onClose={...props.onClose: React.EventHandler<any>}
>
    Hello, World!
</ContentPanel>
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