import * as React from 'react';
import * as classNames from 'classnames/bind';

import { ActionTrigger, ActionTriggerAttributes } from '../ActionTrigger/ActionTrigger';
import { Elements as Attr, ButtonProps } from '../../Attributes';

const css = classNames.bind(require('./ActionTrigger.module.scss'));

export interface ActionTriggerButtonAttributes {
    button?: ButtonProps;
}

export interface ActionTriggerButtonProps {
    autoFocus?: boolean;
    /** Icon name (from Segoe UI MDL font) */
    icon: string | React.ReactNode;
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
    onClick?: (event: React.SyntheticEvent) => void;

    attr?: ActionTriggerButtonAttributes & ActionTriggerAttributes;    
}

export const ActionTriggerButton = React.memo((props: ActionTriggerButtonProps) => {
    const { autoFocus, onClick, className, disabled, tabIndex, label, attr, icon, rightIcon } = props;
    
    return (
        <Attr.button
            type='button'
            autoFocus={autoFocus}
            onClick={onClick}
            className={css('action-trigger-button', { disabled }, className)}
            disabled={disabled}
            tabIndex={tabIndex}
            title={label}
            attr={attr?.button}>
            <ActionTrigger
                icon={icon}
                rightIcon={rightIcon}
                label={label}
                disabled={disabled}
                attr={attr}
            />
        </Attr.button>
    );
});

export default ActionTriggerButton;
