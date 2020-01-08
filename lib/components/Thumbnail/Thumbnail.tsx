import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Elements as Attr, DivProps, ImageProps } from '../../Attributes';
const cx = classNames.bind(require('./Thumbnail.module.scss'));

/**
 * Scalable thumbnail for a product or a device
 */

export interface ThumbnailProperties {
    // if we are loading then the loading state is displayed
    // if not and we have a display url, we load the image
    // if the image doesn't load and we have a kind, we use that
    // if we don't have a display url and we have a kind, then we display the kind
    // if we don't have a kind, then we display an unknown view which looks like the regular loading view but with an error message underneath
    loading?: boolean;
    url?: string;

    /** The icon to display. */
    icon?: string;

    /**
     * The kind of thumbnail icon.
     * @deprecated use `icon` instead
     */
    kind?: 'product' | 'device' | 'user' | 'unknown' | 'missing';

    // these allow customization of the styles by passing in other classes
    className?: string;

    // this is supposed to be one of the presets present - if not passed it defaults to preview
    // size should be controlled by the
    size?: 'preview' | 'masthead' | 'list-item' | 'list-tile' | 'search-result';

    ariaLabel?: string;
    
    attr?: {
        container?: DivProps;
        img?: ImageProps;
    }; 
}

/**
 * Object that tracks the current state of the toolbar. Since we're just tracking
 * one in-memory boolean flag that doesn't affect anything outside this component,
 * we can just use React's setState instead of creating a new Store for this.
 */
export interface ThumbnailState {
    /** Flag that is set when the browser has finished loading the image */
    imageLoaded: boolean;
}

/**
 * Kind thumbnails load up an icon
 */
const kindIcons = {
    'product': 'icon-alias-product',
    'device': 'icon-alias-device',
    'user': 'icon-alias-user',
    'unknown': 'icon-alias-unknown',
    'missing': 'icon-alias-missing-image'
};

export const Thumbnail = React.memo((props: ThumbnailProperties) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleError = React.useCallback(() => setImageLoaded(false), [setImageLoaded]);
    const handleImageLoad = React.useCallback(() => setImageLoaded(true), [setImageLoaded]);

    const className = cx('circle', props.size || 'preview', props.className);
    if (props.loading) {
        return <Attr.div className={className}/>;
    } else {
        const icon = props.icon || kindIcons[props.kind];
        return <Attr.div className={className} {...props.attr?.container}>
            {
                props.url && <img className={cx({ 'hidden': !imageLoaded })}
                    role={props.attr?.img?.alt ? null : 'presentation'}
                    alt={props.attr?.img?.alt ?? ''}
                    src={props.url}
                    aria-label={props.ariaLabel}
                    onLoad={handleImageLoad}
                    onError={handleError}
                    {...(props.attr?.img || {})} />
            }
            {icon && <span className={cx('icon', icon, { 'hidden': imageLoaded })} />}
        </Attr.div>;
    }
});

export default Thumbnail;
