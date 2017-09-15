import * as React from 'react'; 
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
const css = classNames.bind(require('./CheckboxInput.scss'));

export interface CheckboxInputType {}

export interface CheckboxInputState {
    cancelFocused: boolean;
}

export interface CheckboxInputProps extends React.Props<CheckboxInputType> {
    /** HTML form element name */
    name: string;
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
 * @param props Control properties (defined in `CheckboxInputProps` interface)
 */
export const CheckboxInput = (props: CheckboxInputProps) => {
    const classes = {'disabled': props.disabled, 'selected': props.checked};
    const containerClass = css('checkbox-container', {
        'columns': props.columns
    }, props.className);

    const id = `${props.name}_checkbox`;

    const onClick = (event) => {
        // props.onChange(event.);
    };

    return (
        <div className={containerClass}>
            <label className={css('checkbox-label', classes)} htmlFor={id}>
                <input
                    id={id}
                    type='checkbox'
                    name={props.name}
                    disabled={props.disabled}
                    checked={props.checked}
                    onClick={onClick}
                />
                <span className={css('checkbox-button', classes)}></span>
                <span className={css('checkbox-text')}>{props.label}</span>
                <span className={css('checkbox-fill', classes)}></span>
                <span className={css('checkbox-border', classes)}></span>
            </label>
        </div>
    );
};

export default CheckboxInput;
