import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Elements as Attr, SpanProps } from '../../Attributes';
import { getIcon } from '@uifabric/styling';
const css = classNames.bind(require('./Icon.module.scss'));

export enum IconSize {
    // 12px
    compact,
    // 16px
    standard,
    // 64px
    large,
}

export interface IconType {}

export interface IconAttributes {
    container?: SpanProps;
    label?: SpanProps;
}

export interface IconProps extends React.Props<IconType> {
    /** Icon name (from UI Fabric) */
    name: string;

    /**
     * Icon font size as defined by `IconSize` enum
     *
     * `IconSize.[compact | standard | large]`
     *
     *
     * Defaults: `IconSize.standard` (16x16 pixels)
     */
    size?: IconSize;

    /** Classname to append to top level element */
    className?: string;

    /**
     * Classname for Icon label
     *
     * Even with props.className getting CSS specificity right to modify font-
     * size of the label is problematic.
     */
    labelClassName?: string;

    /**
     * Icon font size
     *
     * Overrides `IconProps.size`
     */
    fontSize?: number;
    
    /** Icon color (accepts string color names and RGB hex values) */
    color?: string;

    attr?: IconAttributes;
}

/**
 * Icon loaded from Office Fabric UI icons font
 *
 * Renders children so this control can be used with text
 *
 * @param props Control properties (Defined in `IconProps` interface)
 */
export const Icon: React.StatelessComponent<IconProps> = (props: IconProps) => {
    let cls = css('icon', {
        'icon-compact': props.size === IconSize.compact,
        'icon-standard': props.size === IconSize.standard,
        'icon-large': props.size === IconSize.large,
        'icon-navigation': props.name.includes('chevron') || props.name.toLowerCase() === 'cancel',
        'icon-delete': props.name.toLowerCase() === 'delete'
    }, props.className);

    const iconFabric = getIcon(props.name);
    let style = { color: props.color };
    if (props.fontSize) {
        style['fontSize'] = `${props.fontSize}px`;
    }

    let label: React.ReactNode;
    if (props.children) {
        label = (
            <Attr.span
                className={props.labelClassName}
                attr={props.attr.label}
            >
                {props.children}
            </Attr.span>
        );
    }

    return (
        <Attr.span className={cls} style={style}>
            <i data-icon-name={props.name}
                aria-hidden={true}
                className={iconFabric && iconFabric.subset.className}>
                {iconFabric && iconFabric.code}
            </i>
            {label}
        </Attr.span>
    );
};

Icon.defaultProps = {
    name: undefined,
    size: IconSize.standard,
    attr: {
        container: {},
        label: {}
    }
};

export default Icon;
