"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./RadioInput.scss'));
/**
 * Low level radio button control
 *
 * (Use the `RadioField` control instead when making a form with standard styling)
 *
 * @param props Control properties (defined in `RadioInputProps` interface)
 */
exports.RadioInput = (props) => {
    const classes = { 'disabled': props.disabled, 'selected': props.checked };
    const containerClass = css('radio-container', {
        'columns': props.columns,
        'hidden': props.hidden
    }, props.className);
    const id = `${props.name}_${props.value}`;
    const onClick = (event) => {
        props.onChange(props.value);
    };
    return (React.createElement(Attributes_1.Elements.div, { className: containerClass, attr: props.attr.container },
        React.createElement(Attributes_1.Elements.label, { className: css('radio-label', classes), htmlFor: id, attr: props.attr.label },
            React.createElement(Attributes_1.Elements.input, { id: id, type: 'radio', value: props.value, name: props.name, disabled: props.disabled, hidden: props.hidden, checked: props.checked, onClick: onClick, autoFocus: props.autoFocus, methodRef: props.autoFocus && Common_1.autoFocusRef, required: props.required, attr: props.attr.input }),
            React.createElement(Attributes_1.Elements.span, { className: css('radio-button', classes), attr: props.attr.radio }),
            React.createElement(Attributes_1.Elements.span, { className: css('radio-text'), attr: props.attr.text }, props.label),
            React.createElement(Attributes_1.Elements.span, { className: css('radio-fill', classes), attr: props.attr.fill }))));
};
exports.RadioInput.defaultProps = {
    name: undefined,
    value: undefined,
    label: undefined,
    onChange: undefined,
    columns: false,
    hidden: false,
    attr: {
        container: {},
        label: {},
        input: {},
        radio: {},
        text: {},
        fill: {},
        border: {},
    }
};
exports.default = exports.RadioInput;

//# sourceMappingURL=RadioInput.js.map
