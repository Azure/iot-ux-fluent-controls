import * as React from 'react'; 
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./RadioInput.scss'));

export interface RadioInputType {}

export interface RadioInputState {
    cancelFocused: boolean;
}

export interface RadioInputProps extends React.Props<RadioInputType> {
    /** HTML form element name */
    name: string;
    /** Value of HTML input element */
    value: string;
    /** Label for HTML input element */
    label: MethodNode;

    /** Allow multiple columns for radio button */
    columns?: boolean;
    /** Checked */
    checked?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Hide HTML input element */
    hidden?: boolean;

    /** Callback for HTML radio button element onChange events */
    onChange: (newValue: string) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Low level radio button control
 * 
 * (Use the `RadioField` control instead when making a form with standard styling)
 * 
 * @param props Control properties (defined in `RadioInputProps` interface)
 */
export const RadioInput = (props: RadioInputProps) => {
    const classes = {'disabled': props.disabled, 'selected': props.checked};
    const containerClass = css('radio-container', {
        'columns': props.columns,
        'hidden': props.hidden
    }, props.className);

    const id = `${props.name}_${props.value}`;

    const onClick = (event) => {
        props.onChange(props.value);
    };

    return (
        <div className={containerClass}>
            <label className={css('radio-label', classes)} htmlFor={id}>
                <input
                    id={id}
                    type='radio'
                    value={props.value}
                    name={props.name}
                    disabled={props.disabled}
                    hidden={props.hidden}
                    checked={props.checked}
                    onClick={onClick}
                />
                <span className={css('radio-button', classes)}></span>
                <label className={css('radio-text')} htmlFor={id}>{props.label}</label>
                <span className={css('radio-fill', classes)}></span>
                <span className={css('radio-border', classes)}></span>
            </label>
        </div>
    );
};

export default RadioInput;
