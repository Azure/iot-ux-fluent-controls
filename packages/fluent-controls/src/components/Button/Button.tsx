import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, ButtonProps as AttrButtonProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classNames.bind(require('./Button.scss'));

export interface ButtonComponentType {}

export interface ButtonAttributes {
    container?: AttrButtonProps;
    icon?: SpanProps;
    text?: SpanProps;
}

export interface ButtonProps extends React.Props<ButtonComponentType> {
    /** Icon name (from Segoe UI MDL font) */
    icon?: string;
    /** Use primary style */
    primary?: boolean;
    
    /** Disable button */
    disabled?: boolean;

    /** 
     * Callback for button onClick
     */    
    onClick: () => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: ButtonAttributes;
}

/**
 * Button showing Information, Warning, or Error with text, icon, and optional close button
 * 
 * @param props Control properties (defined in `ButtonProps` interface)
 */
export const Button: React.StatelessComponent<ButtonProps> = (props: ButtonProps) => {
    const icon = props.icon ? <Attr.span
        className={css('button-icon', `icon icon-${props.icon}`)}
        attr={props.attr.icon}
    /> : '';

    return (
        <Attr.button
            type='button'
            className={css('button-container', {
                'primary': props.primary
            }, props.className)}
            onClick={props.onClick}
            disabled={props.disabled}
            attr={props.attr.container}
        >
            {icon}
            <Attr.span
                className={css('button-text')}
                attr={props.attr.text}
            >
                {props.children}
            </Attr.span>
        </Attr.button>
    );
};

Button.defaultProps = {
    onClick: undefined,
    attr: {
        container: {},
        icon: {},
        text: {}
    }
};

export default Button;
