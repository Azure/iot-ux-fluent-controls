"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const TextArea_1 = require("../Input/TextArea");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form text field
 *
 * @param props Control properties (defined in `TextAreaFieldProps` interface)
 */
exports.TextAreaField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(TextArea_1.TextArea, { name: props.name, value: props.value, placeholder: props.placeholder, error: !!props.error, disabled: props.disabled, readOnly: props.readOnly, onChange: props.onChange, className: props.inputClassName, autogrow: props.autogrow, autoFocus: props.autoFocus, required: props.required, attr: props.attr })));
};
exports.TextAreaField.defaultProps = {
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
        textarea: {},
        pre: {}
    }
};
exports.default = exports.TextAreaField;

//# sourceMappingURL=TextAreaField.js.map
