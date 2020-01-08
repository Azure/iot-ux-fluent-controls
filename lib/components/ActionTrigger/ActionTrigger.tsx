import * as React from 'react';
import * as classNames from 'classnames/bind';

import { Icon, IconSize, IconAttributes } from '../Icon';
import { Elements as Attr, DivProps } from '../../Attributes';

const css = classNames.bind(require('./ActionTrigger.module.scss'));

export interface ActionTriggerAttributes {
    container?: DivProps;
    icon?: IconAttributes;
    suffix?: IconAttributes;
}

export interface ActionTriggerProps {
    /** Icon name (from Segoe UI MDL font) */
    icon: string;
    /** Icon name for icon on the right of ActionTrigger (from Segoe UI MDL font) */
    rightIcon?: string;
    /** Action trigger label */
    label?: string;

    /** Disable Action Trigger */
    disabled?: boolean;

    /** Classname to append to top level element */
    className?: string;

    attr?: ActionTriggerAttributes;
}

/**
 * ActionTrigger showing Information, Warning, or Error with text, icon, and optional close button
 *
 * @param props Control properties (defined in `ActionTriggerProps` interface)
 */
export const ActionTrigger = React.memo((props: ActionTriggerProps) => {
    const className = css('action-trigger-container', {
        'disabled': props.disabled,
        'action-trigger-label-empty': !props.label
    }, props.className);

    let suffix: React.ReactNode;
    if (props.rightIcon) {
        suffix = <Icon
            icon={props.rightIcon}
            size={IconSize.xsmall}
            className={css('suffix')}
            attr={props.attr?.suffix}
        />;
    }

    return (
        <Attr.div
            className={className}
            attr={props.attr?.container}>
            <Icon
                icon={props.icon}
                className={css('action-trigger-icon')}
                labelClassName={css('action-trigger-label')}
                size={IconSize.xsmall}
                attr={props.attr?.icon}>
                {props.label}
            </Icon>
            {suffix}
        </Attr.div>
    );
});

export default ActionTrigger;
