import * as React from 'react';
import * as classNames from 'classnames/bind';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconProps} from '../Icon';
import {SolidBackground} from './SolidBackground';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface GalleryCardType {}

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    /**
     * Element to display as `GalleryCard` background
     * 
     * Default: Solid background with color #eaeaea
     * */
    background?: MethodNode;
    /** Banner string to display above the `GalleryCard` background */
    banner?: string;

    /**
     * Fixed width and height (284 pixels)
     * 
     * Default: true
     */
    fixed?: boolean;
    /** Disables interaction CSS */
    disabled?: boolean;

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to content element */
    contentClassName?: string;
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
export const GalleryCard: React.StatelessComponent<GalleryCardProps> = (props: GalleryCardProps) => {
    let classNames = css({
        'card': true,
        'fixed': !!props.fixed,
        'fullbg': !props.children,
        'disabled': props.disabled
    }, props.className || '');

    let contentClassName = css({
        'card-content': true,
    }, props.contentClassName);

    let outputProps: any = {
        className: classNames
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
        <div {...outputProps} >
            {props.background}
            {content}
            {banner}
        </div>
    );
};

GalleryCard.defaultProps = {
    fixed: true,
    background: <SolidBackground />
};

export interface BannerType {}

export interface BannerProps extends React.Props<BannerType> {
    className?: string;
}

/** TODO: Remove this Banner control. GalleryCard banner is now a string */
export const Banner: React.StatelessComponent<BannerProps> = (props: BannerProps) => {
    let cls = css({
        'banner': true,
    }, props.className);

    return (<div className={cls}>{props.children}</div>);
};

export interface GalleryCardIconProps extends IconProps {
    title?: string;
}

export const GalleryCardIcon: React.StatelessComponent<GalleryCardIconProps> = (props: GalleryCardIconProps) => {
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

export default GalleryCard;
