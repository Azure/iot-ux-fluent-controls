"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Pivot_1 = require("../../Pivot");
const css = classNames.bind(require('./Pivot.scss'));
exports.PivotMenu = (props) => {
    return (React.createElement(Attributes_1.Elements.div, { className: css('pivot-menu', props.className), attr: props.attr.container }, props.links.map(link => {
        return React.createElement(Attributes_1.Elements.a, { href: link.href, onClick: link.onClick, title: link.title, tabIndex: props.tabIndex, className: css('pivot', { 'disabled': link.disabled }, props.anchorClassName), hidden: link.hidden, key: link.key, attr: Attributes_1.mergeAttributes(props.attr.anchor, (link.attr || { anchor: {} }).anchor) },
            React.createElement(Pivot_1.Pivot, { icon: link.icon, text: link.label, selected: link.key === props.active, disabled: link.disabled, className: props.pivotClassName, attr: Attributes_1.mergeAttributeObjects(props.attr.pivot, link.attr, [
                    'container',
                    'bottomBorder',
                    'focusBorder',
                    'content',
                    'innerContent',
                    'icon',
                ]) }));
    })));
};
exports.PivotMenu.defaultProps = {
    links: undefined,
    active: '',
    tabIndex: 0,
    attr: {
        container: {},
        anchor: {},
        pivot: {
            container: {},
            bottomBorder: {},
            focusBorder: {},
            content: {},
            icon: { container: {}, label: {} },
        }
    }
};
exports.default = exports.PivotMenu;

//# sourceMappingURL=PivotMenu.js.map
