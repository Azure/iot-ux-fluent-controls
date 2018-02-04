"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const CheckboxInput_1 = require("../Input/CheckboxInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form checkbox control
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of checkboxes is the numerical index of the option in
 * `CheckboxField.options` so `CheckboxField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * @param props: Object fulfilling `CheckboxFieldProps` interface
 */
exports.CheckboxField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement("div", null,
            React.createElement(CheckboxInput_1.CheckboxInput, { name: props.name, checked: props.value, label: props.label, disabled: props.disabled, onChange: props.onChange, className: props.inputClassName, autoFocus: props.autoFocus, required: props.required, attr: props.attr }))));
};
exports.CheckboxField.defaultProps = {
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
        label: {},
        input: {},
        text: {},
        checkbox: {},
        indeterminateFill: {},
        checkmarkIcon: {},
        border: {},
    }
};
exports.default = exports.CheckboxField;

//# sourceMappingURL=CheckboxField.js.map
