"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Common_1 = require("../../Common");
const Attributes_1 = require("../../Attributes");
const Icon_1 = require("../Icon");
const css = classNames.bind(require('./CheckboxInput.scss'));
/**
 * Low level checkbox control
 *
 * (Use the `CheckboxField` control instead when making a form with standard styling)
 *
 * @param props Control properties (defined in `CheckboxInputProps` interface)
 */
exports.CheckboxInput = (props) => {
    const containerClass = css('checkbox-container', {
        'columns': props.columns,
        'disabled': props.disabled,
        'selected': props.checked,
        'indeterminate': props.indeterminate
    }, props.className);
    const id = `${props.name}_checkbox`;
    const onChange = (event) => {
        props.onChange(event.target.checked);
    };
    return (React.createElement(Attributes_1.Elements.div, { className: containerClass, hidden: props.hidden, attr: props.attr.container },
        React.createElement(Attributes_1.Elements.label, { className: css('checkbox-label'), htmlFor: id, attr: props.attr.label },
            React.createElement(Attributes_1.Elements.input, { id: id, type: 'checkbox', name: props.name, disabled: props.disabled, hidden: props.hidden, checked: props.checked, required: props.required, onChange: onChange, autoFocus: props.autoFocus, methodRef: props.autoFocus && Common_1.autoFocusRef, attr: props.attr.input }),
            React.createElement(Attributes_1.Elements.span, { className: css('checkbox-button'), attr: props.attr.checkbox }),
            React.createElement(Attributes_1.Elements.span, { className: css('checkbox-text'), attr: props.attr.text }, props.label),
            React.createElement(Attributes_1.Elements.span, { className: css('checkbox-fill'), attr: props.attr.indeterminateFill }),
            React.createElement(Icon_1.Icon, { icon: 'checkMark', size: Icon_1.IconSize.xsmall, className: css('checkbox-checkmark'), attr: props.attr.checkmarkIcon }))));
};
exports.CheckboxInput.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
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
exports.default = exports.CheckboxInput;

//# sourceMappingURL=CheckboxInput.js.map
