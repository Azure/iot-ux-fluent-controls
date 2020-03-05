import * as React from 'react';
import * as classNames from 'classnames/bind';
import styled, { ThemeProps } from 'styled-components';

import {DivProps, Elements as Attr} from '../../Attributes';
import {MethodNode, autoFocusRef} from '../../Common';
import { ShellTheme } from '../Shell';

const css = classNames.bind(require('./Toggle.module.scss'));

export interface ToggleType {}

export interface ToggleAttributes {
    container?: DivProps;
    switchContainer?: DivProps;
    switch?: DivProps;
    text?: DivProps;
}

export interface ToggleProps extends React.Props<ToggleType> {
    on?: boolean;
    /** Disable Action Trigger */
    disabled?: boolean;
    /** AutoFocus */
    autoFocus?: boolean;

    name: string;

    onLabel?: MethodNode;
    offLabel?: MethodNode;

    onChange: (newValue: boolean) => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: ToggleAttributes;
}

const StyledToggleSwitchContainer = styled(Attr.div)`
    &&&&&& {
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryRest };
        &:hover {
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnPrimaryHover };
        }
    }
`;

const StyledToggleOnSwitch = styled(Attr.div)`
    &&&& {
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnPrimaryRest};
    }
`;

/**
 * Toggle button that is an on or off state
 *
 * @param props Control properties (defined in `ToggleProps` interface)
 */
export const Toggle = React.memo((props: ToggleProps) => {
    const containerClassName = css('toggle', {
        'toggle-on': props.on,
        'disabled': props.disabled
    });

    const onClick = React.useCallback(() => {
        props.onChange && props.onChange(!props.on);
    }, [props.onChange, props.on]);

    const label = props.on 
        ? props.onLabel ?? 'On'
        : props.offLabel ?? 'Off';

    const ToggleSwitchContainerProxy = props.on && !props.disabled ? StyledToggleSwitchContainer : Attr.div;
    const ToggleSwitchProxy = props.on && !props.disabled ? StyledToggleOnSwitch : Attr.div;
    
    return (
        <Attr.button
            type='button'
            className={containerClassName}
            name={props.name}
            autoFocus={props.autoFocus}
            methodRef={props.autoFocus && autoFocusRef}
            aria-checked={props.on}
            onClick={onClick}
            disabled={props.disabled}
            // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_switch_role
            // the switch role represents the states "on" and "off."
            role='switch'
            attr={props.attr?.container}>
            <ToggleSwitchContainerProxy 
                className={css('toggle-switch-container')}
                attr={props.attr?.switchContainer}
            />
            <ToggleSwitchProxy className={css('toggle-switch')} attr={props.attr?.switch}/>
            <Attr.div className={css('toggle-label')} attr={props.attr?.text}>
                {label}
            </Attr.div>
        </Attr.button>
    );
});

export default Toggle;
