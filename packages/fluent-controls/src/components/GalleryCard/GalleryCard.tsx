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

export const CardTest = () => {
    
    const out1 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <IconBackground backgroundColor="yellow" />
                <Icon icon='cancelLegacy' xlarge />
                <Banner backgroundColor="#333">Coming soon!</Banner>
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

    const out2 = () => {
        let bg = (
            <ImageBackground src="/card-bg.png" fixed>
                <IconBackground backgroundColor="yellow" />
                <Icon icon='cancelLegacy' xlarge >Cancel Application</Icon>
            </ImageBackground>
        );

        return (
            <GalleryCard background={bg} fixed>
                <header>Title</header>
                <section>Lorem ipsum</section>
                <section>Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out3 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <Icon icon='cancelLegacy' xlarge />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
                <header>Title</header>
                <section>Lorem ipsum</section>
                <section>Lorem ipsum</section>
                <section>Lorem ipsum</section>
                <footer><button>Action!</button></footer>
            </GalleryCard>
        );
    };

    const out4 = () => {
        let bg = (
            <SolidBackground backgroundColor="green" fixed>
                <Icon icon='cancelLegacy' xlarge />
            </SolidBackground>
        );

        return (
            <GalleryCard background={bg}>
            </GalleryCard>
        );
    };

    return (
        <div>
            {out1()}
            {out2()}
            {out3()}
            {out4()}
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

    xsmall?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    xlarge?: boolean;

    className?: string;
}

export const Icon = (props: IconProps) => {
    let icon_cls = `icon-${props.icon}`;
    let cls = cx({
        // 'md-icon': true,
        'md-icon-xsmall': !!props.xsmall,
        'md-icon-small': !!props.small,
        'md-icon-medium': !!props.medium,
        'md-icon-large': !!props.large,
        'md-icon-xlarge': !!props.xlarge
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
    backgroundColor?: string;

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

    href?: string;
    onClick?: any;

    fixed?: boolean;

    className?: string;
    dataTestHook?: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
    let css = cx({
        "md-card": true,
        "md-fixed": !!props.fixed
    }, props.className || '');

    let content_cls = cx({
        "md-card-content": true,
    });

    let output_props: any = {
        className: css,
        href: props.href || ''
    };

    if (props.dataTestHook) {
        output_props['data-test-hook'] = props.dataTestHook;
    }

    const content = props.children ? (
        <div className={content_cls}>
            {props.children}
        </div>
    ) : null;
    
    return (
        <div {...output_props} >
            {props.background}
            {content}
        </div>
    );
};