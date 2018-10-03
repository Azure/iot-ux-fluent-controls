import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, SpanProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {Icon, IconSize, IconProps, IconAttributes} from '../Icon';
import {SolidBackground} from './SolidBackground';
const css = classNames.bind(require('./GalleryCard.scss'));

export interface GalleryCardType {}

export interface GalleryCardAttributes {
    container?: DivProps;
    content?: DivProps;
    banner?: DivProps;
}

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

    /** Classname to append to top level element */
    className?: string;
    /** Classname to append to content element */
    contentClassName?: string;
    /** Data test hook string for testing */
    dataTestHook?: string;

    attr?: GalleryCardAttributes;
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
        'fullbg': !props.children
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
        <Banner attr={{container: props.attr.banner}}>{props.banner}</Banner>
    ) : null;


    const content = props.children ? (
        <Attr.div className={contentClassName} attr={props.attr.content}>
            {props.children}
        </Attr.div>
    ) : null;

    return (
        <Attr.div {...outputProps} attr={props.attr.container}>
            {props.background}
            {content}
            {banner}
        </Attr.div>
    );
};

GalleryCard.defaultProps = {
    fixed: true,
    background: <SolidBackground />,
    attr: {
        container: {},
        content: {},
        banner: {},
    }
};


export interface BannerType {}

export interface BannerAttributes {
    container?: DivProps;
}

export interface BannerProps extends React.Props<BannerType> {
    className?: string;
    attr?: BannerAttributes;
}

/** TODO: Remove this Banner control. GalleryCard banner is now a string */
export const Banner: React.StatelessComponent<BannerProps> = (props: BannerProps) => {
    let cls = css({
        'banner': true,
    }, props.className);

    return (<Attr.div className={cls} attr={props.attr.container}>
        {props.children}
    </Attr.div>);
};

Banner.defaultProps = {
    attr: {
        container: {}
    }
};

export interface GalleryCardIconAttributes {
    text?: SpanProps;
}

export interface GalleryCardIconProps extends IconProps {
    title?: string;
    attr?: GalleryCardIconAttributes & IconAttributes;
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
            <Attr.span className={className} attr={props.attr.text}>
                {props.title}
            </Attr.span>
        );
    }

    return (<Icon {...outputProps}>{title}</Icon>);
};

GalleryCardIcon.defaultProps = {
    icon: undefined,
    attr: {
        text: {},
        container: {},
        label: {}
    }
};

export default GalleryCard;
