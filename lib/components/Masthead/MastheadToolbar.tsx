import * as classnames from 'classnames/bind';
import * as React from 'react';
import * as InlinePopup from '../InlinePopup';
const cx = classnames.bind(require('./Masthead.module.scss'));

export interface MastheadToolbarItemAttributes {
    dataTestHook?: string;
    ariaLabel?: string;
    ariaDescribedBy?: string;
}

export type MastheadToolbarItemProperties = {
    alignment?: 'right' | 'left';
    content: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactChildren | React.ReactNode;
    contentClass?: string;
    expanded?: boolean;
    icon: string;
    mobileOnly?: boolean;
    onClick: () => void;
    wide?: boolean;
    attr?: MastheadToolbarItemAttributes;
};

export class MastheadToolbarItem  extends React.PureComponent<MastheadToolbarItemProperties> {
    public static defaultProps: Partial<MastheadToolbarItemProperties> = {
        attr: {
            dataTestHook: null,
            ariaLabel: null,
            ariaDescribedBy: null
        }
    };

    render() {
        const {
            alignment,
            content,
            contentClass,
            expanded,
            icon,
            mobileOnly,
            onClick,
            wide,
            attr
        } = this.props;

        return <li className={cx('masthead-toolbar-item', {'collapse-0': !mobileOnly, 'collapse-0-inverse': !!mobileOnly})}>
            <InlinePopup.Container
                expanded={expanded}
                onClick={onClick}
                attr={attr}
            >
                <InlinePopup.Label
                    className={cx('masthead-toolbar-btn', {active: !!expanded})}
                    attr={attr}
                >
                    <span className={cx('icon', `icon-${icon}`)} />
                </InlinePopup.Label>
                <InlinePopup.Panel
                    alignment={alignment}
                    className={cx('masthead-toolbar-menu', { wide: !!wide }, contentClass)}
                    attr={attr}
                >
                    {content}
                </InlinePopup.Panel>
            </InlinePopup.Container>
        </li>;
    }
}