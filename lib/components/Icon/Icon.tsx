import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Elements as Attr, SpanProps} from '../../Attributes';
const css = classNames.bind(require('./Icon.module.scss'));

export enum IconSize {
    compact,
    standard,
    large,
}

export interface IconAttributes {
    container?: SpanProps;
    label?: SpanProps;
}

export interface IconProps {
    /** Icon name (from icons.css) */
    icon: string;

    /**
     * Icon font size as defined by `IconSize` enum
     *
     * `IconSize.[compact | standard | large]`
     *
     * Defaults: `IconSize.standard`
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

    children?: React.ReactNode;
    attr?: IconAttributes;
}

/**
 * Icon loaded from Segoe UI MDL icons font
 *
 * Renders children so this control can be used with text
 *
 * @param props Control properties (Defined in `IconProps` interface)
 */
export const Icon = React.memo((props: IconProps) => {
    const iconClassName = `icon-${props.icon}`;
    const cls = css({
        'icon-xsmall': props.size === IconSize.xsmall,
        'icon-small': props.size === IconSize.small,
        'icon-medium': props.size == null || props.size === IconSize.medium,
        'icon-large': props.size === IconSize.large,
        'centered': props.centered,
    }, iconClassName, props.className);

    const style: any = { };
    if (props.color) {
        style.color = props.color;
    }

    if (props.fontSize) {
        style.fontSize = `${props.fontSize}px`;
    }

    return (
        <Attr.span
            className={cls}
            style={style}
            attr={props.attr?.container}
        >
            {props.children && (
                <Attr.span
                    className={props.labelClassName}
                    attr={props.attr?.label}
                >
                    {props.children}
                </Attr.span>
            )}
        </Attr.span>
    );
});

export default Icon;