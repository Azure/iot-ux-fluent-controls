import * as React from 'react'; 
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize} from '../Icon';
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

    /** Allow multiple columns for checkbox */
    columns?: boolean;
    /** Checked */
    checked?: boolean;
    /** Apply hidden attribute to checkbox */
    hidden?: boolean;
    /** Disable HTML input element and apply disabled styling */
    disabled?: boolean;
    /** Shows the checkbox in indeterminate state */
    indeterminate?: boolean;

    /** Callback for HTML radio button element onChange events */
    onChange: (newValue: boolean) => void;

    /** Classname to append to top level element */
    className?: string;
}

/**
 * Low level checkbox control
 * 
 * (Use the `CheckboxField` control instead when making a form with standard styling)
 * 
 * @param props Control properties (defined in `CheckboxInputProps` interface)
 */
export const CheckboxInput = (props: CheckboxInputProps) => {
    const containerClass = css('checkbox-container', {
        'columns': props.columns,
        'disabled': props.disabled,
        'selected': props.checked,
        'indeterminate': props.indeterminate
    }, props.className);

    const id = `${props.name}_checkbox`;

    const onChange = (event) => {
        props.onChange(event.target.checked);
    };

    return (
        <div className={containerClass} hidden={props.hidden}>
            <label className={css('checkbox-label')} htmlFor={id}>
                <input
                    id={id}
                    type='checkbox'
                    name={props.name}
                    disabled={props.disabled}
                    hidden={props.hidden}
                    checked={props.checked}
                    onChange={onChange}
                />
                <span className={css('checkbox-button')}></span>
                <span className={css('checkbox-text')}>{props.label}</span>
                <span className={css('checkbox-fill')}></span>
                <Icon 
                    icon='checkMark'
                    size={IconSize.xsmall}
                    className={css('checkbox-checkmark')}
                />
                <span className={css('checkbox-border')}></span>
            </label>
        </div>
    );
};

export default CheckboxInput;
