import * as React from 'react';
import * as classnames from 'classnames/bind';
import { Masthead, MastheadProperties } from '../Masthead/Masthead';
import { Navigation, NavigationProperties } from '../Navigation/Navigation';
import { Root as ContextPanelRoot } from '../ContextPanel/root';

// reexport Masthead and Nav Properties for easier consumption by consumers:
export { MastheadProperties, MastheadSearchItem, MastheadToolbarItem, MastheadUserItem } from '../Masthead/Masthead';
export { NavigationProperties, NavigationItemSeparator } from '../Navigation/Navigation';

const css = classnames.bind(require('./Shell.module.scss'));

export interface ShellProperties {
    theme?: string;
    isRtl?: boolean;
    masthead?: MastheadProperties;
    navigation?: NavigationProperties;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Shell({ theme, isRtl, masthead, navigation, children, onClick }: ShellProperties) {
    if (theme === undefined) {
        theme = 'light';
    }

    return (
        <div className={css('theme-' + theme)}>
            <div className={css('shell', { rtl: isRtl })} onClick={onClick}>
                {masthead && <Masthead navigation={navigation} {...masthead} />}
                <div className={css('nav-and-workspace')}>
                    {navigation && <Navigation {...navigation} />}
                    <div className={css('workspace')}>
                        {children}
                    </div>
                    <ContextPanelRoot />
                </div>
            </div>
        </div>
    );
}

export default Shell;
