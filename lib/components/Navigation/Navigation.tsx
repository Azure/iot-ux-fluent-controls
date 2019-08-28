import * as React from 'react';
import { ButtonProps, NavProps, Elements as Attr } from '../../Attributes';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Navigation.module.scss'));

export interface NavigationAttributes {
    container?: NavProps;
    navButton?: ButtonProps;
}

export interface NavigationProperties {
    isExpanded: boolean;
    onClick: React.EventHandler<any>;
    attr?: NavigationAttributes;
    children?: React.ReactNode;
}

export interface NavigationItemContainerProperties {
    containerTitle: string;
    isExpanded: boolean;
    children: React.ReactNode;
}

export function Navigation({ isExpanded, onClick, attr, children }: NavigationProperties) {    
    return (
        <Attr.nav
            className={cx('navigation', { expanded: isExpanded })}
            attr={attr && attr.container}
        >
            <Attr.button
                className='global-nav-item'
                key='globalNavButton'
                onClick={onClick}
                attr={attr && attr.navButton}
            >
                <span className={cx('global-nav-item-icon', 'icon', 'icon-globalNavButton')} />
            </Attr.button>
            <div className={cx('scrollable')}>
                {children}
            </div>
        </Attr.nav>
    );
}

export function NavigationItemSeparator() {
    return <div className={cx('separator')} />;
}

export function NavigationItemContainer({ containerTitle, isExpanded, children }: NavigationItemContainerProperties) {
    return (
        <>
            {isExpanded
                ? <div className={cx('global-nav-item-container-title')}>
                    <span className={cx('inline-text-overflow')}
                        title={containerTitle}>
                        {containerTitle}
                    </span>
                </div>
                : <NavigationItemSeparator />}
            {children}
        </>
    );
}

export default Navigation;
