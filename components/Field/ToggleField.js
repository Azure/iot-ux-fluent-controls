"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const FormField_1 = require("./FormField");
const Toggle_1 = require("../Toggle");
/**
 * High level form toggle switch control
 *
 * @param props: Object fulfilling `ToggleFieldProps` interface
 */
exports.ToggleField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement("div", null,
            React.createElement(Toggle_1.Toggle, { on: props.value, name: props.name, disabled: props.disabled, onChange: props.onChange, onLabel: props.onLabel, offLabel: props.offLabel, className: props.inputClassName, autoFocus: props.autoFocus, attr: props.attr }))));
};
exports.ToggleField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        button: {},
        border: {},
        switch: {},
        text: {},
    }
};
exports.default = exports.ToggleField;

//# sourceMappingURL=ToggleField.js.map
