import * as React from 'react';
import * as classnames from 'classnames';
import {AnchorProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classnames;

export interface LinkComponentType {}

export interface LinkAttributes {
    container?: AnchorProps;
}

export interface LinkProps extends React.Props<LinkComponentType> {
    /** Link href */
    href: string;

    /** Disable button */
    disabled?: boolean;

    /** 
     * Callback for button onClick
     */    
    onClick?: () => void;

    /** Classname to append to top level element */
    className?: string;

    attr?: LinkAttributes;
}

/**
 * Link showing Information, Warning, or Error with text, icon, and optional close button
 * 
 * @param props Control properties (defined in `LinkProps` interface)
 */
export const Link: React.StatelessComponent<LinkProps> = (props: LinkProps) => {
    return (
        <Attr.a
            href={props.href}
            className={css('link', {'disabled': props.disabled})}
            onClick={props.onClick}
            attr={props.attr.container}
        >
            {props.children}
        </Attr.a>
    );
};

Link.defaultProps = {
    href: undefined,
    attr: {
        container: {}
    }
};

export default Link;
