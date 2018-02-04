"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const TextInput_1 = require("../Input/TextInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form text field
 *
 * @param props Control properties (defined in `TextFieldProps` interface)
 */
exports.TextField = (props) => {
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement(TextInput_1.TextInput, { name: props.name, value: props.value, placeholder: props.placeholder, type: props.type, prefix: props.prefix, prefixClassName: props.prefixClassName, postfix: props.postfix, postfixClassName: props.postfixClassName, error: !!props.error, disabled: props.disabled, readOnly: props.readOnly, onChange: props.onChange, className: props.inputClassName, autoFocus: props.autoFocus, required: props.required, attr: props.attr })));
};
exports.TextField.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    type: 'text',
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
        clearButton: {},
    }
};
exports.default = exports.TextField;

//# sourceMappingURL=TextField.js.map
