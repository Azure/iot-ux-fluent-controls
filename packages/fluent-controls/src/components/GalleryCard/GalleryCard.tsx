import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as md from '../../utilities/css';
const cx = classNames.bind(require('./GalleryCard.scss'));
let container = cx("md-card", "md-fixed");
let background = cx("md-card-background");
let icon = cx("md-card-icon");
let content = cx("md-card-content");

export interface CardSolidBackgroundType {

}

export interface GalleryCardType {

}

export const CardTest = () => {
    

    const out = () => (<div className={container}>
        <div className={background}>

        </div>
        <div className={icon}>

        </div>
        <div className={content}>
            <h1>Title</h1>
            <p>Lorem ipsum</p>
            <button />
        </div>
    </div>);


    return (
        <div>
            {out()}
            {out()}
            {out()}
            <div className="md-card__container md-card__container--fixed">
                <div className="md-bg md-card__background md-card__background--fixed">

                </div>

                <div className="md-card__content">

                </div>
            </div>
            <div className="md-card__container md-card__container--fixed">
                <div className="md-bg md-card__background md-card__background--fixed">

                </div>
                <div className="md-card__icon md-card__icon--fixed">

                </div>
                <div className="md-card__content">

                </div>
            </div>
        </div>
    );
}

export interface CardSolidBackground extends React.Props<CardSolidBackgroundType> {

}

export interface GalleryCardProps extends React.Props<GalleryCardType> {
    banner?: JSX.Element | string;
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

    let output_props: any = {
        className: css,
        href: props.href || ''
    };
    if (props.dataTestHook) {
        output_props['data-test-hook'] = props.dataTestHook;
    }

    return (
        <a {...output_props} >

        </a >
    );
};