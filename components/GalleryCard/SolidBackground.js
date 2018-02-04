"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const css = classNames.bind(require('./GalleryCard.scss'));
/**
 * Solid color background for `GalleryCard`
 *
 * Should usually be marked as `fixed`, otherwise it will have no dimensions
 *
 * @param props Control properties (Defined in `ImageBackgroundProps` interface)
 */
exports.SolidBackground = (props) => {
    let bgColor = props.backgroundColor;
    let isClass = bgColor ? bgColor.substr(0, 1) !== '#' : false;
    let cls = css({
        'background-color': true,
        'fixed': !!props.fixed,
    }, isClass ? bgColor : '', props.className);
    let style = {
        backgroundColor: isClass ? null : bgColor
    };
    return (React.createElement(Attributes_1.Elements.div, { className: cls, style: style, attr: props.attr.container }, props.children));
};
exports.SolidBackground.defaultProps = {
    backgroundColor: '#eaeaea',
    fixed: true,
    attr: {
        container: {}
    }
};
exports.default = exports.SolidBackground;

//# sourceMappingURL=SolidBackground.js.map
