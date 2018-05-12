import * as React from 'react';
import { TabOrder } from '../../common/tabOrder';
import { ButtonProps } from '../../Attributes';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Navigation.scss'));

export interface NavigationItems {
    key: string;
    icon: string;
    label: React.ReactNode;
    title?: string;
    to: string;
}

export interface NavigationAttributes {
    navButton?: ButtonProps;
    tabIndex?: number;
}

export interface NavigationProperties {
    isExpanded: boolean;
    onClick: React.EventHandler<any>;
    attr?: NavigationAttributes;
}

export class Navigation extends React.PureComponent<NavigationProperties> {
    public static defaultProps: Partial<NavigationProperties> = {
        attr: {
            navButton: null,
            tabIndex: TabOrder.navigation
        }
    };

    render() {
        return (
            <nav className={cx('navigation', { expanded: this.props.isExpanded })} data-test-hook='side-nav'>
                <button 
                    className={cx('hamburger-button')} 
                    key='globalNavButton'
                    onClick={this.props.onClick} 
                    title={this.props.attr.navButton && this.props.attr.navButton.title}
                    aria-label={this.props.attr.navButton && this.props.attr.navButton.title}
                    tabIndex={this.props.attr.tabIndex}
                >
                    <div className={cx('hamburger-icon', 'icon', 'icon-globalNavButton')} />
                </button>
                {this.props.children}                
            </nav>
        );
    }
}

export default Navigation;
