import * as React from 'react';
import * as classNames from 'classnames/bind';
const cx = classNames.bind(require('./Thumbnail.scss'));

/**
 * Scalable thumbnail for a product or a device
 */

export interface Properties {
    // if we are loading then the loading state is displayed
    // if not and we have a display url, we load the image
    // if the image doesn't load and we have a kind, we use that
    // if we don't have a display url and we have a kind, then we display the kind
    // if we don't have a kind, then we display an unknown view which looks like the regular loading view but with an error message underneath
    loading?: boolean;
    url?: string;
    kind?: 'product' | 'device' | 'user';

    // these allow customization of the styles by passing in other classes
    className?: string;

    // this is supposed to be one of the presets present - if not passed it defaults to preview
    // size should be controlled by the
    size?: 'preview' | 'masthead' | 'list-item' | 'search-result';

    // this is an override of the icon
    icon?: string;
}

/**
 * Object that tracks the current state of the toolbar. Since we're just tracking
 * one in-memory boolean flag that doesn't affect anything outside this component,
 * we can just use React's setState instead of creating a new Store for this.
 */
export interface State {
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

export class Thumbnail extends React.Component<Properties, State> {
    constructor(props: Properties) {
        super(props);
        this.state = { imageLoaded: false };
    }
    render() {
        const className = cx('circle', this.props.className, this.props.size || 'preview');
        if (this.props.loading) {
            return <div className={className}/>;
        } else {
            let icon = this.props.icon || kindIcons[this.props.kind];
            return <div className={cx(className, this.props.kind)}>
                {!!this.props.url
                    ? <img className={cx({ 'hidden': !this.state.imageLoaded })}
                        src={this.props.url}
                        onLoad={() => this.setState({imageLoaded: true})}/>
                    : null}
                {!!icon
                    ? <span className={cx('icon', icon)}/>
                    : null}
            </div>;
        }
    }
}

export default Thumbnail;
