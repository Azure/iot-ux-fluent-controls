"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./SelectInput.scss'));
/**
 * Low level select combo box control
 *
 * IMPORTANT: The options provided to this control must all be UNIQUE. The
 * `value` property of option tags is the numerical index of the option in
 * `SelectInput.options` so `SelectInput.value` is compared to each value in
 * `options` (===) to decide which option is the one currently selected.
 *
 * (Use the `SelectField` control instead when making a form with standard styling)
 *
 * @param props Control properties (defined in `SelectInputProps` interface)
 */
exports.SelectInput = (props) => {
    const containerClass = css('combo-container', props.className);
    const comboClass = css('combo', { 'error': props.error });
    const arrowClassName = css('arrow', 'icon icon-chevronDown4Legacy');
    let value = -1;
    let options = props.options.map((opt, index) => {
        if (opt.value === props.value) {
            value = index;
        }
        return (React.createElement(Attributes_1.Elements.option, { value: index, key: index, disabled: opt.disabled, hidden: opt.hidden, className: css({ 'option-hidden': !!opt.hidden }), attr: Attributes_1.mergeAttributes(props.attr.option, opt.attr) }, opt.label));
    });
    const onChange = (event) => {
        const index = parseInt(event.target.value);
        const value = props.options[index].value;
        props.onChange(value);
    };
    return (React.createElement(Attributes_1.Elements.div, { className: containerClass, attr: props.attr.container },
        React.createElement(Attributes_1.Elements.select, { name: props.name, value: value, className: comboClass, onChange: onChange, disabled: props.disabled, autoFocus: props.autoFocus, methodRef: props.autoFocus && Common_1.autoFocusRef, required: props.required, attr: props.attr.select }, options),
        React.createElement(Attributes_1.Elements.span, { className: arrowClassName, attr: props.attr.chevron })));
};
exports.SelectInput.defaultProps = {
    name: undefined,
    value: undefined,
    onChange: undefined,
    options: undefined,
    attr: {
        container: {},
        select: {},
        option: {},
        chevron: {},
    }
};
exports.default = exports.SelectInput;

//# sourceMappingURL=SelectInput.js.map
