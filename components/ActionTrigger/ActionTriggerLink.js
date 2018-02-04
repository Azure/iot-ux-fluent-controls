"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ActionTrigger_1 = require("../ActionTrigger");
const Attributes_1 = require("../../Attributes");
exports.ActionTriggerLink = (props) => {
    return (React.createElement(Attributes_1.Elements.a, { href: props.href, onClick: props.onClick, className: props.className, attr: props.attr.anchor },
        React.createElement(ActionTrigger_1.ActionTrigger, { icon: props.icon, rightIcon: props.rightIcon, label: props.label, disabled: props.disabled, attr: props.attr })));
};
exports.ActionTriggerLink.defaultProps = {
    icon: undefined,
    href: undefined,
    attr: Object.assign({ anchor: {}, icon: {} }, { container: {}, icon: {}, suffix: {} })
};
exports.default = exports.ActionTriggerLink;

//# sourceMappingURL=ActionTriggerLink.js.map
