/* tslint:disable:interface-name */
import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconBackground} from '../Icon';
const cssName = classNames.bind(require('./GalleryCard.scss'));

export interface SolidBackgroundType {}

export interface ImageBackgroundType {}

export interface BannerType {}

export interface GalleryCardType {}

export interface ImageBackgroundProps extends React.Props<ImageBackgroundType> {
    src: string;

    fixed?: boolean;
    
    className?: string;
}

export const ImageBackground = (props: ImageBackgroundProps) => {
    let cls = cssName({
        'md-background-image': true,
        'md-fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundImage: `url(${props.src})`
    };

    return (
        <div className={cls} style={style}>
            {props.children}
        </div>
    );
};

export interface SolidBackgroundProps extends React.Props<SolidBackgroundType> {
    backgroundColor?: string;

    fixed?: boolean;

    className?: string;
}

export const SolidBackground = (props: SolidBackgroundProps) => {
    let bgColor = props.backgroundColor || '#eaeaea';

    let cls = cssName({
        'md-background-color': true,
        'md-fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundColor: bgColor
    };

    return (
        <div className={cls} style={style}>
            {props.children}            
        </div>
    );
};

export interface BannerProps extends React.Props<BannerType> {
    className?: string;
}

export const Banner = (props: BannerProps) => {
    let cls = cssName({
        'md-banner': true,
    }, props.className);

    return (<div className={cls}>{props.children}</div>);
};

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    background: JSX.Element;
    banner?: string;

    href?: string;
    onClick?: any;

    fixed?: boolean;

    className?: string;
    dataTestHook?: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
    let css = cssName({
        'md-card': true,
        'md-fixed': !!props.fixed,
        'md-fullbg': !props.children
    }, props.className || '');

    let contentClassName = cssName({
        'md-card-content': true,
    });

    let outputProps: any = {
        className: css,
        onClick: props.onClick,
        href: props.href
    };

    if (props.dataTestHook) {
        outputProps['data-test-hook'] = props.dataTestHook;
    }

    const banner = props.banner ? (
        <Banner>{props.banner}</Banner>
    ) : null;
    
    const content = props.children ? (
        <div className={contentClassName}>
            {props.children}
        </div>
    ) : null;

    return (
        <a {...outputProps} >
            {props.background}
            {content}
            {banner}
        </a>
    );
};