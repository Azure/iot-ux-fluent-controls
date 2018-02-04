"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./TextInput.scss'));
exports.prefixClassName = css('prefix-addon');
exports.postfixClassName = css('postfix-addon');
/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
exports.TextInput = (props) => {
    const containerClassName = css('text-input-container', props.className);
    const inputContainerClassName = css('input-container');
    const inputClassName = css({
        'input': true,
        'error': props.error,
        'show-cancel': !!props.value && props.type !== 'number'
    });
    const cancelClassName = css('cancel', 'icon icon-cancelLegacy');
    const onChange = (event) => {
        if (props.value !== event.target.value) {
            props.onChange(event.target.value);
        }
        event.stopPropagation();
    };
    const clearButton = props.disabled || props.type === 'number' ? '' :
        React.createElement(Attributes_1.Elements.button, { type: 'button', className: cancelClassName, onClick: () => props.onChange(''), tabIndex: -1, attr: props.attr.clearButton });
    let prefix = null;
    if (props.prefix) {
        const className = css('prefix', props.prefixClassName);
        prefix = (React.createElement(Attributes_1.Elements.div, { className: className, attr: props.attr.prefix }, props.prefix));
    }
    let postfix = null;
    if (props.postfix) {
        const className = css('postfix', props.postfixClassName);
        postfix = (React.createElement(Attributes_1.Elements.div, { className: className, attr: props.attr.postfix }, props.postfix));
    }
    return (React.createElement(Attributes_1.Elements.div, { className: containerClassName, attr: props.attr.container },
        prefix,
        React.createElement(Attributes_1.Elements.div, { className: inputContainerClassName, attr: props.attr.inputContainer },
            React.createElement(Attributes_1.Elements.input, { type: props.type, name: props.name, value: props.value == null ? '' : props.value, className: inputClassName, onChange: onChange, placeholder: props.placeholder, required: props.required, disabled: props.disabled, readOnly: props.readOnly, autoFocus: props.autoFocus, methodRef: props.autoFocus && Common_1.autoFocusRef, attr: props.attr.input }),
            clearButton),
        postfix));
};
exports.TextInput.defaultProps = {
    name: undefined,
    value: undefined,
    onChange: undefined,
    type: 'text',
    attr: {
        container: {},
        input: {},
        inputContainer: {},
        prefix: {},
        postfix: {},
        clearButton: {},
    }
};
exports.default = exports.TextInput;

//# sourceMappingURL=TextInput.js.map
