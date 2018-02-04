"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Common_1 = require("../../Common");
const DatePicker_1 = require("./DatePicker");
const FormField_1 = require("../Field/FormField");
/**
 * High level form text field
 *
 * @param props Control properties (defined in `DateFieldProps` interface)
 */
exports.DateField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(DatePicker_1.DatePicker, { name: props.name, initialValue: props.initialValue, localTimezone: props.localTimezone, tabIndex: props.tabIndex, showAbove: props.showAbove, format: props.format, error: !!props.error, disabled: props.disabled, required: props.required, onChange: props.onChange, className: props.inputClassName, attr: props.attr })));
};
exports.DateField.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    format: Common_1.DateFormat.MMDDYYYY,
    tabIndex: -1,
    localTimezone: true,
    showAbove: false,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
        container: {},
        inputContainer: {},
        input: {},
        inputIcon: {},
        dropdownContainer: {},
        dropdownTriangle: {},
        calendar: {},
    }
};
exports.default = exports.DateField;

//# sourceMappingURL=DateField.js.map
