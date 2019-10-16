import * as React from 'react';
import * as classNames from 'classnames/bind';
import styled, { ThemeProps } from 'styled-components';

import {DivProps, ButtonProps, Elements as Attr} from '../../Attributes';
import {MethodNode, autoFocusRef} from '../../Common';
import { ShellTheme } from '../Shell';

const css = classNames.bind(require('./Toggle.module.scss'));

export interface ToggleType {}

export interface ToggleAttributes {
    container?: DivProps;
    button?: ButtonProps;
    border?: DivProps;
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

const StyledToggleOnButton = styled(Attr.button)`
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
export const Toggle: React.StatelessComponent<ToggleProps> = (props: ToggleProps) => {
    const containerClassName = css('toggle', {
        'toggle-on': props.on,
        'disabled': props.disabled
    });

    const onClick = (event) => {
        if (!props.disabled && props.onChange) {
            props.onChange(!props.on);
        }
    };

    const tabIndex = props.disabled ? -1 : null;
    const label = props.on ? props.onLabel : props.offLabel;

    const ToggleButtonProxy = props.on && !props.disabled ? StyledToggleOnButton : Attr.button;
    const ToggleSwitchProxy = props.on && !props.disabled ? StyledToggleOnSwitch : Attr.div;
    return (
        <Attr.div className={containerClassName} attr={props.attr.container}>
            <ToggleButtonProxy
                type='button'
                className={css('toggle-button')}
                onClick={onClick}
                tabIndex={tabIndex}
                name={props.name}
                autoFocus={props.autoFocus}
                methodRef={props.autoFocus && autoFocusRef}
                // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_switch_role
                // the switch role represents the states "on" and "off."
                role='switch'
                aria-checked={props.on}
                attr={props.attr.button}
            />
            <ToggleSwitchProxy className={css('toggle-switch')} attr={props.attr.switch}/>
            <Attr.div className={css('toggle-label')} attr={props.attr.text}>
                {label}
            </Attr.div>
        </Attr.div>
    );
};

Toggle.defaultProps = {
    name: undefined,
    onChange: undefined,
    onLabel: 'On',
    offLabel: 'Off',
    attr: {
        container: {},
        button: {},
        border: {},
        switch: {},
        text: {},
    }
};

export default Toggle;
