import * as React from 'react';
import * as classNames from 'classnames/bind';
import styled, { ThemeProps } from 'styled-components';
import {MethodNode, autoFocusRef} from '../../Common';
import {DivProps, LabelProps, SpanProps, InputProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
import {ShellTheme} from '../Shell';
const css = classNames.bind(require('./CheckboxInput.module.scss'));

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
    /** Add required attribute to HTML input element */
    required?: boolean;
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

const StyledActiveCheckboxButton = styled(Attr.span)`
    &&&& {
        color: ${(props: ThemeProps<ShellTheme>) => props.theme && props.theme.colorPrimaryButtonTextRest };
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme && props.theme.colorPrimaryButtonRest };
        border: ${(props: ThemeProps<ShellTheme>) => props.theme && '1px solid ' + props.theme.colorPrimaryButtonRest };
    }
`;

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
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Stop propagation and call the onChange handler with the new value.
        event.stopPropagation();
        props.onChange(!props.checked);
    };

    const CheckboxInputProxy = props.checked ? StyledActiveCheckboxButton : Attr.span;
    return (
        <Attr.div
            className={containerClass}
            hidden={props.hidden}
            attr={props.attr.container}
        >
            <Attr.label
                className={css('checkbox-label')}
                htmlFor={id}
                onClick={stopPropagation}
                attr={props.attr.label}
            >
                <Attr.input
                    id={id}
                    type='checkbox'
                    name={props.name}
                    disabled={props.disabled}
                    hidden={props.hidden}
                    checked={props.checked}
                    required={props.required}
                    onChange={onChange}
                    autoFocus={props.autoFocus}
                    methodRef={props.autoFocus && autoFocusRef}
                    attr={props.attr.input}
                />
                <CheckboxInputProxy
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
            </Attr.label>
        </Attr.div>
    );
};

function stopPropagation(e: React.MouseEvent<HTMLElement>) {
    // HACK! If we don't add this click event handler to the label, React never
    // fires the input onChange handler in IoT Central.
    e.stopPropagation();
}

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
