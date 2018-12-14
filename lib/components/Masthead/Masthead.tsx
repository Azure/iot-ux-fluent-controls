import * as React from 'react';
import * as classnames from 'classnames/bind';
import { MethodNode } from '../../Common';
import * as InlinePopup from '../InlinePopup';
import { Thumbnail } from '../Thumbnail';
import { NavigationProperties } from '../Navigation/Navigation';
import { ActionTriggerButton } from '../ActionTrigger';
import { ContentPanel, ContentPanelProperties } from '../ContentPanel';

const cx = classnames.bind(require('./Masthead.module.scss'));

export interface MastheadAttributes {
    userMenuAriaLabel?: string;
}

export interface ToolbarItem {
    icon: string;
    contentPanel?: ContentPanelProperties;
    className?: string;
    ariaLabel?: string;
}

export interface MastheadProperties {
    branding: MethodNode;
    navigation?: NavigationProperties;
    searchBar: boolean;
    userItemAttr?: MastheadAttributes;
}

export interface MastheadState {
    selectedItem?: string;
    showPanel?: boolean;
}

export class Masthead extends React.Component<MastheadProperties, MastheadState> {

    constructor(props: MastheadProperties) {
        super(props);
        this.state = {
            selectedItem: '',
            showPanel: false
        };
    }

    public static defaultProps: Partial<MastheadProperties> = {
        userItemAttr: {
            userMenuAriaLabel: null,
        }
    };

    private togglePanel = (selectedItem) => {

        if (!this.state.selectedItem) {
            this.setState({ selectedItem, showPanel: true });
        } else {
            // the panel is already displayed
            if (this.state.selectedItem === selectedItem) {
                // hide the panel
                this.setState({ selectedItem: undefined, showPanel: false });
            } else {
                // change the content of the panel
                this.setState({ selectedItem });
            }
        }
    }

    private toolbarItems: { [key: string]: ToolbarItem } = {
        'settings': {
            icon: 'settings', contentPanel: {
                title: 'Settings',
                content: <div>This is the content of the settings</div>,
                actions: {
                    confirm: {
                        label: 'Confirm',
                        event: () => alert('action taken')
                    },
                    cancel: {
                        label: 'Cancel',
                        event: () => this.togglePanel('settings')
                    }
                }
            }
        },
        'help': {
            icon: 'help', contentPanel: {
                title: 'Documental',
                content: <div>This is the content of the Docs</div>,
                actions: {
                    confirm: {
                        label: 'Confirm',
                        event: () => alert('action taken')
                    },
                    cancel: {
                        label: 'Cancel',
                        event: () => this.togglePanel('help')
                    }
                }
            }
        }
    };

    getToolbarItems() {
        return Object.keys(this.toolbarItems).map((key, index) => {
            const item = this.toolbarItems[key];
            return (
                <li key={`item-${key}`}>
                    <ActionTriggerButton
                        key={key}
                        attr={{ button: { 'aria-label': item.ariaLabel || key, 'data-test-hook': `masthead-btn-${key}` } }}
                        icon={item.icon}
                        onClick={() => this.togglePanel(key)}
                        className={cx('masthead-toolbar-btn', { 'selected': key === this.state.selectedItem }, item.className)}
                    />
                </li>
            );
        });
    }

    render() {
        const {
            navigation,
            userItemAttr
        } = this.props;
        const items = this.getToolbarItems();

        let contextPanel: JSX.Element;
        if (this.state.showPanel) {
            contextPanel = <ContentPanel
                key='ContentPanel'
                {...this.toolbarItems[this.state.selectedItem].contentPanel}
            />;
        }

        return (
            [<div key='Masthead' role='banner' className={cx('masthead')}>
                {navigation &&
                    <InlinePopup.Container
                        expanded={navigation.isExpanded}
                        onClick={navigation.onClick}
                        className={cx('nav-container')}>
                        <InlinePopup.Label className={cx('icon', 'icon-chevronRight', {
                            'nav-icon-collapsed': !navigation.isExpanded,
                            'nav-icon-expanded': navigation.isExpanded,
                        })} />
                        <InlinePopup.Panel alignment='left' className={cx('nav-panel')}>
                            {navigation.children}
                        </InlinePopup.Panel>
                    </InlinePopup.Container>
                }
                <div className={cx('masthead-branding', 'inline-text-overflow')} data-test-hook='masthead-application-name'>{this.props.branding}</div>
                <div className={cx('masthead-toolbar-container')}>
                    <ul className={cx('masthead-toolbar')}>
                        <li key={'item-search'}>
                            <ActionTriggerButton
                                key={'search'}
                                attr={{ button: { 'aria-label': 'search-button', 'data-test-hook': 'masthead-btn-search' } }}
                                icon={'search'}
                                onClick={() => { }}
                                className={cx('masthead-toolbar-btn', { 'selected': 'search' === this.state.selectedItem }, 'sm', { 'hidden': this.props.searchBar })}
                            />
                        </li>
                        {items}
                        <li key={'user-menu-item'}>
                            <Thumbnail
                                key='user-menu'
                                kind='user'
                                size='masthead'
                                attr={{ 'aria-label': userItemAttr.userMenuAriaLabel }}
                                className={cx('masthead-toolbar-btn', 'user-btn')}
                            />
                        </li>
                    </ul>
                </div>
            </div>,
                contextPanel
            ]
        );
    }
}

export default Masthead;