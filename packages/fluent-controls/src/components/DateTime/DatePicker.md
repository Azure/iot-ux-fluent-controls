```jsx
let onChange = (newValue) => console.log(newValue);

<div>
    <DatePicker name="date-picker" onChange={onChange} />
    <DatePicker name="date-picker" onChange={onChange} disabled />
    <DatePicker name="date-picker" onChange={onChange} error />
</div>
```