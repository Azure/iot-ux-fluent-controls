"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const Attributes_1 = require("../../Attributes");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./TextArea.scss'));
/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.bindTextArea = element => {
            this.textarea = element;
            if (this.props.autoFocus) {
                Common_1.autoFocusRef(element);
            }
        };
        this.bindGhost = element => this.ghost = element;
    }
    componentDidUpdate(prevProps, prevState) {
        const height = this.ghost.offsetHeight;
        if (this.props.autogrow && prevProps.value !== this.props.value && height > 52) {
            this.textarea.style.height = `${height}px`;
        }
    }
    render() {
        const value = this.props.value;
        return (React.createElement(Attributes_1.Elements.div, { className: css('textarea-container', this.props.className), attr: this.props.attr.container },
            React.createElement(Attributes_1.Elements.textarea, { name: this.props.name, value: value, className: css('textarea', { 'error': this.props.error }), onChange: event => this.props.onChange(this.textarea.value), disabled: this.props.disabled, readOnly: this.props.readOnly, placeholder: this.props.placeholder, methodRef: this.bindTextArea, autoFocus: this.props.autoFocus, required: this.props.required, attr: this.props.attr.textarea }),
            this.props.autogrow ?
                React.createElement(Attributes_1.Elements.pre, { className: css('textarea', 'textarea-ghost'), methodRef: this.bindGhost, attr: this.props.attr.pre }, value + (value[value.length - 1] === '\n' ? '\n' : ''))
                : ''));
    }
}
TextArea.defaultProps = {
    autogrow: true,
    error: false,
    disabled: false,
    value: '',
    attr: {
        container: {},
        textarea: {},
        pre: {}
    }
};
exports.TextArea = TextArea;
exports.default = TextArea;

//# sourceMappingURL=TextArea.js.map
