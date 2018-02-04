"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const ActionTrigger_1 = require("../ActionTrigger");
const Attributes_1 = require("../../Attributes");
const css = classNames.bind(require('./ActionTrigger.scss'));
exports.ActionTriggerButton = (props) => {
    return (React.createElement(Attributes_1.Elements.button, { type: 'button', onClick: props.onClick, className: css('action-trigger-button', {
            'disabled': props.disabled
        }, props.className), disabled: props.disabled, tabIndex: props.tabIndex, attr: props.attr.button },
        React.createElement(ActionTrigger_1.ActionTrigger, { icon: props.icon, rightIcon: props.rightIcon, label: props.label, disabled: props.disabled, attr: props.attr })));
};
exports.ActionTriggerButton.defaultProps = {
    icon: undefined,
    attr: Object.assign({ button: {} }, { container: {}, icon: {}, suffix: {} })
};
exports.default = exports.ActionTriggerButton;

//# sourceMappingURL=ActionTriggerButton.js.map
