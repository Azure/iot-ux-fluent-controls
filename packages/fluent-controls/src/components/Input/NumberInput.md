______________________________________________________________________________

### `NumberInput.props.attr`

```html
<NumberInput attr={...}>
    <div className='text-input-container' {...props.attr.container}>
        <div className='prefix' {...props.attr.prefix}>
            {props.prefix}
        </div>
        <div className='input-container' {...props.attr.inputContainer}>
            <input type='number' className='input' {...props.attr.input} />
        </div>
        <div className='postfix' {...props.attr.postfix}>
            {props.postfix}
        </div>
    </div>
</NumberInput>
```

______________________________________________________________________________

### Examples

#### Default

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<div>
    <div>Current Value: {state.value}</div>
    <NumberInput
        name='textinput'
        onChange={onChange}
        attr={{input: {'data-test-hook': 'text-input-1'}}}
    />
</div>
```

#### Positive Value

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<div>
    <div>Current Value: {state.value}</div>
    <NumberInput
        name='textinput'
        initialValue=''
        onChange={onChange}
        positive
        attr={{input: {'data-test-hook': 'text-input-1'}}}
    />
</div>
```

#### Integer Value

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});

<div>
    <div>Current Value: {state.value}</div>
    <NumberInput
        name='textinput'
        initialValue=''
        onChange={onChange}
        integer
        attr={{input: {'data-test-hook': 'text-input-1'}}}
    />
</div>
```

#### Error when less than 0

```jsx
let initialState = {value: 'invalid'};
let onChange = (newValue) => setState({value: newValue});

<div>
    <div>Current Value: {state.value}</div>
    <NumberInput
        name='textinput'
        initialValue=''
        error={state.value === 'invalid' ? true : ((state.value > 0) ? false : true)}
        onChange={onChange}
        positive
        attr={{input: {'data-test-hook': 'text-input-1'}}}
    />
</div>
```


#### Postfix and Prefix

```jsx
let initialState = {value: ''};
let onChange = (newValue) => setState({value: newValue});
let prefix = 'PREFIX';
let postfix = 'POSTFIX';

<div>
    <div>Current Value: {state.value}</div>
    <NumberInput
        name='textinput'
        initialValue=''
        onChange={onChange}
        prefix={prefix}
        postfix={postfix}
        attr={{input: {'data-test-hook': 'text-input-1'}}}
    />
</div>
```