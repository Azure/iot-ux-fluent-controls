import * as React from 'react'; 
import * as classNames from 'classnames/bind';
import {MethodNode, autoFocusRef} from '../../Common';
import {DivProps, LabelProps, SpanProps, InputProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classNames.bind(require('./CheckboxInput.scss'));

export interface CheckboxInputType {}

export interface CheckboxInputState {
    cancelFocused: boolean;
}

export interface CheckboxInputAttributes {
    container?: DivProps;
    label?: LabelProps;
    input?: InputProps;
    text?: SpanProps;
    checkbox?: SpanProps;
    indeterminateFill?: SpanProps;
    checkmarkIcon?: IconAttributes;
    border?: SpanProps;
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
    /** Autofocus */
    autoFocus?: boolean;

    /** Callback for HTML radio button element onChange events */
    onChange: (newValue: boolean) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: CheckboxInputAttributes;
}

/**
 * Low level checkbox control
 * 
 * (Use the `CheckboxField` control instead when making a form with standard styling)
 * 
 * @param props Control properties (defined in `CheckboxInputProps` interface)
 */
export const CheckboxInput: React.StatelessComponent<CheckboxInputProps> = (props: CheckboxInputProps) => {
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
        <Attr.div
            className={containerClass}
            hidden={props.hidden}
            attr={props.attr.container}
        >
            <Attr.label 
                className={css('checkbox-label')}
                htmlFor={id}
                attr={props.attr.label}
            >
                <Attr.input
                    id={id}
                    type='checkbox'
                    name={props.name}
                    disabled={props.disabled}
                    hidden={props.hidden}
                    checked={props.checked}
                    onChange={onChange}
                    autoFocus={props.autoFocus}
                    methodRef={props.autoFocus && autoFocusRef}
                    attr={props.attr.input}
                />
                <Attr.span
                    className={css('checkbox-button')}
                    attr={props.attr.checkbox} 
                />
                <Attr.span
                    className={css('checkbox-text')}
                    attr={props.attr.text}
                >
                    {props.label}
                </Attr.span>
                <Attr.span
                    className={css('checkbox-fill')}
                    attr={props.attr.indeterminateFill}
                />
                <Icon 
                    icon='checkMark'
                    size={IconSize.xsmall}
                    className={css('checkbox-checkmark')}
                    attr={props.attr.checkmarkIcon}
                />
                <Attr.span
                    className={css('checkbox-border')}
                    attr={props.attr.border}
                />
            </Attr.label>
        </Attr.div>
    );
};

CheckboxInput.defaultProps = {
    name: undefined,
    label: undefined,
    onChange: undefined,
    attr: {
        container: {},
        label: {},
        input: {},
        text: {},
        checkbox: {},
        indeterminateFill: {},
        checkmarkIcon: {},
        border: {},
    }
};

export default CheckboxInput;
