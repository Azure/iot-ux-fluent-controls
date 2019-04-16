import * as React from 'react';
import * as classNames from 'classnames/bind';

import { MethodNode } from '../../Common';
import { StyledElements } from '../../Styled';
import { ActionTrigger, ActionTriggerProps, ActionTriggerAttributes } from '../ActionTrigger';
import { Elements as Attr, ButtonProps } from '../../Attributes';
const css = classNames.bind(require('./ActionTrigger.module.scss'));

export interface ActionTriggerButtonAttributes {
    button?: ButtonProps;
}

export interface ActionTriggerButtonProps {
    /** Icon name (from Segoe UI MDL font) */
    icon: string;
    /** Icon name for icon on the right of ActionTrigger (from Segoe UI MDL font) */
    rightIcon?: string;
    /** Action trigger label */
    label?: string;
    /** Tab Index for Button */
    tabIndex?: number;

    /** Disable Action Trigger */
    disabled?: boolean;

    /** Classname to append to top level element */
    className?: string;

    /** Button onClick callback */
    onClick?: (event) => void;

    attr?: ActionTriggerButtonAttributes & ActionTriggerAttributes;    
}

export const ActionTriggerButton: React.StatelessComponent<ActionTriggerButtonProps> = (props: ActionTriggerButtonProps) => {
    const { onClick, className, disabled, tabIndex, label, attr, icon, rightIcon } = props;

    return (
        <StyledElements.button
            type='button'
            onClick={onClick}
            className={css('action-trigger-button', {
                'disabled': disabled
            }, className)}
            disabled={disabled}
            tabIndex={tabIndex}
            title={label}
            attr={attr && attr.button}
        >
            <ActionTrigger
                icon={icon}
                rightIcon={rightIcon}
                label={label}
                disabled={disabled}
                attr={attr}
            />
        </StyledElements.button>
    );
};

ActionTriggerButton.defaultProps = {
    icon: undefined,
    attr: { button: {}, ...{ container: {}, icon: {}, suffix: {} } }
};

export default ActionTriggerButton;