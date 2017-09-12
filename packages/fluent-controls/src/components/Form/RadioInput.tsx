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
    const containerClass = css('radio-container', {'columns': props.columns}, props.className);
    const optionTextClass = css('radio-text');
    const radioClass = css('radio-button', classes);
    const fillClass = css('radio-fill', classes);
    const borderClass = css('radio-border', classes);
    const labelClass = css('radio-label', classes);

    const id = `${props.name}_${props.value}`;

    const onClick = (event) => {
        props.onChange(props.value);
    };

    return (
        <div className={containerClass}>
            <label className={labelClass} htmlFor={id}>
                <input
                    id={id}
                    type='radio'
                    value={props.value}
                    name={props.name}
                    disabled={props.disabled}
                    checked={props.checked}
                    onClick={onClick}
                />
                <span className={radioClass}></span>
                <span className={optionTextClass}>{props.label}</span>
                <span className={fillClass}></span>
                <span className={borderClass}></span>
            </label>
        </div>
    );
};

export default RadioInput;
