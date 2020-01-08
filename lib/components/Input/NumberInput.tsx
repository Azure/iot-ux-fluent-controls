import * as React from 'react';
import * as classNames from 'classnames/bind';
import { TextInput, TextInputAttributes } from './TextInput';
import { MethodNode, keyCode } from '../../Common';

const css = classNames.bind(require('./TextInput.module.scss'));

export interface NumberInputType { }

const invalidNumber = 'invalid';

export interface NumberInputProps extends React.Props<NumberInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue?: string | number;
    /** HTML input element placeholder */
    placeholder?: string;
    /** Step to give the number input */
    step?: number | 'any';
    /** Minimum value of HTML Input element */
    min?: number;
    /** Maximum value of HTML Input element */
    max?: number;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;

    /** Apply error styling to input element */
    error?: boolean;
    /** Add required attribute to HTML input element */
    required?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Read only HTML input element */
    readOnly?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number | 'invalid') => void;

    /** Class to append to top level element */
    className?: string;

    attr?: TextInputAttributes;
}

export interface NumberInputState {
    value: string;
    paste?: boolean;
}

/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
export class NumberInput extends React.Component<NumberInputProps, NumberInputState> {
    static defaultProps = {
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

    private paste: boolean;

    constructor(props: NumberInputProps) {
        super(props);

        this.paste = false;
        this.state = NumberInput.getInitialState(this.props.initialValue);
    }

    onKeyDown = (event) => {
        /** So that we don't block any browser shortcuts */
        if (event.ctrlKey || event.altKey) {
            return;
        }
        /** These are all keys that don't have characters */
        if (event.keyCode <= keyCode.slash) {
            return;
        }

        // Allow numbers
        if (event.keyCode >= keyCode.num0 && event.keyCode <= keyCode.num9) {
            return;
        }

        // Allow numpad numbers
        if (event.keyCode >= keyCode.numpad0 && event.keyCode <= keyCode.numpad9) {
            return;
        }

        if (
            !this.isPositive()
            /** Firefox uses a different keycode for dashes (-) than other browsers... */
            && (event.keyCode === keyCode.dash || event.keyCode === keyCode.firefoxDash)
            && this.state.value.indexOf('-') === -1
        ) {
            return;
        }

        if (
            !this.isInteger()
            && event.keyCode === keyCode.period
            && this.state.value.indexOf('.') === -1
        ) {
            return;
        }

        event.preventDefault();
    }

    isPositive(): boolean {
        return typeof (this.props.min) === 'number' && this.props.min >= 0;
    }

    isInteger(): boolean {
        return typeof (this.props.step) === 'number' && this.props.step % 1 === 0;
    }

    onChange = (newValue: string) => {
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
            } else {
                this.setState({ value: newValue });
                return;
            }
        } else {
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
    }

    onPaste = () => {
        this.paste = true;
    }

    static getInitialState(initialValue: number | string, currentValue?: string): NumberInputState {
        let value = '';
        if (typeof (initialValue) === 'number') {
            value = initialValue.toString();
        } else {
            value = initialValue;
        }

        if (value === '' || value == null) {
            value = '';
        } else if (typeof(currentValue) === 'string') {
            if (parseFloat(currentValue) === parseFloat(value)) {
                value = currentValue;
            }
        }

        return {
            value: value,
            paste: false
        };
    }

    getValue(value: string): number | 'invalid' {
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

    componentDidUpdate(_oldProps: NumberInputProps, oldState: NumberInputState) {
        if (oldState.value === this.state.value) {
            return;
        }

        if (this.state.value === '' || this.state.value == null) {
            this.props.onChange(null);
        } else {
            this.props.onChange(this.getValue(this.state.value));
        }
    }

    render() {
        const inputAttr = this.props.attr && this.props.attr.input
            ? this.props.attr.input : {};
        const attr = {
            ...(this.props.attr || {}),
            input: {
                ...inputAttr,
                className: css('no-cancel'),
                step: this.props.step,
                min: this.props.min,
                max: this.props.max,
                onKeyDown: this.onKeyDown,
                onPaste: this.onPaste,
            }
        };

        return (
            <TextInput
                name={this.props.name}
                value={this.state.value}
                placeholder={this.props.placeholder}
                type='number'
                className={this.props.className}
                prefix={this.props.prefix}
                postfix={this.props.postfix}
                error={this.props.error}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                autoFocus={this.props.autoFocus}
                onChange={this.onChange}
                required={this.props.required}
                attr={attr}
            />
        );
    }
}

export default NumberInput;
