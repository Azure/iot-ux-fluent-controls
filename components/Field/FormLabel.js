"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Icon_1 = require("../Icon");
const Balloon_1 = require("../Balloon");
const css = classNames.bind(require('./Field.scss'));
exports.requiredClassName = css('label', 'required');
/**
 * High level generic form field
 *
 * @param props Control properties (defined in `FormLabelProps` interface)
 */
exports.FormLabel = (props) => {
    const balloon = props.balloon
        ? React.createElement(Balloon_1.Balloon, { tooltip: props.balloon, align: props.balloonAlignment, position: props.balloonPosition, className: css('label-icon'), attr: Attributes_1.mergeAttributeObjects(props.attr.balloon, { balloon: { className: css('label-balloon') } }, ['container', 'balloonContainer', 'balloon']) },
            React.createElement(Icon_1.Icon, { icon: props.icon, size: Icon_1.IconSize.xsmall, attr: props.attr.icon })) : '';
    return (React.createElement(Attributes_1.Elements.div, { className: css('label-container', props.className), attr: props.attr.container },
        React.createElement(Attributes_1.Elements.label, { className: css('label', { 'required': props.required }), htmlFor: props.name, attr: props.attr.text }, props.children),
        balloon));
};
exports.FormLabel.defaultProps = {
    name: undefined,
    required: false,
    icon: 'info',
    attr: {
        container: {},
        text: {},
        icon: {
            container: {},
            label: {}
        },
        balloon: {
            container: {},
            balloonContainer: {},
            balloon: {},
        },
    }
};
exports.default = exports.FormLabel;

//# sourceMappingURL=FormLabel.js.map
