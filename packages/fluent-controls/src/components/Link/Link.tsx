import * as React from 'react';
import * as classNames from 'classnames/bind';
import {AnchorProps, Elements as Attr} from '../../Attributes';
import {Icon, IconSize, IconAttributes} from '../Icon';
const css = classNames.bind(require('./Link.scss'));

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
            className={css('link-container', {'disabled': props.disabled})}
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
