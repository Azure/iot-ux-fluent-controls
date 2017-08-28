import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as md from '../../utilities/css';
const cx = classNames.bind(require('./GalleryCard.scss'));

export interface SolidBackgroundType {

}

export interface ImageBackgroundType {
    
}

export interface IconType {
    
}

export interface IconBackgroundType {

}

export interface BannerType {
    
}

export interface GalleryCardType {

}

export enum IconSize {
    xsmall = 1,
    small,
    medium,
    large,
    xlarge,
    xxlarge
}

export const CardTest = () => {
    
    const out1 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <IconBackground backgroundColor="yellow" />
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg} banner="Coming soon!">
                <header>Title</header>
                <section>Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out2 = () => {
        let bg = (
            <ImageBackground src="/card-bg.png" fixed>
                <IconBackground backgroundColor="yellow" />
                <Icon icon='cancelLegacy' size={IconSize.xlarge}></Icon>
            </ImageBackground>
        );

        return (
            <GalleryCard background={bg} fixed>
                <header>Title</header>
                <section>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum ipsum Lorem ipsumv Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out3 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
                <header>Title</header>
                <section>Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out4 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
            </GalleryCard>
        );
    };

    const out5 = () => {
        let bg = (
            <SolidBackground backgroundColor="green">
                <Icon icon='cancelLegacy' size={IconSize.xlarge} />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg} fixed href="#">
            </GalleryCard>
        );
    };

    return (
        <div>
            {out1()}
            {out2()}
            {out3()}
            {out4()}
            {out5()}
        </div>
    );
}

export interface ImageBackgroundProps extends React.Props<ImageBackgroundType> {
    src: string;

    fixed?: boolean;
    
    className?: string;
}

export const ImageBackground = (props: ImageBackgroundProps) => {
    let cls = cx({
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

export interface SolidBackgroundProps extends React.Props<ImageBackgroundType> {
    backgroundColor?: string;

    fixed?: boolean;

    className?: string;
}

export const SolidBackground = (props: SolidBackgroundProps) => {
    let bg_color = props.backgroundColor || '#eaeaea';

    let cls = cx({
        'md-background-color': true,
        'md-fixed': !!props.fixed
    }, props.className);

    let style = {
        backgroundColor: bg_color
    };

    return (
        <div className={cls} style={style}>
            {props.children}            
        </div>
    );
};

export interface IconProps extends React.Props<ImageBackgroundType> {
    icon: string;    

    size?: IconSize;

    className?: string;
}

export const Icon = (props: IconProps) => {
    let icon_cls = `icon-${props.icon}`;
    let size = props.size || IconSize.medium;
    let cls = cx({
        // 'md-icon': true,
        'md-icon-xsmall': size === IconSize.xsmall,
        'md-icon-small': size === IconSize.small,
        'md-icon-medium': size === IconSize.medium,
        'md-icon-large': size === IconSize.large,
        'md-icon-xlarge': size === IconSize.xlarge,
        'md-icon-xxlarge': size === IconSize.xxlarge
    }, icon_cls, props.className);

    return (<span className={cls}></span>)
};

export interface IconBackgroundProps extends React.Props<IconBackgroundType> {
    backgroundColor: string;
    
    className?: string;
}

export const IconBackground = (props: IconBackgroundProps) => {
    let cls = cx({
        "md-icon-background": true
    }, props.className);

    let style = {
        backgroundColor: props.backgroundColor
    }

    return (<div className={cls} style={style}></div>)
};

export interface BannerProps extends React.Props<ImageBackgroundType> {
    className?: string;
}

export const Banner = (props: BannerProps) => {
    let cls = cx({
        'md-banner': true,
    }, props.className);

    return (<div className={cls}>{props.children}</div>)
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
    let css = cx({
        "md-card": true,
        "md-fixed": !!props.fixed,
        'md-fullbg': !props.children
    }, props.className || '');

    let content_cls = cx({
        "md-card-content": true,
    });

    let output_props: any = {
        className: css,
        onClick: props.onClick,
        href: props.href
    };

    if (props.dataTestHook) {
        output_props['data-test-hook'] = props.dataTestHook;
    }

    const banner = props.banner ? (
        <Banner>{props.banner}</Banner>
    ) : null;
    
    const content = props.children ? (
        <div className={content_cls}>
            {props.children}
        </div>
    ) : null;

    return (
        <a {...output_props} >
            {props.background}
            {content}
            {banner}
        </a>
    );
};