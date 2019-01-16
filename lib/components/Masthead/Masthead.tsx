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
    isSelected: boolean;
    onClick: (event: any) => void;
    attr?: ActionTriggerButtonAttributes & ActionTriggerAttributes;
}

interface SearchItem {
    label: string;
    value: string;
    hidden?: boolean;
    onSubmit: (event: any) => void;
    onChange: (event: any) => void;
    onIconClick?: (event: any) => void;
    attr?: TextInputAttributes;
}

interface UserItem {
    userMenuAriaLabel?: string;
    onUserMenuClick?: (event: any) => void;
    userMenuExpanded?: boolean;
    userMenuItems?: MethodNode;
}

export interface MastheadProperties {
    branding: MethodNode;
    navigation?: NavigationProperties;
    search?: SearchItem;
    more: ToolbarItem;
    toolBarItems: Array<ToolbarItem>;
    user?: UserItem;
}

export class Masthead extends React.PureComponent<MastheadProperties> {

    getToolbarItems = () => {
        return this.props.toolBarItems.map((item, idx) => {
            const { label, icon, onClick, isSelected, attr } = item;

            return (
                <li key={`item-${idx}`} className={cx({ 'show-label': !this.props.more.isSelected })}>
                    < ActionTriggerButton
                        label={label}
                        key={label}
                        attr={attr}
                        icon={icon}
                        onClick={onClick}
                        className={cx('masthead-toolbar-btn', { 'selected': isSelected })}
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
                        className={cx('nav-container', { 'forceHideSearch': hidden })}>
                        <InlinePopup.Label className={cx('icon', 'icon-chevronRight', {
                            'nav-icon-collapsed': !navigation.isExpanded,
                            'nav-icon-expanded': navigation.isExpanded,
                        })} />
                        <InlinePopup.Panel alignment='left' className={cx('nav-panel')}>
                            {navigation.children}
                        </InlinePopup.Panel>
                    </InlinePopup.Container>
                }
                <Attr.span key={'masthead-branding'} className={cx('masthead-branding', 'inline-text-overflow', { 'forceHideSearch': hidden })} data-test-hook='masthead-application-name'>{this.props.branding}</Attr.span>
                {search && <SearchInput
                    containerClassName={cx('search-input-container', { 'forceShowSearch': hidden })}
                    inputClassName={cx('masthead-search-input')}
                    onChange={search.onChange}
                    value={search.value}
                    onClick={search.onSubmit}
                    label={search.label}
                    attr={search.attr}
                />}
                <Attr.div className={cx('masthead-toolbar-container', { 'forceHideSearch': hidden })}>
                    <ul className={cx('masthead-toolbar')}>
                        {search && <li key='item-search' className={cx('search-input-button')}>
                            <ActionTriggerButton
                                key={search.label}
                                attr={{ button: { 'aria-label': search.label, 'data-test-hook': 'masthead-btn-search' } }}
                                icon={'search'}
                                onClick={search.onIconClick}
                                className={cx('masthead-toolbar-btn')}
                            />
                        </li>}
                        {!more.isSelected && items}
                        <li key='item-more' className={cx('more-menu-item')}>
                            <InlinePopup.Container
                                expanded={more.isSelected}
                                onClick={more.onClick}
                            >
                                <InlinePopup.Label
                                    className={cx('masthead-toolbar-btn', 'more-menu-btn', { active: !!more.isSelected })}
                                >
                                    <ActionTriggerButton
                                        key='more'
                                        attr={more.attr}
                                        icon={more.icon}
                                        onClick={more.onClick}
                                        className={cx('masthead-toolbar-btn', { 'selected': more.isSelected })}
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