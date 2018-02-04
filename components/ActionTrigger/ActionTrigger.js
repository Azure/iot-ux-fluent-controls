"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Icon_1 = require("../Icon");
const Attributes_1 = require("../../Attributes");
const css = classNames.bind(require('./ActionTrigger.scss'));
/**
 * ActionTrigger showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `ActionTriggerProps` interface)
 */
exports.ActionTrigger = (props) => {
    const className = css('action-trigger-container', {
        'disabled': props.disabled,
        'action-trigger-label-empty': !props.label
    }, props.className);
    let suffix;
    if (props.rightIcon) {
        suffix = React.createElement(Icon_1.Icon, { icon: props.rightIcon, size: Icon_1.IconSize.xsmall, className: css('suffix'), attr: props.attr.suffix || {} });
    }
    return (React.createElement(Attributes_1.Elements.div, { className: className, attr: props.attr.container || {} },
        React.createElement(Icon_1.Icon, { icon: props.icon, labelClassName: css('action-trigger-label'), size: Icon_1.IconSize.xsmall, attr: props.attr.icon || {} }, props.label),
        suffix));
};
exports.ActionTrigger.defaultProps = {
    icon: undefined,
    attr: { container: {}, icon: {}, suffix: {} }
};
exports.default = exports.ActionTrigger;

//# sourceMappingURL=ActionTrigger.js.map
