import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./TextArea.scss'));

export interface TextAreaType {}

export interface TextAreaProps extends React.Props<TextAreaType> {
    /** HTML form element name */
    name: string;
    /** Current value of HTML input element */
    value?: string;
    
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
export const TextArea: React.StatelessComponent<TextAreaProps> = (props: TextAreaProps) => {
    return (
        <textarea
            name={props.name}
            value={props.value}
            className={css('textarea', {'error': props.error})}
            onChange={event => props.onChange(event.target.value)}
            disabled={props.disabled}
        />
    );
};

TextArea.defaultProps = {
    error: false,
    disabled: false,
    value: ''
};

export default TextArea;
