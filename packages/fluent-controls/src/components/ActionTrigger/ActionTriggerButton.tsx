import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {ActionTrigger, ActionTriggerProps, ActionTriggerAttributes} from '../ActionTrigger';
import {Elements as Attr, ButtonProps} from '../../Attributes';
const css = classNames.bind(require('./ActionTrigger.scss'));

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
    return (
        <Attr.button
            type='button'
            onClick={props.onClick}
            className={css('action-trigger-button', props.className)}
            disabled={props.disabled}
            tabIndex={props.tabIndex}
            attr={props.attr.button}
        >
            <ActionTrigger
                icon={props.icon}
                rightIcon={props.rightIcon}
                label={props.label}
                disabled={props.disabled}
                className={props.className}
                attr={props.attr}
            />
        </Attr.button>
    );
};

ActionTriggerButton.defaultProps = {
    icon: undefined,
    attr: {button: {}, ...{container: {}, icon: {}, suffix: {}}}
};

export default ActionTriggerButton;
