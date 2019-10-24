import * as React from 'react';
import {ActionTrigger, ActionTriggerAttributes} from '../ActionTrigger/ActionTrigger';
import {Elements as Attr, AnchorProps} from '../../Attributes';

export interface ActionTriggerLinkAttributes {
    anchor?: AnchorProps;    
}

export interface ActionTriggerLinkProps {
    /** Icon name (from Segoe UI MDL font) */
    icon: string;
    /** Icon name for icon on the right of ActionTrigger (from Segoe UI MDL font) */
    rightIcon?: string;
    /** Action trigger label */
    label?: string;

    /** Classname to append to top level element */
    className?: string;

    /** Anchor href */
    href: string;
    /** Anchor onClick callback */
    onClick?: () => void;
    /** Anchor accessibility title */
    title?: string;

    attr?: ActionTriggerLinkAttributes & ActionTriggerAttributes;
}

export const ActionTriggerLink: React.StatelessComponent<ActionTriggerLinkProps> = (props: ActionTriggerLinkProps) => {
    return (
        <Attr.a 
            href={props.href}
            onClick={props.onClick}
            className={props.className}
            attr={props.attr.anchor}
        >
            <ActionTrigger
                icon={props.icon}
                rightIcon={props.rightIcon}
                label={props.label}
                attr={props.attr}
            />
        </Attr.a>
    );
};

ActionTriggerLink.defaultProps = {
    icon: undefined,
    href: undefined,
    attr: {anchor: {}, icon: {}, ...{container: {}, icon: {}, suffix: {}}}
};

export default ActionTriggerLink;
