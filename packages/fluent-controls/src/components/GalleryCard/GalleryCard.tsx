import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconProps} from '../Icon';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface GalleryCardType {}

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    /** Element to display as `GalleryCard` background */
    background: MethodNode;
    /** Banner string to display above the `GalleryCard` background */
    banner?: string;
    /** Accessibility title on top level anchor tag */
    title?: string;

    /** Link URL for top level anchor tag */
    href?: string;
    /** Callback for `GalleryCard` `onClick` events */
    onClick?: any;

    /** Fixed width and height (284 pixels) */
    fixed?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Data test hook string for testing */
    dataTestHook?: string;
}

/**
 * Gallery Card control
 * 
 * You should usually mark this control as `fixed` because the container
 * element gets its width from its content like the background and children
 * 
 * @param props Control properties (Defined in `GalleryCardProps` interface)
 */
export const GalleryCard = (props: GalleryCardProps) => {
    let classNames = css({
        'card': true,
        'fixed': !!props.fixed,
        'fullbg': !props.children
    }, props.className || '');

    let contentClassName = css({
        'card-content': true,
    });

    let outputProps: any = {
        className: classNames,
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

export interface BannerType {}

export interface BannerProps extends React.Props<BannerType> {
    className?: string;
}

/** TODO: Remove this Banner control. GalleryCard banner is now a string */
export const Banner = (props: BannerProps) => {
    let cls = css({
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
        className: css('gallery-card-icon', props.className)
    };

    let title;
    if (props.title) {
        let className = css('icon-title');
        title = (
            <span className={className}>
                {props.title}
            </span>
        );
    }

    return (<Icon {...outputProps}>{title}</Icon>);
};