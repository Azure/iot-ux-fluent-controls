import * as React from 'react';
import * as classNames from 'classnames/bind';
const cssName = classNames.bind(require('./Icon.scss'));

export enum Size {
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
export interface IconBackgroundType {}

export interface IconProps extends React.Props<IconType> {
    icon: string;    

    size?: Size;
    centered?: boolean;
    fontSize?: number;
    color?: string;

    className?: string;
}

export interface IconBackgroundProps extends React.Props<IconBackgroundType> {
    backgroundColor: string;

    diameter?: number;
    centered?: boolean;
    
    className?: string;
}

export const Icon = (props: IconProps) => {
    let iconClassName = `icon-${props.icon}`;
    let size = props.size || Size.medium;
    let cls = cssName({
        // 'icon': true,
        'icon-xsmall': size === Size.xsmall,
        'icon-small': size === Size.small,
        'icon-medium': size === Size.medium,
        'icon-large': size === Size.large,
        'icon-xlarge': size === Size.xlarge,
        'icon-xxlarge': size === Size.xxlarge,
        'centered': props.centered
    }, iconClassName, props.className);

    let style = { color: props.color };
    if (props.fontSize) {
        style['fontSize'] = `${props.fontSize}px`;
    }

    return (
        <span className={cls} style={style}>
            {props.children}
        </span>
    );
};

export const IconBackground = (props: IconBackgroundProps) => {
    let cls = cssName({
        'icon-background': true,
        'centered': props.centered
    }, props.className);

    let style = {
        backgroundColor: props.backgroundColor
    };

    if (props.diameter) {
        style['width'] = `${props.diameter}px`;
        style['height'] = `${props.diameter}px`;
        style['borderRadius'] = `${props.diameter / 2}px`;
    }

    return (<div className={cls} style={style}></div>);
};
