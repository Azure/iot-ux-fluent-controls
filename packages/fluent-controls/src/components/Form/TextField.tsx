import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconBackground} from '../Icon';
import {TextInput} from './TextInput';
import {FormField} from './FormField';
const css = classNames.bind(require('./Field.scss'));

export interface TextFieldType {}

export interface TextFieldProps extends React.Props<TextFieldType> {
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
    
    /** Label to display above input element */
    label: MethodNode;
    /** Error to display below input element */
    error?: MethodNode;

    /** Node to draw to the left of the input box */
    prefix?: MethodNode;
    /** Class to append to prefix container */
    prefixClassName?: string;
    /** Node to draw to the right of the input box */
    postfix?: MethodNode;
    /** Class to append to postfix container */
    postfixClassName?: string;
    
    /** Disable HTML input element */
    disabled?: boolean;
    /** Form field is required (appends a red asterisk to the label) */
    required?: boolean;
    /** Display horizontal loading animation instead of error */
    loading?: boolean;
    
    /** Callback for HTML input element `onChange` events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to top level element of TextInput */
    inputClassName?: string;
}

/**
 * High level form text field
 * 
 * @param props Control properties (defined in `TextFieldProps` interface)
 */
export const TextField: React.StatelessComponent<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <FormField
            name={props.name}
            label={props.label}
            error={props.error}
            loading={props.loading}
            required={props.required}
            className={props.className}
        >
            <TextInput
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                type={props.type}
                prefix={props.prefix}
                prefixClassName={props.prefixClassName}
                postfix={props.postfix}
                postfixClassName={props.postfixClassName}
                error={!!props.error}
                disabled={props.disabled}
                onChange={props.onChange}
                className={props.inputClassName}
            />
        </FormField>
    );
};

TextField.defaultProps = {
    type: 'text'
};

export default TextField;
