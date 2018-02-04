"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const RadioInput_1 = require("../Input/RadioInput");
const FormField_1 = require("./FormField");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level form select box control
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of radio buttons is the numerical index of the option in
 * `RadioField.options` so `RadioField.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * @param props: Object fulfilling `RadioFieldProps` interface
 */
exports.RadioField = (props) => {
    const onChange = (newValue) => {
        const index = parseInt(newValue);
        props.onChange(props.options[index].value);
    };
    const options = props.options.map((option, index) => {
        return (React.createElement(RadioInput_1.RadioInput, { name: props.name, value: `${index}`, label: option.label, columns: props.columns, checked: props.value === option.value, disabled: props.disabled || option.disabled, hidden: option.hidden, onChange: onChange, className: props.inputClassName, key: `${props.name}-${index}`, autoFocus: props.autoFocus, required: props.required, attr: Attributes_1.mergeAttributeObjects(props.attr, option.attr, [
                'container',
                'label',
                'input',
                'radio',
                'text',
                'fill',
                'border',
            ]) }));
    });
    return (React.createElement(FormField_1.FormField, { name: props.name, label: props.label, error: props.error, errorTitle: props.errorTitle, loading: props.loading, required: props.required, className: props.className, attr: props.attr },
        React.createElement("div", null, options)));
};
exports.RadioField.defaultProps = {
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
        label: {},
        input: {},
        radio: {},
        text: {},
        fill: {},
        border: {},
    }
};
exports.default = exports.RadioField;

//# sourceMappingURL=RadioField.js.map
