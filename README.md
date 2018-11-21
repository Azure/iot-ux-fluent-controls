# Azure IoT UX Fluent Controls

This project contains common React controls (Form Inputs, DateTime etc.) that match the Azure IoT Fluent design.

# Get started
```
npm install --save @microsoft/azure-iot-ux-fluent-controls
```

This project is built on top of [Azure IoT UX Fluent CSS](https://github.com/Azure/iot-ux-fluent-css) and expects it -- along a few other common packages like React -- to be present in your app as peer dependencies. Run the following command to install these:
```
npm install --save @microsoft/azure-iot-ux-fluent-css react react-dom classnames prop-types
```

On install, this project will create a `_colors.scss` file at your `<app root>/src/styles/`. This allows you to override or extend the default colors specified in the CSS library and have it apply to the controls seamlessly. For more details, see the comments and examples in `_colors.scss`.


# Quick overview
The full documentation and sample code for the controls is available at https://aka.ms/iotfluentcontrols, but in general, the pattern is:

```tsx
import { DateField } from '@microsoft/azure-iot-ux-fluent-controls';
const initialState = {value: 'Sep 20, 2010 07:00:00 GMT'};

<div>
    <div style={{marginBottom: '20px'}}>
        Current Value: {state.value}
    </div>
    <DateField
        name='date-picker'
        label='Default Example (Local)'
        onChange={(newValue) => setState({value: newValue}) }
        initialValue={state.value}
    />
</div>
```
![Image of DateField control](https://i.imgur.com/KAT2EBf.jpg)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


## Build
1. git clone https://github.com/Azure/iot-ux-fluent-controls.git
2. npm install
3. npm run build

## Docs
1. npm run docs:build
2. npm run docs
3. You can now view style guide in the browser:
    - On local:         http://localhost:6060/
    - On your network:  http://{machine ip address}:6060/

## Bug/ Issue

https://github.com/Azure/iot-ux-fluent-controls/issues
