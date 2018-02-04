"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classnames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const css = classnames.bind(require('../../Button.scss'));
/**
 * Button showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `ButtonProps` interface)
 */
exports.Button = (props) => {
    const icon = props.icon ? React.createElement(Attributes_1.Elements.span, { className: css(`icon icon-${props.icon}`), attr: props.attr.icon }) : '';
    return (React.createElement(Attributes_1.Elements.button, { type: props.type, title: props.title, className: css('method-btn', {
            'method-btn-primary': props.primary
        }, props.className), onClick: props.onClick, disabled: props.disabled, attr: props.attr.container },
        icon,
        props.children));
};
exports.Button.defaultProps = {
    onClick: undefined,
    type: 'button',
    attr: {
        container: {},
        icon: {}
    }
};
exports.default = exports.Button;

//# sourceMappingURL=Button.js.map
