import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./TextInput.scss'));

export const prefixClassName = css('prefix-addon');
export const postfixClassName = css('postfix-addon');

export interface TextInputType {}

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

    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Class to append to top level element */
    className?: string;
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
        <button
            className={cancelClassName}
            onClick={() => props.onChange('')}
            tabIndex={-1}
        />;

    let prefix = null;
    if (props.prefix) {
        const className = css('prefix', props.prefixClassName);
        prefix = <div className={className}>{props.prefix}</div>;
    }

    let postfix = null;
    if (props.postfix) {
        const className = css('postfix', props.postfixClassName);
        postfix = <div className={className}>{props.postfix}</div>;
    }

    return (
        <div className={containerClassName}>
            {prefix}
            <div className={inputContainerClassName}>
                <input 
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    className={inputClassName}
                    onInput={onChange}
                    placeholder={props.placeholder}
                    // This is not the same as props.required
                    // (this gives us :valid css selector)
                    required
                    disabled={props.disabled}
                />
                {clearButton}
            </div>
            {postfix}
        </div>
    );
};

TextInput.defaultProps = {
    type: 'text'
};

export default TextInput;
