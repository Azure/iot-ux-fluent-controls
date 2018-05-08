import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as InlinePopup from '../InlinePopup';
import { Accordion } from '../Accordion';
import { Thumbnail } from '../Thumbnail';
import { MastheadToolbarItemProperties, MastheadToolbarItem } from './MastheadToolbar';

const cx = classnames.bind(require('./Masthead.scss'));

export interface MastheadAttributes {
    userMenuAriaLabel?: string;
    mobileMenuAriaLabel?: string;
}

export interface MastheadProperties {
    branding: React.ReactNode;
    user?: {
        email: string;
        displayName: string;
        menuItems: MastheadUserMenuItem[];
        menuExpanded?: boolean;
        onMenuClick: () => void;  
        thumbnailUrl?: string;
    };
    toolbarItems?: MastheadToolbarItemProperties[];
    mobileMenuItems?: MastheadMobileMenuItem[];    
    attr?: MastheadAttributes;
}

export type MastheadMobileMenuItem = {
    dataTestHook: string;
    menuLabel: string;
    reactKey: string;
} & ({
    type: 'link';
    href: string;
} | {
    type: 'button';
    onClick: () => {}; // item is an action button
} | {
    type: 'submenu';
    content: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;
    expanded?: boolean;
    onToggle: () => {}; // item is an accordion menu
});

export interface MastheadUserMenuItem {
    key: string;
    label: string;
    onClick?: () => void;
    href?: string;
}

const UserLabel = (props: { email: string; displayName: string; }) =>
    <div className={cx('user-label')}>
        <span className={cx('name', 'inline-text-overflow')} title={props.displayName}>
            {props.displayName}
        </span>
        <span data-test-hook='masthead-user-email' className={cx('email', 'inline-text-overflow')} title={props.email}>
            {props.email}
        </span>
    </div>;

export class Masthead extends React.PureComponent<MastheadProperties> {
    public static defaultProps: Partial<MastheadProperties> = {
        attr: {
            userMenuAriaLabel: null,
            mobileMenuAriaLabel: null
        }
    };

    componentDidUpdate(prevProps: MastheadProperties) {
        // close expanded accordions in the mobile menu when the menu closes
        if (this.props.mobileMenuItems && prevProps.user && prevProps.user.menuExpanded && !this.props.user.menuExpanded) {
            for (const action of this.props.mobileMenuItems) {
                if (action.type === 'submenu' && action.expanded) {
                    action.onToggle();
                }
            }
        }
    }

    getUserMenuItems() {
        const {
            menuItems
        } = this.props.user;

        return menuItems.map(item =>
             <li
                className={cx('masthead-toolbar-menu-item', 'inline-text-overflow')}
                key={item.key}
            >
                <button
                    aria-label={item.label}
                    className={cx('inline-text-overflow')}
                    data-test-hook={`masthead-toolbar-${item.key}`}
                    onClick={item.onClick}
                    role='menuitem'
                >
                    {item.label}
                </button>
            </li>
        );
    }

    renderMobileMenu() {
        return <ul role='menu' id='app-menu'>
            <li key='user-label' className={cx('masthead-toolbar-menu-item', 'tall', 'inline-text-overflow')}>
                <UserLabel {...this.props.user} />
            </li>
            {
                this.props.mobileMenuItems &&
                this.props.mobileMenuItems.map(action => {
                    switch (action.type) {
                        case 'link':
                            return <li
                                    className={cx('masthead-toolbar-menu-item', 'inline-text-overflow')}
                                    key={action.reactKey}
                                >
                                    <a role='menuitem' href={action.href}>
                                        {action.menuLabel}
                                    </a>
                                </li>;
                        case 'button':
                            return <li
                                    className={cx('masthead-toolbar-menu-item', 'inline-text-overflow')}
                                    key={action.reactKey}
                                >
                                    <button className={cx('inline-text-overflow')} role='menuitem' onClick={action.onClick}>
                                        {action.menuLabel}
                                    </button>
                                </li>;
                        case 'submenu':
                            return <li
                                    className={cx('masthead-toolbar-menu-item', 'tall', 'sub-menu')}
                                    key={action.reactKey}
                                >
                                    <Accordion
                                        attr={{
                                            ariaRole: 'menuitem',
                                            dataTestHook: action.dataTestHook
                                        }}
                                        expanded={action.expanded}
                                        id={action.dataTestHook}
                                        label={action.menuLabel}
                                        onToggle={action.onToggle}
                                    >
                                        {action.content}
                                    </Accordion>
                                </li>;
                    }
                })
            }
            {this.getUserMenuItems()}
        </ul>;
    }

    render() {
        const {
            user: {
                onMenuClick,
                menuExpanded,
            },            
            attr
        } = this.props;

        const menuItems = this.getUserMenuItems();
        const mobileMenu = this.renderMobileMenu();

        return (
            <div role='banner' className={cx('masthead')}>
                <div className={cx('masthead-branding', 'inline-text-overflow')} data-test-hook='masthead-application-name'>
                    {this.props.branding}
                </div>
                <div className={cx('masthead-toolbar-container')}>
                    <ul className={cx('masthead-toolbar')}>
                        {
                            this.props.toolbarItems &&
                            this.props.toolbarItems.map((action, idx) => <MastheadToolbarItem key={idx} {...action} />)
                        }
                        <li key='user-menu' className={cx('masthead-toolbar-item', 'collapse-0')}>
                            <InlinePopup.Container
                                expanded={menuExpanded}
                                onClick={onMenuClick}
                            >
                                <InlinePopup.Label
                                    className={cx('masthead-toolbar-btn', 'user-menu-btn', {active: !!menuExpanded})}
                                    attr={{ ariaLabel: attr.userMenuAriaLabel }}
                                >
                                    <UserLabel {...this.props.user} />
                                    <Thumbnail kind='user' url={this.props.user && this.props.user.thumbnailUrl} size='masthead' className={cx('user-thumbnail')} />
                                </InlinePopup.Label>
                                <InlinePopup.Panel
                                    alignment='right'
                                    className={cx('masthead-toolbar-menu')}
                                >
                                    <ul role='menu' id='user-menu'>
                                        {menuItems}
                                    </ul>
                                </InlinePopup.Panel>
                            </InlinePopup.Container>
                        </li>
                        <MastheadToolbarItem
                            alignment='right'
                            attr={{ ariaLabel: attr.mobileMenuAriaLabel, dataTestHook: 'masthead-application-mobile-menu' }}
                            content={mobileMenu}                            
                            expanded={menuExpanded}
                            icon='more'
                            key='mobile'
                            mobileOnly
                            onClick={onMenuClick}
                        />
                    </ul>
                </div>
            </div>
        );
    }
}

export default Masthead;