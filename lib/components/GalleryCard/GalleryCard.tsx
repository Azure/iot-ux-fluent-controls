import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {SolidBackground} from './SolidBackground';
const css = classNames.bind(require('./GalleryCard.module.scss'));

export interface GalleryCardType {}

export interface GalleryCardAttributes {
    container?: DivProps;
    content?: DivProps;
    banner?: DivProps;
}

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    /**
     * Element to display as `GalleryCard` background
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

export default GalleryCard;
