import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FormOption } from './Common';
import ComboInput from './components/Input/ComboInput';
//import './index.css';

const comboInputOptions = [
  {label: 'Label 1', value: 'Option 1'} as FormOption,
  {label: 'Label 2', value: 'Option 2'} as FormOption
];

const makeComboOptions = labels => labels.map(label => ({
  label: label,
  value: label
}) as FormOption)

const App = () => (
  <div>
    <ComboInput
      name='combo-input'
      value='value'
      onChange={()=>{}}
      options={comboInputOptions}/>
  </div>);

// TODO: move all this into an example dir with seperate build
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);