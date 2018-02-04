"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./Toggle.scss'));
/**
 * Toggle button that is an on or off state
 *
 * @param props Control properties (defined in `ToggleProps` interface)
 */
exports.Toggle = (props) => {
    const containerClassName = css('toggle', {
        'toggle-on': props.on,
        'disabled': props.disabled
    });
    const onClick = (event) => {
        if (!props.disabled && props.onChange) {
            props.onChange(!props.on);
        }
    };
    const tabIndex = props.disabled ? -1 : null;
    const label = props.on ? props.onLabel : props.offLabel;
    return (React.createElement(Attributes_1.Elements.div, { className: containerClassName, attr: props.attr.container },
        React.createElement(Attributes_1.Elements.button, { type: 'button', className: css('toggle-button'), onClick: onClick, tabIndex: tabIndex, name: props.name, autoFocus: props.autoFocus, methodRef: props.autoFocus && Common_1.autoFocusRef, attr: props.attr.button }),
        React.createElement(Attributes_1.Elements.div, { className: css('toggle-switch'), attr: props.attr.switch }),
        React.createElement(Attributes_1.Elements.div, { className: css('toggle-label'), attr: props.attr.text }, label)));
};
exports.Toggle.defaultProps = {
    name: undefined,
    onChange: undefined,
    onLabel: 'On',
    offLabel: 'Off',
    attr: {
        container: {},
        button: {},
        border: {},
        switch: {},
        text: {},
    }
};
exports.default = exports.Toggle;

//# sourceMappingURL=Toggle.js.map
