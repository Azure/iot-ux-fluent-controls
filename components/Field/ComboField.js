"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const ComboInput_1 = require("../Input/ComboInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form select box control
 *
 * `ComboField` is a hybrid of the SelectField and TextField controls. It
 * functions as a 'new or existing' text field where the user can type in a
 * custom value or pick from a list of values provided by the control.
 *
 * `ComboField` consumes the property `options: FormOption[]` which specify each
 * option's `value` and `label`. The former can be any object while the latter
 * can be any React node (or a string). `ComboField` also consumes a
 * `value: string | FormOption` property that sets the current value of the
 * `ComboField` text field. If `value` is a `string`, the user is typing in a
 * custom value and if it is an object, the user has either typed in a value
 * equal to one of the options or has selected an option from the dropdown list.
 *
 * In this example of a default `ComboField`, `FormOption.value` must be a string,
 *  which allows you to use `ComboField` with only the properties `name`, `value`,
 * `onChange`, and `options`. When the user types in 'Option 1', that option will
 * be considered selected instead of a custom object.
 *
 * *Reffer to the other examples on how to use `ComboField`'s callbacks to further
 * modify what options display in the dropdown.*
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of radio buttons is the numerical index of the option in
 * `ComboField.options` so `ComboField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * @param props: Object fulfilling `ComboFieldProps` interface
 */
exports.ComboField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement("div", null,
            React.createElement(ComboInput_1.ComboInput, { name: props.name, value: props.value, placeholder: props.placeholder, options: props.options, optionMap: props.optionMap, optionFilter: props.optionFilter, optionSelect: props.optionSelect, optionLabel: props.optionLabel, error: !!props.error, disabled: props.disabled, readOnly: props.readOnly, onChange: props.onChange, className: props.inputClassName, autoFocus: props.autoFocus, showLabel: props.showLabel, required: props.required, attr: props.attr }))));
};
exports.ComboField.defaultProps = {
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
        textbox: {},
        input: {},
        clearButton: {},
        chevron: {},
        dropdown: {},
        option: {},
    }
};
exports.default = exports.ComboField;

//# sourceMappingURL=ComboField.js.map
