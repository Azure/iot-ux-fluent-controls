"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Icon_1 = require("../Icon");
const css = classNames.bind(require('./Alert.scss'));
var AlertType;
(function (AlertType) {
    AlertType[AlertType["Information"] = 0] = "Information";
    AlertType[AlertType["Warning"] = 1] = "Warning";
    AlertType[AlertType["Error"] = 2] = "Error";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
/**
 * Alert showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `AlertProps` interface)
 */
exports.Alert = (props) => {
    const className = css({
        'alert-container': true,
        'alert-info': props.type === AlertType.Information,
        'alert-warning': props.type === AlertType.Warning,
        'alert-error': props.type === AlertType.Error,
        'alert-multiline': props.multiline,
        'alert-fixed': !!props.fixed
    }, props.className);
    let iconName = props.icon;
    if (!props.icon) {
        if (props.type === AlertType.Information) {
            iconName = 'info';
        }
        else if (props.type === AlertType.Warning) {
            iconName = 'warning';
        }
        else if (props.type === AlertType.Error) {
            iconName = 'error';
        }
    }
    const iconClassName = css('alert-icon');
    const icon = React.createElement(Icon_1.Icon, { className: iconClassName, size: Icon_1.IconSize.xsmall, icon: iconName, attr: props.attr.icon });
    const textClassName = css('alert-text');
    const text = (React.createElement(Attributes_1.Elements.div, { className: textClassName, attr: props.attr.contents }, props.children));
    let close;
    if (props.onClose) {
        const closeClassName = css('alert-close');
        const closeProps = Object.assign({}, props.attr.closeIcon, { container: { onClick: props.onClose } });
        close = (React.createElement(Icon_1.Icon, { className: closeClassName, size: Icon_1.IconSize.xsmall, icon: 'cancelLegacy', attr: closeProps }));
    }
    return (React.createElement(Attributes_1.Elements.div, { className: className, attr: props.attr.container },
        icon,
        text,
        close));
};
exports.Alert.defaultProps = {
    type: AlertType.Information,
    attr: {
        container: {},
        icon: {},
        contents: {},
        closeIcon: {},
    }
};
exports.default = exports.Alert;

//# sourceMappingURL=Alert.js.map
