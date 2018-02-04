"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Icon_1 = require("../Icon");
const css = classNames.bind(require('./Pivot.scss'));
exports.pivotClassName = css('pivot');
exports.menuClassName = css('pivot-menu');
exports.Pivot = (props) => {
    let contents;
    if (props.icon) {
        contents = (React.createElement(Icon_1.Icon, { icon: props.icon, size: Icon_1.IconSize.xsmall, className: css('pivot-icon'), labelClassName: css('pivot-icon-label'), attr: props.attr.icon }, props.text));
    }
    else {
        contents = (React.createElement(Attributes_1.Elements.span, { className: css('pivot-label'), attr: props.attr.content }, props.text));
    }
    /**
     * Contents are rendered twices to give the pivot height and allow the text
     * to center vertically
     */
    return (React.createElement(Attributes_1.Elements.div, { className: css('pivot-container', {
            'disabled': props.disabled,
            'selected': props.selected,
        }), attr: props.attr.container },
        contents,
        contents,
        React.createElement(Attributes_1.Elements.div, { className: css('pivot-border'), attr: props.attr.bottomBorder }),
        React.createElement(Attributes_1.Elements.div, { className: css('focus-border'), attr: props.attr.focusBorder }),
        React.createElement(Attributes_1.Elements.div, { className: css('pivot-contents'), attr: props.attr.innerContent })));
};
exports.Pivot.defaultProps = {
    text: undefined,
    attr: {
        container: {},
        bottomBorder: {},
        focusBorder: {},
        content: {},
        icon: { container: {}, label: {} },
    }
};
exports.default = exports.Pivot;

//# sourceMappingURL=Pivot.js.map
