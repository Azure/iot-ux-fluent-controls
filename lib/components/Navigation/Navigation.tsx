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
    farBottomChildren?: React.ReactNode;
}

export interface NavigationItemContainerProperties {
    containerTitle: string;
    isExpanded: boolean;
    children: React.ReactNode;
}

const NavItemHeight = 40;

export function Navigation({ isExpanded, onClick, attr, children, farBottomChildren }: NavigationProperties) {    
    const selectedBorderRef = React.createRef<HTMLDivElement>();
    const topNavItemsContainer = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const items = topNavItemsContainer.current.getElementsByClassName('global-nav-item');

        if (items && items.length > 0) {
            let activeItemIndex = -1;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                // Only take the first active link as active and set everything else to not active
                if (item.className.includes('global-nav-item-active') && activeItemIndex === -1) {
                    activeItemIndex = i;
                    item.setAttribute('data-active', ''); // set boolean attribute
                } else {
                    item.removeAttribute('data-active');
                }
            }

            if (activeItemIndex > -1) {
                selectedBorderRef.current.style.display = 'block';
                selectedBorderRef.current.style.transform = `translateY(${activeItemIndex * NavItemHeight + NavItemHeight}px)`;
            } else {
                selectedBorderRef.current.style.display = 'none';
            }
        }
    });

    return (
        <Attr.nav
            className={cx('navigation', { expanded: isExpanded })}
            attr={attr && attr.container}>
            <Attr.button
                className='global-nav-item'
                key='globalNavButton'
                onClick={onClick}
                attr={attr && attr.navButton}>
                <span className={cx('global-nav-item-icon', 'icon', 'icon-globalNavButton')} />
            </Attr.button>
            <div className={cx('scrollable', 'global-nav-items')}>
                <div ref={selectedBorderRef} className={cx('global-nav-active-border')} />
                <div ref={topNavItemsContainer} className={cx('top-container')}>
                    {children}
                </div>
                {farBottomChildren && <div className={cx('far-bottom-container')}>
                    <NavigationItemSeparator />
                    {farBottomChildren}
                </div>}
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
                ? <div className={cx('global-nav-item', 'global-nav-item-container-title')}>
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
