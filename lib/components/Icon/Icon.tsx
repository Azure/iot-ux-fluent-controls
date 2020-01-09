import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Elements as Attr, SpanProps} from '../../Attributes';
const css = classNames.bind(require('./Icon.module.scss'));

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

export interface IconAttributes {
    container?: SpanProps;
    label?: SpanProps;
}

export interface IconProps extends React.Props<IconType> {
    /** Icon name (from icons.css) */
    icon: string;

    /**
     * Icon font size as defined by `IconSize` enum
     *
     * `IconSize.[xsmall | small | medium | large | xlarge | xxlarge]`
     *
     * Starts at 16 pixels (`IconSize.xsmall`) and increases 16 pixels at a
     * time until 96 pixels (`IconSize.xxlarge`)
     *
     * Defaults: `IconSize.medium` (48x48 pixels)
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

    /** Classname to append to top level element */
    className?: string;
    /**
     * Classname for Icon label
     *
     * Even with props.className getting CSS specificity right to modify font-
     * size of the label is problematic.
     */
    labelClassName?: string;

    attr?: IconAttributes;
}

/**
 * Icon loaded from Segoe UI MDL icons font
 *
 * Renders children so this control can be used with text
 *
 * @param props Control properties (Defined in `IconProps` interface)
 */
export const Icon: React.StatelessComponent<IconProps> = (props: IconProps) => {
    let iconClassName = `icon-${props.icon}`;
    let cls = css({
        'icon-xsmall': props.size === IconSize.xsmall,
        'icon-small': props.size === IconSize.small,
        'icon-medium': props.size === IconSize.medium,
        'icon-large': props.size === IconSize.large,
        'icon-xlarge': props.size === IconSize.xlarge,
        'icon-xxlarge': props.size === IconSize.xxlarge,
        'centered': props.centered,
    }, iconClassName, props.className);

    let style = { color: props.color };
    if (props.fontSize) {
        style['fontSize'] = `${props.fontSize}px`;
    }

    let label;
    if (props.children) {
        label = (
            <Attr.span
                className={props.labelClassName}
                attr={props.attr?.label}
            >
                {props.children}
            </Attr.span>
        );
    }

    return (
        <Attr.span
            className={cls}
            style={style}
            attr={props.attr?.container}
        >
            {label}
        </Attr.span>
    );
};

Icon.defaultProps = {
    icon: undefined,
    size: IconSize.medium,
    attr: {
        container: {},
        label: {}
    }
};

export default Icon;
