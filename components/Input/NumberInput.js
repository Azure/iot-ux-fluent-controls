"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classNames = require("classnames/bind");
const TextInput_1 = require("./TextInput");
const Common_1 = require("../../Common");
const css = classNames.bind(require('./TextInput.scss'));
const invalidNumber = 'invalid';
/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.onKeyDown = (event) => {
            /** So that we don't block any browser shortcuts */
            if (event.ctrlKey || event.altKey) {
                return;
            }
            /** These are all keys that don't have characters */
            if (event.keyCode <= Common_1.keyCode.slash) {
                return;
            }
            // Allow numbers
            if (event.keyCode >= Common_1.keyCode.num0 && event.keyCode <= Common_1.keyCode.num9) {
                return;
            }
            // Allow numpad numbers
            if (event.keyCode >= Common_1.keyCode.numpad0 && event.keyCode <= Common_1.keyCode.numpad9) {
                return;
            }
            if (!this.isPositive()
                /** Firefox uses a different keycode for dashes (-) than other browsers... */
                && (event.keyCode === Common_1.keyCode.dash || event.keyCode === Common_1.keyCode.firefoxDash)
                && this.state.value.indexOf('-') === -1) {
                return;
            }
            if (!this.isInteger()
                && event.keyCode === Common_1.keyCode.period
                && this.state.value.indexOf('.') === -1) {
                return;
            }
            event.preventDefault();
        };
        this.onChange = (newValue) => {
            if (newValue === '' && this.state.value !== '') {
                this.setState({ value: '', paste: false });
                return;
            }
            /** Reset our state machine */
            const parsedValue = this.getValue(newValue);
            let paste = this.state.paste;
            if (parsedValue === invalidNumber) {
                if (this.paste) {
                    this.paste = false;
                    this.setState({ value: newValue, paste: true });
                    return;
                }
                else {
                    this.setState({ value: newValue });
                    return;
                }
            }
            else {
                if (this.paste) {
                    newValue = parsedValue.toString();
                    this.paste = false;
                }
                paste = false;
            }
            if (this.isPositive() && parsedValue < 0) {
                return;
            }
            this.setState({ value: newValue, paste: paste });
        };
        this.onPaste = (event) => {
            this.paste = true;
        };
        this.paste = false;
        this.state = this.getInitialState(this.props.initialValue);
    }
    isPositive() {
        return typeof (this.props.min) === 'number' && this.props.min >= 0;
    }
    isInteger() {
        return typeof (this.props.step) === 'number' && this.props.step % 1 === 0;
    }
    getInitialState(initialValue) {
        let value = '';
        if (typeof (initialValue) === 'number') {
            value = initialValue.toString();
        }
        else {
            value = initialValue;
        }
        if (value === '' || value == null) {
            value = '';
        }
        else if (this.state && typeof (this.state.value) === 'string') {
            if (parseFloat(this.state.value) === parseFloat(value)) {
                value = this.state.value;
            }
        }
        return {
            value: value,
            paste: false
        };
    }
    getValue(value) {
        if (value === '') {
            return invalidNumber;
        }
        const decimalSeparator = '.';
        const decimalSplit = value.split(decimalSeparator);
        if (this.isInteger() && decimalSplit.length > 1) {
            return invalidNumber;
        }
        value = value.replace(',', '');
        let outValue = this.isInteger() ? parseInt(value) : parseFloat(value);
        if (this.isPositive() && outValue < 0) {
            return invalidNumber;
        }
        if (isNaN(outValue)) {
            return invalidNumber;
        }
        return outValue;
    }
    componentDidUpdate(oldProps, oldState) {
        if (oldState.value === this.state.value) {
            return;
        }
        if (this.state.value === '' || this.state.value == null) {
            this.props.onChange(null);
        }
        else {
            this.props.onChange(this.getValue(this.state.value));
        }
    }
    componentWillReceiveProps(newProps) {
        if (this.props.initialValue !== newProps.initialValue) {
            this.setState(this.getInitialState(newProps.initialValue));
        }
    }
    render() {
        const inputAttr = this.props.attr && this.props.attr.input
            ? this.props.attr.input : {};
        const attr = Object.assign({}, (this.props.attr || {}), { input: Object.assign({}, inputAttr, { className: css('no-cancel'), step: this.props.step, min: this.props.min, max: this.props.max, onKeyDown: this.onKeyDown, onPaste: this.onPaste }) });
        return (React.createElement(TextInput_1.TextInput, { name: this.props.name, value: this.state.value, placeholder: this.props.placeholder, type: 'number', className: this.props.className, prefix: this.props.prefix, postfix: this.props.postfix, error: this.props.error, disabled: this.props.disabled, readOnly: this.props.readOnly, autoFocus: this.props.autoFocus, onChange: this.onChange, required: this.props.required, attr: attr }));
    }
}
NumberInput.defaultProps = {
    name: undefined,
    initialValue: '',
    onChange: undefined,
    integer: false,
    positive: false,
    step: 'any',
    attr: {
        container: {},
        input: {},
        inputContainer: {},
        prefix: {},
        postfix: {},
    }
};
exports.NumberInput = NumberInput;
exports.default = NumberInput;

//# sourceMappingURL=NumberInput.js.map
