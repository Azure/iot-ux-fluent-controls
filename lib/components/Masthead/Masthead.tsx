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

interface ToolbarItem {
    icon: string; // TODO: update with MethodNode
    label: string;
    selected: boolean;
    onClick: React.EventHandler<any>;
    attr?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
}

interface SearchItem {
    label: string;
    value: string;
    hidden?: boolean;
    onSubmit: React.EventHandler<any>;
    onChange: React.EventHandler<any>;
    onClick: React.EventHandler<any>;
    attr?: TextInputAttributes;
}

interface UserItem {
    userMenuAriaLabel?: string;
    onUserMenuClick?: React.EventHandler<any>;
    userMenuExpanded?: boolean;
    userMenuItems?: MethodNode;
}

export interface MastheadProperties {
    branding: MethodNode;
    navigation?: NavigationProperties;
    search?: SearchItem;
    more?: ToolbarItem;
    toolBarItems?: Array<ToolbarItem>;
    user?: UserItem;
}

export class Masthead extends React.PureComponent<MastheadProperties> {

    getToolbarItems = () => {
        if (!this.props.toolBarItems) {
            return null;
        }
        return this.props.toolBarItems.map((item) => {
            const { label, icon, onClick, selected, attr } = item;

            return (
                <li className={cx('masthead-toolbar-btn-container', { 'selected-more': this.props.more.selected })}>
                    < ActionTriggerButton
                        label={label}
                        key={label}
                        attr={attr}
                        icon={icon}
                        onClick={onClick}
                        className={cx('masthead-toolbar-btn', { 'selected': selected })}
                    />
                </li >
            );
        });
    }

    render() {
        const {
            navigation,
            user,
            search,
            more
        } = this.props;

        const items = this.getToolbarItems();
        const hidden = search && search.hidden;
        return (
            <Attr.div key='Masthead' role='banner' className={cx('masthead')}>
                {navigation &&
                    <InlinePopup.Container
                        expanded={navigation.isExpanded}
                        onClick={navigation.onClick}
                        className={cx('nav-container', { 'force-hide-search': hidden })}>
                        <InlinePopup.Label className={cx('icon', 'icon-chevronRight', {
                            'nav-icon-collapsed': !navigation.isExpanded,
                            'nav-icon-expanded': navigation.isExpanded,
                        })} />
                        <InlinePopup.Panel alignment='left' className={cx('nav-panel')}>
                            {navigation.children}
                        </InlinePopup.Panel>
                    </InlinePopup.Container>
                }
                <Attr.span key={'masthead-branding'} className={cx('masthead-branding', 'inline-text-overflow', { 'force-hide-search': hidden })}>{this.props.branding}</Attr.span>
                {search && <SearchInput
                    containerClassName={cx('search-input-container', { 'force-show-search': hidden })}
                    inputClassName={cx('masthead-search-input')}
                    onChange={search.onChange}
                    value={search.value}
                    onClick={search.onSubmit}
                    label={search.label}
                    attr={search.attr}
                />}
                <Attr.div className={cx('masthead-toolbar-container', { 'force-hide-search': hidden })}>
                    <ul className={cx('masthead-toolbar')}>
                        {search && <li key='item-search' className={cx('search-button')}>
                            <ActionTriggerButton
                                key={search.label}
                                attr={{ button: { 'aria-label': search.label } }}
                                icon={'search'}
                                onClick={search.onClick}
                                className={cx('masthead-toolbar-btn')}
                            />
                        </li>}
                        {more && !more.selected && items}
                        <li key='item-more' className={cx('more-button')}>
                            <InlinePopup.Container
                                expanded={more.selected}
                                onClick={more.onClick}
                            >
                                <InlinePopup.Label
                                    className={cx('masthead-toolbar-btn', 'more-menu-btn', { active: !!more.selected })}
                                >
                                    <ActionTriggerButton
                                        key='more'
                                        attr={more.attr}
                                        icon={more.icon}
                                        onClick={more.onClick}
                                        className={cx('masthead-toolbar-btn', { 'selected': more.selected })}
                                    />
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
                        {user && <li key='user-menu' className={cx('user-menu-item')}>
                            <InlinePopup.Container
                                expanded={user.userMenuExpanded}
                                onClick={user.onUserMenuClick}
                            >
                                <InlinePopup.Label
                                    className={cx('masthead-toolbar-btn', 'user-menu-btn', { active: !!user.userMenuExpanded })}
                                >
                                    <Thumbnail
                                        key='user-menu'
                                        kind='user'
                                        size='masthead'
                                        attr={{ 'aria-label': user.userMenuAriaLabel }}
                                        className={cx('masthead-toolbar-btn', 'user-btn')}
                                    />
                                </InlinePopup.Label>
                                <InlinePopup.Panel
                                    alignment='right'
                                    className={cx('masthead-toolbar-menu')}
                                >
                                    {user.userMenuItems}
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