"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classnames = require("classnames");
const Attributes_1 = require("../../Attributes");
const css = classnames;
/**
 * Link showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `LinkProps` interface)
 */
exports.Link = (props) => {
    return (React.createElement(Attributes_1.Elements.a, { href: props.href, className: css('link', { 'disabled': props.disabled }), onClick: props.onClick, attr: props.attr.container }, props.children));
};
exports.Link.defaultProps = {
    href: undefined,
    attr: {
        container: {}
    }
};
exports.default = exports.Link;

//# sourceMappingURL=Link.js.map
