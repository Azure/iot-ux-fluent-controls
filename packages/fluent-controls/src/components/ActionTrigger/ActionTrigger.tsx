import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize} from '../Icon';
const css = classNames.bind(require('./ActionTrigger.scss'));

export interface ActionTriggerComponentType {}

export interface ActionTriggerProps extends React.Props<ActionTriggerComponentType> {
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
}

/**
 * ActionTrigger showing Information, Warning, or Error with text, icon, and optional close button
 * 
 * @param props Control properties (defined in `ActionTriggerProps` interface)
 */
export const ActionTrigger: React.StatelessComponent<ActionTriggerProps> = (props: ActionTriggerProps) => {
    const className = css('action-trigger', {'disabled': props.disabled});
    const labelClassName = css('label');

    let suffix;
    if (props.rightIcon) {
        const suffixClassName = css('suffix');
        suffix = <Icon icon={props.rightIcon} size={IconSize.xsmall} className={suffixClassName} />;
    }

    return (
        <div className={className} ><Icon
                icon={props.icon}
                labelClassName={labelClassName}
                size={IconSize.xsmall}
            >{props.label}</Icon>{suffix}</div>
    );
};

ActionTrigger.defaultProps = {
    
};

export default ActionTrigger;
