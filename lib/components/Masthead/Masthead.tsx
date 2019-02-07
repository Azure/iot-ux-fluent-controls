import * as React from 'react';
import * as classnames from 'classnames/bind';
import { MethodNode } from '../../Common';
import * as InlinePopup from '../InlinePopup';
import { Thumbnail } from '../Thumbnail';
import { NavigationProperties } from '../Navigation/Navigation';
import { ActionTriggerButton, ActionTriggerAttributes, ActionTriggerButtonAttributes } from '../ActionTrigger';
import { Elements as Attr } from '../../Attributes';
import { SearchInput } from '../SearchInput/SearchInput';
import { TextInputAttributes } from '../Input/TextInput';

const cx = classnames.bind(require('./Masthead.module.scss'));

export interface MastheadToolbarItem {
    icon: string; // TODO: update with MethodNode
    label: string;
    selected: boolean;
    onClick: React.EventHandler<any>;
    attr?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
}

export interface MastheadSearchItem {
    /** The placeholder text for the search input */
    label: string;

    /** The user input value */
    value: string;
    
    /** 
     * For small screen sizes, the search input is collapsed and replaced with a
     * toolbar button. When the button is clicked, the input is shown and occupies
     * the full width of the masthead. This field controls whether or not the full
     * width expanded view is shown.
     */
    expanded?: boolean;
    
    /** Event handler to call when the search input should be submitted. */
    onSubmit: React.EventHandler<any>;
    
    /** Event handler to call when the search `value` should be changed. */
    onChange: (newValue: string) => void;
    
    /** Event handler to call when the `expanded` property  should be toggled. */
    onExpand: React.EventHandler<any>;
    
    attr?: TextInputAttributes;
}

export interface MastheadUserItem {
    onMenuClick?: React.EventHandler<any>;
    menuExpanded?: boolean;
    menuItems?: MethodNode;
    thumbnailUrl?: string;
    displayName: string;
    email: string;
    attr?: InlinePopup.Attributes;
}

export interface MastheadProperties {
    branding: MethodNode;
    navigation?: NavigationProperties;
    search?: MastheadSearchItem;
    more?: {
        selected: boolean;
        onClick: React.EventHandler<any>;
        title: string;
        attr?: InlinePopup.Attributes;
    };
    toolbarItems?: Array<MastheadToolbarItem>;
    user?: MastheadUserItem;
}

export class Masthead extends React.PureComponent<MastheadProperties> {

    getToolbarItems = () => {
        if (!this.props.toolbarItems) {
            return null;
        }
        return this.props.toolbarItems.map((item, idx) => {
            const { label, icon, onClick, selected, attr } = item;

            return (
                <li key={idx} className={cx('masthead-toolbar-btn-container', { 'selected-more': this.props.more.selected })}>
                    < ActionTriggerButton
                        label={label}
                        attr={attr}
                        icon={icon}
                        onClick={onClick}
                        className={cx('masthead-toolbar-btn', { 'selected': selected })}
                    />
                </li >
            );
        });
    }

    getUserLabel = (props: { email: string; displayName: string; }) => {
        return <li key='user' className={cx('masthead-toolbar-btn-container', 'user-label')}>
            <span className={cx('name', 'inline-text-overflow')} title={props.displayName}>
                {props.displayName}
            </span>
            <span data-test-hook='masthead-user-email' className={cx('email', 'inline-text-overflow')} title={props.email}>
                {props.email}
            </span>
        </li >;
    }


    render() {
        const {
            navigation,
            user,
            search,
            more
        } = this.props;
        const items = this.getToolbarItems();
        const expanded = search && search.expanded;
        return (
            <Attr.div key='Masthead' role='banner' className={cx('masthead')}>
                {navigation &&
                    <InlinePopup.Container
                        expanded={navigation.isExpanded}
                        onClick={navigation.onClick}
                        className={cx('nav-container', { 'force-hide-search': expanded })}>
                        <InlinePopup.Label className={cx('icon', 'icon-chevronRight', {
                            'nav-icon-collapsed': !navigation.isExpanded,
                            'nav-icon-expanded': navigation.isExpanded,
                        })} />
                        <InlinePopup.Panel alignment='left' className={cx('nav-panel')}>
                            {navigation.children}
                        </InlinePopup.Panel>
                    </InlinePopup.Container>
                }
                <Attr.span key={'masthead-branding'} className={cx('masthead-branding', 'inline-text-overflow', { 'force-hide-search': expanded })}>{this.props.branding}</Attr.span>
                {search && <SearchInput
                    containerClassName={cx('search-input-container', { 'force-show-search': expanded })}
                    inputClassName={cx('masthead-search-input')}
                    onChange={search.onChange}
                    value={search.value}
                    onSubmit={search.onSubmit}
                    label={search.label}
                    attr={search.attr}
                />}
                <Attr.div className={cx('masthead-toolbar-container', { 'force-hide-search': expanded })}>
                    <ul className={cx('masthead-toolbar')}>
                        {search && <li key='item-search' className={cx('search-button')}>
                            <ActionTriggerButton
                                key={search.label}
                                attr={{ button: { title: search.label } }}
                                icon={'search'}
                                onClick={search.onExpand}
                                className={cx('masthead-toolbar-btn')}
                            />
                        </li>}
                        {more && !more.selected && items}
                        {more &&
                            <li key='item-more' className={cx('more-button')} title={more.attr && more.attr.ariaLabel}>
                                <InlinePopup.Container
                                    expanded={more.selected}
                                    onClick={more.onClick}
                                    attr={more.attr}
                                >
                                    <InlinePopup.Label
                                        className={cx('masthead-toolbar-btn', 'more-menu-btn', { 'selected': more.selected })} onClick={more.onClick} attr={more.attr} title={more.title}
                                    >
                                        <Attr.span className={cx('icon icon-more')} />
                                    </InlinePopup.Label>
                                    <InlinePopup.Panel
                                        alignment='right'
                                        className={cx('masthead-toolbar-menu')}
                                    >
                                        <ul role='menu' id='more-menu'>
                                            {items}
                                        </ul>
                                    </InlinePopup.Panel>
                                </InlinePopup.Container>
                            </li>
                        }
                        {user && <li key='user-menu' className={cx('user-menu-item')}>
                            <InlinePopup.Container
                                expanded={user.menuExpanded}
                                onClick={user.onMenuClick}
                            >
                                <InlinePopup.Label
                                    className={cx('masthead-toolbar-btn', 'user-menu-btn', { 'selected': !!user.menuExpanded })}
                                    title={user.displayName}
                                    attr={user.attr}
                                >
                                    <Thumbnail
                                        kind='user'
                                        url={user.thumbnailUrl}
                                        size='masthead'
                                        ariaLabel={user.displayName}
                                        className={cx('masthead-toolbar-btn', 'user-btn')}
                                    />
                                </InlinePopup.Label>
                                <InlinePopup.Panel
                                    alignment='right'
                                    className={cx('masthead-toolbar-menu')}
                                >
                                    <ul role='menu' id='user-menu'>
                                        {[
                                            this.getUserLabel({ email: user.email, displayName: user.displayName }),
                                            <li key={'user-item'} className={cx('masthead-toolbar-btn-container', 'user-items')} >
                                                {user.menuItems}
                                            </li>
                                        ]}
                                    </ul>
                                </InlinePopup.Panel>
                            </InlinePopup.Container>
                        </li>
                        }
                    </ul >
                </Attr.div >
            </Attr.div >
        );
    }
}

export default Masthead;