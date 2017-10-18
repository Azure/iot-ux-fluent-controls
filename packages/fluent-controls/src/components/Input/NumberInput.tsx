import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, ButtonProps, InputProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize} from '../Icon';
import {MethodNode, keyCode} from '../../Common';
const css = classNames.bind(require('./TextInput.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');

export interface NumberInputType {}

const invalidNumber = 'invalid';

export interface NumberInputAttributes {
    container?: DivProps;
    input?: InputProps;
    inputContainer?: DivProps;
    prefix?: DivProps;
    postfix?: DivProps;
}

export interface NumberInputProps extends React.Props<NumberInputType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    initialValue?: string;
    /** HTML input element placeholder */
    placeholder?: string;
    /** Only positive inputs allows */
    positive?: boolean;
    /** Input is integer only */
    integer?: boolean;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    
    /** Apply error styling to input element */
    error?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: number | string) => void;

    /** Class to append to top level element */
    className?: string;

    attr?: NumberInputAttributes;
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

        attr: {
            container: {},
            input: {},
            inputContainer: {},
            prefix: {},
            postfix: {},
        }
    };

    private inputElement: HTMLInputElement;
    private paste: boolean;

    constructor(props: NumberInputProps) {
        super(props);
        
        this.paste = false;
        this.state = this.getInitialState(this.props.initialValue);

        this.inputRef = this.inputRef.bind(this);
    }

    onKeyDown(event) {
        /** So that we don't block any browser shortcuts */
        if (event.ctrlKey || event.altKey) {
            return;
        }
        /** These are all keys that don't have characters */
        if (event.keyCode <= keyCode.slash) {
            return;
        }

        if (event.keyCode >= keyCode['0'] && event.keyCode <= keyCode['9']) {
            return;
        }

        if (!this.props.positive && event.keyCode === keyCode.dash) {
            return;
        }
        
        event.preventDefault();
    }

    onInput(event) {
        /** Reset our state machine */
        if (this.inputElement.value === '') {
            this.setState({value: '', paste: false});
            return;
        }
        const parsedValue = this.getValue(this.inputElement.value);
        let newValue = this.inputElement.value;
        let paste = this.state.paste;

        if (parsedValue === invalidNumber) {
            if (this.paste) {
                this.paste = false;
                this.setState({value: newValue, paste: true});
                return;
            } else {
                this.setState({value: newValue});
                return;
            }
        } else {
            if (this.paste) {
                newValue = parsedValue.toString();
                this.paste = false;
            }
            paste = false;
        }

        if (this.props.positive && parsedValue < 0) {
            return;
        }

        this.setState({value: newValue, paste: paste});
    }

    onPaste(event) {
        this.paste = true;
    }

    getInitialState(initialValue: number | string): NumberInputState {
        let value = '';
        if (typeof(initialValue) === 'number') {
            value = initialValue.toString();
        } else {
            if (initialValue) {
                value = initialValue;
            }
        }

        return {
            value: value,
            paste: false
        };
    }

    getValue(value: string): number | string {
        if (value === '') {
            return invalidNumber;
        }
        
        const decimalSeparator = '.';
        const decimalSplit = value.split(decimalSeparator);
        if (this.props.integer && decimalSplit.length > 1) {
            return invalidNumber;
        }

        value = value.replace(',', '');

        let outValue = this.props.integer ? parseInt(value) : parseFloat(value);
        if (this.props.positive && outValue < 0) {
            return invalidNumber;
        }

        if (isNaN(outValue)) {
            return invalidNumber;
        }

        return outValue;
    }

    componentDidUpdate(oldProps: NumberInputProps, oldState: NumberInputState) {
        if (oldState.value === this.state.value) {
            return;
        }

        if (this.state.value === '') {
            this.props.onChange('');
        } else {
            this.props.onChange(this.getValue(this.state.value));
        }
    }

    componentWillReceiveProps(newProps: NumberInputProps) {
        if (this.props.initialValue !== newProps.initialValue) {
            this.setState(this.getInitialState(newProps.initialValue));
        }
    }

    inputRef(element: HTMLInputElement) {
        if (this.props.autoFocus) {
            element.focus();
        }
        this.inputElement = element;
    }

    render() {
        const containerClassName = css('text-input-container', this.props.className);
        const inputContainerClassName = css('input-container');
        const inputClassName = css({
            'input': true,
            'error': this.props.error,
            'no-cancel': true
        });

        let prefix = null;
        if (this.props.prefix) {
            prefix = (
                <Attr.div className={css('prefix')} attr={this.props.attr.prefix}>
                    {this.props.prefix}
                </Attr.div>
            );
        }

        let postfix = null;
        if (this.props.postfix) {
            postfix = (
                <Attr.div className={css('postfix')} attr={this.props.attr.postfix}>
                    {this.props.postfix}
                </Attr.div>
            );
        }

        return (
            <Attr.div className={containerClassName} attr={this.props.attr.container}>
                {prefix}
                <Attr.div
                    className={inputContainerClassName}
                    attr={this.props.attr.inputContainer}
                >
                    <Attr.input 
                        type='number'
                        name={this.props.name}
                        value={this.state.value}
                        className={inputClassName}
                        onInput={event => this.onInput(event)}
                        onKeyDown={event => this.onKeyDown(event)}
                        onPaste={event => this.onPaste(event)}
                        placeholder={this.props.placeholder}
                        // This is not the same as this.props.required
                        // (this gives us :valid css selector)
                        required
                        disabled={this.props.disabled}
                        autoFocus={this.props.autoFocus}
                        methodRef={this.inputRef}
                        attr={this.props.attr.input}
                    />
                </Attr.div>
                {postfix}
            </Attr.div>
        );
    }
}

export default NumberInput;
