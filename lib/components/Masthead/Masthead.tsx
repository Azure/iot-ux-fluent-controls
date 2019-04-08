import * as React from 'react';
import * as classnames from 'classnames/bind';
import styled from 'styled-components';

import { MethodNode } from '../../Common';
import { StyledElements, ComponentTheme } from '../../Styled';
import * as InlinePopup from '../InlinePopup';
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

export interface MastheadTheme extends ComponentTheme {
    colorBackground: string;
    colorButtonRest: string;
    colorButtonHover: string;
    colorTextRest: string;
    colorTextDisabled: string;
}

export interface MastheadProperties {
    branding: MethodNode;
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
    theme?: MastheadTheme;
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
                    <ActionTriggerButton
                        label={label}
                        attr={attr}
                        icon={icon}
                        onClick={onClick}
                        className={cx('masthead-toolbar-btn', { 'selected': selected })}
                        theme={this.props.theme && {
                            colorRest: this.props.theme.colorBackground,
                            colorHover: this.props.theme.colorButtonHover,
                            colorDisabled: this.props.theme.colorTextRest,
                            colorTextRest: this.props.theme.colorTextRest,
                            colorTextDisabled: this.props.theme.colorTextDisabled
                        }}
                    />
                </li>
            );
        });
    }

    render() {
        const {
            navigation,
            user,
            search,
            more,
            logo,
            theme,
            branding
        } = this.props;

        const items = this.getToolbarItems();
        const expanded = search && search.expanded;

        // Use style property for banner to speed up initial rendering.
        const mastheadStyles = theme && {
            backgroundColor: theme.colorBackground,
            color: theme.colorTextRest
        } as React.CSSProperties;

        return (
            <Attr.div key='Masthead' role='banner' className={cx('masthead')} style={mastheadStyles}>
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
                {logo && <Attr.div key={'masthead-logo'} className={cx('masthead-logo', { 'force-hide-search': expanded })}>{logo}</Attr.div>}
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
                                theme={theme && {
                                    colorRest: theme.colorBackground,
                                    colorHover: theme.colorButtonHover,
                                    colorDisabled: theme.colorTextRest,
                                    colorTextRest: theme.colorTextRest,
                                    colorTextDisabled: theme.colorTextDisabled
                                }}
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
                            {user}
                        </li>}
                    </ul >
                </Attr.div>
            </Attr.div>
        );
    }
}

export default Masthead;