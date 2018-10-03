import * as React from 'react';
import { ButtonProps, NavProps, Elements as Attr } from '../../Attributes';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(require('./Navigation.scss'));

export interface NavigationAttributes {
    container?: NavProps;
    navButton?: ButtonProps;
}

export interface NavigationProperties {
    isExpanded: boolean;
    onClick: React.EventHandler<any>;
    attr?: NavigationAttributes;
}

export class Navigation extends React.PureComponent<NavigationProperties> {
    public static defaultProps: Partial<NavigationProperties> = {
        attr: {
            container: {},
            navButton: {}
        }
    };

    render() {
        return (
            <Attr.nav
                className={cx('navigation', { expanded: this.props.isExpanded })}
                attr={this.props.attr.container}
            >
                <Attr.button
                    className={cx('hamburger-button')}
                    key='globalNavButton'
                    onClick={this.props.onClick}
                    attr={this.props.attr.navButton}
                >
                    <div className={cx('hamburger-icon', 'icon', 'icon-globalNavButton')} />
                </Attr.button>
                {this.props.children}
            </Attr.nav>
        );
    }
}

export default Navigation;
