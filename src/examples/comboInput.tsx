import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormOption } from '../Common';
import ComboInput from '../components/Input/ComboInput';

const comboInputOptions = [
  { label: 'Label 1', value: 'Option 1' } as FormOption,
  { label: 'Label 2', value: 'Option 2' } as FormOption
];

const makeComboOptions = labels => labels.map(label => ({
  label: label,
  value: label
}) as FormOption);

const ComboInputExample = () => (
  <ComboInput
    name='combo-input'
    value='value'
    onChange={() => { }}
    options={comboInputOptions} />);

export default ComboInputExample;