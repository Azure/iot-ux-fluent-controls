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

export interface ActionTriggerComponentType { }

export interface ActionTriggerProps extends React.Props<ActionTriggerComponentType> {
    /** Icon name (from UI Fabric) */
    icon: string;
    /** Icon name for icon on the right of ActionTrigger (from UI Fabric) */
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
export const ActionTrigger: React.StatelessComponent<ActionTriggerProps> = (props: ActionTriggerProps) => {
    const className = css('action-trigger-container', {
        'disabled': props.disabled,
        'action-trigger-label-empty': !props.label
    }, props.className);

    let suffix;
    if (props.rightIcon) {
        suffix = <Icon
            name={props.rightIcon}
            size={IconSize.standard}
            className={css('suffix')}
            attr={props.attr.suffix || {}}
        />;
    }

    return (
        <Attr.div
            className={className}
            attr={props.attr && props.attr.container || {}}
        ><Icon
            name={props.icon}
            className={css('action-trigger-icon')}
            labelClassName={css('action-trigger-label')}
            size={IconSize.standard}
            attr={props.attr && props.attr.icon || {}}
        >{props.label}</Icon>{suffix}</Attr.div>
    );
};

ActionTrigger.defaultProps = {
    icon: undefined,
    attr: { container: {}, icon: {}, suffix: {} }
};

export default ActionTrigger;
