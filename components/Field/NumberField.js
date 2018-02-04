"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const NumberInput_1 = require("../Input/NumberInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form text field
 *
 * @param props Control properties (defined in `NumberFieldProps` interface)
 */
exports.NumberField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(NumberInput_1.NumberInput, { name: props.name, initialValue: props.initialValue, placeholder: props.placeholder, prefix: props.prefix, postfix: props.postfix, error: !!props.error, disabled: props.disabled, readOnly: props.readOnly, onChange: props.onChange, className: props.inputClassName, autoFocus: props.autoFocus, step: props.step, min: props.min, max: props.max, required: props.required, attr: props.attr })));
};
exports.NumberField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        input: {},
        inputContainer: {},
        prefix: {},
        postfix: {},
    }
};
exports.default = exports.NumberField;

//# sourceMappingURL=NumberField.js.map
