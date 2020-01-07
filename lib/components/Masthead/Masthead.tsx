import * as React from 'react';
import * as classnames from 'classnames/bind';

import { MethodNode } from '../../Common';
import * as InlinePopup from '../InlinePopup';
import { NavigationProperties } from '../Navigation/Navigation';
import { ActionTriggerAttributes, ActionTriggerButtonAttributes } from '../ActionTrigger';
import { Elements as Attr } from '../../Attributes';
import { SearchInput } from '../SearchInput/SearchInput';
import { TextInputAttributes } from '../Input/TextInput';
import { Icon } from '../Icon';

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
    branding: string;
    logo?: MethodNode;
    navigation?: NavigationProperties;
    search?: MastheadSearchItem;
    more?: {
        selected: boolean;
        onClick: React.EventHandler<any>;
        title: string;
        attr?: InlinePopup.Attributes;
    };
    toolbarItems?: Array<MastheadToolbarItem>;
    user?: React.ReactNode;
}

export const Masthead = React.memo((props: MastheadProperties) => {
    const {
        navigation,
        user,
        search,
        more,
        logo,
        branding
    } = props;

    const items = props.toolbarItems?.map((item, idx) => {
        const { label, icon, onClick, selected, attr } = item;
        return (
            <li key={idx} className={cx('masthead-toolbar-btn-container', { 'selected-more': props.more?.selected })}>
                <Attr.button
                    title={label}
                    attr={attr}
                    onClick={onClick}
                    className={cx('masthead-btn', 'masthead-toolbar-btn', { selected })}>
                        <Icon icon={icon} labelClassName={cx('inline-text-overflow')}>{label}</Icon>
                </Attr.button>
            </li>
        );
    });
    
    const searchExpanded = search && search.expanded;

    return (
        <Attr.div key='Masthead' role='banner' className={cx('masthead')}>
            {navigation && !searchExpanded &&
                <InlinePopup.Container className={cx('nav-container')}>
                    <Attr.button
                        onClick={navigation.onClick}
                        className={cx('masthead-btn')}>
                            <Icon icon='chevronRight' className={cx({
                                'nav-icon-collapsed': !navigation.isExpanded,
                                'nav-icon-expanded': navigation.isExpanded, 
                            })} />
                    </Attr.button>
                    <InlinePopup.Panel alignment='left' className={cx('nav-panel')} expanded={navigation.isExpanded}>
                        {navigation.children}
                        {navigation.farBottomChildren && 
                            <>
                                <div className={cx('separator')}></div>
                                {navigation.farBottomChildren}
                            </>
                        }
                    </InlinePopup.Panel>
                </InlinePopup.Container>
            }
            {logo && !searchExpanded && <Attr.div key={'masthead-logo'} className={cx('masthead-logo')}>{logo}</Attr.div>}
            {!searchExpanded && <Attr.span key={'masthead-branding'} title={branding} className={cx('masthead-branding', 'inline-text-overflow')}>{branding}</Attr.span>}
            {search && <SearchInput
                containerClassName={cx('search-input-container', { 'expanded': searchExpanded })}
                inputClassName={cx('masthead-search-input')}
                onChange={search.onChange}
                value={search.value}
                onSubmit={search.onSubmit}
                label={search.label}
                attr={search.attr}
            />}
            {!searchExpanded && <Attr.div className={cx('masthead-toolbar-container')}>
                <ul className={cx('masthead-toolbar')}>
                    {search && <li key='item-search' className={cx('search-button')}>
                        <Attr.button
                            key={search.label}
                            attr={{ button: { title: search.label } }}
                            onClick={search.onExpand}
                            className={cx('masthead-btn')}>
                                <Icon icon='search'/>
                        </Attr.button>
                    </li>}
                    {more && !more.selected && items}
                    {more &&
                        <li key='item-more' className={cx('more-button')} title={more.attr && more.attr.ariaLabel}>
                            <InlinePopup.Container attr={more.attr}>
                                <Attr.button
                                    attr={more.attr}
                                    title={more.title}
                                    onClick={more.onClick}
                                    className={cx('masthead-btn', 'more-menu-btn', { 'selected': more.selected })}>
                                        <Icon icon='more'/>
                                </Attr.button>
                                <InlinePopup.Panel
                                    expanded={more.selected}
                                    alignment='right'
                                    className={cx('masthead-toolbar-menu')}>
                                    <ul role='menu' id='more-menu'>
                                        {items}
                                    </ul>
                                </InlinePopup.Panel>
                            </InlinePopup.Container>
                        </li>
                    }
                    {user && <li key='user-menu' className={cx('user-menu-item')}>
                        {user}
                    </li>}
                </ul >
            </Attr.div>}
        </Attr.div>
    );
});

export default Masthead;