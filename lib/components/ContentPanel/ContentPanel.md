______________________________________________________________________________

### `ContentPanel.props.attr`

```html
<ContentPanel
    title={...props.title: string}
    content={...props.content: React.ReactNode | string}
    action: {  
        confirm:{
            label: string;
            event: Function;
        },
        cancel:{ 
            label: string;
            event: Function;
        }
    }
/>
```
______________________________________________________________________________

### Examples

```jsx
<ContentPanel 
    title={'Content Panel'}
    content={<div style={{height: '200px', width: '100%', background:'red', color: 'white', padding:'10px'}}>this is a string content</div>}
    actions={{ 
        confirm:{ label: 'action', event: ()=> alert('action triggered')},
        cancel:{ label: 'action', event: ()=> alert('cancel triggered')}
    }}
/>
```