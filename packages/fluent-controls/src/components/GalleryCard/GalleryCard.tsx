import * as React from 'react';
import * as classNames from 'classnames/bind';
import {Icon, IconSize, IconProps} from '../Icon';
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
        'background-image': true,
        'fixed': !!props.fixed
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
        'background-color': true,
        'fixed': !!props.fixed
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
        'banner': true,
    }, props.className);

    return (<div className={cls}>{props.children}</div>);
};

export interface GalleryCardIconProps extends IconProps {
    title?: string;
}

export const GalleryCardIcon = (props: GalleryCardIconProps) => {
    let fontSize;
    if (props.size) {
        // if the size is set, pass fontSize through
        fontSize = props.fontSize;
    } else {
        // if size is not set, then provide a default override for fontSize
        fontSize = props.fontSize ? props.fontSize : 72;
    }

    const outputProps = {
        icon: props.icon,
        size: props.size,
        color: props.color || 'white',
        centered: props.centered || true,
        fontSize: fontSize,
        className: cssName('gallery-card-icon', props.className)
    };

    let title;
    if (props.title) {
        let className = cssName('icon-title');
        title = (
            <span className={className}>
                {props.title}
            </span>
        );
    }

    return (<Icon {...outputProps}>{title}</Icon>);
};

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    background: JSX.Element;
    banner?: string;
    title?: string;

    href?: string;
    onClick?: any;

    fixed?: boolean;

    className?: string;
    dataTestHook?: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
    let css = cssName({
        'card': true,
        'fixed': !!props.fixed,
        'fullbg': !props.children
    }, props.className || '');

    let contentClassName = cssName({
        'card-content': true,
    });

    let outputProps: any = {
        className: css,
        onClick: props.onClick,
        href: props.href,
        title: props.title
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