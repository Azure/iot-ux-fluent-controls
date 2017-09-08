import * as React from 'react';
import * as classNames from 'classnames/bind';
const css = classNames.bind(require('./Icon.scss'));

export enum IconSize {
    // 16px
    xsmall = 1,
    // 32px
    small,
    // 48px
    medium,
    // 64px
    large,
    // 80px
    xlarge,
    // 96px
    xxlarge
}

export interface IconType {}

export interface IconProps extends React.Props<IconType> {
    /** Icon name (from Segoe UI MDL font) */
    icon: string;

    /**
     * Icon font size as defined by `IconSize` enum
     * 
     * `IconSize.[xsmall | small | medium | large | xlarge | xxlarge]`
     * 
     * Starts at 16 pixels (`IconSize.xsmall`) and increases 16 pixels at a
     * time until 96 pixels (`IconSize.xxlarge`)
     * 
     * Defaults to `IconSize.medium` (48 pixels)
     */
    size?: IconSize;
    /**
     * Icon font size
     * 
     * Overrides `IconProps.size`
     */
    fontSize?: number;
    /** Icon color (accepts string color names and RGB hex values) */
    color?: string;
    /** Center vertically and horizontally in parent element */
    centered?: boolean;
    
    /** Properties to pass through to top level element */
    props?: any;
    
    /** Classname to append to top level element */
    className?: string;
    /**
     * Classname for Icon label
     * 
     * Even with props.className getting CSS specificity right to modify font-
     * size of the label is problematic.
     */
    labelClassName?: string;
}

/**
 * Icon loaded from Segoe UI MDL icons font
 * 
 * Renders children so this control can be used with text
 * 
 * @param props Control properties (Defined in `IconProps` interface)
 */
export const Icon = (props: IconProps) => {
    let iconClassName = `icon-${props.icon}`;
    let size = props.size || IconSize.medium;
    let cls = css({
        // 'icon': true,
        'icon-xsmall': size === IconSize.xsmall,
        'icon-small': size === IconSize.small,
        'icon-medium': size === IconSize.medium,
        'icon-large': size === IconSize.large,
        'icon-xlarge': size === IconSize.xlarge,
        'icon-xxlarge': size === IconSize.xxlarge,
        'centered': props.centered
    }, iconClassName, props.className);

    let style = { color: props.color };
    if (props.fontSize) {
        style['fontSize'] = `${props.fontSize}px`;
    }

    return (
        <span className={cls} style={style} {...props.props}>
            <span className={props.labelClassName}>
                {props.children}
            </span>
        </span>
    );
};
