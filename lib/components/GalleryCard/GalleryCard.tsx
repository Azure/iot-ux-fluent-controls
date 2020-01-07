import * as React from 'react';
import * as classNames from 'classnames/bind';
import {DivProps, Elements as Attr} from '../../Attributes';
import {MethodNode} from '../../Common';
import {SolidBackground} from './SolidBackground';
const css = classNames.bind(require('./GalleryCard.module.scss'));

export interface GalleryCardAttributes {
    container?: DivProps;
    content?: DivProps;
    banner?: DivProps;
}

export interface GalleryCardProps {
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

    children?: React.ReactNode;

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
export const GalleryCard = React.memo((props: GalleryCardProps) => {
    const className = css({
        'card': true,
        'fixed': props.fixed == null || props.fixed,
        'fullbg': !props.children
    }, props.className || '');

    const contentClassName = css({
        'card-content': true,
    }, props.contentClassName);

    return (
        <Attr.div className={className} datatesthook={props.dataTestHook} attr={props.attr?.container}>
            {props.background ?? <SolidBackground />}
            {props.children && (
                <Attr.div className={contentClassName} attr={props.attr?.content}>
                    {props.children}
                </Attr.div>
            )}
            {props.banner && <Banner attr={{container: props.attr?.banner}}>{props.banner}</Banner>}
        </Attr.div>
    );
});

export interface BannerAttributes {
    container?: DivProps;
}

export interface BannerProps {
    className?: string;
    children: React.ReactNode;
    attr?: BannerAttributes;
}

/** TODO: Remove this Banner control. GalleryCard banner is now a string */
export const Banner = React.memo((props: BannerProps) => {
    return (
        <Attr.div className={css('banner', props.className)} attr={props.attr?.container}>
            {props.children}
        </Attr.div>
    );
});

export default GalleryCard;
