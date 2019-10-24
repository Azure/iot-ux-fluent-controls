import * as React from 'react';
import * as classnames from 'classnames/bind';
import styled, { ThemeProps } from 'styled-components';

import { SpanProps, ButtonProps as AttrButtonProps, Elements as Attr } from '../../Attributes';
import { ShellTheme } from '../Shell';
const css = classnames.bind(require('./Button.module.scss'));

export interface ButtonComponentType { }

export interface ButtonAttributes {
    container?: AttrButtonProps;
    icon?: SpanProps;
}

export interface ButtonProps extends React.Props<ButtonComponentType> {
    /** Button title attribute */
    title?: string;
    /** Button type attribute */
    type?: string;
    /** Icon name (from icons.css) */
    icon?: string;
    /** Use primary style */
    primary?: boolean;

    /** Disable button */
    disabled?: boolean;

    /**
     * Callback for button onClick
     */
    onClick: (event) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: ButtonAttributes;
}

const StyledPrimaryButton = styled(Attr.button)`
    &&&&& {
        color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnPrimaryRest};
        border-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryRest};
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryRest};

        &:hover { 
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryHover};
            border-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryHover};
        }
        &:disabled {
            color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnPrimaryDisabled};
            border-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryDisabled};
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryDisabled};
        }
    }
`;

/**
 * Button showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `ButtonProps` interface)
 */
export const Button: React.StatelessComponent<ButtonProps> = (props: ButtonProps) => {
    const icon = props.icon ? <Attr.span
        className={css(`icon icon-${props.icon}`)}
        attr={props.attr.icon}
    /> : '';

    const ButtonProxy = props.primary ? StyledPrimaryButton : Attr.button;
    return (
        <ButtonProxy
            type={props.type}
            title={props.title}
            className={css('btn', {
                'btn-primary': props.primary
            }, props.className)}
            onClick={props.onClick}
            disabled={props.disabled}
            attr={props.attr.container}
        >
            {icon}
            {props.children}
        </ButtonProxy>
    );
};

Button.defaultProps = {
    onClick: undefined,
    type: 'button',
    attr: {
        container: {},
        icon: {}
    }
};

export default Button;
