```jsx
let onChange = (newValue) => console.log(newValue);

<div>
    <DatePicker name='date-picker' onChange={onChange} />
    <DatePicker name='date-picker' onChange={onChange} disabled />
    <DatePicker name='date-picker' onChange={onChange} showAbove initialValue='Sep 3122, 2010 00:00:00 GMT' error />
</div>
```