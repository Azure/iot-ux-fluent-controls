```jsx
let onChange = (newValue) => alert(newValue);

<div>
    <DatePicker name="date-picker" onChange={onChange} />
    <DatePicker name="date-picker" onChange={onChange} disabled />
    <DatePicker name="date-picker" onChange={onChange} error />
</div>
```