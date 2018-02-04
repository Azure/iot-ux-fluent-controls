"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const SelectInput_1 = require("../Input/SelectInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form select box control
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of option tags is the numerical index of the option in
 * `SelectField.options` so `SelectField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * @param props: Object fulfilling `SelectFieldProps` interface
 */
exports.SelectField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(SelectInput_1.SelectInput, { name: props.name, value: props.value, options: props.options, error: !!props.error, disabled: props.disabled, onChange: props.onChange, className: props.inputClassName, autoFocus: props.autoFocus, required: props.required, attr: props.attr })));
};
exports.SelectField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    options: undefined,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        select: {},
        option: {},
        chevron: {},
    }
};
exports.default = exports.SelectField;

//# sourceMappingURL=SelectField.js.map
