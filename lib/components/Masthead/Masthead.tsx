import * as React from 'react';
import * as classnames from 'classnames/bind';
import styled, { ThemeProvider, ThemeProps} from 'styled-components';

import { MethodNode } from '../../Common';
import * as InlinePopup from '../InlinePopup';
import { NavigationProperties } from '../Navigation/Navigation';
import { ActionTriggerButton, ActionTriggerAttributes, ActionTriggerButtonAttributes } from '../ActionTrigger';
import { Elements as Attr } from '../../Attributes';
import { SearchInput } from '../SearchInput/SearchInput';
import { TextInputAttributes } from '../Input/TextInput';
import { ShellTheme  } from '../Shell';
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
}

// Root container
const MastheadContainer = styled(Attr.div)`
    &&&& {
        color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextMastheadRest};
        background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgMasthead };
    }
`;

// Translates Shell theme to action button theme under current context.
function toolbarButtonTheme(theme: ShellTheme): ShellTheme {
    return theme ? {
        base: theme.base,
        colorBgBtnStandardRest: theme.colorBgMasthead,
        colorBgBtnStandardHover: theme.colorBgMastheadHover,
        colorBgBtnStandardDisabled: theme.colorBgMastheadDisabled,
        colorTextBtnStandardRest: theme.colorTextMastheadRest,
        colorTextBtnStandardDisabled: theme.colorTextMastheadDisabled
    } : { base: 'light' }; // Theme must be an object.
}

const StyledButton = styled(Attr.button)`
    &&&&& {
        color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorTextBtnStandardRest};
        &:hover { 
            background-color: ${(props: ThemeProps<ShellTheme>) => props.theme.colorBgBtnStandardHover};
        }
    }
`;

export class Masthead extends React.PureComponent<MastheadProperties> {

    getToolbarItems = () => {
        if (!this.props.toolbarItems) {
            return null;
        }
        return this.props.toolbarItems.map((item, idx) => {
            const { label, icon, onClick, selected, attr } = item;
            return (
                <li key={idx} className={cx('masthead-toolbar-btn-container', { 'selected-more': this.props.more.selected })}>
                    <StyledButton
                        title={label}
                        attr={attr}
                        onClick={onClick}
                        className={cx('masthead-btn', 'masthead-toolbar-btn', { selected })}>
                            <Icon icon={icon}>{label}</Icon>
                    </StyledButton>
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
            branding
        } = this.props;

        const items = this.getToolbarItems();
        const expanded = search && search.expanded;

        return (
            <MastheadContainer key='Masthead' role='banner' className={cx('masthead')}>
                {navigation &&
                    <InlinePopup.Container
                        expanded={navigation.isExpanded}
                        onClick={navigation.onClick}
                        className={cx('nav-container', { 'force-hide-search': expanded })}>
                            <StyledButton
                                className={cx('masthead-btn')}>
                                    <Icon icon='chevronRight' className={cx({
                                        'nav-icon-collapsed': !navigation.isExpanded,
                                        'nav-icon-expanded': navigation.isExpanded, 
                                    })} />
                            </StyledButton>
                        <InlinePopup.Panel alignment='left' className={cx('nav-panel')}>
                            {navigation.children}
                            <div className={cx('separator')}></div>
                            {navigation.farBottomChildren}
                        </InlinePopup.Panel>
                    </InlinePopup.Container>
                }
                {logo && <Attr.div key={'masthead-logo'} className={cx('masthead-logo', { 'force-hide-search': expanded })}>{logo}</Attr.div>}
                <Attr.span key={'masthead-branding'} className={cx('masthead-branding', 'inline-text-overflow', { 'force-hide-search': expanded })}>{branding}</Attr.span>
                {search && <SearchInput
                    containerClassName={cx('search-input-container', { 'force-show-search': expanded })}
                    inputClassName={cx('masthead-search-input')}
                    onChange={search.onChange}
                    value={search.value}
                    onSubmit={search.onSubmit}
                    label={search.label}
                    attr={search.attr}
                />}
                <ThemeProvider theme={toolbarButtonTheme}>
                    <Attr.div className={cx('masthead-toolbar-container', { 'force-hide-search': expanded })}>
                        <ul className={cx('masthead-toolbar')}>
                            {search && <li key='item-search' className={cx('search-button')}>
                                <StyledButton
                                    key={search.label}
                                    attr={{ button: { title: search.label } }}
                                    onClick={search.onExpand}
                                    className={cx('masthead-btn')}>
                                        <Icon icon='search'/>
                                </StyledButton>
                            </li>}
                            {more && !more.selected && items}
                            {more &&
                                <li key='item-more' className={cx('more-button')} title={more.attr && more.attr.ariaLabel}>
                                    <InlinePopup.Container
                                        expanded={more.selected}
                                        onClick={more.onClick}
                                        attr={more.attr}>
                                        <StyledButton
                                            attr={more.attr}
                                            title={more.title}
                                            onClick={more.onClick}
                                            className={cx('masthead-btn', 'more-menu-btn', { 'selected': more.selected })}>
                                                <Icon icon='more'/>
                                        </StyledButton>
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
                </ThemeProvider>
            </MastheadContainer>
        );
    }
}

export default Masthead;