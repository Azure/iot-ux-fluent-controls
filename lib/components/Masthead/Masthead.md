______________________________________________________________________________

### `Masthead.props.attr`

```html
<Masthead
    branding={...props.branding: string}
    navigation={...props.navigation: NavigationProperties}
    toolBarItems: {...props.toolBarItems}
    userItemAttr={...props.attr: MastheadAttributes}
/>
```
______________________________________________________________________________

### Examples

```jsx
<Masthead branding={'Fluent Controls Brand'} toolBarItems={{
        search: { key: 'search', label: 'search', onClick: () => { } },
        settings: { title: 'settings', content: 'settings content', actions: { cancel: { event: () => alert('cancel'), label: 'cancel' } } },
        help: { title: 'help', content: 'help content', actions: { cancel: { event: () => alert('cancel'), label: 'cancel' } } }
    }}
/>
```