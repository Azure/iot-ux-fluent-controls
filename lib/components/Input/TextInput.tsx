import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, ButtonProps, InputProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize} from '../Icon';
import {MethodNode, autoFocusRef, mergeRefs} from '../../Common';
const css = classNames.bind(require('./TextInput.module.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');

export interface TextInputAttributes {
    container?: DivProps;
    input?: InputProps;
    inputContainer?: DivProps;
    prefix?: DivProps;
    postfix?: DivProps;
    clearButton?: ButtonProps;
}

export interface TextInputProps {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value: string;
    /** HTML input element placeholder */
    placeholder?: string;
    /**
     * HTML input element type
     *
     * Default: text
     */
    type?: string;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Class to append to prefix container */
    prefixClassName?: string;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    /** Class to append to postfix container */
    postfixClassName?: string;

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
    onChange: (newValue: string) => void;

    /** Class to append to top level element */
    className?: string;

    attr?: TextInputAttributes;
}

interface TextInputComponentProps extends TextInputProps {
    innerRef: React.Ref<HTMLInputElement>;
}

/**
 * Low level text input control
 *
 * (Use the `TextField` control instead when making a form with standard styling)
 */
class TextInputComponent extends React.PureComponent<TextInputComponentProps> {

    public static defaultProps: Partial<TextInputComponentProps> = {
        name: undefined,
        value: undefined,
        onChange: undefined,
        type: 'text',
        attr: {
            container: {},
            input: {},
            inputContainer: {},
            prefix: {},
            postfix: {},
            clearButton: {},
        }
    };

    constructor(props: TextInputComponentProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    onChange(event: React.SyntheticEvent<HTMLInputElement>) {
        const targetValue = (event.target as HTMLInputElement ).value;
        if (this.props.value !== targetValue) {
            this.props.onChange(targetValue);
        }
        event.stopPropagation();
    }

    onClear() {
        this.props.onChange('');
    }

    render() {
        const containerClassName = css('text-input-container', this.props.className);
        const inputContainerClassName = css('input-container');
        const inputClassName = css({
            'input': true,
            'error': this.props.error,
            'show-cancel': !!this.props.value && this.props.type !== 'number'
        });
        const cancelClassName = css('cancel', 'icon icon-cancelLegacy');
        const clearButton = (this.props.disabled || this.props.readOnly || this.props.type === 'number') ? '' :
        <Attr.button
            type='button'
            className={cancelClassName}
            onClick={this.onClear}
            tabIndex={-1}
            aria-label='Cancel'
            attr={this.props.attr.clearButton}
        />;

        let prefix = null;
        if (this.props.prefix) {
            const className = css('prefix', this.props.prefixClassName);
            prefix = (
                <Attr.div className={className} attr={this.props.attr.prefix}>
                    {this.props.prefix}
                </Attr.div>
            );
        }

        let postfix = null;
        if (this.props.postfix) {
            const className = css('postfix', this.props.postfixClassName);
            postfix = (
                <Attr.div className={className} attr={this.props.attr.postfix}>
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
                        type={this.props.type}
                        name={this.props.name}
                        value={this.props.value == null ? '' : this.props.value}
                        className={inputClassName}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        autoFocus={this.props.autoFocus}
                        methodRef={mergeRefs(this.props.autoFocus && autoFocusRef, this.props.innerRef)}
                        attr={this.props.attr.input}
                    />
                    {clearButton}
                </Attr.div>
                {postfix}
            </Attr.div>
        );
    }
}

export const TextInput = React.forwardRef((props: TextInputProps, ref: React.Ref<HTMLInputElement>) => 
    <TextInputComponent innerRef={ref} {...props} />);

export default TextInput;
