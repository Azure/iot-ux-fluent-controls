"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Loader_1 = require("../Loader");
const FormError_1 = require("./FormError");
const css = classNames.bind(require('./Field.scss'));
/**
 * High level generic form field
 *
 * @param props Control properties (defined in `FormFieldProps` interface)
 */
exports.FormField = (props) => {
    const containerClass = css('input-container', {
        'input-error': props.error,
        'required': props.required && typeof (props.label) === 'string',
    }, props.className);
    let error = props.error;
    if (props.loading) {
        error = React.createElement(Loader_1.HorizontalLoader, { dots: 6 });
    }
    const label = props.label ?
        React.createElement(Attributes_1.Elements.label, { className: css('label'), htmlFor: props.name, attr: props.attr.fieldLabel }, props.label) : '';
    return (React.createElement(Attributes_1.Elements.div, { className: containerClass, attr: props.attr.fieldContainer },
        label,
        React.createElement(Attributes_1.Elements.div, { className: css('content'), attr: props.attr.fieldContent }, props.children),
        React.createElement(FormError_1.FormError, { className: props.errorClassName, hidden: props.hideError, title: props.errorTitle, attr: { container: props.attr.fieldError } }, error)));
};
exports.FormField.defaultProps = {
    name: undefined,
    label: undefined,
    loading: false,
    hideError: false,
    attr: {
        fieldContainer: {},
        fieldLabel: {},
        fieldContent: {},
        fieldError: {},
    }
};
exports.default = exports.FormField;

//# sourceMappingURL=FormField.js.map
