import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, ButtonProps, InputProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize} from '../Icon';
import {MethodNode, autoFocusRef} from '../../Common';
const css = classNames.bind(require('./TextInput.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');

export interface TextInputType {}


export interface TextInputAttributes {
    container?: DivProps;
    input?: InputProps;
    inputContainer?: DivProps;
    prefix?: DivProps;
    postfix?: DivProps;
    clearButton?: ButtonProps;
}

export interface TextInputProps extends React.Props<TextInputType> {
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
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Class to append to top level element */
    className?: string;

    attr?: TextInputAttributes;
}

/**
 * Low level text input control
 * 
 * (Use the `TextField` control instead when making a form with standard styling)
 */
export const TextInput: React.StatelessComponent<TextInputProps> = (props: TextInputProps) => {
    const containerClassName = css('text-input-container', props.className);
    const inputContainerClassName = css('input-container');
    const inputClassName = css({
        'input': true,
        'error': props.error,
        'no-cancel': props.type === 'number'
    });
    const cancelClassName = css('cancel', 'icon icon-cancelLegacy');

    const onChange = (event) => {
        if (props.value !== event.target.value) {
            props.onChange(event.target.value);
        }
        event.stopPropagation();
    };

    const clearButton = props.disabled || props.type === 'number' ? '' :
        <Attr.button
            type='button'
            className={cancelClassName}
            onClick={() => props.onChange('')}
            tabIndex={-1}
            attr={props.attr.clearButton}
        />;

    let prefix = null;
    if (props.prefix) {
        const className = css('prefix', props.prefixClassName);
        prefix = (
            <Attr.div className={className} attr={props.attr.prefix}>
                {props.prefix}
            </Attr.div>
        );
    }

    let postfix = null;
    if (props.postfix) {
        const className = css('postfix', props.postfixClassName);
        postfix = (
            <Attr.div className={className} attr={props.attr.postfix}>
                {props.postfix}
            </Attr.div>
        );
    }

    return (
        <Attr.div className={containerClassName} attr={props.attr.container}>
            {prefix}
            <Attr.div
                className={inputContainerClassName}
                attr={props.attr.inputContainer}
            >
                <Attr.input 
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    className={inputClassName}
                    onChange={onChange}
                    placeholder={props.placeholder}
                    // This is not the same as props.required
                    // (this gives us :valid css selector)
                    required
                    disabled={props.disabled}
                    autoFocus={props.autoFocus}
                    methodRef={props.autoFocus && autoFocusRef}
                    attr={props.attr.input}
                />
                {clearButton}
            </Attr.div>
            {postfix}
        </Attr.div>
    );
};

TextInput.defaultProps = {
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

export default TextInput;
