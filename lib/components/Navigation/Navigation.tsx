import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Navigation.scss'));

export interface NavigationItems {
    key: string;
    icon: string;
    label: React.ReactNode;
    title?: string;
    to: string;
}

export interface NavigationProperties {
    isExpanded: boolean;
    onClick: React.MouseEventHandler<any>;
    items: Array<NavigationItems>;
}

export class Navigation extends React.PureComponent<NavigationProperties> {
    render() {
        return (
            <div className={cx('navigation', { expanded: this.props.isExpanded })} data-test-hook='side-nav'>
                <div className={cx('link-container')} key='globalNavButton' onClick={this.props.onClick}>
                    <div className={cx('link-thumbnail', 'icon', 'icon-globalNavButton')} />
                </div>
                {this.props.items.map(x => (
                    <Link to={x.to} className={cx('link-container')} key={x.key} title={x.title}>
                        <div className={cx('link-thumbnail', x.icon)} />
                        <div className={cx('link-label', 'inline-text-overflow')}>{x.label}</div>
                    </Link>
                ))}
            </div>
        );
    }
}

export default Navigation;
