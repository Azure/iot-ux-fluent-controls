import * as React from 'react';
import * as classNames from 'classnames/bind';
const cssName = classNames.bind(require('./Icon.scss'));

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
export interface IconBackgroundType {}

export interface IconProps extends React.Props<IconType> {
    icon: string;    

    size?: IconSize;

    className?: string;
}

export interface IconBackgroundProps extends React.Props<IconBackgroundType> {
    backgroundColor: string;
    
    className?: string;
}

export const Icon = (props: IconProps) => {
    let iconClassName = `icon-${props.icon}`;
    let size = props.size || IconSize.medium;
    let cls = cssName({
        // 'md-icon': true,
        'md-icon-xsmall': size === IconSize.xsmall,
        'md-icon-small': size === IconSize.small,
        'md-icon-medium': size === IconSize.medium,
        'md-icon-large': size === IconSize.large,
        'md-icon-xlarge': size === IconSize.xlarge,
        'md-icon-xxlarge': size === IconSize.xxlarge
    }, iconClassName, props.className);

    return (<span className={cls}></span>);
};

export const IconBackground = (props: IconBackgroundProps) => {
    let cls = cssName({
        'md-icon-background': true
    }, props.className);

    let style = {
        backgroundColor: props.backgroundColor
    };

    return (<div className={cls} style={style}></div>);
};
